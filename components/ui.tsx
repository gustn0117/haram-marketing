import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { offeringImages } from "@/lib/content";
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
    "group inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-medium tracking-tight transition-all duration-500";
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

// 페이지 하단 마무리 CTA — 새 홈과 동일한 풀블리드 프리미엄 CTA
export function CTASection({
  eyebrow = "Start with diagnosis",
  title,
  description,
  href = "/contact",
  label = "무료 마케팅 진단 신청",
  image,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  href?: string;
  label?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={image ?? offeringImages.brand}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="premium-cta-shade absolute inset-0" aria-hidden />
      <Container
        size="wide"
        className="relative z-2 flex min-h-[480px] items-center py-20 md:py-28"
      >
        <div className="max-w-3xl">
          <span className="label text-gold">{eyebrow}</span>
          <h2 className="mt-5 font-serif-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-none text-paper">
            {title}
          </h2>
          {description ? (
            <p className="mt-7 max-w-xl text-base leading-[1.9] text-paper/74 md:text-lg">
              {description}
            </p>
          ) : null}
          <Link
            href={href}
            className="group mt-9 inline-flex items-center gap-3 rounded-[4px] bg-gold px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
          >
            {label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
