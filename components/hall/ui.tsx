import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CHANNEL_LABEL, STATUS_LABEL, SURFACE_LABEL, displayUrl, num, timeAgo } from "@/lib/platform/format";
import type { Channel, ChannelKind, ChannelStatus, Freshness, KeywordRow, RankSurface } from "@/lib/platform/types";
import { IconChevron, IconOut } from "./icons";

/* 웨딩홀 플랫폼(웨딩홀 화면) 조각 — 서버에서 그립니다. 스타일: app/(platform)/hall.css */

/** 채널 종류별 3D 아이콘 — 홈페이지 서비스 그림(public/images/service-art)을 작게 줄인 사본 */
export const CHANNEL_ICON: Record<ChannelKind, string> = {
  homepage: "/images/platform/channel-homepage.webp",
  blog: "/images/platform/channel-blog.webp",
  place: "/images/platform/channel-place.webp",
  instagram: "/images/platform/channel-instagram.webp",
};
export const REPORT_ICON = "/images/platform/report.webp";

/** 순위를 보여 주는 검색 영역 (카페는 자료를 붙일 때 추가) */
export const SURFACES = ["integrated", "blog", "place"] as const satisfies readonly RankSurface[];

/** 대표 영역 순위로 줄 세울 때의 값 — 순위 밖 · 확인 안 함은 뒤로 */
export const rankKey = (row: KeywordRow) => {
  const rank = row.ranks[row.primary];
  return typeof rank === "number" ? rank : rank === null ? 900 : 1000;
};

/** 순위를 글로 — '4위' · '순위 밖' · '—' */
export const rankWords = (rank: number | null | undefined) => (rank === undefined ? "—" : rank === null ? "순위 밖" : `${rank}위`);

/** 페이지 머리 — 위치(홈 > 이 화면) · 제목 · 개수 · 오른쪽 보조 글, 아래 굵은 선 */
export function PageTitle({
  title,
  count,
  aside,
  home = { href: "/dashboard", label: "홈" },
}: {
  title: string;
  count?: ReactNode;
  aside?: ReactNode;
  home?: { href: string; label: string };
}) {
  return (
    <header className="hp-title">
      <nav className="hp-crumbs" aria-label="현재 위치">
        <ol>
          <li>
            <Link href={home.href}>{home.label}</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <div className="hp-title-row">
        <h1>{title}</h1>
        {count ? <p className="hp-title-count">{count}</p> : null}
        {aside ? <p className="hp-title-aside">{aside}</p> : null}
      </div>
    </header>
  );
}

/** 구역 — 제목 · 보조 글 · 오른쪽 끝(전체보기 링크나 탭) */
export function Section({
  title,
  note,
  more,
  end,
  id,
  className = "",
  children,
}: {
  title: string;
  note?: ReactNode;
  more?: { href: string; label: string };
  end?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`hp-section ${className}`.trim()} id={id}>
      <div className="hp-section-head">
        <div>
          <h2>{title}</h2>
          {note ? <p>{note}</p> : null}
        </div>
        {end}
        {more ? (
          <Link href={more.href} className="hp-more">
            {more.label}
            <IconChevron />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export type FilterOption = { href: string; label: ReactNode; current: boolean };

/** 거르기 한 줄 — 왼쪽 이름, 오른쪽 고르는 링크 (주소의 ?값으로 고르므로 새로고침 · 공유해도 그대로) */
export function FilterRow({ label, options, children }: { label: string; options?: FilterOption[]; children?: ReactNode }) {
  return (
    <div className="hp-filter-row">
      <p className="hp-filter-label">{label}</p>
      {options ? (
        <nav className="hp-filter-opts" aria-label={label}>
          {options.map((option) => (
            <Link key={option.href} href={option.href} scroll={false} aria-current={option.current ? "true" : undefined}>
              {option.label}
            </Link>
          ))}
        </nav>
      ) : (
        <div className="hp-filter-opts">{children}</div>
      )}
    </div>
  );
}

/** 숫자 카드 하나 — <dl className="hp-stats"> 안에 둡니다 */
export function StatCard({
  label,
  value,
  unit,
  delta,
  note,
}: {
  label: string;
  value: number | null;
  unit?: string;
  delta?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="hp-stat">
      <dt>{label}</dt>
      <dd className="hp-stat-value">
        {value === null ? <span className="hp-none">—</span> : num(value)}
        {value !== null && unit ? <small>{unit}</small> : null}
      </dd>
      {delta ? <dd className="hp-stat-delta">{delta}</dd> : null}
      {note ? <dd className="hp-stat-note">{note}</dd> : null}
    </div>
  );
}

/** 변동 — 오르면 빨간 ▲, 내리면 파란 ▼ (한국식). 색만으로 뜻을 전하지 않도록 화살표와 읽기용 글자를 함께 둡니다 */
export function Change({ value, kind, against }: { value: number | null; kind: "rank" | "percent"; against?: string }) {
  const suffix = against ? <span className="hp-change-against">{against} 대비</span> : null;
  if (value === null) return <span className="hp-change is-flat">—</span>;
  if (value === 0) {
    return (
      <span className="hp-change is-flat">
        변동 없음{suffix}
      </span>
    );
  }
  const up = value > 0;
  const size = Math.abs(value);
  const amount = kind === "rank" ? `${size}` : `${size}%`;
  const words = kind === "rank" ? `${size}계단 ${up ? "오름" : "내림"}` : `${amount} ${up ? "늘어남" : "줄어듦"}`;
  return (
    <span className={`hp-change ${up ? "is-up" : "is-down"}`}>
      <span aria-hidden="true">
        {up ? "▲" : "▼"}
        {amount}
      </span>
      <span className="sr-only">{words}</span>
      {suffix}
    </span>
  );
}

/** 순위 칸 — undefined = 확인하지 않는 영역, null = 확인한 범위 안에 없음 */
export function RankText({ rank }: { rank: number | null | undefined }) {
  if (rank === undefined) {
    return (
      <span className="hp-none" title="확인하지 않는 영역">
        —
      </span>
    );
  }
  if (rank === null) return <span className="hp-rank-out">순위 밖</span>;
  return (
    <span className={rank <= 10 ? "hp-rank is-top" : "hp-rank"}>
      {rank}
      <small>위</small>
    </span>
  );
}

export function StatusChip({ status }: { status: ChannelStatus }) {
  return (
    <span className={`hp-status is-${status}`}>
      <i aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function ChannelIcon({ kind, size }: { kind: ChannelKind; size: number }) {
  return <Image src={CHANNEL_ICON[kind]} alt="" width={size} height={size} />;
}

/** 새 창 링크 — 등록한 채널 주소 */
function OutLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <span className="hp-out-text">{children}</span>
      <IconOut />
      <span className="sr-only">(새 창)</span>
    </a>
  );
}

/** 채널 카드 — 채널 관리 화면: 아이콘 · 종류 · 이름 · 주소 · 상태 · 숫자 전부 */
export function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <article className="hp-ch">
      <div className="hp-ch-head">
        <span className="hp-ch-icon">
          <ChannelIcon kind={channel.kind} size={58} />
        </span>
        <div className="hp-ch-name">
          <span className="hp-tag is-dark">{CHANNEL_LABEL[channel.kind]}</span>
          <h3>{channel.label}</h3>
          <OutLink href={channel.url} className="hp-ch-url">
            {displayUrl(channel.url)}
          </OutLink>
        </div>
        <StatusChip status={channel.status} />
      </div>
      <dl className="hp-ch-metrics">
        {channel.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              {metric.value === null ? (
                <span className="hp-none">{metric.note ?? "—"}</span>
              ) : (
                <>
                  {num(metric.value)}
                  {metric.unit ? <small>{metric.unit}</small> : null}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="hp-ch-time">{channel.updatedAt ? `갱신 ${timeAgo(channel.updatedAt)}` : "아직 숫자가 없습니다"}</p>
    </article>
  );
}

/** 채널 작은 카드 — 개요 화면: 아이콘 · 종류 · 주소 · 상태 · 대표 숫자 하나 */
export function ChannelTile({ channel }: { channel: Channel }) {
  const metric = channel.metrics[0];
  return (
    <article className="hp-tile">
      <div className="hp-tile-top">
        <span className="hp-ch-icon is-sm">
          <ChannelIcon kind={channel.kind} size={46} />
        </span>
        <StatusChip status={channel.status} />
      </div>
      <h3>{CHANNEL_LABEL[channel.kind]}</h3>
      <OutLink href={channel.url} className="hp-tile-url">
        {displayUrl(channel.url)}
      </OutLink>
      {metric ? (
        <p className="hp-tile-metric">
          <span>{metric.label}</span>
          {metric.value === null ? (
            <span className="hp-none">{metric.note ?? "—"}</span>
          ) : (
            <strong>
              {num(metric.value)}
              {metric.unit ? <small>{metric.unit}</small> : null}
            </strong>
          )}
        </p>
      ) : null}
    </article>
  );
}

/** 작은 추이 선 — 카드 그림 자리. 값이 없는 날은 선을 끊음. invert = 작을수록 위(순위)
   숫자는 카드 글자로 함께 보여 주므로 그림은 읽기 프로그램에서 건너뜁니다 */
export function Sparkline({ values, invert = false, className = "hp-spark" }: { values: (number | null)[]; invert?: boolean; className?: string }) {
  const nums = values.filter((value): value is number => value !== null);
  if (nums.length === 0) return null;
  const W = 320;
  const H = 200;
  const left = 24;
  const right = 26;
  const top = 66;
  const bottom = 54;
  let low = Math.min(...nums);
  let high = Math.max(...nums);
  if (high - low < 4) {
    const middle = (high + low) / 2;
    low = middle - 2;
    high = middle + 2;
  }
  const last = values.length - 1;
  const x = (i: number) => left + (last === 0 ? (W - left - right) / 2 : (i / last) * (W - left - right));
  const y = (value: number) => {
    const t = (value - low) / (high - low);
    return invert ? top + t * (H - top - bottom) : H - bottom - t * (H - top - bottom);
  };
  const segments: string[] = [];
  let path = "";
  values.forEach((value, i) => {
    if (value === null) {
      if (path) segments.push(path);
      path = "";
      return;
    }
    path += `${path ? "L" : "M"}${x(i).toFixed(1)},${y(value).toFixed(1)}`;
  });
  if (path) segments.push(path);
  const endIndex = values.length - 1 - [...values].reverse().findIndex((value) => value !== null);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" focusable="false">
      {segments.map((d) => (
        <path key={d} d={d} />
      ))}
      <circle cx={x(endIndex)} cy={y(values[endIndex]!)} r={6} />
    </svg>
  );
}

/** 키워드 카드 — 순위 리본 · 30일 추이 그림 · 대표 영역 · 월 검색량 · 7일 변동 · 다른 영역 순위 */
export function KeywordCard({ row }: { row: KeywordRow }) {
  const rank = row.ranks[row.primary];
  const before = typeof rank === "number" && row.change7d ? rank + row.change7d : null;
  const others = SURFACES.filter((surface) => surface !== row.primary && row.ranks[surface] !== undefined);
  return (
    <article className="hp-kw">
      <div className="hp-kw-thumb">
        <span className="hp-kw-ribbon" aria-hidden="true">
          {typeof rank === "number" ? (
            <>
              {rank}
              <small>위</small>
            </>
          ) : (
            <small>순위 밖</small>
          )}
        </span>
        <Sparkline values={row.history.map((point) => point.rank)} invert />
        <span className="hp-tag is-dark hp-kw-surface">{SURFACE_LABEL[row.primary]}</span>
      </div>
      <div className="hp-kw-body">
        <h3>
          <Link href={`/dashboard/keywords?k=${row.id}#rank-chart`}>{row.keyword}</Link>
        </h3>
        <p className="hp-meta">
          월 검색 {row.monthlySearches === null ? "—" : num(row.monthlySearches)}
          <i aria-hidden="true" />
          최근 30일
        </p>
        <p className="hp-kw-now">
          <Change value={row.change7d} kind="rank" />
          <strong>
            {SURFACE_LABEL[row.primary]} {rankWords(rank)}
          </strong>
          {before !== null && before <= 100 ? <span className="hp-kw-was">7일 전 {before}위</span> : null}
        </p>
        {others.length ? (
          <p className="hp-kw-tags">{others.map((surface) => `${SURFACE_LABEL[surface]} ${rankWords(row.ranks[surface])}`).join(" · ")}</p>
        ) : null}
      </div>
    </article>
  );
}

/** 순서대로 놓은 가로 막대 — 이름 · 막대 · 숫자 · 비율 (값이 모두 글자로 보이므로 따로 마우스 안내는 두지 않음) */
export function BarList({ rows, unit = "" }: { rows: { label: string; value: number }[]; unit?: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  const total = rows.reduce((sum, row) => sum + row.value, 0) || 1;
  return (
    <ul className="hp-bars">
      {rows.map((row) => (
        <li key={row.label}>
          <span className="hp-bars-label">{row.label}</span>
          <span className="hp-bars-track" aria-hidden="true">
            <i style={{ width: `${(row.value / max) * 100}%` }} />
          </span>
          <span className="hp-bars-value">
            {num(row.value)}
            {unit}
            <small>{Math.round((row.value / total) * 100)}%</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 번호 붙은 목록 — 많이 본 페이지 (1 ~ 3위는 검은 번호) */
export function RankedPages({ pages }: { pages: { path: string; title: string; views: number }[] }) {
  return (
    <ol className="hp-ranked">
      {pages.map((page, i) => (
        <li key={page.path}>
          <span className="hp-ranked-no" aria-hidden="true">
            {i + 1}
          </span>
          <span className="hp-ranked-title">
            {page.title}
            <span className="hp-ranked-path">{page.path}</span>
          </span>
          <span className="hp-ranked-value">
            {num(page.views)}
            <small>회</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** 자료마다 가져오는 곳과 마지막 시각 */
export function FreshnessList({ items }: { items: Freshness[] }) {
  return (
    <ul className="hp-fresh">
      {items.map((item) => (
        <li key={item.label}>
          <span className="hp-fresh-label">{item.label}</span>
          <span className="hp-fresh-source">{item.source}</span>
          <span className="hp-fresh-at">{item.at ? timeAgo(item.at) : "연결 전"}</span>
        </li>
      ))}
    </ul>
  );
}

/** 비었을 때 — 무엇을 하면 채워지는지 */
export function EmptyState({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="hp-empty">
      <p>{children}</p>
      {action}
    </div>
  );
}

/** 아직 연결하지 않은 기능 안내 */
export function Pending({ children }: { children: ReactNode }) {
  return <p className="hp-pending">{children}</p>;
}
