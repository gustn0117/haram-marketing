import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";

/* 듀오톤 도판 + ㄱ자 코너 크롭마크 — 모든 이미지 사용처 통일 */
export function Plate({
  src,
  alt = "",
  caption,
  bleed,
  ratio = "aspect-[4/5]",
  priority = false,
}: {
  src: string;
  alt?: string;
  caption?: string;
  bleed?: "left" | "right";
  ratio?: string;
  priority?: boolean;
}) {
  const bleedCls =
    bleed === "right" ? "lg:-mr-[6vw]" : bleed === "left" ? "lg:-ml-[6vw]" : "";
  return (
    <figure className={`plate ${bleedCls}`}>
      <div className={`relative ${ratio} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover duotone"
        />
        <div className="absolute inset-0 bg-gold/12 mix-blend-overlay" aria-hidden />
      </div>
      <span className="crop crop-tl" aria-hidden />
      <span className="crop crop-tr" aria-hidden />
      <span className="crop crop-bl" aria-hidden />
      <span className="crop crop-br" aria-hidden />
      {caption ? (
        <figcaption className="mt-3 label text-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* 챕터 셸 — 좌측 마진 폴리오 + 세로 라벨(sticky), 우측 본문 */
export function Chapter({
  folio,
  label,
  title,
  intro,
  children,
  tall = false,
  id,
}: {
  folio?: string;
  label?: string;
  title?: ReactNode;
  intro?: string;
  children: ReactNode;
  tall?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line-strong chapter bleed-clip ${
        tall ? "chapter-tall" : ""
      }`}
    >
      <Container size="wide">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-x-12">
          <div className="flex items-center gap-4 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:items-start lg:gap-5">
            {folio ? (
              <span className="folio text-[2rem] text-faint lg:text-[clamp(2.4rem,3.4vw,3.8rem)]">
                {folio}
              </span>
            ) : null}
            {label ? (
              <>
                <span className="rail-label hidden lg:block">{label}</span>
                <span className="label lg:hidden">{label}</span>
              </>
            ) : null}
          </div>
          <div className="min-w-0">
            {title ? (
              <h2 className="mb-10 font-serif-display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.0] tracking-[-0.02em] md:mb-12">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className="mb-10 max-w-[60ch] text-[0.95rem] leading-[1.95] text-paper/65">
                {intro}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 인덱스표 — 수치/순번 데이터를 도록 행으로 (metrics 등) */
export function IndexTable({
  rows,
}: {
  rows: { value: string; suffix?: string; label: string }[];
}) {
  return (
    <div className="border-t border-line-strong">
      {rows.map((r) => (
        <div
          key={r.label}
          className="index-row grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b border-line-strong py-6 sm:gap-8 sm:py-7"
        >
          <span className="folio num text-[clamp(2.1rem,5vw,3.6rem)] text-gold">
            {r.value}
            {r.suffix ? (
              <small className="text-[0.45em] tracking-normal">{r.suffix}</small>
            ) : null}
          </span>
          <span className="hidden h-px self-center bg-line-strong sm:block" />
          <span className="max-w-[16ch] text-right text-xs leading-relaxed text-muted sm:text-sm">
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* 챕터 표지 — 하위페이지 진입부(PageHero 대체) */
export function ChapterCover({
  folio,
  label,
  title,
  lead,
  image,
}: {
  folio: string;
  label: string;
  title: ReactNode;
  lead?: string;
  image?: string;
}) {
  return (
    <header className="chapter bleed-clip pt-28 lg:pt-32">
      <Container size="wide">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <span className="folio block text-[clamp(2.6rem,7vw,5rem)] text-faint">
              {folio}
            </span>
            <span className="label mt-5 block">{label}</span>
            <h1 className="mt-5 font-serif-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.98] tracking-[-0.02em] text-paper">
              {title}
            </h1>
            {lead ? (
              <p className="mt-7 max-w-xl text-base leading-[1.85] text-paper/75">
                {lead}
              </p>
            ) : null}
          </div>
          {image ? (
            <Plate src={image} alt="" bleed="right" caption="Plate — Wedding Hall" priority />
          ) : null}
        </div>
      </Container>
    </header>
  );
}
