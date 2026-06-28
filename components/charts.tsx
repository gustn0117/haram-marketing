// 데이터 시각화 — 브랜드 톤 커스텀 SVG/막대 (차트 라이브러리 0).
// 애니메이션은 부모 <Reveal>의 .reveal.is-visible 에 연동(globals.css), JS 없음.
// ⚠️ 기본 수치는 예시(평균치)이며 실제 성과는 예식장마다 다릅니다. props로 교체 가능.

/* ── 성장 라인 차트 ── */
export function GrowthChart({
  data = [22, 31, 40, 56, 74, 92],
  labels = ["1M", "2M", "3M", "4M", "5M", "6M"],
  title = "마케팅 시작 후 월별 상담 문의",
  caption = "6 Months",
}: {
  data?: number[];
  labels?: string[];
  title?: string;
  caption?: string;
}) {
  const W = 640;
  const H = 240;
  const padX = 24;
  const padTop = 28;
  const baseY = 196;
  const max = Math.max(...data, 1) * 1.08;
  const n = data.length;
  const x = (i: number) => padX + (i / (n - 1)) * (W - padX * 2);
  const y = (v: number) => baseY - (v / max) * (baseY - padTop);
  const pts = data.map((v, i) => [x(i), y(v)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${x(n - 1)},${baseY} L${x(0)},${baseY} Z`;

  return (
    <figure>
      <figcaption className="flex items-baseline justify-between">
        <span className="text-[0.95rem] font-light tracking-tight text-paper">
          {title}
        </span>
        <span className="text-[0.66rem] uppercase tracking-[0.2em] text-faint">
          {caption}
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={padX} y1={baseY} x2={W - padX} y2={baseY} stroke="var(--color-line-strong)" strokeWidth="1" />
        <path d={area} fill="url(#growthArea)" className="chart-area" />
        <path
          d={line}
          fill="none"
          stroke="var(--color-gold-bright)"
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
        {labels.map((l, i) => (
          <text key={l + i} x={x(i)} y={baseY + 22} textAnchor="middle" className="fill-faint" style={{ fontSize: 11, letterSpacing: "0.1em" }}>
            {l}
          </text>
        ))}
      </svg>
    </figure>
  );
}

/* ── 전환 퍼널 ── */
export function Funnel({
  steps = [
    { label: "노출", w: 100 },
    { label: "유입", w: 64 },
    { label: "상담 문의", w: 38 },
    { label: "홀투어 예약", w: 22 },
    { label: "계약", w: 13 },
  ],
  title = "노출에서 예약까지 — 전환 단계",
}: {
  steps?: { label: string; w: number }[];
  title?: string;
}) {
  return (
    <figure>
      <figcaption className="text-[0.95rem] font-light tracking-tight text-paper">
        {title}
      </figcaption>
      <div className="mt-7 flex flex-col gap-3">
        {steps.map((s, i) => (
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
                  background: "linear-gradient(90deg, var(--color-gold), var(--color-gold-bright))",
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

/* ── 채널/항목 기여 막대 ── */
export function ChannelBars({
  items = [
    { label: "네이버 검색·플레이스", pct: 36 },
    { label: "블로그·체험단", pct: 22 },
    { label: "인스타·SNS", pct: 18 },
    { label: "퍼포먼스 광고", pct: 16 },
    { label: "콘텐츠·기타", pct: 8 },
  ],
  title = "상담 문의 채널 기여도",
}: {
  items?: { label: string; pct: number }[];
  title?: string;
}) {
  return (
    <figure>
      <figcaption className="text-[0.95rem] font-light tracking-tight text-paper">
        {title}
      </figcaption>
      <div className="mt-7 flex flex-col gap-5">
        {items.map((c, i) => (
          <div key={c.label}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-light text-muted">{c.label}</span>
              <span className="num text-sm font-light text-gold">{c.pct}%</span>
            </div>
            <div className="mt-2 h-[3px] w-full rounded-full bg-line-strong">
              <div
                className="data-fill h-[3px] rounded-full"
                style={{
                  width: `${c.pct}%`,
                  transitionDelay: `${i * 90}ms`,
                  background:
                    "linear-gradient(90deg, var(--color-gold-deep), var(--color-gold-bright))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* ── 도넛/링 (단일 비율) ── */
export function DonutChart({
  value,
  label,
  caption,
}: {
  value: number;
  label: string;
  caption?: string;
}) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  return (
    <figure className="flex flex-col items-center text-center">
      <svg viewBox="0 0 140 140" className="w-32" role="img" aria-label={`${label} ${value}%`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-line-strong)" strokeWidth="6" />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={100}
          transform={`rotate(-90 ${cx} ${cy})`}
          className="chart-ring"
          style={{ ["--ring-offset" as string]: `${100 - value}` }}
        />
        <text
          x={cx}
          y={cy + 11}
          textAnchor="middle"
          className="num"
          style={{ fontWeight: 300 }}
        >
          <tspan className="fill-paper" style={{ fontSize: 32 }}>
            {value}
          </tspan>
          <tspan className="fill-gold" dx="2" style={{ fontSize: 14 }}>
            %
          </tspan>
        </text>
      </svg>
      <span className="mt-5 text-sm font-light text-paper">{label}</span>
      {caption ? (
        <span className="mt-2 max-w-[20ch] text-xs font-light leading-relaxed text-muted">
          {caption}
        </span>
      ) : null}
    </figure>
  );
}

/* ── 비교 막대 (전 / 후) ── */
export function CompareBars({
  title = "마케팅 전후 월 상담 문의",
  before = { label: "이전", w: 28 },
  after = { label: "이후", w: 100 },
  unit = "",
}: {
  title?: string;
  before?: { label: string; w: number; value?: string };
  after?: { label: string; w: number; value?: string };
  unit?: string;
}) {
  const rows = [
    { ...before, dim: true },
    { ...after, dim: false },
  ];
  return (
    <figure>
      <figcaption className="text-[0.95rem] font-light tracking-tight text-paper">
        {title}
      </figcaption>
      <div className="mt-7 flex flex-col gap-5">
        {rows.map((rrow, i) => (
          <div key={rrow.label} className="flex items-center gap-4">
            <span className="w-12 shrink-0 text-right text-[0.7rem] uppercase tracking-[0.14em] text-faint">
              {rrow.label}
            </span>
            <div className="h-8 flex-1">
              <div
                className="data-fill h-full rounded-[2px]"
                style={{
                  width: `${rrow.w}%`,
                  transitionDelay: `${i * 140}ms`,
                  background: rrow.dim
                    ? "var(--color-surface-2)"
                    : "linear-gradient(90deg, var(--color-gold), var(--color-gold-bright))",
                }}
              />
            </div>
            {rrow.value ? (
              <span className="num w-16 text-right text-sm font-light text-gold">
                {rrow.value}
                {unit}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
