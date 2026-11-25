"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

/* 하루 단위 선 그래프 한 줄 — 방문 수 · 키워드 순위. 차트 라이브러리 없이 SVG.
   마우스를 올리거나 키보드(← →, Home · End)로 날짜를 옮기면 그날 값이 뜨고, 같은 값은 '표로 보기'에도 있습니다.
   kind="rank" 는 숫자가 작을수록 위(1위가 맨 위). 값이 없는 날(null)은 선을 끊고 emptyText 로 표시합니다.
   너비는 들어간 칸에 맞춰 재고(ResizeObserver), 높이에는 아래 날짜 줄까지 포함합니다. */

export type ChartPoint = { day: string; value: number | null };

type Props = {
  points: ChartPoint[];
  kind: "count" | "rank";
  /** 그래프 이름 — 화면 읽기 프로그램 · 표 제목 */
  title: string;
  /** 숫자 뒤 단위 (방문 수: '회') */
  unit?: string;
  height?: number;
  /** 값이 없는 날 표시 */
  emptyText?: string;
};

const dayLabel = (day: string) => {
  const [, month, date] = day.split("-");
  return `${Number(month)}.${Number(date)}`;
};

function niceStep(raw: number) {
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = raw / power;
  return (step <= 1 ? 1 : step <= 2 ? 2 : step <= 2.5 ? 2.5 : step <= 5 ? 5 : 10) * power;
}

function countScale(largest: number) {
  const step = niceStep(Math.max(largest, 4) / 4);
  const max = Math.ceil(largest / step) * step || step;
  const ticks: number[] = [];
  for (let value = 0; value <= max + step / 2; value += step) ticks.push(Math.round(value));
  return { min: 0, max, ticks };
}

function rankScale(worst: number) {
  const max = worst <= 5 ? 5 : worst <= 10 ? 10 : worst <= 20 ? 20 : worst <= 30 ? 30 : Math.ceil(worst / 10) * 10;
  const gap = max <= 20 ? 5 : 10;
  const ticks = [1];
  for (let value = gap; value <= max; value += gap) ticks.push(value);
  return { min: 1, max, ticks };
}

const countTick = (value: number) =>
  value >= 10000 ? `${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1)}만` : value.toLocaleString("ko-KR");

export default function LineChart({ points, kind, title, unit = "", height = 240, emptyText = "자료 없음" }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const values = points.flatMap((point) => (point.value === null ? [] : [point.value]));
  if (values.length === 0) return <p className="pf-chart-empty">{emptyText}</p>;

  const format = (value: number) => (kind === "rank" ? `${value}위` : `${value.toLocaleString("ko-KR")}${unit}`);
  const firstIndex = points.findIndex((point) => point.value !== null);
  const lastIndex = points.length - 1 - [...points].reverse().findIndex((point) => point.value !== null);
  const best = kind === "rank" ? Math.min(...values) : Math.max(...values);
  const summary = `${dayLabel(points[firstIndex].day)} ${format(points[firstIndex].value!)}에서 ${dayLabel(points[lastIndex].day)} ${format(
    points[lastIndex].value!,
  )}, ${kind === "rank" ? "가장 높은 순위" : "가장 많은 날"} ${format(best)}`;

  const table = (
    <details className="pf-table-toggle">
      <summary>표로 보기</summary>
      <div className="pf-table-wrap">
        <table className="pf-table is-compact">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr>
              <th scope="col">날짜</th>
              <th scope="col" className="is-num">
                {kind === "rank" ? "순위" : "값"}
              </th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.day}>
                <td>{dayLabel(point.day)}</td>
                <td className="is-num">{point.value === null ? emptyText : format(point.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );

  // 너비를 재기 전에는 같은 높이의 빈 칸만 둠 (화면이 튀지 않게)
  if (width === null) {
    return (
      <figure className="pf-figure">
        <div ref={boxRef} className="pf-chart" style={{ height }} />
        {table}
      </figure>
    );
  }

  const narrow = width < 520;
  const pad = { top: 14, right: narrow ? 36 : 52, bottom: 30, left: kind === "rank" ? 38 : 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const scale = kind === "rank" ? rankScale(Math.max(...values)) : countScale(Math.max(...values));
  const last = points.length - 1;
  const x = (i: number) => pad.left + (last === 0 ? plotW / 2 : (i / last) * plotW);
  const y = (value: number) =>
    kind === "rank"
      ? pad.top + ((value - scale.min) / (scale.max - scale.min)) * plotH
      : pad.top + plotH - (value / scale.max) * plotH;

  // 값이 없는 날에서 선을 끊음
  const segments: string[] = [];
  const lonely: number[] = [];
  let path = "";
  let length = 0;
  points.forEach((point, i) => {
    if (point.value === null) {
      if (length === 1) lonely.push(i - 1);
      if (path) segments.push(path);
      path = "";
      length = 0;
      return;
    }
    path += `${path ? "L" : "M"}${x(i).toFixed(1)},${y(point.value).toFixed(1)}`;
    length += 1;
  });
  if (length === 1) lonely.push(last);
  if (path) segments.push(path);

  const area =
    kind === "count" && segments.length === 1 && values.length === points.length
      ? `${segments[0]}L${x(last).toFixed(1)},${(pad.top + plotH).toFixed(1)}L${x(0).toFixed(1)},${(pad.top + plotH).toFixed(1)}Z`
      : null;

  const labelCount = narrow ? 3 : 5;
  const xTicks = [...new Set(Array.from({ length: labelCount }, (_, k) => Math.round((k * last) / (labelCount - 1))))];

  const pick = (event: PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    const i = Math.round(((event.clientX - rect.left - pad.left) / plotW) * last);
    setActive(Math.min(last, Math.max(0, i)));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const now = active ?? lastIndex;
    const moves: Record<string, number | null> = {
      ArrowLeft: now - 1,
      ArrowRight: now + 1,
      Home: 0,
      End: last,
      Escape: null,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = moves[event.key];
    setActive(next === null ? null : Math.min(last, Math.max(0, next)));
  };

  const point = active === null ? null : points[active];
  const pointY = point && point.value !== null ? y(point.value) : null;
  const tipLeft = active === null ? 0 : Math.min(width - 56, Math.max(56, x(active)));
  const tipTop = pointY === null ? pad.top : pointY - 54 < 0 ? pointY + 14 : pointY - 54;
  const end = points[lastIndex];

  return (
    <figure className="pf-figure">
      <div
        ref={boxRef}
        className="pf-chart"
        style={{ height }}
        tabIndex={0}
        role="group"
        aria-label={`${title}. ${summary}. 화살표 키로 날짜를 옮길 수 있습니다.`}
        onKeyDown={onKeyDown}
        onFocus={() => setActive((current) => current ?? lastIndex)}
        onBlur={() => setActive(null)}
      >
        <svg width={width} height={height} role="img" aria-label={`${title}. ${summary}`}>
          {scale.ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y(tick)}
                y2={y(tick)}
                className={kind === "count" && tick === 0 ? "pf-baseline" : "pf-grid"}
              />
              <text x={pad.left - 10} y={y(tick)} dy="0.32em" textAnchor="end" className="pf-axis">
                {kind === "rank" ? `${tick}위` : countTick(tick)}
              </text>
            </g>
          ))}
          {xTicks.map((i) => (
            <text
              key={i}
              x={x(i)}
              y={height - 8}
              textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}
              className="pf-axis"
            >
              {dayLabel(points[i].day)}
            </text>
          ))}
          {area ? <path d={area} className="pf-area" /> : null}
          {segments.map((d) => (
            <path key={d} d={d} className="pf-line" />
          ))}
          {lonely.map((i) => (
            <circle key={i} cx={x(i)} cy={y(points[i].value!)} r={2.5} className="pf-dot is-small" />
          ))}
          {active !== null ? <line x1={x(active)} x2={x(active)} y1={pad.top} y2={pad.top + plotH} className="pf-cross" /> : null}
          <circle cx={x(lastIndex)} cy={y(end.value!)} r={4} className="pf-dot" />
          <text x={x(lastIndex) + 9} y={y(end.value!)} dy="0.32em" className="pf-end-label">
            {kind === "rank" ? `${end.value}위` : end.value!.toLocaleString("ko-KR")}
          </text>
          {active !== null && pointY !== null ? <circle cx={x(active)} cy={pointY} r={4.5} className="pf-dot" /> : null}
          <rect
            x={pad.left}
            y={pad.top}
            width={plotW}
            height={plotH}
            className="pf-hit"
            onPointerDown={pick}
            onPointerMove={pick}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setActive(null);
            }}
          />
        </svg>
        {point ? (
          <div className="pf-tip" style={{ left: tipLeft, top: tipTop }} aria-hidden="true">
            <strong>{point.value === null ? emptyText : format(point.value)}</strong>
            <span>{dayLabel(point.day)}</span>
          </div>
        ) : null}
        <p className="sr-only" aria-live="polite">
          {point ? `${dayLabel(point.day)} ${point.value === null ? emptyText : format(point.value)}` : ""}
        </p>
      </div>
      {values.length < points.length ? <p className="pf-chart-note">선이 끊긴 날: {emptyText}</p> : null}
      {table}
    </figure>
  );
}
