import type { SVGProps } from "react";

/* 웨딩홀 플랫폼 선 아이콘 — 24 격자, 선 굵기 1.7, 색은 글자색(currentColor)을 따름 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** 하람마케팅 표시(app/icon.svg 와 같은 획)를 흑백으로 */
export const Mark = (props: IconProps) => (
  <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden="true" focusable="false" {...props}>
    <rect width="40" height="40" rx="10" fill="#111" />
    <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 30V12M11 21h10M21 12v18M29 30V12l-7 9" />
    </g>
    <circle cx="29" cy="12" r="1.8" fill="#fff" />
  </svg>
);

export const IconHome = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 10.4 12 4l8 6.4V19a1 1 0 0 1-1 1h-4.6v-5.6H9.6V20H5a1 1 0 0 1-1-1z" />
  </Base>
);

/** 키워드 순위 — 시상대 */
export const IconRank = (props: IconProps) => (
  <Base {...props}>
    <path d="M9 20V9.5h6V20M3.5 20v-6h5.5M15 14h5.5v6M2.5 20h19" />
    <path d="M11.2 6.6 12 4.5l.8 2.1" />
  </Base>
);

/** 방문 분석 — 오르는 선 */
export const IconVisit = (props: IconProps) => (
  <Base {...props}>
    <path d="M3.5 19.5h17" />
    <path d="m4.5 15 4.6-4.6 3.4 3.4 6.5-6.6" />
    <path d="M14.8 7.2h4.2v4.2" />
  </Base>
);

/** 채널 관리 — 고리 */
export const IconLink = (props: IconProps) => (
  <Base {...props}>
    <path d="M10.2 13.8a3.9 3.9 0 0 0 5.5 0l3.1-3.1a3.9 3.9 0 0 0-5.5-5.5l-1.2 1.2" />
    <path d="M13.8 10.2a3.9 3.9 0 0 0-5.5 0l-3.1 3.1a3.9 3.9 0 0 0 5.5 5.5l1.2-1.2" />
  </Base>
);

/** 월간 리포트 — 문서 */
export const IconDoc = (props: IconProps) => (
  <Base {...props}>
    <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
    <path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
  </Base>
);

export const IconSearch = (props: IconProps) => (
  <Base {...props}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="m15.5 15.5 4.6 4.6" />
  </Base>
);

export const IconPhone = (props: IconProps) => (
  <Base {...props}>
    <path d="M8.3 3.8 6 4.2a2 2 0 0 0-1.6 2.2 15.4 15.4 0 0 0 13.2 13.2 2 2 0 0 0 2.2-1.6l.4-2.3a1.2 1.2 0 0 0-.8-1.3l-2.8-1a1.2 1.2 0 0 0-1.3.3l-1.2 1.3a10.6 10.6 0 0 1-4.9-4.9l1.3-1.2a1.2 1.2 0 0 0 .3-1.3l-1-2.8a1.2 1.2 0 0 0-1.3-.8z" />
  </Base>
);

/** 새 창으로 열림 */
export const IconOut = (props: IconProps) => (
  <Base {...props}>
    <path d="M9.5 5.5H6A1.5 1.5 0 0 0 4.5 7v11A1.5 1.5 0 0 0 6 19.5h11a1.5 1.5 0 0 0 1.5-1.5v-3.5" />
    <path d="M13.5 4.5h6v6M19.5 4.5 11 13" />
  </Base>
);

export const IconChevron = (props: IconProps) => (
  <Base {...props}>
    <path d="m9.5 6 6 6-6 6" />
  </Base>
);

export const IconPlus = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconClose = (props: IconProps) => (
  <Base {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Base>
);
