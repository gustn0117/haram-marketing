import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

// 하위페이지 진입 — 새 홈과 동일한 풀블리드 프리미엄 히어로
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
    <section className="premium-hero relative overflow-hidden">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div className="premium-hero-shade absolute inset-0" aria-hidden />
      <Container
        size="wide"
        className="relative z-[2] flex min-h-[calc(60svh-3.5rem)] items-end pb-12 pt-24 lg:min-h-[calc(62svh-5rem)] lg:pb-16 lg:pt-28"
      >
        <div className="max-w-4xl">
          <span className="label rise text-gold" style={{ animationDelay: "60ms" }}>
            {eyebrow}
          </span>
          <h1
            className="rise mt-5 font-serif-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.98] text-paper"
            style={{ animationDelay: "150ms" }}
          >
            {title}
          </h1>
          {description ? (
            <p
              className="rise mt-6 max-w-2xl text-base leading-[1.85] text-paper/80 md:text-lg"
              style={{ animationDelay: "250ms" }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
