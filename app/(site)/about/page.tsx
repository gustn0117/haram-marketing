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

      {/* ── 미션 선언문 ── */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="text-center">
          <Container size="narrow">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Mission
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.6rem,3.6vw,2.6rem)] font-light leading-[1.45] tracking-[-0.015em] text-paper/90">
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
      <section id="philosophy" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Philosophy
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              마케팅을 대하는 우리의 기준
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aboutStory.map((s) => (
              <div key={s.heading} className="card flex flex-col p-8">
                <h3 className="text-xl font-normal tracking-tight text-paper">
                  {s.heading}
                </h3>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 강점 ── */}
      <Strengths id="strengths" />

      {/* ── 운영 채널 ── */}
      <section id="equipment" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Channels
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              직접 운영하는 마케팅 채널
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {equipment.map((item) => (
              <div key={item.name} className="card flex flex-col p-8">
                <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                  {item.tagline}
                </span>
                <h3 className="mt-4 text-xl font-normal tracking-tight text-paper">
                  {item.name}
                </h3>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 성과 지표 — 신뢰 밴드 ── */}
      <section className="border-y border-line bg-ink-2 px-6 py-16 md:py-20">
        <Container size="wide">
          <Reveal>
            <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
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
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-3xl">
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

          <p className="mt-12 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      {/* ── 조직 ── */}
      <section id="team" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Team
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              한 팀이 같은 기준으로 움직입니다
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card flex flex-col p-8">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                CEO
              </span>
              <h3 className="mt-4 text-xl font-normal tracking-tight text-paper">
                {company.ceo}
              </h3>
              <p className="mt-4 text-[0.95rem] font-light leading-[1.7] text-muted">
                대표이사
              </p>
            </div>
            {departments.map((dept) => (
              <div key={dept.name} className="card flex flex-col p-8">
                <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                  {dept.tagline}
                </span>
                <h3 className="mt-4 text-xl font-normal tracking-tight text-paper">
                  {dept.name}
                </h3>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {dept.duties.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 우리가 일하는 방식 ── */}
      <section id="values" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Values
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              우리가 일하는 방식
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="card flex flex-col p-8">
                <h3 className="text-xl font-normal tracking-tight text-paper">
                  {value.title}
                </h3>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="narrow">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              FAQ
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              자주 묻는 질문
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 max-w-2xl">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <CTASection
        title="우리 예식장, 어디서부터 시작할까요?"
        description="정해진 상품을 권하지 않습니다. 예식장의 상황과 목표만 알려주시면, 그 예식장에 맞게 설계한 제안과 견적을 보내드립니다."
      />
    </>
  );
}
