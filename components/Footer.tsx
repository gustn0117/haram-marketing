import Link from "next/link";
import { company, navLinks } from "@/lib/content";
import { Container } from "@/components/ui";

// 푸터 — 중앙 정렬 미니멀 (갤러리 톤)
export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-20 md:py-28">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <Link href="/home" className="flex flex-col items-center gap-2">
          <span className="text-lg font-light tracking-tight text-paper">
            {company.nameKo}
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.36em] text-gold/80">
            {company.nameEn}
          </span>
        </Link>
        <p className="mt-2 text-[0.66rem] uppercase tracking-[0.28em] text-faint">
          Wedding Hall Marketing
        </p>
        <p className="mt-6 max-w-md text-sm font-light leading-[1.9] text-muted">
          {company.tagline}
        </p>

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline text-sm text-muted hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${company.phone.replace(/-/g, "")}`}
          className="mt-10 inline-block text-base font-light text-paper hover:text-gold"
        >
          {company.phone}
        </a>

        <span className="hair-line mx-auto mt-10 block w-16" aria-hidden />
        <p className="mt-8 text-[0.66rem] uppercase tracking-[0.24em] text-faint">
          © 2026 {company.nameKo} · CEO {company.ceo}
        </p>
      </Container>
    </footer>
  );
}
