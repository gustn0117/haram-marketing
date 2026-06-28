import type { Metadata } from "next";
import Link from "next/link";
import { metrics, processSteps } from "@/lib/content";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { GrowthChart, Funnel, ChannelBars } from "@/components/charts";
import {
  ArchMotif,
  RingsMotif,
  AisleMotif,
  ChandelierMotif,
  SprigMotif,
  ArcDivider,
} from "@/components/Motifs";

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
        {/* 예식 아치 라인아트 — 로드 시 그려짐, 워드마크가 아치 안에 섬 */}
        <ArchMotif
          variant="load"
          className="pointer-events-none absolute left-1/2 top-1/2 z-1 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-[52%] text-paper/30"
        />
        <span
          className="rise relative z-2 text-[0.72rem] uppercase tracking-[0.36em] text-gold"
          style={{ animationDelay: "80ms" }}
        >
          Wedding Hall Marketing
        </span>
        <h1
          className="rise foil relative z-2 mt-10 whitespace-nowrap text-[clamp(1.7rem,7vw,4.8rem)] font-light leading-none tracking-[0.2em]"
          style={{
            animationDelay: "200ms",
            filter: "drop-shadow(0 2px 30px rgba(0,0,0,0.5))",
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
          className="rise relative z-2 mt-9 max-w-xl text-base font-light leading-[1.7] tracking-tight text-paper/80 sm:text-lg"
          style={{ animationDelay: "440ms" }}
        >
          오직 예식장을 위한 마케팅. 노출이 아니라, 예약으로 증명합니다.
        </p>

        <span
          className="scroll-cue rise absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{ animationDelay: "680ms" }}
          aria-hidden
        />
      </section>

      {/* ── 선언문 ── */}
      <section className="px-6 py-14 md:py-20">
        <Reveal>
          <Container size="default" className="text-center">
            <RingsMotif className="mx-auto mb-10 w-[72px] text-gold/70" />
            <p className="mx-auto max-w-[1000px] text-[clamp(1.35rem,3vw,1.9rem)] font-light leading-[1.55] tracking-[-0.015em] text-paper/90 break-keep">
              하람마케팅에는 <span className="text-gold">정해진 상품이 없습니다.</span>
              <br />
              예식장마다 위치도, 강점도, 채워야 할 자리도 다르기 때문입니다.
              <br />
              우리는 그 예식장에 맞게 설계합니다.
              <br />
              다만, 우리가 쓰는 방법은 분명합니다.
            </p>
            <p className="mt-8 text-sm font-light tracking-[0.14em] text-muted sm:text-base">
              검색 · 블로그 · SNS · 광고 · 콘텐츠 · 브랜딩
            </p>
          </Container>
        </Reveal>
      </section>

      {/* ── 서비스 — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-10 md:py-14">
        <Reveal>
          <Container size="default">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Methods
            </p>
            <ServiceGrid />
          </Container>
        </Reveal>
      </section>

      {/* ── 지표 — 절제된 중앙 숫자 (들린 면) ── */}
      <section className="bg-ink-2 px-6 py-10 md:py-14">
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
      <section className="px-6 py-10 md:py-14">
        <Container size="wide">
          <Reveal className="text-center">
            <AisleMotif className="mx-auto mb-8 w-[120px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Proof
            </p>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
              노출이 아니라, 숫자로 증명합니다.
            </h2>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <GrowthChart />
          </Reveal>

          <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Funnel />
            </Reveal>
            <Reveal>
              <ChannelBars />
            </Reveal>
          </div>

          <p className="mt-12 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      {/* ── 접근 방식 — 4단계, 중앙, 여백 ── */}
      <section className="px-6 py-10 md:py-14">
        <Reveal>
          <Container size="narrow">
            <ChandelierMotif className="mx-auto mb-8 w-[60px] text-gold/55" />
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Approach
            </p>
            <div className="mx-auto mt-12 flex max-w-xl flex-col gap-12">
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

      {/* ── 아치 디바이더 ── */}
      <Reveal className="px-6">
        <ArcDivider className="mx-auto block w-[min(82vw,640px)] text-gold/35" />
      </Reveal>

      {/* ── 마무리 ── */}
      <section className="relative overflow-hidden px-6 py-14 md:py-20">
        <span className="closing-photo-bg" aria-hidden />
        <Reveal>
          <Container size="narrow" className="relative z-2 text-center">
            <SprigMotif className="mx-auto mb-10 w-[44px] text-gold/55" />
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
              className="link-underline group mt-10 inline-flex items-center gap-2 text-sm tracking-[0.18em] text-gold"
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
