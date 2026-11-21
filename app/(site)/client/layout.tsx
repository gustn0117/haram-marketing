import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./client.css";
import { QUOTE_URL } from "@/lib/client-details";
import ClientLockButton from "@/components/client/LockButton";

/* 고객 전용 — 견적서를 받은 분께만 공개하는 서비스 상세 (proxy.ts 가 /client 이하를 비밀번호로 잠금).
   권한 확인은 레이아웃이 아니라 proxy 와 각 페이지에서 합니다. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cl">
      <div className="cl-bar">
        <div className="cl-wrap cl-bar-inner">
          <p className="cl-bar-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="5" y="10.5" width="14" height="10" />
              <path d="M8.5 10.5V7.2a3.5 3.5 0 0 1 6.6-1.6" />
            </svg>
            고객 전용 페이지 — 견적서를 받은 분께만 공개됩니다.
          </p>
          <div className="cl-bar-actions">
            <Link href="/client">서비스 전체</Link>
            <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer">
              견적서 보기
            </a>
            <ClientLockButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
