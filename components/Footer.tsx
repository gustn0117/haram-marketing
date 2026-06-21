import Link from "next/link";
import { company, navLinks, services } from "@/lib/content";
import { Monogram, Phone, MapPin, ArrowUpRight } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative z-2 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-line py-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-lg">Let&apos;s fill your wedding hall</span>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl text-balance">
              우리 예식장 마케팅, <span className="gold-text">하람마케팅</span>과
              <br className="hidden sm:block" /> 함께 시작해보세요.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-sm bg-gold px-7 py-4 text-sm font-medium text-white transition-colors duration-500 hover:bg-gold-deep"
          >
            무료 진단 신청하기
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Monogram className="h-8 w-8 text-gold" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-base">{company.nameKo}</span>
                <span className="font-display text-[0.68rem] tracking-[0.32em] text-faint">
                  {company.nameEn}
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {company.intro}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label">Menu</span>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label">Services</span>
            <ul className="flex flex-col gap-3 text-sm text-muted">
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
            <ul className="flex flex-col gap-3.5 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-paper">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-line py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {company.nameKo} · 대표 {company.ceo}. All rights reserved.
          </p>
          <p className="font-display tracking-[0.2em]">
            {company.taglineEn.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
