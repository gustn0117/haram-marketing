import Image from "next/image";
import type { ReactNode } from "react";
import { MonogramSeal } from "@/components/Motifs";

// 하위페이지 진입 — 중앙 정렬 미니멀 히어로 (갤러리 톤)
export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  backgroundImage?: string;
}) {
  return (
    <section
      className="page-hero relative isolate flex min-h-[60svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:min-h-[66svh]"
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="page-hero-img"
            aria-hidden
          />
          <span className="page-hero-bg" aria-hidden />
        </>
      ) : null}
      <span className="page-hero-glow" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <MonogramSeal
          variant="load"
          className="rise mb-7 w-12 text-paper/45"
        />
        <span
          className="rise block text-[0.72rem] uppercase tracking-[0.36em] text-gold"
          style={{ animationDelay: "60ms" }}
        >
          {eyebrow}
        </span>
        <h1
          className="rise mt-7 max-w-3xl text-[clamp(2.2rem,5.6vw,4.6rem)] font-light leading-[1.05] tracking-[-0.03em] text-paper"
          style={{ animationDelay: "160ms" }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="rise mt-7 max-w-xl text-base font-light leading-[1.85] text-muted"
            style={{ animationDelay: "260ms" }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
