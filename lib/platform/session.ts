import "server-only";
import { cookies } from "next/headers";
import { PLATFORM_COOKIE } from "./shared";
import type { Role } from "./types";

/* 로그인 세션 — 쿠키 하나에 계정 번호 · 역할 · 만료 시각을 넣고 서버 비밀 값으로 서명합니다(HMAC-SHA256).
   서명 비밀 값은 서버 환경변수 PLATFORM_SESSION_SECRET. 없으면 서버를 켤 때마다 새로 만들어서,
   다시 시작하면 모두 다시 로그인합니다(틀 단계). 실제 계정을 붙이기 전에 서버에 값을 넣어 둡니다. */

type Payload = { sub: string; role: Role; exp: number };

/** 12시간 동안 로그인 유지 */
const MAX_AGE = 60 * 60 * 12;
const encoder = new TextEncoder();

function secret() {
  if (process.env.PLATFORM_SESSION_SECRET) return process.env.PLATFORM_SESSION_SECRET;
  const store = globalThis as typeof globalThis & { __hmPlatformSecret?: string };
  store.__hmPlatformSecret ??= `${crypto.randomUUID()}${crypto.randomUUID()}`;
  return store.__hmPlatformSecret;
}

const hmacKey = () =>
  crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

async function encode(payload: Payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(body));
  return `${body}.${Buffer.from(signature).toString("base64url")}`;
}

async function decode(token: string | undefined): Promise<Payload | null> {
  const [body, signature, extra] = token?.split(".") ?? [];
  if (!body || !signature || extra !== undefined) return null;
  const valid = await crypto.subtle
    .verify("HMAC", await hmacKey(), new Uint8Array(Buffer.from(signature, "base64url")), encoder.encode(body))
    .catch(() => false);
  if (!valid) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<Payload>;
    if (typeof payload.sub !== "string" || (payload.role !== "hall" && payload.role !== "admin")) return null;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return { sub: payload.sub, role: payload.role, exp: payload.exp };
  } catch {
    return null;
  }
}

export async function createSession(accountId: string, role: Role) {
  const store = await cookies();
  store.set(PLATFORM_COOKIE, await encode({ sub: accountId, role, exp: Date.now() + MAX_AGE * 1000 }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function deleteSession() {
  (await cookies()).delete(PLATFORM_COOKIE);
}

/** 쿠키의 서명 · 만료 확인 — 틀리면 null */
export async function readSession() {
  return decode((await cookies()).get(PLATFORM_COOKIE)?.value);
}
