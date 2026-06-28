import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow"
      ? "max-w-[760px]"
      : size === "wide"
        ? "max-w-[1320px]"
        : "max-w-[1200px]";
  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 label">
      <span className="inline-block h-px w-9 bg-linear-to-r from-gold to-transparent" />
      {children}
    </span>
  );
}

export function CTAButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const base =
    "group inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-medium tracking-tight transition-all duration-500";
  const styles =
    variant === "solid"
      ? "bg-gold text-ink hover:bg-gold-bright"
      : "border border-line-strong text-paper hover:border-gold hover:text-gold";
  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}

// 인라인 '더보기' 텍스트 링크 — 골드 밑줄 + 화살표 시그니처 통일
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="link-underline group inline-flex items-center gap-2 text-sm text-gold"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-serif text-[1.7rem] leading-[1.28] tracking-[-0.02em] sm:text-3xl md:text-[2.3rem] md:leading-[1.16] text-balance">
        {title}
      </h2>
    </div>
  );
}

// 페이지 하단 마무리 CTA — 중앙 정렬 미니멀 (갤러리 톤)
export function CTASection({
  eyebrow = "Start with diagnosis",
  title,
  description,
  href = "/contact",
  label = "무료 진단 신청",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  href?: string;
  label?: string;
  image?: string;
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <Reveal>
        <Container size="narrow" className="text-center">
          <span className="hair-line mx-auto mb-12 block w-14" aria-hidden />
          <span className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            {eyebrow}
          </span>
          <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(2rem,4.8vw,3.5rem)] font-light leading-[1.16] tracking-[-0.03em] text-paper">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-7 max-w-xl text-[0.95rem] font-light leading-[1.85] tracking-[-0.01em] text-muted">
              {description}
            </p>
          ) : null}
          <Link
            href={href}
            className="link-underline group mt-12 inline-flex items-center gap-2 text-sm tracking-[0.18em] text-gold"
          >
            {label}
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Container>
      </Reveal>
    </section>
  );
}
