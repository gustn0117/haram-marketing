import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./client.css";
import { company, serviceGroups, services } from "@/lib/content";
import { QUOTE_URL } from "@/lib/client-details";
import PortalShell, { type PortalGroup } from "@/components/client/PortalShell";

/* 고객 전용 포털 — 견적서를 받은 분께만 공개하는 서비스 상세 (proxy.ts 가 /client 이하를 비밀번호로 잠금).
   마케팅 사이트의 머리말 · 꼬리말 대신 포털 틀(위쪽 바 하나)을 씁니다.
   권한 확인은 레이아웃이 아니라 proxy 와 각 페이지에서 합니다. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const groups: PortalGroup[] = serviceGroups.map((group) => ({
    id: group.id,
    label: group.label,
    items: services
      .filter((service) => service.group === group.id)
      .map((service) => ({ id: service.id, no: service.no, title: service.title })),
  }));

  return (
    <PortalShell groups={groups} phone={company.phone} quoteUrl={QUOTE_URL}>
      {children}
    </PortalShell>
  );
}
