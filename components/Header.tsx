"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, navLinks, dropdownMenus } from "@/lib/content";
import { Menu, Close } from "@/components/icons";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* 데스크톱(lg+) 상단 미니멀 바 */
export function SpineRail() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden h-20 border-b border-line bg-ink/85 backdrop-blur-xl lg:block">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8">
        <Link
          href="/home"
          className="flex items-center gap-3.5"
          aria-label={`${company.nameKo} 홈`}
        >
          <span className="text-base font-light tracking-tight text-paper">
            {company.nameKo}
          </span>
          <span className="h-3.5 w-px bg-gold/40" aria-hidden />
          <span className="text-[0.62rem] uppercase tracking-[0.38em] text-gold/80">
            {company.nameEn}
          </span>
        </Link>

        <nav className="flex items-center gap-9">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            const menu = dropdownMenus[l.href];
            const cls = `link-underline text-sm transition-colors ${
              active ? "text-gold" : "text-muted hover:text-paper"
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
                    <div className="w-56 border border-line bg-ink/96 p-2 backdrop-blur-xl">
                      {menu.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className="block px-4 py-2.5 text-sm text-muted transition-colors hover:text-gold"
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
            className="link-underline text-sm text-gold"
          >
            무료 진단
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* 모바일(md 이하) — 상단 미니바 + 풀스크린 드로어 */
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
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-ink/85 px-5 backdrop-blur-xl">
        <Link href="/home" className="flex flex-col leading-none">
          <span className="text-sm font-light tracking-tight text-paper">
            {company.nameKo}
          </span>
          <span className="mt-1 text-[0.5rem] uppercase tracking-[0.3em] text-gold/75">
            {company.nameEn}
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
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            const menu = dropdownMenus[l.href];
            return (
              <div key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="block py-5 text-3xl font-light tracking-tight text-paper"
                >
                  {l.label}
                </Link>
                {menu ? (
                  <div className="flex flex-col gap-1 pb-4">
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
            className="link-underline mt-10 inline-block text-base text-gold"
          >
            무료 진단 신청 →
          </Link>
        </nav>
      </div>
    </div>
  );
}
