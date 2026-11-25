/* 웨딩홀 플랫폼 — proxy.ts · 서버 · 화면이 함께 쓰는 값만 둡니다 (비밀 값은 두지 않음). */

import type { Role } from "./types";

/** 로그인 쿠키 — httpOnly, 값은 서버가 서명한 세션 (lib/platform/session.ts) */
export const PLATFORM_COOKIE = "hm_platform";

/** 로그인 뒤 첫 화면 — 웨딩홀은 개요, 하람은 웨딩홀 계정 목록 */
export const homeOf = (role: Role) => (role === "admin" ? "/dashboard/halls" : "/dashboard");

/** 로그인 뒤 돌아갈 주소 — 플랫폼 화면만 허용 (외부 주소로 넘기지 않음) */
export const safeDashboardPath = (value: unknown) =>
  typeof value === "string" && /^\/dashboard(\/[a-z0-9-]+){0,3}$/.test(value) ? value : null;
