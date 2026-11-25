import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./platform.css";
import "./hall.css";

/* 웨딩홀 플랫폼 — 로그인(/login)과 웨딩홀 · 하람 화면(/dashboard 이하). 검색 노출 막음.
   사이트 머리말 · 꼬리말 대신 플랫폼 틀을 씁니다: 로그인 · 웨딩홀 화면은 흰 바탕(components/hall, hall.css),
   하람 관리자 화면은 어두운 관리 틀(components/platform/PlatformShell.tsx, platform.css).
   잠금: proxy.ts 가 로그인 쿠키 없는 /dashboard 요청을 /login 으로, 각 페이지가 lib/platform/dal.ts 로 다시 확인. */
export const metadata: Metadata = {
  title: { default: "웨딩홀 플랫폼", template: "%s | 하람마케팅 웨딩홀 플랫폼" },
  robots: { index: false, follow: false },
};

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
