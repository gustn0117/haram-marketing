import Link from "next/link";
import { company, navLinks } from "@/lib/content";
import { Container } from "@/components/ui";

// 푸터 — 코퍼레이트: 브랜드 + 사이트맵/연락처 컬럼 + 하단 바
export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 md:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* 브랜드 */}
          <div className="max-w-sm">
            <Link href="/home" className="flex items-baseline gap-3">
              <span className="text-lg font-light tracking-tight text-paper">
                {company.nameKo}
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-gold/80">
                {company.nameEn}
              </span>
            </Link>
            <p className="mt-5 text-[0.95rem] font-light leading-[1.7] text-muted">
              {company.tagline}
            </p>
            <p className="mt-3 text-[0.8rem] uppercase tracking-[0.22em] text-faint">
              Wedding Hall Marketing
            </p>
          </div>

          {/* 사이트맵 + 연락처 */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-faint">
                Sitemap
              </p>
              <nav className="mt-5 flex flex-col gap-3">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-faint">
                Contact
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href={`tel:${company.phone.replace(/-/g, "")}`}
                  className="text-paper transition-colors hover:text-gold"
                >
                  {company.phone}
                </a>
                <span className="text-muted">{company.address}</span>
                <span className="text-muted">{company.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-faint">
            © 2026 {company.nameKo} · CEO {company.ceo}
          </p>
          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-faint">
            {company.nameEn}
          </p>
        </div>
      </Container>
    </footer>
  );
}
