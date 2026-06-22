"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navLinks, dropdownMenus } from "@/lib/content";
import { Monogram, Menu, Close, ArrowUpRight } from "@/components/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(onScroll); // initial read, deferred off the effect body
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 모든 페이지가 최상단에 어두운 배경 히어로를 두므로, 스크롤 전에는 글자를 밝게
  const lightHeader = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between px-6 sm:px-8">
        <Link
          href="/home"
          className="group flex items-center gap-3"
          aria-label={`${company.nameKo} 홈`}
        >
          <Monogram
            className={`h-8 w-8 transition-transform duration-500 group-hover:rotate-3 ${
              lightHeader ? "text-white" : "text-gold"
            }`}
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-serif text-base tracking-tight ${
                lightHeader ? "text-white" : "text-paper"
              }`}
            >
              {company.nameKo}
            </span>
            <span
              className={`font-display text-[0.68rem] tracking-[0.32em] ${
                lightHeader ? "text-white/55" : "text-faint"
              }`}
            >
              {company.nameEn}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            const linkClass = `link-underline text-sm tracking-tight transition-colors ${
              active
                ? lightHeader
                  ? "text-white"
                  : "text-gold"
                : lightHeader
                  ? "text-white/75 hover:text-white"
                  : "text-muted hover:text-paper"
            }`;

            const menu = dropdownMenus[link.href];
            if (menu) {
              return (
                <div key={link.href} className="group relative">
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                  {/* Hover dropdown — 아이콘 없이 1열 목록 */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-56 rounded-lg border border-line-strong bg-ink/95 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                      {menu.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className="block rounded-md px-4 py-2.5 text-sm text-paper transition-colors hover:bg-surface-2 hover:text-gold"
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
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-2 rounded-sm border px-5 py-2.5 text-sm tracking-tight transition-all duration-500 ${
              lightHeader
                ? "border-white/45 text-white hover:border-white hover:bg-white/10"
                : "border-line-strong text-paper hover:border-gold hover:text-gold"
            }`}
          >
            마케팅 문의
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center md:hidden ${
            lightHeader ? "text-white" : "text-paper"
          }`}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-y-auto border-t border-line bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => {
            const menu = dropdownMenus[link.href];
            return (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-4 font-serif text-lg text-paper"
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5 text-gold" />
                </Link>
                {menu ? (
                  <div className="flex flex-col border-b border-line py-2">
                    {menu.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="py-2.5 pl-1 text-sm text-muted"
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
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-500 hover:bg-gold-bright"
          >
            마케팅 문의하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
