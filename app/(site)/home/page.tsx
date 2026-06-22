import type { Metadata } from "next";
import Link from "next/link";
import {
  services,
  processSteps,
  faqs,
  metrics,
  strengths,
  heroImage,
  offeringImages,
  regions,
} from "@/lib/content";
import { Container } from "@/components/ui";
import { Chapter, IndexTable, Plate } from "@/components/carnet";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* ── 표제 스프레드 (No.000) ── */}
      <section className="chapter-tall bleed-clip pt-24 lg:pt-16">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="flex flex-col gap-7">
              <span className="folio rise text-sm tracking-[0.34em] text-faint" style={{ animationDelay: "60ms" }}>
                001 — INDEX
              </span>
              <h1
                className="rise border-l border-gold/30 pl-6 font-serif-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.92] tracking-[-0.025em] text-paper"
                style={{ animationDelay: "160ms" }}
              >
                비어 있는 홀을
                <br />
                <span className="italic text-gold">예약</span>으로 채웁니다.
              </h1>
              <p
                className="rise max-w-md text-base leading-[1.8] text-paper/70"
                style={{ animationDelay: "320ms" }}
              >
                검색 노출부터 상담 예약까지 — 예식장만 전문으로, 웨딩홀
                마케팅의 모든 단계를 하나의 흐름으로 완성합니다.
              </p>
              <div
                className="rise flex flex-col gap-5 pt-1"
                style={{ animationDelay: "440ms" }}
              >
                <Link
                  href="/contact"
                  className="link-underline group inline-flex w-fit items-center gap-2 text-sm tracking-[0.05em] text-gold"
                >
                  무료 마케팅 진단
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <p className="max-w-lg text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-faint">
                  {regions.join("  ·  ")}
                </p>
              </div>
            </div>

            <Plate
              src={heroImage}
              caption="Plate 01 — Wedding Hall"
              bleed="right"
              priority
            />
          </div>
        </Container>
      </section>

      {/* ── Ch.01 — 선언 + 지표 인덱스표 ── */}
      <Chapter folio="01 / 06" label="WHO WE ARE">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <p className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.5] tracking-[-0.01em]">
            하람마케팅은 단순한 마케팅 대행이 아니라,{" "}
            <span className="text-gold">
              예식장의 강점을 신랑신부의 선택으로 번역
            </span>
            합니다. 보기 좋은 조회수가 아니라, 실제로 식장을 채우는 예약을
            만듭니다.
          </p>
          <IndexTable rows={metrics} />
        </div>
      </Chapter>

      {/* ── Ch.02 — 강점 지그재그 펼침면 ── */}
      <Chapter folio="02 / 06" label="WHY HARAM" title="노출이 아니라, 예약으로.">
        <div className="border-t border-line-strong">
          {strengths.map((s, i) => (
            <div
              key={s.id}
              className="index-row grid gap-6 border-b border-line-strong py-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="folio text-[clamp(2.4rem,4vw,3.8rem)] text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-snug">
                  {s.title}
                </h3>
              </div>
              <p
                className={`max-w-[52ch] text-[0.95rem] leading-[1.95] text-muted ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── Ch.03 — 서비스 좌우교차 플레이트 스프레드 ── */}
      <Chapter folio="03 / 06" label="WHAT WE DO" title="검색부터 예약까지.">
        <div className="border-t border-line-strong">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group grid items-center gap-10 border-b border-line-strong py-12 lg:grid-cols-2 lg:gap-14"
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="folio text-sm text-faint">{s.no} / 06</span>
                  <span className="label mt-4 block text-gold">{s.tagline}</span>
                  <h3 className="mt-2 font-serif-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-500 group-hover:text-gold">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.85] text-muted">
                    {s.description}
                  </p>
                </div>
                <Plate
                  src={offeringImages[s.id]}
                  bleed={flip ? "left" : "right"}
                  ratio="aspect-[5/4]"
                  caption={`Plate ${String(i + 2).padStart(2, "0")}`}
                />
              </Link>
            );
          })}
        </div>
      </Chapter>

      {/* ── Ch.04 — 프로세스 악보형 인덱스 ── */}
      <Chapter folio="04 / 06" label="HOW WE WORK" title="검증된 4단계.">
        <div className="grid divide-y divide-line-strong border-t border-line-strong md:grid-cols-4 md:divide-x md:divide-y-0">
          {processSteps.map((p) => (
            <div key={p.no} className="px-1 py-8 md:px-6 md:first:pl-0">
              <span className="folio text-[clamp(2rem,3vw,3rem)] text-gold">
                {p.no}
              </span>
              <span className="my-4 block h-5 w-px bg-gold/40" />
              <h3 className="font-serif text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── Ch.05 — FAQ ── */}
      <Chapter folio="05 / 06" label="Q&A">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-14">
          <h2 className="font-serif-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.02em]">
            자주 묻는
            <br />
            질문.
          </h2>
          <FaqList items={faqs} />
        </div>
      </Chapter>

      {/* ── Ch.06 — 마무리 ── */}
      <Chapter folio="06 / 06" label="CONTACT">
        <div className="flex flex-col items-start gap-7">
          <h2 className="font-serif-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em]">
            예식장을 예약으로
            <br />
            채울 시간입니다.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            무료 진단으로 지금 우리 예식장의 노출·문의 상태부터 확인해 보세요.
            담당 마케터가 1영업일 이내에 회신드립니다.
          </p>
          <Link
            href="/contact"
            className="group mt-2 inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 text-sm font-medium text-ink transition-colors duration-500 hover:bg-gold-bright"
          >
            무료 마케팅 진단
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </Chapter>
    </>
  );
}
