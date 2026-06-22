import Link from "next/link";
import { company, navLinks, services, regions } from "@/lib/content";
import { Monogram } from "@/components/icons";
import { Container } from "@/components/ui";

// 판권면(colophon) — 도록의 마지막 면
export function Footer() {
  return (
    <footer className="relative z-2 border-t border-line-strong bg-ink">
      <Container size="wide" className="py-16 md:py-20">
        {/* 워드마크 + 태그라인 */}
        <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <Link href="/home" className="flex items-center gap-3">
            <Monogram className="h-9 w-9 text-gold" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg">{company.nameKo}</span>
              <span className="font-display text-[0.62rem] tracking-[0.4em] text-faint">
                {company.nameEn}
              </span>
            </span>
          </Link>
          <p className="max-w-sm font-serif text-xl leading-snug text-paper/80">
            {company.tagline}
          </p>
        </div>

        {/* 인덱스 그리드 */}
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            <span className="label">Index</span>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline inline-flex items-center gap-2.5 hover:text-paper"
                  >
                    <span className="folio text-[0.7rem] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label">Services</span>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="link-underline hover:text-paper"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label">Contact</span>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href={`tel:${company.phone.replace(/-/g, "")}`}
                  className="text-base text-paper hover:text-gold"
                >
                  {company.phone}
                </a>
              </li>
              <li>{company.address}</li>
              <li>{company.hours}</li>
            </ul>
            <p className="mt-2 text-xs leading-relaxed text-faint">
              진행 지역 — {regions.join(" · ")}
            </p>
          </div>
        </div>

        {/* 판권 바 */}
        <div className="flex flex-col gap-2 border-t border-line pt-8 text-[0.68rem] uppercase tracking-[0.18em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 {company.nameKo} · CEO {company.ceo} · All rights reserved.
          </span>
          <span className="folio tracking-[0.2em]">
            {company.taglineEn.toUpperCase()}
          </span>
        </div>
      </Container>
    </footer>
  );
}
