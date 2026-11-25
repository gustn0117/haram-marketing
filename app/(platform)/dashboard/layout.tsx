import type { ReactNode } from "react";
import HallFooter from "@/components/hall/HallFooter";
import HallShell, { type HallSummary } from "@/components/hall/HallShell";
import PlatformShell, { type ShellNavItem } from "@/components/platform/PlatformShell";
import { company } from "@/lib/content";
import { requireViewer } from "@/lib/platform/dal";
import { getHall } from "@/lib/platform/data";
import { dateLabel } from "@/lib/platform/format";

/* 플랫폼 화면 틀 — 웨딩홀 계정은 흰 바탕 플랫폼 틀(HallShell), 하람 계정은 어두운 관리 틀(PlatformShell).
   레이아웃은 화면을 옮길 때 다시 그려지지 않으므로 권한 확인은 각 페이지에서도 합니다. */

const ADMIN_NAV: ShellNavItem[] = [{ href: "/dashboard/halls", label: "웨딩홀 계정" }];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const viewer = await requireViewer();
  if (viewer.role === "admin") {
    return (
      <PlatformShell name={viewer.name} roleLabel="하람 관리자" nav={ADMIN_NAV}>
        {children}
      </PlatformShell>
    );
  }

  const hall = viewer.hallId ? await getHall(viewer.hallId) : null;
  const summary: HallSummary = hall
    ? {
        name: hall.name,
        region: hall.region,
        loginId: hall.loginId,
        services: hall.services,
        contract: hall.contractEnd
          ? `${dateLabel(hall.contractStart)} ~ ${dateLabel(hall.contractEnd)}`
          : `${dateLabel(hall.contractStart)}부터`,
        manager: hall.manager,
      }
    : { name: viewer.name, region: "", loginId: "", services: [], contract: "", manager: "" };

  return (
    <HallShell hall={summary} phone={company.phone} footer={<HallFooter signedIn />}>
      {children}
    </HallShell>
  );
}
