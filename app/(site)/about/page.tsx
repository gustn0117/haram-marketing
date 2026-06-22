/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  company,
  values,
  aboutStory,
  departments,
  equipment,
  metrics,
  faqs,
  aboutImage,
} from "@/lib/content";
import { Container, Eyebrow, SectionHeading, CTASection } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { Quote } from "@/components/icons";

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
        eyebrow="ABOUT HARAM MARKETING"
        title={
          <>
            마케팅의 끝은
            <br />
            <span className="text-gold">예약</span>이라 믿습니다.
          </>
        }
        description={company.intro}
        backgroundImage={aboutImage}
      />

      {/* Mission statement */}
      <section className="border-b border-line py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
            <Reveal>
              <Eyebrow>OUR MISSION</Eyebrow>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-8">
              <Quote className="h-10 w-10 text-gold/40" />
              <p className="font-serif text-2xl leading-[1.6] sm:text-3xl sm:leading-[1.55] text-balance">
                우리는 &lsquo;노출&rsquo;을 팔지 않습니다.
                <span className="text-muted">
                  {" "}
                  신랑신부가 우리 예식장을 선택하는 순간을 설계하고, 그 선택이
                  예약으로 이어지도록{" "}
                </span>
                보이지 않는 모든 동선을 준비합니다.
              </p>
              <p className="text-sm text-faint">
                — {company.nameKo} 대표 {company.ceo}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Story / 운영 철학 */}
      <section
        id="philosophy"
        className="scroll-mt-20 border-b border-line bg-ink-2 py-24 md:py-32"
      >
        <Container>
          <SectionHeading eyebrow="OUR PHILOSOPHY" title="우리가 일을 대하는 태도" />
          <div className="mt-12 flex flex-col md:mt-16">
            {aboutStory.map((s, i) => (
              <Reveal
                key={s.heading}
                delay={i * 90}
                className="grid gap-5 border-t border-line-strong py-10 last:border-b md:grid-cols-[0.9fr_1.4fr] md:gap-12"
              >
                <h3 className="font-serif text-xl leading-snug sm:text-2xl">
                  {s.heading}
                </h3>
                <p className="max-w-[60ch] text-base leading-[1.9] text-paper/80">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Strengths */}
      <Strengths background="plain" id="strengths" />

      {/* Channels / 운영 채널·역량 + 성과 지표 */}
      <section
        id="equipment"
        className="scroll-mt-20 border-b border-line bg-ink-2 py-24 md:py-32"
      >
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="OUR CHANNELS" title="운영 채널·역량" />
            <Reveal delay={150} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted">
                신랑신부가 예식장을 찾는 모든 채널을 직접 운영합니다. 검색·플레이스부터
                블로그·SNS·숏폼까지, 자사 콘텐츠팀이 만든 콘텐츠로 채웁니다.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16">
            {equipment.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 90}
                className="panel-elevated flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-line-strong bg-surface">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover [filter:grayscale(0.4)_sepia(0.14)_brightness(0.95)]"
                  />
                </div>
                <div className="flex flex-col gap-2 p-7">
                  <span className="label text-gold">{item.tagline}</span>
                  <h3 className="font-serif text-xl">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 성과 지표 */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 70}
                className="flex flex-col gap-2 bg-surface p-8 text-center"
              >
                <span className="font-display text-4xl text-gold sm:text-5xl">
                  {m.value}
                  {m.suffix ? (
                    <span className="text-2xl sm:text-3xl">{m.suffix}</span>
                  ) : null}
                </span>
                <span className="text-xs leading-relaxed text-muted">
                  {m.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Departments / 조직도 */}
      <section
        id="team"
        className="scroll-mt-20 border-b border-line bg-ink-2 py-24 md:py-32"
      >
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="OUR TEAM" title="조직도" />
            <Reveal delay={150} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted">
                전략부터 콘텐츠 제작, 광고·DB 운영까지 — 마케팅에 필요한 모든
                조직을 당사 안에 두고, 전 스태프가 직속으로 움직입니다. 외주로
                흩어지지 않는 한 팀의 완성도를 만듭니다.
              </p>
            </Reveal>
          </div>

          {/* Org chart */}
          <div className="mt-16">
            {/* CEO */}
            <Reveal className="flex flex-col items-center">
              <div className="w-full max-w-xs rounded-2xl border border-line-strong bg-surface px-6 py-5 text-center">
                <span className="font-display text-xs tracking-wide text-gold">
                  CEO
                </span>
                <h3 className="mt-1 font-serif text-xl">{company.ceo}</h3>
                <p className="mt-1 text-xs text-muted">대표이사</p>
              </div>
              <span className="h-12 w-px bg-line-strong" />
            </Reveal>

            {/* Departments */}
            <div className="relative">
              <span className="absolute top-0 left-[16.66%] right-[16.66%] hidden h-px bg-line-strong sm:block" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {departments.map((dept, i) => (
                  <Reveal
                    key={dept.name}
                    delay={i * 70}
                    className="flex flex-col items-center"
                  >
                    <span className="hidden h-12 w-px bg-line-strong sm:block" />
                    <div className="panel-elevated flex h-full w-full flex-col gap-4 rounded-2xl border border-line-strong bg-surface p-6 sm:p-7">
                      <div className="flex flex-col gap-1">
                        <span className="label text-gold">{dept.tagline}</span>
                        <h4 className="font-serif text-lg leading-snug">
                          {dept.name}
                        </h4>
                      </div>
                      <ul className="flex flex-col gap-2 border-t border-line pt-4">
                        {dept.duties.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section
        id="values"
        className="scroll-mt-20 border-b border-line py-24 md:py-32"
      >
        <Container>
          <SectionHeading eyebrow="OUR VALUES" title="우리가 일하는 방식" />
          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 110}
                className="card-hover panel-elevated flex h-full flex-col gap-5 rounded-2xl border border-line-strong bg-surface p-8 md:p-10"
              >
                <span className="font-display text-4xl text-gold">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-xl leading-snug">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 border-b border-line py-24 md:py-32"
      >
        <Container>
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <div className="mt-12 md:mt-16">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <CTASection title="우리 예식장, 어디서부터 시작할까요?" />
    </>
  );
}
