// 서비스별 가는 선 아이콘 — stroke=currentColor, 부모 text-* 색을 따름.
// 스크롤 진입 시 그려짐(.ink-draw, 조상 .reveal 필요). 톤다운 라인아트와 동일 톤.

type Variant = "reveal" | "load" | "static";

function dc(v: Variant) {
  if (v === "load") return "ink ink-thin ink-draw-load";
  if (v === "static") return "ink ink-thin";
  return "ink ink-thin ink-draw";
}

export function ServiceIcon({
  id,
  className,
  variant = "reveal",
}: {
  id: string;
  className?: string;
  variant?: Variant;
}) {
  const c = dc(variant);
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {id === "search" && (
        <>
          <circle cx="17" cy="17" r="9" className={c} pathLength={1} />
          <path d="M23.5,23.5 L32,32" className={c} pathLength={1} />
        </>
      )}
      {id === "blog" && (
        <>
          <rect x="11" y="6" width="18" height="28" rx="1.5" className={c} pathLength={1} />
          <path d="M16,14 H24 M16,20 H24 M16,26 H21" className={c} pathLength={1} />
        </>
      )}
      {id === "sns" && (
        <>
          <rect x="9" y="9" width="22" height="22" rx="6.5" className={c} pathLength={1} />
          <circle cx="20" cy="20" r="6" className={c} pathLength={1} />
          <circle cx="26.5" cy="13.5" r="1.4" className={c} pathLength={1} />
        </>
      )}
      {id === "ad" && (
        <>
          <path d="M9,31 H31" className={c} pathLength={1} />
          <path d="M13,31 V25 M20,31 V20 M27,31 V14" className={c} pathLength={1} />
          <path d="M22,16 L30,9 M26,9 H30 V13" className={c} pathLength={1} />
        </>
      )}
      {id === "content" && (
        <>
          <rect x="8" y="11" width="24" height="18" rx="2" className={c} pathLength={1} />
          <path d="M17,16 L25,20 L17,24 Z" className={c} pathLength={1} />
        </>
      )}
      {id === "brand" && (
        <>
          <rect x="8" y="9" width="24" height="22" rx="2" className={c} pathLength={1} />
          <path d="M8,16 H32" className={c} pathLength={1} />
          <circle cx="12" cy="12.5" r="1" className={c} pathLength={1} />
          <circle cx="16" cy="12.5" r="1" className={c} pathLength={1} />
        </>
      )}
    </svg>
  );
}
