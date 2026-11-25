import { NextResponse, type NextRequest } from "next/server";
import { hasClientAccess } from "@/lib/client-access";
import { PLATFORM_COOKIE } from "@/lib/platform/shared";

/* 고객 전용 — 견적서(/quote 이하) · 서비스 상세(/client 이하) · 견적서 PDF(/documents 이하)는 비밀번호를 확인한 브라우저만 열람.
   권한이 없으면 주소는 그대로 두고 잠금 화면(/locked)을 보여 줍니다(rewrite — 외부로 넘기지 않음).
   웨딩홀 플랫폼(/dashboard 이하)은 로그인 쿠키가 없으면 /login 으로 보냅니다(돌아올 주소는 next).
   쿠키가 진짜인지 · 누구인지는 각 화면이 서버에서 다시 확인합니다(lib/platform/dal.ts).
   내용이 CDN · 브라우저 캐시에 남지 않도록 항상 no-store. 페이지에서도 한 번 더 확인합니다. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response: NextResponse;

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (request.cookies.has(PLATFORM_COOKIE)) {
      response = NextResponse.next();
    } else {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname);
      response = NextResponse.redirect(login);
    }
  } else {
    response = (await hasClientAccess(request.cookies))
      ? NextResponse.next()
      : NextResponse.rewrite(new URL("/locked", request.url));
  }

  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export const config = {
  matcher: [
    "/quote",
    "/quote/:path*",
    "/client",
    "/client/:path*",
    "/documents/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
