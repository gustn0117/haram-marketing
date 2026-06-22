import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Placeholder } from "@/components/Placeholder";

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
    <section className="relative flex min-h-[48vh] items-end overflow-hidden border-b border-line bg-ink pt-40 pb-16 md:min-h-[56vh] md:pb-24">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover [filter:grayscale(0.55)_sepia(0.18)_brightness(0.9)]"
          />
          {/* 브랜드 ink 듀오톤 — 순흑 제거 */}
          <div
            className="absolute inset-0 bg-gold/10 mix-blend-overlay"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/20"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-ink/10 via-transparent to-ink/80"
            aria-hidden
          />
        </>
      ) : (
        <Placeholder tone="dark" />
      )}

      {/* 샴페인 인셋 프레임 시그니처 (표지·홈 히어로와 통일) */}
      <div
        className="pointer-events-none absolute inset-4 z-2 rounded-2xl border sm:inset-6 md:inset-8"
        style={{ borderColor: "var(--color-gold-frame)" }}
        aria-hidden
      />

      <Container className="relative z-3">
        <span
          className="rise inline-flex items-center gap-3 label"
          style={{ animationDelay: "80ms" }}
        >
          <span className="inline-block h-px w-9 bg-linear-to-r from-gold to-transparent" />
          {eyebrow}
        </span>
        <h1
          className="rise mt-6 max-w-4xl break-normal font-serif-display text-3xl leading-[1.18] text-white [text-wrap:wrap] sm:text-4xl md:text-[2.9rem] md:leading-[1.1]"
          style={{ animationDelay: "200ms" }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="rise mt-6 max-w-2xl break-normal text-base leading-[1.8] text-paper/80 [text-wrap:wrap]"
            style={{ animationDelay: "340ms" }}
          >
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
