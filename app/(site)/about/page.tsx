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
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Strengths } from "@/components/Strengths";
import { FaqList } from "@/components/FaqList";

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
            마케팅의 끝은
            <br />
            <span className="text-gold">예약</span>이라 믿습니다.
          </>
        }
        description={company.intro}
        backgroundImage={aboutImage}
      />

      {/* Mission statement — 라이트 크림 선언문 */}
      <section className="bg-[#f7f1e8] text-ink">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.42fr_1.58fr] lg:items-start"
        >
          <span className="label text-gold-deep">Our mission</span>
          <div>
            <p className="font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.12]">
              우리는 <span className="text-gold-deep">노출</span>을 팔지 않습니다.
              신랑신부가 우리 예식장을 선택하는 순간을 설계하고, 그 선택이{" "}
              <span className="text-gold-deep">예약</span>으로 이어지도록 보이지
              않는 모든 동선을 준비합니다.
            </p>
            <p className="mt-8 text-sm text-ink/55">
              — {company.nameKo} 대표 {company.ceo}
            </p>
          </div>
        </Container>
      </section>

      {/* Story / 운영 철학 — 라이트 페이퍼 2열 행 */}
      <section id="philosophy" className="scroll-mt-24 bg-paper text-ink">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <span className="label text-gold-deep">Our philosophy</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              우리가 일을 대하는 태도
            </h2>
          </div>
          <div className="flex flex-col">
            {aboutStory.map((s, i) => (
              <article
                key={s.heading}
                className="grid gap-6 border-t border-ink/10 py-10 last:border-b md:grid-cols-[0.16fr_0.84fr_1fr] md:items-start md:gap-10"
              >
                <span className="folio text-3xl text-gold-deep">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-2xl leading-snug">
                  {s.heading}
                </h3>
                <p className="max-w-[60ch] text-base leading-[1.9] text-ink/68">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Strengths — 다크 카드 섹션 */}
      <Strengths id="strengths" />

      {/* Channels / 운영 채널·역량 + 성과 지표 — 라이트 크림 */}
      <section id="equipment" className="scroll-mt-24 bg-[#fffaf3] text-ink">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label text-gold-deep">Our channels</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
                운영 채널·역량
              </h2>
            </div>
            <p className="max-w-md text-base leading-[1.9] text-ink/68">
              신랑신부가 예식장을 찾는 모든 채널을 직접 운영합니다.
              검색·플레이스부터 블로그·SNS·숏폼까지, 자사 콘텐츠팀이 만든
              콘텐츠로 채웁니다.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {equipment.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-[8px] border border-ink/10 bg-[#fffaf3] shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-ink/18" aria-hidden />
                </div>
                <div className="p-6">
                  <span className="label text-gold-deep">{item.tagline}</span>
                  <h3 className="mt-3 font-serif text-2xl leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.8] text-ink/64">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 성과 지표 — 홈 메트릭 바 스타일 */}
          <div className="mt-12 grid border-x border-b border-ink/10 bg-[#fffaf3] sm:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="border-b border-r border-ink/10 p-5 last:border-r-0 sm:border-b-0 md:p-7"
              >
                <p className="font-display text-4xl text-gold-deep md:text-5xl">
                  {m.value}
                  {m.suffix ? (
                    <span className="text-lg text-gold-deep/80">{m.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/62">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Departments / 조직도 — 다크 딥그린 카드 그리드 */}
      <section id="team" className="scroll-mt-24 bg-[#17231f] text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label text-gold">Our team</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
                조직도
              </h2>
            </div>
            <p className="max-w-md text-base leading-[1.9] text-paper/68">
              전략부터 콘텐츠 제작, 광고·DB 운영까지 — 마케팅에 필요한 모든
              조직을 당사 안에 두고, 전 스태프가 직속으로 움직입니다. 외주로
              흩어지지 않는 한 팀의 완성도를 만듭니다.
            </p>
          </div>

          <div className="mb-5 rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6">
            <span className="label text-gold">CEO</span>
            <h3 className="mt-3 font-serif text-2xl">{company.ceo}</h3>
            <p className="mt-2 text-sm text-paper/64">대표이사</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {departments.map((dept) => (
              <article
                key={dept.name}
                className="rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6 transition-colors hover:border-gold/55"
              >
                <span className="label text-gold">{dept.tagline}</span>
                <h3 className="mt-3 font-serif text-2xl leading-snug">
                  {dept.name}
                </h3>
                <p className="mt-4 text-sm leading-[1.8] text-paper/64">
                  {dept.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-paper/12 pt-5">
                  {dept.duties.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-sm leading-relaxed text-paper/64"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Values — 라이트 페이퍼 번호 카드 */}
      <section id="values" className="scroll-mt-24 bg-paper text-ink">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <span className="label text-gold-deep">Our values</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              우리가 일하는 방식
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {values.map((value, i) => (
              <article
                key={value.title}
                className="rounded-[8px] border border-ink/10 bg-[#fffaf3] p-6 shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55"
              >
                <span className="folio text-3xl text-gold-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-serif text-2xl leading-snug">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-ink/66">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ — 다크 섹션 + 좌 제목/우 목록 2열 */}
      <section id="faq" className="scroll-mt-24 bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.62fr_1.38fr]"
        >
          <div>
            <span className="label text-gold">Q&amp;A</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
              자주 묻는 질문
            </h2>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <CTASection title="우리 예식장, 어디서부터 시작할까요?" />
    </>
  );
}
