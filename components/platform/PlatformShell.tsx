"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { logout } from "@/lib/platform/actions";

/* 웨딩홀 플랫폼 틀 — 왼쪽 메뉴(넓은 화면) · 위쪽 바와 가로 메뉴(좁은 화면).
   메뉴는 역할에 따라 레이아웃(app/(platform)/dashboard/layout.tsx)이 정해서 넘깁니다. */

export type ShellNavItem = { href: string; label: string };

export default function PlatformShell({
  name,
  roleLabel,
  nav,
  children,
}: {
  name: string;
  roleLabel: string;
  nav: ShellNavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="pf">
      <aside className="pf-side">
        <Link href="/" className="pf-brand" aria-label="하람마케팅 홈페이지로">
          <span className="pf-brand-name">하람마케팅</span>
          <span className="pf-brand-en">HARAM MARKETING</span>
        </Link>
        <div className="pf-who">
          <strong>{name}</strong>
          <span>{roleLabel}</span>
        </div>
        <nav className="pf-nav" aria-label="플랫폼 메뉴">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="pf-logout">
          <button type="submit">로그아웃</button>
        </form>
      </aside>
      <div className="pf-main">
        <p className="pf-sample" role="note">
          샘플 데이터로 채운 화면입니다. 실제 수치는 자료를 연결한 뒤에 나옵니다.
        </p>
        <main className="pf-page" id="pf-content">
          {children}
        </main>
      </div>
    </div>
  );
}
