"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ClientLockButton from "./LockButton";

/* 고객 전용 포털 틀 — 위쪽 바 하나: 하람마케팅(홈페이지로) · 위치 표시 · 견적서 보기 · 잠그기 · 전화 상담.
   서비스 사이 이동은 위치 표시의 '서비스 전체'와 각 서비스 페이지 아래 이전 · 다음으로 합니다.
   (서비스 이름은 공개 정보, 상세 문구 · 금액은 각 페이지가 서버에서 렌더) */

export type PortalGroup = {
  id: string;
  label: string;
  items: { id: string; no: string; title: string }[];
};

function Icon({ name }: { name: "phone" | "lock" }) {
  const paths: Record<typeof name, ReactNode> = {
    phone: <path d="M7.5 4h-2A1.5 1.5 0 0 0 4 5.6 14.4 14.4 0 0 0 18.4 20a1.5 1.5 0 0 0 1.6-1.5v-2l-3.6-1.6-1.8 1.8a10.6 10.6 0 0 1-5.3-5.3L11.1 9.6 9.5 6z" />,
    lock: (
      <>
        <rect x="5" y="10.5" width="14" height="9.5" />
        <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
      </>
    ),
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function PortalShell({
  groups,
  phone,
  quoteUrl,
  children,
}: {
  groups: PortalGroup[];
  phone: string;
  quoteUrl: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const currentGroup = groups.find((group) => group.items.some((item) => item.id === slug));
  const current = currentGroup?.items.find((item) => item.id === slug);
  const tel = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <div className="pt">
      <header className="pt-top">
        <Link href="/" className="pt-brand" aria-label="하람마케팅 홈페이지로">
          <span className="pt-brand-name">하람마케팅</span>
          <span className="pt-brand-en">HARAM MARKETING</span>
        </Link>
        <span className="pt-badge">고객 전용</span>
        <nav className="pt-crumbs" aria-label="현재 위치">
          {current && currentGroup ? (
            <>
              <Link href="/client" className="pt-crumb-group">
                서비스 전체
              </Link>
              <span aria-hidden="true" className="pt-crumb-group">
                /
              </span>
              <Link href={`/client#${currentGroup.id}`} className="pt-crumb-group">
                {currentGroup.label}
              </Link>
              <span aria-hidden="true" className="pt-crumb-group">
                /
              </span>
              <span aria-current="page">{current.title}</span>
            </>
          ) : (
            <span aria-current="page">서비스 전체</span>
          )}
        </nav>
        <div className="pt-top-actions">
          <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="pt-btn is-ghost pt-top-quote">
            견적서 보기
          </a>
          <ClientLockButton className="pt-btn is-ghost pt-top-lock" title="이 브라우저의 열람을 끝내고 다시 잠급니다">
            <Icon name="lock" />
            <span className="pt-top-label">잠그기</span>
          </ClientLockButton>
          <a href={tel} className="pt-btn is-solid" aria-label={`전화 상담 ${phone}`}>
            <Icon name="phone" />
            <span className="pt-top-label">전화 상담</span>
          </a>
        </div>
      </header>
      <main className="pt-content" id="pt-content">
        {children}
      </main>
    </div>
  );
}
