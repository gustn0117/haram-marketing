import type { Metadata } from "next";
import { processSteps, pageHeroImages } from "@/lib/content";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CompareBars, ChannelBars } from "@/components/charts";
import {
  RingsMotif,
  ChandelierMotif,
  AisleMotif,
  ArcDivider,
} from "@/components/Motifs";

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
        eyebrow="Our services"
        title={
          <>
            검색 노출부터 예약까지, <span className="foil">하나의 팀이.</span>
          </>
        }
        description="검색·콘텐츠·광고·제작 — 우리가 쓰는 방법은 분명합니다. 다만 무엇을 어떻게 엮을지는 예식장마다 다르게 설계합니다. 각 영역을 눌러 자세한 내용을 확인하세요."
        backgroundImage={pageHeroImages.services}
      />

      {/* ── 서비스 — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-10 md:py-14">
        <Reveal>
        <Container size="default">
          <RingsMotif className="mx-auto mb-8 w-[68px] text-gold/55" />
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Our Methods
          </p>
          <h2 className="mx-auto mt-8 max-w-2xl text-center text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
            상품 목록이 아니라, 우리가 쓰는 방법입니다.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm font-light leading-[1.9] text-muted">
            아래는 정해진 패키지가 아닙니다. 예식장마다 무엇이 부족하고 무엇이
            강점인지 다르기에, 우리는 이 방법들 중 그 예식장에 필요한 것만 골라
            다르게 설계합니다. 방법은 분명하고, 조합은 예식장마다 달라집니다.
          </p>
          <ServiceGrid />
        </Container>
        </Reveal>
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
                <span className="text-sm font-light tracking-[0.2em] text-gold">
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

      <Reveal className="px-6">
        <ArcDivider className="mx-auto block w-[min(82vw,640px)] text-gold/35" />
      </Reveal>

      {/* ── 성과(데이터 시각화) — 서비스 전후 비교 ── */}
      <section className="px-6 py-10 md:py-14">
        <Container size="wide">
          <Reveal className="text-center">
            <AisleMotif className="mx-auto mb-8 w-[120px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Proof
            </p>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
              마케팅 전후, 숫자가 달라집니다.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <CompareBars
                title="마케팅 전후 월 상담 문의"
                before={{ label: "이전", w: 26, value: "31" }}
                after={{ label: "이후", w: 100, value: "118" }}
                unit="건"
              />
            </Reveal>
            <Reveal>
              <ChannelBars
                title="채널별 상담 기여도"
                items={[
                  { label: "네이버 검색·플레이스", pct: 41 },
                  { label: "블로그·체험단", pct: 24 },
                  { label: "인스타그램·SNS", pct: 17 },
                  { label: "퍼포먼스 광고", pct: 12 },
                  { label: "영상·사진 콘텐츠", pct: 6 },
                ]}
              />
            </Reveal>
          </div>

          <p className="mt-12 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      <CTASection
        title="어떤 예식장을 운영하고 계신가요?"
        description="정해진 상품을 권하지 않습니다. 예식장의 상황과 목표를 알려주시면, 그 예식장에 맞게 설계한 제안과 견적을 보내드립니다."
      />
    </>
  );
}
