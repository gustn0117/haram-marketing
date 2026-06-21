import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  services,
  processSteps,
  faqs,
  metrics,
  heroImage,
} from "@/lib/content";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ArrowUpRight, ArrowRight } from "@/components/icons";

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
      {/* ───────────────── Hero — 좌측 에디토리얼 (정적) ───────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 pb-20">
        <Image
          src={heroImage}
          alt="하람마케팅 웨딩홀 마케팅 — 예식장 전경"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/55"
          aria-hidden
        />

        {/* 샴페인 헤어라인 인셋 프레임 */}
        <div
          className="pointer-events-none absolute inset-4 z-2 rounded-2xl border sm:inset-6 md:inset-8"
          style={{ borderColor: "rgba(201, 168, 106, 0.26)" }}
          aria-hidden
        />

        <Container className="relative z-3">
          <div className="flex w-full min-w-0 max-w-3xl flex-col gap-8">
            <div className="rise flex items-center gap-4" style={{ animationDelay: "100ms" }}>
              <span className="h-px w-12 bg-gold/70" />
              <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                Wedding Hall Marketing
              </p>
            </div>

            <h1
              className="rise font-serif min-w-0 break-normal text-[2.9rem] leading-[1.06] text-paper sm:text-6xl md:text-[5rem] md:leading-[0.98]"
              style={{ animationDelay: "200ms" }}
            >
              비어 있는 홀을
              <br />
              <span className="text-gold">예약</span>으로 채웁니다.
            </h1>

            <p
              className="rise min-w-0 max-w-xl break-normal text-base leading-[1.8] text-paper/75 sm:text-lg"
              style={{ animationDelay: "440ms" }}
            >
              검색 노출부터 상담 예약까지 — 예식장만 전문으로,
              <br className="hidden sm:block" /> 웨딩홀 마케팅의 모든 단계를 하나의 흐름으로 완성합니다.
            </p>

            <div
              className="rise flex w-full max-w-md flex-col gap-4 pt-2 sm:max-w-none sm:flex-row sm:items-center"
              style={{ animationDelay: "560ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-sm bg-gold px-8 py-4 text-sm font-medium tracking-tight text-ink transition-colors duration-500 hover:bg-gold-bright sm:w-auto"
              >
                무료 마케팅 진단
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-sm border border-gold/40 px-8 py-4 text-sm font-medium tracking-tight text-paper transition-colors duration-500 hover:border-gold hover:text-gold sm:w-auto"
              >
                서비스 살펴보기
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── Intro — 중앙 선언문 + 지표 밴드 ───────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <Eyebrow>WHO WE ARE</Eyebrow>
            <p className="font-serif text-[1.7rem] leading-[1.45] sm:text-3xl md:text-[2.5rem] md:leading-[1.4] text-balance">
              하람마케팅은 단순한 마케팅 대행이 아니라,{" "}
              <span className="text-gold">예식장의 강점을 신랑신부의 선택으로 번역</span>
              합니다.
            </p>
            <p className="max-w-2xl text-base leading-[1.9] text-muted">
              네이버 검색·플레이스, 블로그·체험단, SNS, 퍼포먼스 광고와 상담 DB,
              영상·사진 콘텐츠, 브랜딩과 예약 홈페이지까지 — 흩어지기 쉬운 채널을
              한 팀이 같은 기준으로 다룹니다. 보기 좋은 조회수가 아니라, 실제로
              식장을 채우는 예약을 만듭니다.
            </p>
          </Reveal>

          {/* 성과 지표 밴드 */}
          <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-line pt-12 md:mt-20 md:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 80}
                className="flex flex-col items-center gap-2 border-line text-center md:border-l md:first:border-l-0"
              >
                <span className="font-display text-4xl text-gold sm:text-5xl">
                  {m.value}
                  {m.suffix ? <span className="text-2xl">{m.suffix}</span> : null}
                </span>
                <span className="text-xs leading-relaxed text-muted">{m.label}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── Strengths ───────────────── */}
      <Strengths background="alt" />

      {/* ───────────────── Services — 에디토리얼 인덱스 리스트 ───────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="WHAT WE DO"
              title={
                <>
                  검색부터 예약까지,
                  <br />
                  하나의 흐름.
                </>
              }
            />
            <Reveal delay={150}>
              <Link
                href="/services"
                className="link-underline inline-flex items-center gap-2 text-sm text-gold"
              >
                전체 서비스 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-line">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <Link
                  href={`/services/${service.id}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-5 border-b border-line px-1 py-7 transition-colors duration-500 hover:bg-surface/40 md:grid-cols-[5rem_1fr_1.5fr_auto] md:gap-10 md:px-4 md:py-9"
                >
                  <span className="font-display text-2xl text-faint transition-colors duration-500 group-hover:text-gold md:text-4xl">
                    {service.no}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-display text-xs tracking-wide text-gold">
                      {service.tagline}
                    </span>
                    <h3 className="font-serif text-xl md:text-[1.65rem]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="hidden text-sm leading-relaxed text-muted md:block">
                    {service.description}
                  </p>
                  <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── Process — 세로 타임라인 ───────────────── */}
      <section className="border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <SectionHeading
                eyebrow="HOW WE WORK"
                title={
                  <>
                    검증된 4단계
                    <br />
                    마케팅 프로세스
                  </>
                }
              />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                진단에서 시작해 성과 리포트로 매듭짓습니다. 각 단계의 결과를
                숫자로 확인하며 다음 운영을 개선합니다.
              </p>
            </div>

            <div className="flex flex-col">
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.no}
                  delay={i * 80}
                  className="grid grid-cols-[3rem_1fr] gap-6 md:grid-cols-[3.5rem_1fr] md:gap-8"
                >
                  <div className="flex flex-col items-center">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold md:h-14 md:w-14 md:text-xl">
                      {step.no}
                    </span>
                    {i < processSteps.length - 1 ? (
                      <span className="my-2 w-px flex-1 bg-line" />
                    ) : null}
                  </div>
                  <div className="pt-2 pb-12 last:pb-0">
                    <h3 className="font-serif text-xl md:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="자주 묻는 질문"
              align="center"
              className="mx-auto"
            />
            <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-muted">
              더 궁금한 점이 있으시면 언제든 편하게 문의해 주세요. 담당 마케터가
              직접 답변드립니다.
            </p>
            <Reveal className="mt-12">
              <FaqList items={faqs} />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
