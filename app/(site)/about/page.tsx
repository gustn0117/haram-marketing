import type { Metadata } from "next";
import {
  company,
  values,
  aboutStory,
  departments,
  equipment,
  metrics,
  faqs,
  pageHeroImages,
} from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { GrowthChart, ChannelBars } from "@/components/charts";
import {
  RingsMotif,
  ChandelierMotif,
  SprigMotif,
  MonogramSeal,
  ArcDivider,
} from "@/components/Motifs";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "웨딩홀 마케팅 전문 하람마케팅의 운영 철학과 조직, 운영 채널 이야기. 촬영·콘텐츠·광고를 모두 자사 팀이 직접 운영하며, 노출에서 끝나지 않고 예약까지 책임집니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Haram Marketing"
        title={
          <>
            마케팅의 끝은 <span className="foil">예약</span>이라 믿습니다.
          </>
        }
        description={company.intro}
        backgroundImage={pageHeroImages.about}
      />

      {/* ── 미션 선언문 — 좌측 ── */}
      <section className="px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <RingsMotif className="mb-8 w-[64px] text-gold/60" />
            <p className="max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] font-light leading-[1.5] tracking-[-0.015em] text-paper/90">
              우리는 <span className="text-gold">노출</span>을 팔지 않습니다.
              신랑신부가 우리 예식장을 선택하는 순간을 설계하고, 그 선택이{" "}
              <span className="text-gold">예약</span>으로 이어지도록 보이지 않는
              모든 동선을 준비합니다.
            </p>
            <p className="mt-10 text-[0.66rem] uppercase tracking-[0.24em] text-faint">
              — 대표 {company.ceo}
            </p>
          </Container>
        </Reveal>
      </section>

      {/* ── 운영 철학 ── */}
      <section id="philosophy" className="scroll-mt-12 px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Philosophy
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-14">
              {aboutStory.map((s) => (
                <div key={s.heading}>
                  <h3 className="text-xl font-light tracking-tight text-paper md:text-2xl">
                    {s.heading}
                  </h3>
                  <p className="mt-4 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── 강점 ── */}
      <Strengths id="strengths" />

      {/* ── 운영 채널 + 성과 지표 ── */}
      <section id="equipment" className="band scroll-mt-12 px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <ChandelierMotif className="mb-8 w-[60px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Channels
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-14">
              {equipment.map((item) => (
                <div key={item.name}>
                  <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {item.tagline}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-4 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>

        <Reveal>
          <Container size="wide">
            <div className="stagger mt-12 grid gap-16 text-left sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="num text-5xl font-light leading-none tracking-[-0.02em] text-paper md:text-6xl">
                    <CountUp value={m.value} />
                    {m.suffix ? (
                      <span className="ml-0.5 align-baseline text-xl tracking-normal text-gold">
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

            <Reveal className="mx-auto mt-12 max-w-3xl">
              <GrowthChart
                title="누적 관리 예식장"
                data={[4, 9, 15, 21, 27, 33]}
                labels={["2024", "", "", "", "", "2026"]}
                caption="3년"
              />
            </Reveal>

            <Reveal className="mx-auto mt-10 max-w-xl">
              <ChannelBars
                title="운영 채널 비중"
                items={[
                  { label: "촬영·영상 콘텐츠", pct: 32 },
                  { label: "네이버 검색·플레이스", pct: 28 },
                  { label: "퍼포먼스 광고", pct: 24 },
                  { label: "SNS·체험단", pct: 16 },
                ]}
              />
            </Reveal>

            <p className="mt-12 text-[0.62rem] uppercase tracking-[0.2em] text-faint">
              예시 데이터 · 실제 성과는 예식장별로 상이합니다
            </p>
          </Container>
        </Reveal>
      </section>

      {/* ── 조직 ── */}
      <section id="team" className="scroll-mt-12 px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <MonogramSeal className="mb-8 w-12 text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Team
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-14">
              <div>
                <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                  CEO
                </span>
                <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                  {company.ceo}
                </h3>
                <p className="mt-4 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                  대표이사
                </p>
              </div>
              {departments.map((dept) => (
                <div key={dept.name}>
                  <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {dept.tagline}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                    {dept.name}
                  </h3>
                  <p className="mt-4 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                    {dept.duties.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── 우리가 일하는 방식 ── */}
      <section id="values" className="band scroll-mt-12 px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <SprigMotif className="mb-8 w-[44px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Values
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-14">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-xl font-light tracking-tight text-paper md:text-2xl">
                    {value.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      <Reveal className="px-6">
        <ArcDivider className="mx-auto block w-[min(82vw,640px)] text-gold/35" />
      </Reveal>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-12 px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              FAQ
            </p>
            <div className="mt-12 max-w-2xl">
              <FaqList items={faqs} />
            </div>
          </Container>
        </Reveal>
      </section>

      <CTASection
        title="우리 예식장, 어디서부터 시작할까요?"
        description="정해진 상품을 권하지 않습니다. 예식장의 상황과 목표만 알려주시면, 그 예식장에 맞게 설계한 제안과 견적을 보내드립니다."
      />
    </>
  );
}
