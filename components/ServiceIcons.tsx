// 서비스별 가는 선 아이콘 — stroke=currentColor, 부모 text-* 색을 따름.
// 스크롤 진입 시 그려짐(.ink-draw, 조상 .reveal 필요). 톤다운 라인아트와 동일 톤.
// id는 lib/content.ts의 services[].id와 1:1.

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
      {/* 인스타그램 — 카메라 글리프 */}
      {id === "instagram" && (
        <>
          <rect x="9" y="9" width="22" height="22" rx="6.5" className={c} pathLength={1} />
          <circle cx="20" cy="20" r="6" className={c} pathLength={1} />
          <circle cx="26.5" cy="13.5" r="1.4" className={c} pathLength={1} />
        </>
      )}
      {/* 블로그 관리 — 글이 쌓인 문서 */}
      {id === "blog" && (
        <>
          <rect x="11" y="6" width="18" height="28" rx="1.5" className={c} pathLength={1} />
          <path d="M16,14 H24 M16,20 H24 M16,26 H21" className={c} pathLength={1} />
        </>
      )}
      {/* 블로그·카페 포스팅 — 겹친 말풍선(후기·커뮤니티) */}
      {id === "posting" && (
        <>
          <path
            d="M9,9 H25 A2,2 0 0 1 27,11 V20 A2,2 0 0 1 25,22 H15 L10,26 V22 H9 A2,2 0 0 1 7,20 V11 A2,2 0 0 1 9,9 Z"
            className={c}
            pathLength={1}
          />
          <path d="M12,14 H22 M12,17.5 H19" className={c} pathLength={1} />
          <path
            d="M27,16 H31 A2,2 0 0 1 33,18 V27 A2,2 0 0 1 31,29 H30 V33 L25.5,29 H19 A2,2 0 0 1 17,27 V22.5"
            className={c}
            pathLength={1}
          />
        </>
      )}
      {/* 플레이스 — 지도 핀 */}
      {id === "place" && (
        <>
          <path
            d="M20,33 C16,28.5 10,22.5 10,16.5 A10,10 0 0 1 30,16.5 C30,22.5 24,28.5 20,33 Z"
            className={c}
            pathLength={1}
          />
          <circle cx="20" cy="16.5" r="3.5" className={c} pathLength={1} />
        </>
      )}
      {/* CRM·ERP — 사이드바가 있는 관리 화면 */}
      {id === "crm" && (
        <>
          <rect x="7" y="8" width="26" height="24" rx="2" className={c} pathLength={1} />
          <path d="M14,8 V32" className={c} pathLength={1} />
          <path d="M18,14 H29 M18,19 H29 M18,24 H25" className={c} pathLength={1} />
        </>
      )}
      {/* 홈페이지 — 브라우저 창 */}
      {id === "homepage" && (
        <>
          <rect x="8" y="9" width="24" height="22" rx="2" className={c} pathLength={1} />
          <path d="M8,16 H32" className={c} pathLength={1} />
          <circle cx="12" cy="12.5" r="1" className={c} pathLength={1} />
          <circle cx="16" cy="12.5" r="1" className={c} pathLength={1} />
        </>
      )}
      {/* 랜딩페이지 — 신청 버튼이 있는 모바일 한 장 */}
      {id === "landing" && (
        <>
          <rect x="12.5" y="5" width="15" height="30" rx="2.5" className={c} pathLength={1} />
          <path d="M18.5,8.5 H21.5" className={c} pathLength={1} />
          <path d="M16,14 H24 M16,17.5 H22" className={c} pathLength={1} />
          <rect x="16" y="25" width="8" height="4" rx="1" className={c} pathLength={1} />
        </>
      )}
      {/* 웨딩박람회 플랫폼 — 입장권(사전 등록) */}
      {id === "fair" && (
        <>
          <path
            d="M8,13 H32 V17 A3,3 0 0 0 32,23 V27 H8 V23 A3,3 0 0 0 8,17 Z"
            className={c}
            pathLength={1}
          />
          <path d="M15,13 V27" className={c} pathLength={1} />
          <path d="M19,18 H27 M19,22 H24" className={c} pathLength={1} />
        </>
      )}
      {/* 멤버십 — 회원 카드 */}
      {id === "membership" && (
        <>
          <rect x="6" y="10" width="28" height="20" rx="2.5" className={c} pathLength={1} />
          <circle cx="13.5" cy="18" r="2.6" className={c} pathLength={1} />
          <path d="M9.5,25.5 A4,4 0 0 1 17.5,25.5" className={c} pathLength={1} />
          <path d="M21,17.5 H29 M21,21.5 H27 M21,25.5 H25" className={c} pathLength={1} />
        </>
      )}
    </svg>
  );
}
