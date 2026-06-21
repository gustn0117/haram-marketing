/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  company,
  values,
  aboutStory,
  departments,
  equipment,
  faqs,
} from "@/lib/content";
import { Container, Eyebrow, SectionHeading, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { Quote } from "@/components/icons";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "행사기획 전문 하람파트너스의 운영 철학과 조직, 자체 보유 장비 이야기. 장비도 사람도 모두 당사 안에서, 기획부터 현장 운영까지 직접 책임집니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT HARAM PARTNERS"
        title={
          <>
            행사의 격은
            <br />
            <span className="text-white">디테일</span>에서 완성됩니다.
          </>
        }
        description={company.intro}
        backgroundImage="/about/hero.png"
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
                우리는 행사를 &lsquo;진행&rsquo;하지 않습니다.
                <span className="text-muted">
                  {" "}
                  브랜드의 메시지가 사람의 마음에 닿는 순간을 설계하고, 그 순간이
                  완벽하게 작동하도록{" "}
                </span>
                보이지 않는 모든 것을 준비합니다.
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
          <div className="mt-14 flex flex-col">
            {aboutStory.map((s, i) => (
              <Reveal
                key={s.heading}
                delay={i * 90}
                className="grid gap-5 border-t border-line py-10 last:border-b md:grid-cols-[0.9fr_1.4fr] md:gap-12"
              >
                <h3 className="font-serif text-xl leading-snug sm:text-2xl">
                  {s.heading}
                </h3>
                <p className="text-base leading-[1.85] text-paper/90">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Strengths */}
      <Strengths background="plain" id="strengths" />

      {/* Equipment / 자체 보유 장비 */}
      <section
        id="equipment"
        className="scroll-mt-20 border-b border-line bg-ink-2 py-24 md:py-32"
      >
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="OUR EQUIPMENT" title="자체 보유 장비" />
            <Reveal delay={150} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted">
                음향·조명 핵심 장비를 직접 보유합니다. 외주 렌탈 없이 검증된
                장비를 행사에 바로 투입하고, 자사 오퍼레이터가 직접 운용합니다.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {equipment.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 90}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line bg-surface p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="mx-auto max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2 p-7">
                  <span className="font-display text-xs tracking-wide text-gold">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif text-xl">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
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
                기획부터 연출, 기술, 현장 운영까지 — 행사에 필요한 모든 조직을
                당사 안에 두고, 전 스태프가 직속으로 움직입니다. 외주로
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
                    <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-xs tracking-wide text-gold">
                          {dept.tagline}
                        </span>
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
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 110}
                className="card-hover flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface/50 p-8 md:p-10"
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
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28">
        <Container>
          <Reveal className="flex flex-col items-center gap-8 text-center">
            <SectionHeading
              align="center"
              title="함께 만들 행사가 있으신가요?"
              className="mx-auto max-w-xl"
            />
            <CTAButton href="/contact">프로젝트 문의하기</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
