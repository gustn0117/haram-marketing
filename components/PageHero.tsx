import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { Plate } from "@/components/carnet";

// 하위페이지 진입 — 도록 '챕터 표지' 스프레드 (좌 폴리오/제목 · 우 듀오톤 도판)
export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  folio = "No. 010",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  backgroundImage?: string;
  folio?: string;
}) {
  return (
    <header className="chapter bleed-clip pt-28 lg:pt-32">
      <Container size="wide">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <span className="folio block text-[clamp(2.6rem,7vw,5rem)] text-faint">
              {folio}
            </span>
            <span className="label mt-5 block">{eyebrow}</span>
            <h1 className="mt-5 font-serif-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.0] tracking-[-0.02em] text-paper">
              {title}
            </h1>
            {description ? (
              <p className="mt-7 max-w-xl text-base leading-[1.85] text-paper/75">
                {description}
              </p>
            ) : null}
          </div>
          {backgroundImage ? (
            <Plate
              src={backgroundImage}
              alt=""
              bleed="right"
              caption="Plate — Wedding Hall"
              priority
            />
          ) : null}
        </div>
      </Container>
    </header>
  );
}
