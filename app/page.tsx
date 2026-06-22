import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 표지(No.000) — 도록의 표제지. 헤더·푸터 없이 타이포·폴리오·판권만.
export default function CoverPage() {
  return (
    <section className="plate relative flex min-h-screen flex-col justify-between overflow-hidden p-8 md:p-14">
      {/* ㄱ자 코너 크롭마크 */}
      <span className="crop crop-tl" aria-hidden />
      <span className="crop crop-tr" aria-hidden />
      <span className="crop crop-bl" aria-hidden />
      <span className="crop crop-br" aria-hidden />

      {/* 상단: 폴리오 + 세로 라벨 */}
      <div className="flex items-start justify-between">
        <span
          className="rise folio text-sm tracking-[0.2em] text-faint"
          style={{ animationDelay: "60ms" }}
        >
          No. 000 / 2026
        </span>
        <span className="rail-label" aria-hidden>
          Wedding Hall Marketing
        </span>
      </div>

      {/* 중앙: 워드마크 (좌측 오프셋) */}
      <div className="pl-[clamp(0rem,7vw,7rem)]">
        <h1
          className="rise font-serif-display text-[clamp(3.4rem,13vw,9rem)] leading-[0.9] tracking-[-0.03em] text-paper"
          style={{
            animationDelay: "180ms",
            textShadow: "0 1px 50px rgba(201, 168, 106, 0.12)",
          }}
        >
          하람
          <br />
          <span className="text-gold">마케팅</span>
        </h1>
        <p
          className="rise mt-8 max-w-md font-serif text-xl leading-relaxed text-paper/80 sm:text-2xl"
          style={{ animationDelay: "340ms" }}
        >
          {company.tagline}
        </p>
        <Link
          href="/home"
          className="rise link-underline group mt-10 inline-flex items-center gap-3 text-sm tracking-[0.2em] text-gold"
          style={{ animationDelay: "480ms" }}
        >
          들어가기
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* 하단: 판권(colophon) */}
      <div className="rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" style={{ animationDelay: "620ms" }}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-faint">
          <span>T. {company.phone}</span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" />
          <span>{company.address}</span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" />
          <span>CEO {company.ceo}</span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" />
          <span>EST. 2026</span>
        </div>
        <span className="folio text-[0.68rem] tracking-[0.2em] text-faint">
          01 — 06
        </span>
      </div>
    </section>
  );
}
