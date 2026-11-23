import type { Metadata } from "next";
import {
  company,
  values,
  aboutStory,
  departments,
  equipment,
  faqs,
  pageHeroImages,
} from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "웨딩홀 마케팅 전문 하람마케팅의 일하는 기준, 팀 구성, 운영 채널을 소개합니다. 채널 운영, 콘텐츠 제작, 홈페이지·프로그램 개발을 자사 팀이 직접 합니다.",
  path: "/about",
  image: pageHeroImages.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Haram Marketing"
        title={
          <>
            하람마케팅을 소개합니다
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
              웨딩홀·예식장 마케팅만 합니다. 결과는 매달 상담 문의와 예약
              수로 말씀드리겠습니다.
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
              하람마케팅이 일하는 기준
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

      {/* ── 조직 ── */}
      <section id="team" className="scroll-mt-12 px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Team
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              세 팀이 나눠 맡습니다
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
        title="진단과 상담은 무료입니다"
        description="예식장 상황과 목표를 알려 주시면 필요한 서비스와 견적을 정리해 보내드립니다."
      />
    </>
  );
}
