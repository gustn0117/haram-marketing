import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 표지(겉표지) — 헤더·푸터 없이 문구만. 버튼으로 본문(/home) 진입.
export default function CoverPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* 얇은 샴페인 인셋 프레임 */}
      <div
        className="pointer-events-none absolute inset-5 rounded-2xl border sm:inset-8 md:inset-10"
        style={{ borderColor: "rgba(201, 168, 106, 0.2)" }}
        aria-hidden
      />

      {/* 상단 수직 라인 */}
      <span
        className="rise mb-9 block h-16 w-px bg-linear-to-b from-transparent to-gold/55"
        style={{ animationDelay: "60ms" }}
        aria-hidden
      />

      {/* eyebrow */}
      <div
        className="rise flex items-center gap-4"
        style={{ animationDelay: "160ms" }}
      >
        <span className="h-px w-8 bg-gold/45" />
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold">
          Wedding Hall Marketing
        </span>
        <span className="h-px w-8 bg-gold/45" />
      </div>

      {/* 워드마크 */}
      <h1
        className="rise mt-9 font-serif text-[3.4rem] leading-[1.02] text-paper sm:text-7xl md:text-8xl"
        style={{ animationDelay: "300ms" }}
      >
        {company.nameKo}
      </h1>
      <span
        className="rise mt-5 font-display text-xs uppercase tracking-[0.62em] text-gold/75 sm:text-sm"
        style={{ animationDelay: "400ms" }}
      >
        {company.nameEn}
      </span>

      {/* 태그라인 */}
      <div
        className="rise mt-11 flex flex-col items-center gap-6"
        style={{ animationDelay: "520ms" }}
      >
        <span className="h-px w-14 bg-line-strong" />
        <p className="max-w-md font-serif text-xl leading-relaxed text-paper/80 sm:text-2xl">
          예식장의 품격을 예약으로 잇습니다.
        </p>
      </div>

      {/* 진입 버튼 */}
      <Link
        href="/home"
        className="rise group mt-14 inline-flex items-center gap-3 border-b border-gold/40 pb-2 text-sm tracking-[0.22em] text-gold transition-colors duration-500 hover:border-gold hover:text-gold-bright"
        style={{ animationDelay: "660ms" }}
      >
        들어가기
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
      </Link>

      {/* 하단 메타 */}
      <span
        className="rise absolute bottom-8 text-[0.65rem] uppercase tracking-[0.3em] text-faint"
        style={{ animationDelay: "820ms" }}
      >
        전국 웨딩홀 마케팅 · {company.phone}
      </span>
    </section>
  );
}
