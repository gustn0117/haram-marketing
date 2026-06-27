// 예식장을 가는 선으로 그린 SVG 라인 일러스트 모티프.
// stroke=currentColor → 부모 text-* 색을 따름(톤다운: 본/그레이지).
// variant: reveal(부모 .reveal 진입 시 그려짐) | load(페이지 로드 시) | static.
// pathLength={1}로 정규화 → .ink-draw 의 dasharray:1 과 맞물려 깔끔히 그려짐.

import type { CSSProperties } from "react";

type Variant = "reveal" | "load" | "static";

function drawClass(v: Variant) {
  if (v === "load") return "ink ink-draw-load";
  if (v === "static") return "ink";
  return "ink ink-draw";
}
function delay(ms: number, v: Variant): CSSProperties {
  if (v === "static") return {};
  return v === "load" ? { animationDelay: `${ms}ms` } : { transitionDelay: `${ms}ms` };
}

type MotifProps = { className?: string; variant?: Variant };

/* ── 예식 아치 — 히어로 중심 모티프 (기둥 + 이중 아치 + 펜던트 + 단) ── */
export function ArchMotif({ className, variant = "load" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label="예식 아치" preserveAspectRatio="xMidYMid meet">
      {/* 외곽 기둥 + 아치 */}
      <path d="M64,292 L64,118 A86,86 0 0 1 236,118 L236,292" className={c} pathLength={1} style={delay(0, variant)} />
      {/* 내부 아치 */}
      <path d="M88,292 L88,128 A64,64 0 0 1 212,128 L212,292" className={`${c} ink-thin`} pathLength={1} style={delay(260, variant)} />
      {/* 펜던트(샹들리에) */}
      <path d="M150,64 L150,104" className={`${c} ink-thin`} pathLength={1} style={delay(560, variant)} />
      <circle cx="150" cy="112" r="7" className={`${c} ink-thin`} pathLength={1} style={delay(680, variant)} />
      <path d="M138,128 Q150,140 162,128" className={`${c} ink-thin`} pathLength={1} style={delay(760, variant)} />
      {/* 단(스텝) */}
      <path d="M40,292 L260,292" className={c} pathLength={1} style={delay(420, variant)} />
      <path d="M54,280 L246,280" className={`${c} ink-thin`} pathLength={1} style={delay(500, variant)} />
    </svg>
  );
}

/* ── 통로(아일) — 소실점의 아치로 수렴하는 원근 ── */
export function AisleMotif({ className, variant = "reveal" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 320 220" className={className} role="img" aria-label="예식 통로" preserveAspectRatio="xMidYMid meet">
      <path d="M28,206 L132,44" className={c} pathLength={1} style={delay(0, variant)} />
      <path d="M292,206 L188,44" className={c} pathLength={1} style={delay(120, variant)} />
      <path d="M132,50 Q160,12 188,50" className={`${c} ink-thin`} pathLength={1} style={delay(520, variant)} />
      <path d="M150,44 L150,30" className={`${c} ink-thin`} pathLength={1} style={delay(640, variant)} />
      <circle cx="160" cy="62" r="4" className={`${c} ink-thin`} pathLength={1} style={delay(700, variant)} />
      <path d="M58,168 L262,168" className={`${c} ink-thin`} pathLength={1} style={delay(260, variant)} />
      <path d="M82,128 L238,128" className={`${c} ink-thin`} pathLength={1} style={delay(360, variant)} />
      <path d="M104,94 L216,94" className={`${c} ink-thin`} pathLength={1} style={delay(440, variant)} />
    </svg>
  );
}

/* ── 두 개의 링 (예물) ── */
export function RingsMotif({ className, variant = "reveal" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 132 78" className={className} role="img" aria-label="예물 링" preserveAspectRatio="xMidYMid meet">
      <circle cx="44" cy="40" r="30" className={c} pathLength={1} style={delay(0, variant)} />
      <circle cx="88" cy="40" r="30" className={c} pathLength={1} style={delay(220, variant)} />
      <path d="M44,8 L40,2 L48,2 Z" className={`${c} ink-thin`} pathLength={1} style={delay(420, variant)} />
    </svg>
  );
}

/* ── 샹들리에 ── */
export function ChandelierMotif({ className, variant = "reveal" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 92 132" className={className} role="img" aria-label="샹들리에" preserveAspectRatio="xMidYMid meet">
      <path d="M46,6 L46,34" className={`${c} ink-thin`} pathLength={1} style={delay(0, variant)} />
      <path d="M16,46 Q46,32 76,46" className={c} pathLength={1} style={delay(160, variant)} />
      <path d="M16,46 L16,58 M46,40 L46,52 M76,46 L76,58" className={`${c} ink-thin`} pathLength={1} style={delay(320, variant)} />
      <circle cx="16" cy="63" r="5" className={`${c} ink-thin`} pathLength={1} style={delay(440, variant)} />
      <circle cx="46" cy="57" r="5" className={`${c} ink-thin`} pathLength={1} style={delay(500, variant)} />
      <circle cx="76" cy="63" r="5" className={`${c} ink-thin`} pathLength={1} style={delay(560, variant)} />
      <path d="M30,82 Q46,92 62,82" className={`${c} ink-thin`} pathLength={1} style={delay(640, variant)} />
      <circle cx="30" cy="86" r="4" className={`${c} ink-thin`} pathLength={1} style={delay(720, variant)} />
      <circle cx="62" cy="86" r="4" className={`${c} ink-thin`} pathLength={1} style={delay(760, variant)} />
    </svg>
  );
}

/* ── 식물 가지(부케 모티프) ── */
export function SprigMotif({ className, variant = "reveal" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 64 132" className={className} role="img" aria-label="가지" preserveAspectRatio="xMidYMid meet">
      <path d="M32,128 C28,96 36,66 32,22" className={c} pathLength={1} style={delay(0, variant)} />
      <path d="M32,98 C20,92 16,82 18,73" className={`${c} ink-thin`} pathLength={1} style={delay(220, variant)} />
      <path d="M32,98 C44,92 48,82 46,73" className={`${c} ink-thin`} pathLength={1} style={delay(300, variant)} />
      <path d="M32,70 C22,65 19,57 21,49" className={`${c} ink-thin`} pathLength={1} style={delay(380, variant)} />
      <path d="M32,70 C42,65 45,57 43,49" className={`${c} ink-thin`} pathLength={1} style={delay(440, variant)} />
      <circle cx="32" cy="18" r="3" className={`${c} ink-thin`} pathLength={1} style={delay(560, variant)} />
    </svg>
  );
}

/* ── 모노그램 인장 (HM · 청첩장 씰) ── */
export function MonogramSeal({ className, variant = "reveal" }: MotifProps) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="하람마케팅 모노그램" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="46" className={c} pathLength={1} style={delay(0, variant)} />
      <circle cx="50" cy="50" r="39" className={`${c} ink-thin`} pathLength={1} style={delay(180, variant)} />
      <text x="50" y="57" textAnchor="middle" style={{ fontSize: 22, letterSpacing: "0.04em", fontWeight: 500, fill: "currentColor", stroke: "none" }}>
        HM
      </text>
    </svg>
  );
}

/* ── 섹션 디바이더 — 아주 얕은 와이드 아치 ── */
export function ArcDivider({ className, variant = "reveal" }: { className?: string; variant?: Variant }) {
  const c = drawClass(variant);
  return (
    <svg viewBox="0 0 1200 44" className={className} role="presentation" aria-hidden preserveAspectRatio="xMidYMid meet">
      <path d="M40,34 Q600,4 1160,34" className={`${c} ink-thin`} pathLength={1} style={delay(0, variant)} />
      <circle cx="600" cy="9" r="3.5" className={`${c} ink-thin`} pathLength={1} style={delay(500, variant)} />
    </svg>
  );
}
