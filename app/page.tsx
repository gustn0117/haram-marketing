import Image from "next/image";
import Link from "next/link";
import { services, processSteps, faqs, heroImage } from "@/lib/content";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon, ArrowUpRight, ArrowRight } from "@/components/icons";

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
      {/* ───────────────── Hero — Noir Atelier ───────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 pb-28 md:pb-32">
        <Image
          src={heroImage}
          alt="하람마케팅 웨딩홀 마케팅 — 예식장 전경"
          fill
          priority
          sizes="100vw"
          className="drift absolute inset-0 object-cover"
        />
        {/* 좌측 가독성 + 다크 무드 그라데이션 */}
        <div
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/60"
          aria-hidden
        />

        {/* 샴페인 헤어라인 인셋 프레임 (시그니처) */}
        <div
          className="pointer-events-none absolute inset-4 z-2 rounded-2xl border sm:inset-6 md:inset-8"
          style={{ borderColor: "rgba(201, 168, 106, 0.28)" }}
          aria-hidden
        />

        {/* 우측 세로 라벨 */}
        <span
          className="rise pointer-events-none absolute right-9 top-1/2 z-2 hidden -translate-y-1/2 rotate-90 font-display text-xs uppercase tracking-[0.5em] text-gold/70 lg:block"
          style={{ animationDelay: "900ms" }}
        >
          Est. — Wedding Hall Marketing
        </span>

        <Container className="relative z-3">
          <div className="flex w-full min-w-0 max-w-3xl flex-col gap-8">
            {/* eyebrow + 헤어라인 */}
            <div
              className="rise flex items-center gap-4"
              style={{ animationDelay: "120ms" }}
            >
              <span className="h-px w-12 bg-gold/70" />
              <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                Wedding Hall Marketing
              </p>
            </div>

            <h1
              className="rise font-serif min-w-0 break-normal text-[2.9rem] leading-[1.06] text-paper sm:text-6xl md:text-[5rem] md:leading-[0.98]"
              style={{ animationDelay: "240ms" }}
            >
              비어 있는 홀을
              <br />
              <span className="text-gold">예약</span>으로 채웁니다.
            </h1>

            <p
              className="rise min-w-0 max-w-xl break-normal text-base leading-[1.8] text-paper/75 sm:text-lg"
              style={{ animationDelay: "560ms" }}
            >
              검색 노출부터 상담 예약까지 — 예식장만 전문으로,
              <br className="hidden sm:block" /> 웨딩홀 마케팅의 모든 단계를 하나의 흐름으로 완성합니다.
            </p>

            <div
              className="rise flex w-full max-w-md flex-col gap-4 pt-2 sm:max-w-none sm:flex-row sm:items-center"
              style={{ animationDelay: "700ms" }}
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

        {/* 하단 서비스 마퀴 (시그니처 에디토리얼 스트립) */}
        <div className="absolute inset-x-0 bottom-0 z-3 overflow-hidden border-t border-gold/15 bg-ink/55 py-4 backdrop-blur-sm">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
            {[...services, ...services].map((s, i) => (
              <span
                key={`${s.id}-${i}`}
                className="flex items-center gap-10 text-sm tracking-wide text-paper/55"
              >
                <span className="font-display text-gold/80">✦</span>
                <span>{s.title}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Intro statement ───────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <Reveal>
              <Eyebrow>WHO WE ARE</Eyebrow>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-7">
              <p className="font-serif text-2xl leading-[1.6] sm:text-[1.75rem] text-balance">
                하람마케팅은 단순한 마케팅 대행이 아니라,
                <span className="text-muted">
                  {" "}
                  예식장이 가진 강점을 신랑신부의 선택으로 번역합니다.{" "}
                </span>
                검색의 정교함과 콘텐츠의 신뢰, 그 사이의 모든 디테일을 책임집니다.
              </p>
              <p className="text-base leading-[1.85] text-muted">
                네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스
                광고와 상담 DB, 영상·사진 콘텐츠, 그리고 브랜딩과 예약
                홈페이지까지 — 흩어지기 쉬운 마케팅 채널을 하나의 팀이 같은
                기준으로 다룹니다. 촬영·콘텐츠·광고를 모두 자사 팀이 직접
                운영하기에, 전략에서 시작된 의도가 마지막 예약까지 흐트러지지
                않습니다.
              </p>
              <p className="text-base leading-[1.85] text-muted">
                보기 좋은 조회수보다, 실제로 식장을 채우는 예약을 중요하게
                생각합니다. 그래서 우리는 눈에 보이는 노출만큼이나 문의를
                예약으로 잇는 보이지 않는 동선에 공을 들입니다. 그 차이가 결국
                마케팅의 성패를 가른다고 믿습니다.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────── Strengths ───────────────── */}
      <Strengths background="alt" />

      {/* ───────────────── Services ───────────────── */}
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

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal
                key={service.id}
                delay={i * 90}
                className={
                  i === services.length - 1 && services.length % 2 === 1
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <Link
                  href={`/services/${service.id}`}
                  className="card-hover group flex h-full flex-col gap-6 rounded-2xl border border-line bg-surface p-8 md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line-strong text-gold transition-colors duration-500 group-hover:border-gold">
                      <ServiceIcon id={service.id as never} className="h-7 w-7" />
                    </div>
                    <span className="font-display text-3xl text-faint">
                      {service.no}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-display text-xs tracking-wide text-gold">
                      {service.tagline}
                    </span>
                    <h3 className="font-serif text-2xl">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── Process ───────────────── */}
      <section className="relative overflow-hidden border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="검증된 4단계 마케팅 프로세스"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.no}
                delay={i * 90}
                className="group relative flex flex-col gap-5 bg-ink-2 p-8 md:p-9"
              >
                <span className="font-display text-5xl text-faint transition-colors duration-500 group-hover:text-gold">
                  {step.no}
                </span>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  자주 묻는
                  <br />
                  질문들.
                </>
              }
            />
            <Reveal delay={150} className="max-w-sm">
              <p className="text-sm leading-relaxed text-muted">
                더 궁금한 점이 있으시면 언제든 편하게 문의해 주세요. 담당
                마케터가 직접 답변드립니다.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <FaqList items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
