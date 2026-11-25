"use client";

import Form from "next/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { logout } from "@/lib/platform/actions";
import { IconChevron, IconClose, IconDoc, IconHome, IconLink, IconPhone, IconRank, IconSearch, IconVisit, Mark } from "./icons";

/* 웨딩홀 화면 틀 — 흰 바탕 플랫폼 (참고: wedipedia.co.kr)
   넓은 화면: 샘플 안내 띠 · 작은 링크 줄 · 로고 + 키워드 검색 + 계정 · 가운데 메뉴
   좁은 화면(767px 이하): 위 로고 · 검색 · 계정 + 아래 탭바. 하람 관리자 화면은 components/platform/PlatformShell.tsx 그대로.
   스타일: app/(platform)/hall.css */

export type HallSummary = {
  name: string;
  region: string;
  loginId: string;
  services: string[];
  /** '2026.6.1부터' · '2026.9.1 ~ 2027.8.31' */
  contract: string;
  manager: string;
};

type NavItem = { href: string; label: string; short: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

const NAV: NavItem[] = [
  { href: "/dashboard", label: "개요", short: "홈", icon: IconHome },
  { href: "/dashboard/keywords", label: "키워드 순위", short: "키워드", icon: IconRank },
  { href: "/dashboard/traffic", label: "방문 분석", short: "방문", icon: IconVisit },
  { href: "/dashboard/channels", label: "채널 관리", short: "채널", icon: IconLink },
  { href: "/dashboard/reports", label: "월간 리포트", short: "리포트", icon: IconDoc },
];

function SearchForm({ id, autoFocus = false }: { id: string; autoFocus?: boolean }) {
  return (
    <Form action="/dashboard/keywords" className="hp-search" role="search">
      <label htmlFor={id} className="sr-only">
        키워드 검색
      </label>
      <input id={id} name="q" type="search" placeholder="키워드를 검색해 보세요" autoComplete="off" autoFocus={autoFocus} />
      <button type="submit" aria-label="검색">
        <IconSearch />
      </button>
    </Form>
  );
}

export default function HallShell({
  hall,
  phone,
  footer,
  children,
}: {
  hall: HallSummary;
  phone: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  // 연 화면의 주소를 기억 — 다른 화면으로 옮기면 저절로 닫힘
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const [searchAt, setSearchAt] = useState<string | null>(null);
  const menuOpen = menuAt === pathname;
  const searchOpen = searchAt === pathname;
  const accountRef = useRef<HTMLDivElement>(null);
  const accountButton = useRef<HTMLButtonElement>(null);
  const tel = `tel:${phone.replace(/\D/g, "")}`;

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  // 계정 창: 바깥을 누르거나 Esc 로 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setMenuAt(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuAt(null);
      accountButton.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="hp hp-shell">
      <a href="#hp-main" className="hp-skip">
        본문으로 건너뛰기
      </a>
      <p className="hp-strip" role="note">
        <strong>샘플 화면</strong>샘플 데이터로 채운 화면입니다. 실제 수치는 자료를 연결한 뒤에 나옵니다.
      </p>
      <div className="hp-util">
        <div className="hp-wrap">
          <Link href="/" className="hp-util-item">
            하람마케팅 홈페이지
          </Link>
          <a href={tel} className="hp-util-item">
            전화 상담 {phone}
          </a>
          <form action={logout} className="hp-util-item">
            <button type="submit">로그아웃</button>
          </form>
        </div>
      </div>

      <header className="hp-header">
        <div className="hp-wrap hp-header-row">
          <Link href="/dashboard" className="hp-logo" aria-label="하람마케팅 웨딩홀 플랫폼 첫 화면">
            <Mark className="hp-mark" />
            <span className="hp-logo-name">하람마케팅</span>
            <span className="hp-logo-tag">웨딩홀 플랫폼</span>
          </Link>
          <div className="hp-header-search">
            <SearchForm id="hp-q" />
          </div>
          <div className="hp-header-end">
            <button
              type="button"
              className="hp-icon-btn hp-only-narrow"
              aria-label={searchOpen ? "키워드 검색 닫기" : "키워드 검색 열기"}
              aria-expanded={searchOpen}
              aria-controls="hp-msearch"
              onClick={() => setSearchAt(searchOpen ? null : pathname)}
            >
              {searchOpen ? <IconClose /> : <IconSearch />}
            </button>
            <div className="hp-account" ref={accountRef}>
              <button
                ref={accountButton}
                type="button"
                className="hp-account-btn"
                aria-expanded={menuOpen}
                aria-controls="hp-account-menu"
                onClick={() => setMenuAt(menuOpen ? null : pathname)}
              >
                <span className="hp-avatar" aria-hidden="true">
                  {hall.name.slice(0, 1)}
                </span>
                <span className="hp-account-name">{hall.name}</span>
                <span className="sr-only">계정 정보</span>
                <IconChevron className="hp-caret" />
              </button>
              {menuOpen ? (
                <div id="hp-account-menu" className="hp-account-menu" role="region" aria-label="계정 정보">
                  <div className="hp-account-head">
                    <span className="hp-avatar is-lg" aria-hidden="true">
                      {hall.name.slice(0, 1)}
                    </span>
                    <div>
                      <strong>{hall.name}</strong>
                      <span>
                        {hall.region ? `${hall.region} · ` : ""}웨딩홀 계정{hall.loginId ? ` ${hall.loginId}` : ""}
                      </span>
                    </div>
                  </div>
                  <dl className="hp-account-facts">
                    {hall.services.length ? (
                      <div>
                        <dt>계약 서비스</dt>
                        <dd>
                          <ul className="hp-account-services">
                            {hall.services.map((service) => (
                              <li key={service}>{service}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    ) : null}
                    {hall.contract ? (
                      <div>
                        <dt>계약 기간</dt>
                        <dd>{hall.contract}</dd>
                      </div>
                    ) : null}
                    {hall.manager ? (
                      <div>
                        <dt>담당</dt>
                        <dd>{hall.manager}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <div className="hp-account-actions">
                    <a href={tel} className="hp-btn is-line is-block">
                      <IconPhone />
                      담당자에게 전화하기
                    </a>
                    <form action={logout}>
                      <button type="submit" className="hp-btn is-dark is-block">
                        로그아웃
                      </button>
                    </form>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {searchOpen ? (
          <div id="hp-msearch" className="hp-msearch">
            <SearchForm id="hp-mq" autoFocus />
          </div>
        ) : null}
        <nav className="hp-nav" aria-label="플랫폼 메뉴">
          <ul className="hp-wrap">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} data-label={item.label} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="hp-main" className="hp-main">
        <div className="hp-wrap">{children}</div>
      </main>

      {footer}

      <nav className="hp-tabbar" aria-label="플랫폼 메뉴">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              <Icon />
              <span>{item.short}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
