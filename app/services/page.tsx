import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services, processSteps, offeringImages, heroImage } from "@/lib/content";
import { Container, Eyebrow, SectionHeading, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스 광고와 상담 DB, 영상·사진 콘텐츠, 브랜딩·예약 홈페이지까지. 하람마케팅의 웨딩홀 마케팅 서비스 영역을 한눈에 확인하세요.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={
          <>
            검색 노출부터 예약까지,
            <br />
            <span className="text-gold">하나의 팀이.</span>
          </>
        }
        description="웨딩홀 마케팅의 검색·콘텐츠·광고·콘텐츠 제작을 직접 책임집니다. 각 영역을 눌러 자세한 내용을 확인하세요."
        backgroundImage={heroImage}
      />

      {/* 서비스 영역 — 좌우 교차 에디토리얼 행 */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="WHAT WE DO" title="서비스 영역" />
            <Reveal delay={150} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted">
                흩어지기 쉬운 마케팅 채널을 하나의 팀이 같은 기준으로 다룹니다.
                각 영역은 독립적으로 진행할 수도, 하나의 캠페인 안에서 함께
                구성할 수도 있습니다. 필요한 영역을 눌러 진행 범위와 방식을
                확인해 보세요.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-line">
            {services.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={s.id} delay={i * 60}>
                  <Link
                    href={`/services/${s.id}`}
                    className="group grid items-center gap-8 border-b border-line py-9 md:grid-cols-2 md:gap-14 md:py-12"
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line ${
                        flip ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={offeringImages[s.id]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-ink/25" aria-hidden />
                    </div>
                    <div
                      className={`flex flex-col gap-4 ${flip ? "md:order-1" : ""}`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-3xl text-gold/70">
                          {s.no}
                        </span>
                        <span className="font-display text-xs tracking-wide text-gold">
                          {s.tagline}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-[2rem]">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted md:text-base">
                        {s.description}
                      </p>
                      <span className="inline-flex items-center gap-2 pt-2 text-sm text-gold">
                        자세히 보기
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process — 상단 룰 + 대형 넘버 (박스 그리드 제거) */}
      <section className="border-b border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="모든 마케팅은 같은 원칙으로 움직입니다"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.no}
                delay={i * 70}
                className="flex flex-col gap-4 border-t border-gold/30 pt-6"
              >
                <span className="font-display text-4xl text-gold">
                  {step.no}
                </span>
                <h3 className="font-serif text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28">
        <Container>
          <Reveal className="flex flex-col items-center gap-8 text-center">
            <Eyebrow>START A PROJECT</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl text-balance">
              어떤 예식장을 운영하고 계신가요?
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              예식장의 상황과 목표를 알려주시면 맞춤 제안과 견적을 보내드립니다.
            </p>
            <CTAButton href="/contact">상담·견적 신청하기</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
