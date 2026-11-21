import { NextResponse, type NextRequest } from "next/server";
import { hasClientAccess } from "@/lib/client-access";

/* 고객 전용 페이지(/client 이하)는 비밀번호를 확인한 브라우저만 열람.
   권한이 없으면 주소는 그대로 두고 잠금 화면(/locked)을 보여 줍니다(rewrite — 외부로 넘기지 않음).
   내용이 CDN · 브라우저 캐시에 남지 않도록 항상 no-store. 페이지에서도 한 번 더 확인합니다. */
export async function proxy(request: NextRequest) {
  const response = (await hasClientAccess(request.cookies))
    ? NextResponse.next()
    : NextResponse.rewrite(new URL("/locked", request.url));
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export const config = {
  matcher: ["/client", "/client/:path*"],
};
