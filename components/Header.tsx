"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navLinks, dropdownMenus } from "@/lib/content";
import { Monogram, Menu, Close, ArrowUpRight } from "@/components/icons";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* 데스크톱(lg+) 좌측 80px 고정 책등 레일 — 상단 가로바 대체 */
export function SpineRail() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-20 flex-col items-center justify-between border-r border-line bg-ink py-7 lg:flex">
      <div className="flex flex-col items-center gap-8">
        <Link href="/home" aria-label={`${company.nameKo} 홈`}>
          <Monogram className="h-8 w-8 text-gold transition-transform duration-500 hover:rotate-3" />
        </Link>
        <span className="rail-label" aria-hidden>
          HARAM · MARKETING
        </span>
      </div>

      <nav className="flex flex-col items-center gap-7">
        {navLinks.map((l, i) => {
          const active = isActive(pathname, l.href);
          const menu = dropdownMenus[l.href];
          return (
            <div key={l.href} className="group relative flex items-center">
              <Link
                href={l.href}
                aria-label={l.label}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span className="rail-dot" data-active={active} />
              </Link>
              {/* 호버 플라이아웃 — 라벨 + (있으면) 세로 서브인덱스 */}
              <div className="pointer-events-none absolute left-full top-1/2 z-50 -translate-y-1/2 pl-3 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="min-w-48 rounded-lg border border-line-strong bg-ink/95 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                  <Link
                    href={l.href}
                    className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-paper transition-colors hover:text-gold"
                  >
                    <span className="folio text-[0.7rem] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </Link>
                  {menu
                    ? menu.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className="block rounded-md px-3 py-1.5 pl-8 text-xs text-muted transition-colors hover:text-gold"
                        >
                          {it.label}
                        </Link>
                      ))
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <Link
        href="/contact"
        aria-label="문의"
        className="folio text-center text-[0.6rem] leading-tight text-faint transition-colors hover:text-gold"
      >
        N°
        <br />
        {String(navLinks.length).padStart(2, "0")}
      </Link>
    </aside>
  );
}

/* 모바일(md 이하) — 상단 56px 미니바 + 풀스크린 인덱스 드로어 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-ink/85 px-5 backdrop-blur-xl">
        <Link href="/home" className="flex items-center gap-2.5">
          <Monogram className="h-7 w-7 text-gold" />
          <span className="font-serif text-sm tracking-tight">
            {company.nameKo}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-paper"
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex min-h-full flex-col gap-1 px-6 pb-12 pt-20">
          {navLinks.map((l, i) => {
            const menu = dropdownMenus[l.href];
            return (
              <div key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 py-5"
                >
                  <span className="folio text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif-display text-3xl">{l.label}</span>
                </Link>
                {menu ? (
                  <div className="flex flex-col gap-1 pb-4 pl-9">
                    {menu.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="py-1.5 text-sm text-muted"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-medium text-ink"
          >
            무료 마케팅 진단
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
