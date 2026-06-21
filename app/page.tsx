import Image from "next/image";
import Link from "next/link";
import { services, processSteps, faqs } from "@/lib/content";
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
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper">
        <Image
          src="/hero/concert-hall.png"
          alt="하람파트너스 행사기획 — 공연·행사 현장"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/75"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-black/35"
          aria-hidden
        />

        <Container className="relative z-2 text-center">
          <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center gap-7">
            <p
              className="rise w-full min-w-0 break-normal text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
              style={{ animationDelay: "120ms" }}
            >
              EVENT PLANNING &amp; OPERATION
            </p>
            <h1 className="rise font-serif w-full min-w-0 text-[2.4rem] leading-[1.15] text-white sm:text-5xl md:text-[4rem] md:leading-[1.05] md:whitespace-nowrap text-balance" style={{ animationDelay: "220ms" }}>
              브랜드의 순간을 설계합니다.
            </h1>
            <p
              className="rise w-full max-w-[21rem] break-normal text-base leading-relaxed text-white/80 sm:max-w-xl sm:text-lg"
              style={{ animationDelay: "520ms" }}
            >
              <span className="block">기획부터 연출, 현장 운영까지 —</span>
              <span className="block">
                기업 행사와 공연·페스티벌의 모든 순간을 하나의 흐름으로
                완성합니다.
              </span>
            </p>
            <div
              className="rise flex w-full max-w-[21rem] min-w-0 flex-col items-center justify-center gap-4 pt-2 sm:max-w-none sm:flex-row"
              style={{ animationDelay: "660ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-medium tracking-tight text-gold transition-colors duration-500 hover:bg-white/90 sm:w-auto"
              >
                프로젝트 의뢰하기
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-sm border border-white/45 px-7 py-3.5 text-sm font-medium tracking-tight text-white transition-colors duration-500 hover:border-white hover:bg-white/10 sm:w-auto"
              >
                서비스 살펴보기
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[0.65rem] font-medium tracking-[0.3em] text-white/60">
            SCROLL
          </span>
          <span className="h-10 w-px bg-linear-to-b from-white/60 to-transparent" />
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
                하람파트너스는 단순한 행사 대행이 아니라,
                <span className="text-muted">
                  {" "}
                  브랜드가 전하고 싶은 메시지를 사람들의 기억에 남는 경험으로
                  번역합니다.{" "}
                </span>
                기획의 정교함과 현장의 안정감, 그 사이의 모든 디테일을 책임집니다.
              </p>
              <p className="text-base leading-[1.85] text-muted">
                기업 행사와 컨퍼런스, 공연과 페스티벌, 브랜드 프로모션, 의전과
                현장 운영, 포토부스, 그리고 학교·기관 행사까지 — 성격이 다른
                행사들을 하나의 팀이 같은 기준으로 다룹니다. 음향·조명 장비를
                직접 보유하고 모든 스태프가 당사 직속으로 움직이기에, 기획에서
                시작된 의도가 현장의 마지막 순간까지 흐트러지지 않습니다.
              </p>
              <p className="text-base leading-[1.85] text-muted">
                화려한 한 장면보다, 행사가 끝난 뒤 남는 인상을 중요하게
                생각합니다. 그래서 우리는 보이는 무대만큼이나 보이지 않는 준비와
                운영에 공을 들입니다. 그 차이가 결국 행사의 격을 만든다고
                믿습니다.
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
                  기획부터 부스까지,
                  <br />
                  하나의 완성도.
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
            title="검증된 4단계 운영 프로세스"
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
                기획자가 직접 답변드립니다.
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
