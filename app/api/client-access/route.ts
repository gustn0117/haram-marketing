import { NextResponse } from "next/server";
import { CLIENT_COOKIE, CLIENT_HINT_COOKIE, CLIENT_MAX_AGE } from "@/lib/client-access-shared";
import { CLIENT_PASSWORD, clientToken } from "@/lib/client-access";

export const dynamic = "force-dynamic";

const cookieOptions = {
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: CLIENT_MAX_AGE,
};
const noStore = { "Cache-Control": "no-store" };

/** 비밀번호 확인 — 맞으면 고객 전용 페이지 열람 쿠키 발급 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (String(body?.password ?? "").trim() !== CLIENT_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401, headers: noStore });
  }
  const response = NextResponse.json({ ok: true }, { headers: noStore });
  response.cookies.set(CLIENT_COOKIE, await clientToken(), { ...cookieOptions, httpOnly: true });
  response.cookies.set(CLIENT_HINT_COOKIE, "1", { ...cookieOptions, httpOnly: false });
  return response;
}

/** 잠그기 — 열람 쿠키 삭제 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true }, { headers: noStore });
  response.cookies.set(CLIENT_COOKIE, "", { ...cookieOptions, httpOnly: true, maxAge: 0 });
  response.cookies.set(CLIENT_HINT_COOKIE, "", { ...cookieOptions, httpOnly: false, maxAge: 0 });
  return response;
}
