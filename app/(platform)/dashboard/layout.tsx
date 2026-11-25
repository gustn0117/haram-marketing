import type { ReactNode } from "react";
import PlatformShell, { type ShellNavItem } from "@/components/platform/PlatformShell";
import { requireViewer } from "@/lib/platform/dal";

/* 플랫폼 화면 틀 — 웨딩홀 계정은 자기 웨딩홀 메뉴, 하람 계정은 웨딩홀 계정 관리 메뉴.
   레이아웃은 화면을 옮길 때 다시 그려지지 않으므로 권한 확인은 각 페이지에서도 합니다. */

const HALL_NAV: ShellNavItem[] = [
  { href: "/dashboard", label: "개요" },
  { href: "/dashboard/keywords", label: "키워드 순위" },
  { href: "/dashboard/traffic", label: "방문 분석" },
  { href: "/dashboard/channels", label: "채널 관리" },
  { href: "/dashboard/reports", label: "월간 리포트" },
];

const ADMIN_NAV: ShellNavItem[] = [{ href: "/dashboard/halls", label: "웨딩홀 계정" }];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const viewer = await requireViewer();
  const admin = viewer.role === "admin";
  return (
    <PlatformShell name={viewer.name} roleLabel={admin ? "하람 관리자" : "웨딩홀 계정"} nav={admin ? ADMIN_NAV : HALL_NAV}>
      {children}
    </PlatformShell>
  );
}
