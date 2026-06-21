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
    <section className="relative flex min-h-[48vh] items-end overflow-hidden border-b border-line bg-paper pt-40 pb-14 md:min-h-[56vh] md:pb-20">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden />
          <div
            className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/20"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70"
            aria-hidden
          />
        </>
      ) : (
        <Placeholder tone="dark" />
      )}

      <Container className="relative z-2">
        <p
          className="rise min-w-0 break-normal text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
          style={{ animationDelay: "80ms" }}
        >
          {eyebrow}
        </p>
        <h1
          className="rise mt-5 max-w-4xl break-normal font-serif text-3xl leading-[1.18] text-white [text-wrap:wrap] sm:text-4xl md:text-[2.9rem] md:leading-[1.12]"
          style={{ animationDelay: "200ms" }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="rise mt-5 max-w-2xl break-normal text-base leading-relaxed text-white/80 [text-wrap:wrap]"
            style={{ animationDelay: "340ms" }}
          >
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
