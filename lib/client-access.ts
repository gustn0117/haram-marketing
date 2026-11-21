import { CLIENT_COOKIE } from "@/lib/client-access-shared";

/* 고객 전용 페이지 비밀번호 — 서버 전용 (proxy · app/api/client-access · 고객 전용 페이지에서만 import).
   화면 컴포넌트에서 import 하면 비밀번호가 브라우저로 내려가므로 import 하지 마세요.
   바꾸면 이미 열어 둔 브라우저도 다시 잠깁니다. 서버 환경변수 CLIENT_PASSWORD 로도 바꿀 수 있습니다. */
export const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD || "1234";

/** 쿠키에 저장하는 값 — 비밀번호 자체가 아니라 비밀번호로 만든 해시 */
export async function clientToken() {
  const data = new TextEncoder().encode(`haram-marketing-client|${CLIENT_PASSWORD}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** 쿠키 저장소(요청 쿠키)에서 열람 권한 확인 */
export async function hasClientAccess(cookies: { get(name: string): { value: string } | undefined }) {
  return cookies.get(CLIENT_COOKIE)?.value === (await clientToken());
}
