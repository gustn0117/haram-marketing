import Image from "next/image";
import type { ReactNode } from "react";

// 하위페이지 진입 — 중앙 정렬 코퍼레이트 히어로
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
      className="page-hero relative isolate flex min-h-[60svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center md:min-h-[66svh]"
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
      <span
        className="rise relative z-10 text-[0.72rem] uppercase tracking-[0.36em] text-gold"
        style={{ animationDelay: "60ms" }}
      >
        {eyebrow}
      </span>
      <h1
        className="rise relative z-10 mt-7 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-light leading-[1.18] tracking-[-0.02em] text-paper"
        style={{ animationDelay: "160ms" }}
      >
        {title}
      </h1>
      {description ? (
        <p
          className="rise relative z-10 mt-7 max-w-xl text-base font-light leading-[1.85] text-muted"
          style={{ animationDelay: "260ms" }}
        >
          {description}
        </p>
      ) : null}
    </section>
  );
}
