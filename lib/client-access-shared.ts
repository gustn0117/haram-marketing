/* 고객 전용 페이지 — 화면(클라이언트)에서도 써도 되는 값만 둡니다.
   비밀번호는 lib/client-access.ts (서버 전용). */

/** 열람 권한 쿠키 — httpOnly, 서버(proxy · 페이지)만 읽음 */
export const CLIENT_COOKIE = "hm_client";
/** 열람 중 표시 쿠키 — 헤더 버튼 모양만 바꾸는 용도 (권한 판단에는 쓰지 않음) */
export const CLIENT_HINT_COOKIE = "hm_client_open";
/** 한 번 열면 30일 동안 유지 */
export const CLIENT_MAX_AGE = 60 * 60 * 24 * 30;

/** 비밀번호 확인 뒤 이동할 수 있는 주소 — 고객 전용 페이지만 (외부로 넘기지 않음) */
export const safeClientPath = (path: string | null | undefined) =>
  path && /^\/client(\/[a-z-]+)?$/.test(path) ? path : "/client";
