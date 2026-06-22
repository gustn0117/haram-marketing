import type { Metadata } from "next";
import Link from "next/link";
import { services, metrics, processSteps } from "@/lib/content";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { GrowthChart, Funnel, ChannelBars } from "@/components/charts";

export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO — 풀스크린, 중앙, 극대 여백 ── */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <span className="hero-photo-bg" aria-hidden />
        <span className="hero-glow" aria-hidden />
        <span className="hero-blur" aria-hidden />
        <span
          className="rise relative z-2 text-[0.72rem] uppercase tracking-[0.42em] text-gold"
          style={{ animationDelay: "80ms" }}
        >
          Wedding Hall Marketing
        </span>
        <h1
          className="rise relative z-2 mt-10 whitespace-nowrap text-[clamp(2rem,7.2vw,4.8rem)] font-medium leading-none tracking-[0.12em] text-paper"
          style={{
            animationDelay: "200ms",
            textShadow: "0 2px 40px rgba(0,0,0,0.45)",
          }}
        >
          HARAM MARKETING
        </h1>
        <span
          className="rise relative z-2 mt-6 text-sm font-light tracking-[0.12em] text-paper/65"
          style={{ animationDelay: "300ms" }}
        >
          하람마케팅
        </span>
        <p
          className="rise relative z-2 mt-9 max-w-md text-base font-light leading-[1.7] tracking-tight text-paper/80 sm:text-lg"
          style={{ animationDelay: "440ms" }}
        >
          오직 예식장을 위한 마케팅.
          <br />
          노출이 아니라, 예약으로 증명합니다.
        </p>

        <span
          className="scroll-cue rise absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{ animationDelay: "680ms" }}
          aria-hidden
        />
      </section>

      {/* ── 선언문 ── */}
      <section className="px-6 py-20 md:py-32">
        <Reveal>
          <Container size="narrow" className="text-center">
            <p className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-light leading-[1.55] tracking-[-0.015em] text-paper/90">
              하람마케팅에는 <span className="text-gold">정해진 상품이 없습니다.</span>{" "}
              예식장마다 위치도, 강점도, 채워야 할 자리도 다르기 때문입니다.
              우리는 그 예식장에 맞게 설계합니다. 다만 우리가 쓰는 방법 —
              검색·블로그·SNS·광고·콘텐츠·브랜딩 — 은 분명합니다.
            </p>
          </Container>
        </Reveal>
      </section>

      {/* ── 서비스 — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Methods
            </p>
            <ul className="mx-auto mt-16 max-w-2xl">
              {services.map((s) => (
                <li key={s.id} className="border-t border-line last:border-b">
                  <Link
                    href={`/services/${s.id}`}
                    className="svc-row block py-9 text-center"
                  >
                    <span className="svc-title text-2xl font-light text-paper md:text-[1.9rem]">
                      {s.title}
                    </span>
                    <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                      {s.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Reveal>
      </section>

      {/* ── 지표 — 절제된 중앙 숫자 ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="wide">
            <div className="grid gap-16 text-center sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="num text-5xl font-light tracking-[-0.02em] text-paper md:text-6xl">
                    <CountUp value={m.value} />
                    {m.suffix ? (
                      <span className="ml-0.5 align-baseline text-2xl tracking-normal text-gold">
                        {m.suffix}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-5 text-[0.66rem] uppercase tracking-[0.22em] text-faint">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── 성과(데이터 시각화) ── */}
      <section className="px-6 py-16 md:py-24">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Proof
            </p>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
              노출이 아니라, 숫자로 증명합니다.
            </h2>
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-3xl">
            <GrowthChart />
          </Reveal>

          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Funnel />
            </Reveal>
            <Reveal>
              <ChannelBars />
            </Reveal>
          </div>

          <p className="mt-16 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      {/* ── 접근 방식 — 4단계, 중앙, 여백 ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Approach
            </p>
            <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12">
              {processSteps.map((step) => (
                <div key={step.no} className="text-center">
                  <span className="folio text-xs tracking-[0.24em] text-gold">
                    {step.no}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm font-light leading-[1.9] text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── 마무리 ── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32">
        <span className="closing-photo-bg" aria-hidden />
        <Reveal>
          <Container size="narrow" className="relative z-2 text-center">
            <span className="hair-line mx-auto mb-14 block w-16" aria-hidden />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Start with diagnosis
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.025em] text-paper">
              예식장의 빈 자리를
              <br />
              예약으로 바꿀 시간입니다.
            </p>
            <Link
              href="/contact"
              className="link-underline group mt-14 inline-flex items-center gap-2 text-sm tracking-[0.18em] text-gold"
            >
              무료 진단 신청
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
