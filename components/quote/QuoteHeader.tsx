"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ClientGate } from "@/components/client/ClientGate";

/* 견적서 머리말 (/quote · /quote/[서비스]) — 사이트 머리말(components/Header.tsx)과 같은 모양.
   넓은 화면: 높이 80 · 짙은 차콜 반투명 + 블러 · 하람마케팅 | HARAM MARKETING · 회색 메뉴(밑줄) · 고객 전용(자물쇠) · 테두리 버튼.
   좁은 화면(1023px 이하): 높이 56 · 두 줄 로고 · 자물쇠 아이콘 · 메뉴 버튼 → 화면 전체 메뉴(흰 바탕).
   메뉴는 견적서 목차입니다 — 묶음(마케팅 대행 · 제작 · 개발)에 마우스를 올리면 서비스 목록(흰 바탕)이 펼쳐지고,
   서비스를 누르면 그 서비스의 안내 페이지(/quote/[서비스])로 갑니다. */

export type NavGroup = { id: string; label: string; items: { id: string; no: string; label: string; theme: string }[] };
export type NavLink = { href: string; label: string };

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
    </svg>
  );
}

export default function QuoteHeader({
  groups,
  links,
  current,
  pdfUrl,
  pdfFilename,
}: {
  groups: NavGroup[];
  links: NavLink[];
  /** 지금 보고 있는 서비스 — 그 서비스가 속한 묶음 메뉴를 밝게 표시 */
  current?: string;
  pdfUrl: string;
  pdfFilename: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeGroup = groups.find((group) => group.items.some((item) => item.id === current))?.id;

  // 화면 전체 메뉴 — 열려 있는 동안 뒤 화면 스크롤을 막고, Esc 로 닫음
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="wq-header">
        <div className="wq-header-inner">
          <Link href="/" className="wq-logo" aria-label="하람마케팅 홈">
            <span className="wq-logo-ko">하람마케팅</span>
            <span className="wq-logo-bar" aria-hidden="true" />
            <span className="wq-logo-en">HARAM MARKETING</span>
          </Link>

          <nav className="wq-nav" aria-label="견적서 메뉴">
            {groups.map((group) => (
              <div key={group.id} className="wq-nav-item">
                <Link
                  href="/quote#services"
                  className={`wq-nav-link${activeGroup === group.id ? " is-active" : ""}`}
                  aria-current={activeGroup === group.id ? "true" : undefined}
                >
                  {group.label}
                </Link>
                <div className="wq-nav-menu">
                  <div>
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/quote/${item.id}`}
                        data-theme={item.theme}
                        aria-current={item.id === current ? "page" : undefined}
                      >
                        <i aria-hidden="true" />
                        <small>{item.no}</small>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="wq-nav-link">
                {link.label}
              </Link>
            ))}
            <ClientGate />
            <a className="wq-nav-cta" href={pdfUrl} download={pdfFilename}>
              PDF 받기
            </a>
          </nav>

          <div className="wq-mactions">
            <ClientGate variant="icon" />
            <button
              type="button"
              className="wq-icon-btn"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              aria-controls="wq-drawer"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="wq-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="견적서 메뉴"
        className={`wq-drawer${open ? " is-open" : ""}`}
      >
        <nav>
          {groups.map((group) => (
            <div key={group.id} className="wq-drawer-group">
              <Link href="/quote#services" onClick={close} className="wq-drawer-link">
                {group.label}
              </Link>
              <div className="wq-drawer-sub">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/quote/${item.id}`}
                    onClick={close}
                    data-theme={item.theme}
                    aria-current={item.id === current ? "page" : undefined}
                  >
                    <i aria-hidden="true" />
                    {item.no} {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {links.map((link) => (
            <div key={link.href} className="wq-drawer-group">
              <Link href={link.href} onClick={close} className="wq-drawer-link">
                {link.label}
              </Link>
            </div>
          ))}
          <a className="wq-drawer-cta" href={pdfUrl} download={pdfFilename} onClick={close}>
            PDF 받기
          </a>
        </nav>
      </div>
    </>
  );
}
