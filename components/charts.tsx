// 데이터 시각화 — 브랜드 톤 커스텀 SVG/막대.
// 애니메이션은 부모 <Reveal>의 .reveal.is-visible 에 연동(globals.css), JS 없음.
// ⚠️ 수치는 예시(평균치)이며 실제 성과는 예식장마다 다릅니다.

const GROWTH = [22, 31, 40, 56, 74, 92]; // 월별 상담 문의(상대치)
const GROWTH_LABELS = ["1M", "2M", "3M", "4M", "5M", "6M"];

export function GrowthChart() {
  const W = 640;
  const H = 240;
  const padX = 24;
  const padTop = 28;
  const baseY = 196;
  const max = 100;
  const n = GROWTH.length;
  const x = (i: number) => padX + (i / (n - 1)) * (W - padX * 2);
  const y = (v: number) => baseY - (v / max) * (baseY - padTop);
  const pts = GROWTH.map((v, i) => [x(i), y(v)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${x(n - 1)},${baseY} L${x(0)},${baseY} Z`;

  return (
    <figure>
      <figcaption className="flex items-baseline justify-between">
        <span className="text-sm font-light tracking-tight text-paper">
          마케팅 시작 후 월별 상담 문의
        </span>
        <span className="text-[0.66rem] uppercase tracking-[0.2em] text-faint">
          6 Months
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 w-full"
        role="img"
        aria-label="마케팅 시작 후 월별 상담 문의가 꾸준히 증가하는 추이 그래프"
      >
        <defs>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline */}
        <line
          x1={padX}
          y1={baseY}
          x2={W - padX}
          y2={baseY}
          stroke="var(--color-line-strong)"
          strokeWidth="1"
        />
        <path d={area} fill="url(#growthArea)" className="chart-area" />
        <path
          d={line}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="chart-line"
        />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="3.5"
            fill="var(--color-ink)"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            className="chart-dot"
            style={{ transitionDelay: `${900 + i * 90}ms` }}
          />
        ))}
        {GROWTH_LABELS.map((l, i) => (
          <text
            key={l}
            x={x(i)}
            y={baseY + 22}
            textAnchor="middle"
            className="fill-faint"
            style={{ fontSize: 11, letterSpacing: "0.1em" }}
          >
            {l}
          </text>
        ))}
      </svg>
    </figure>
  );
}

const FUNNEL = [
  { label: "노출", w: 100 },
  { label: "유입", w: 64 },
  { label: "상담 문의", w: 38 },
  { label: "홀투어 예약", w: 22 },
  { label: "계약", w: 13 },
];

export function Funnel() {
  return (
    <figure>
      <figcaption className="text-sm font-light tracking-tight text-paper">
        노출에서 예약까지 — 전환 단계
      </figcaption>
      <div className="mt-7 flex flex-col gap-3">
        {FUNNEL.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4">
            <span className="w-20 shrink-0 text-right text-[0.7rem] uppercase tracking-[0.14em] text-faint">
              {s.label}
            </span>
            <div className="h-7 flex-1">
              <div
                className="data-fill h-full rounded-[2px]"
                style={{
                  width: `${s.w}%`,
                  transitionDelay: `${i * 110}ms`,
                  background:
                    "linear-gradient(90deg, var(--color-gold), var(--color-gold-bright))",
                  opacity: 1 - i * 0.12,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

const CHANNELS = [
  { label: "네이버 검색·플레이스", pct: 36 },
  { label: "블로그·체험단", pct: 22 },
  { label: "인스타·SNS", pct: 18 },
  { label: "퍼포먼스 광고", pct: 16 },
  { label: "콘텐츠·기타", pct: 8 },
];

export function ChannelBars() {
  return (
    <figure>
      <figcaption className="text-sm font-light tracking-tight text-paper">
        상담 문의 채널 기여도
      </figcaption>
      <div className="mt-7 flex flex-col gap-5">
        {CHANNELS.map((c, i) => (
          <div key={c.label}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-light text-muted">{c.label}</span>
              <span className="num text-sm font-light text-gold">{c.pct}%</span>
            </div>
            <div className="mt-2 h-px w-full bg-line-strong">
              <div
                className="data-fill h-px bg-gold"
                style={{ width: `${c.pct}%`, transitionDelay: `${i * 90}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
