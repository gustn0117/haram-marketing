"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, navLinks, dropdownMenus } from "@/lib/content";
import { Monogram, Menu, Close, ArrowUpRight } from "@/components/icons";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* 데스크톱(lg+) 상단 고정 내비게이션 바 (높이 5rem) */
export function SpineRail() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden h-20 border-b border-gold/14 bg-ink/78 backdrop-blur-xl lg:block">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8">
        <Link
          href="/home"
          className="flex items-center gap-3"
          aria-label={`${company.nameKo} 홈`}
        >
          <Monogram className="h-9 w-9 text-gold transition-transform duration-500 hover:rotate-3" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg">
              {company.nameKo}
            </span>
            <span className="mt-1 font-display text-[0.6rem] tracking-[0.34em] text-gold/62">
              PRIVATE VENUE GROWTH
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-9">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            const menu = dropdownMenus[l.href];
            const cls = `link-underline text-sm transition-colors ${
              active ? "text-gold" : "text-paper/66 hover:text-paper"
            }`;
            if (menu) {
              return (
                <div key={l.href} className="group relative">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cls}
                  >
                    {l.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-60 border border-gold/18 bg-ink/96 p-2 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.78)] backdrop-blur-xl">
                      {menu.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className="block px-4 py-2.5 text-sm text-paper/72 transition-colors hover:bg-paper/5 hover:text-gold"
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cls}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-[4px] border border-gold/58 px-5 py-2.5 text-sm font-medium text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
          >
            프리미엄 진단
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* 모바일(md 이하) — 상단 56px 미니바 + 풀스크린 인덱스 드로어 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gold/14 bg-ink/88 px-5 backdrop-blur-xl">
        <Link href="/home" className="flex items-center gap-2.5">
          <Monogram className="h-7 w-7 text-gold" />
          <span className="font-serif text-sm">
            {company.nameKo}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center text-paper"
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex min-h-full flex-col gap-1 px-6 pb-12 pt-20">
          {navLinks.map((l, i) => {
            const active = isActive(pathname, l.href);
            const menu = dropdownMenus[l.href];
            return (
              <div key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
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
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[4px] bg-gold px-6 py-4 text-sm font-medium text-ink"
          >
            프리미엄 진단
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
