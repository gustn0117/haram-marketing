"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import ClientLockButton from "./LockButton";

/* 고객 전용 포털 틀 — 왼쪽 서비스 메뉴 · 위쪽 위치 표시와 바로가기.
   모바일에서는 왼쪽 메뉴가 서랍처럼 열립니다. (메뉴의 서비스 이름은 공개 정보, 상세 문구는 각 페이지가 서버에서 렌더) */

export type PortalGroup = {
  id: string;
  label: string;
  basis: string;
  items: { id: string; no: string; title: string }[];
};

function Icon({ name }: { name: "grid" | "out" | "home" | "menu" | "close" | "phone" }) {
  const paths: Record<typeof name, ReactNode> = {
    grid: (
      <>
        <rect x="4" y="4" width="6.5" height="6.5" />
        <rect x="13.5" y="4" width="6.5" height="6.5" />
        <rect x="4" y="13.5" width="6.5" height="6.5" />
        <rect x="13.5" y="13.5" width="6.5" height="6.5" />
      </>
    ),
    out: <path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" />,
    home: <path d="M4 11.5 12 5l8 6.5M6.5 10v9h11v-9" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    phone: <path d="M7.5 4h-2A1.5 1.5 0 0 0 4 5.6 14.4 14.4 0 0 0 18.4 20a1.5 1.5 0 0 0 1.6-1.5v-2l-3.6-1.6-1.8 1.8a10.6 10.6 0 0 1-5.3-5.3L11.1 9.6 9.5 6z" />,
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
  const [open, setOpen] = useState(false);
  const slug = pathname.split("/")[2];
  const currentGroup = groups.find((group) => group.items.some((item) => item.id === slug));
  const current = currentGroup?.items.find((item) => item.id === slug);
  const tel = `tel:${phone.replace(/\D/g, "")}`;
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className={`pt${open ? " is-nav-open" : ""}`}>
      <aside className="pt-side" id="pt-side" aria-label="고객 전용 메뉴">
        <div className="pt-brand">
          <Link href="/client" onClick={close} className="pt-brand-link">
            <span className="pt-brand-name">하람마케팅</span>
            <span className="pt-brand-en">HARAM MARKETING</span>
          </Link>
          <span className="pt-badge">고객 전용</span>
        </div>

        <nav className="pt-nav" aria-label="서비스">
          <Link
            href="/client"
            onClick={close}
            className={`pt-nav-link is-top${pathname === "/client" ? " is-active" : ""}`}
            aria-current={pathname === "/client" ? "page" : undefined}
          >
            <Icon name="grid" />
            서비스 전체
          </Link>
          {groups.map((group) => (
            <div key={group.id} className="pt-nav-group">
              <p className="pt-nav-label">
                <span>{group.label}</span>
                <span>{group.items.length}</span>
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/client/${item.id}`}
                  onClick={close}
                  className={`pt-nav-link${slug === item.id ? " is-active" : ""}`}
                  aria-current={slug === item.id ? "page" : undefined}
                >
                  <span className="pt-nav-no">{item.no}</span>
                  <span className="pt-nav-title">{item.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="pt-side-foot">
          <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="pt-side-link">
            <Icon name="out" />
            견적서 보기
          </a>
          <Link href="/" className="pt-side-link">
            <Icon name="home" />
            홈페이지로
          </Link>
          <div className="pt-access">
            <p>
              <strong>열람 중</strong>
              이 브라우저에서 30일 동안 유지됩니다. 다 보신 뒤에는 잠가 주세요.
            </p>
            <ClientLockButton />
          </div>
        </div>
      </aside>

      <div className="pt-scrim" onClick={close} aria-hidden="true" />

      <div className="pt-main">
        <header className="pt-top">
          <button
            type="button"
            className="pt-menu"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="pt-side"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
          <nav className="pt-crumbs" aria-label="현재 위치">
            <Link href="/client">고객 전용</Link>
            <span aria-hidden="true">/</span>
            {current && currentGroup ? (
              <>
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
            <a href={tel} className="pt-btn is-solid" aria-label={`전화 상담 ${phone}`}>
              <Icon name="phone" />
              <span className="pt-top-call">전화 상담</span>
            </a>
          </div>
        </header>
        <main className="pt-content" id="pt-content">
          {children}
        </main>
      </div>
    </div>
  );
}
