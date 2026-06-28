import type { Metadata } from "next";
import Link from "next/link";
import { services, processSteps, pageHeroImages } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcons";

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

      {/* ── 서비스 — 카드 3열 그리드 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Services
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              검색부터 예약까지, 한 팀이 책임집니다
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
              정해진 상품이 아니라, 예식장에 필요한 방법만 골라 설계합니다.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="card group flex flex-col p-8"
              >
                <div className="flex items-center justify-between">
                  <ServiceIcon
                    id={s.id}
                    variant="static"
                    className="h-8 w-8 text-gold"
                  />
                  <span className="num text-sm text-faint">{s.no}</span>
                </div>
                <h3 className="mt-6 text-xl font-normal tracking-tight text-paper">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.64rem] uppercase tracking-[0.2em] text-faint">
                  {s.tagline}
                </p>
                <p className="mt-4 flex-1 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {s.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm text-gold transition-all duration-300 group-hover:gap-2.5">
                  자세히 보기 <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 접근 방식 — 4단계 그리드 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Approach
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              진단에서 리포트까지, 네 단계로 운영합니다
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
              한 번의 집행이 아니라, 매달 돌아가는 운영 사이클로 성과를 쌓습니다.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <Reveal key={step.no}>
                <span className="num text-sm font-light tracking-[0.2em] text-gold">
                  {step.no}
                </span>
                <h3 className="mt-4 text-xl font-normal tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="어떤 예식장을 운영하고 계신가요?"
        description="정해진 상품을 권하지 않습니다. 예식장의 상황과 목표를 알려주시면, 그 예식장에 맞게 설계한 제안과 견적을 보내드립니다."
      />
    </>
  );
}
