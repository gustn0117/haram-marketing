import type { Metadata } from "next";
import Link from "next/link";
import { services, metrics, processSteps, company } from "@/lib/content";
import { Container, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { ServiceIcon } from "@/components/ServiceIcons";

export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO — 명확한 가치 제안 + CTA ── */}
      <section className="relative flex min-h-[90svh] items-center overflow-hidden px-6 pt-24 text-center">
        <span className="hero-photo-bg" aria-hidden />
        <Container size="default" className="relative z-2">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Wedding Hall Marketing
            </p>
            <h1 className="mx-auto mt-7 max-w-3xl text-[clamp(2rem,5.4vw,3.7rem)] font-light leading-[1.22] tracking-[-0.02em] text-paper">
              노출이 아니라, <span className="text-gold">예약</span>으로
              <br className="hidden sm:block" /> 증명하는 웨딩홀 전문 마케팅
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[1.05rem] font-light leading-[1.8] text-muted">
              {company.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <CTAButton href="/contact">무료 진단 신청</CTAButton>
              <CTAButton href="/services" variant="ghost">
                서비스 살펴보기
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 서비스 — 카드 3열 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Services
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              검색부터 예약까지, 한 팀이 책임집니다
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
              정해진 상품이 아니라, 예식장에 필요한 방법만 골라 설계합니다.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="card group flex flex-col p-8"
              >
                <div className="flex items-center justify-between">
                  <ServiceIcon
                    id={s.id}
                    variant="static"
                    className="h-8 w-8 text-gold"
                  />
                  <span className="folio text-sm tracking-[0.1em] text-faint">
                    {s.no}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-normal tracking-tight text-paper">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.64rem] uppercase tracking-[0.2em] text-faint">
                  {s.tagline}
                </p>
                <p className="mt-4 flex-1 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {s.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm text-gold transition-all duration-300 group-hover:gap-2.5">
                  자세히 보기
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 지표 — 신뢰 밴드 ── */}
      <section className="border-y border-line bg-ink-2 px-6 py-16 md:py-20">
        <Container size="wide">
          <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <Reveal key={m.label}>
                <p className="num text-4xl font-light leading-none tracking-[-0.02em] text-paper md:text-[3.4rem]">
                  <CountUp value={m.value} />
                  {m.suffix ? (
                    <span className="text-2xl text-gold">{m.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-4 text-sm font-light text-muted">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 진행 방식 — 4단계 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              How We Work
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              진단부터 리포트까지, 4단계로 운영합니다
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <Reveal key={step.no}>
                <span className="num text-3xl font-light text-gold/70">
                  {step.no}
                </span>
                <h3 className="mt-4 text-lg font-normal tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 마무리 CTA ── */}
      <section className="relative overflow-hidden border-t border-line px-6 py-24 text-center md:py-32">
        <span className="closing-photo-bg" aria-hidden />
        <Container size="narrow" className="relative z-2">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.25] tracking-[-0.02em] text-paper">
              우리 예식장, 어디서부터 시작할까요?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
              예식장의 상황과 목표만 알려주시면, 맞춤 진단과 제안을 보내드립니다.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton href="/contact">무료 진단 신청</CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
