import type { Metadata } from "next";
import {
  services,
  serviceGroups,
  processSteps,
  pageHeroImages,
  type ServiceGroup,
} from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "서비스",
  description:
    "인스타그램·웨딩홀 블로그 관리 대행, 네이버 블로그·카페 포스팅, 네이버 플레이스 마케팅과 홈페이지·랜딩페이지 제작, 웨딩홀 CRM·ERP, 웨딩박람회 플랫폼, 멤버십 프로그램까지. 하람마케팅의 서비스 9가지를 한눈에 확인하세요.",
  path: "/services",
  image: pageHeroImages.services,
});

// 데스크톱 카드 배치 — 마케팅 4개는 한 줄, 제작·개발 5개는 3+2(아랫줄 2개를 넓게)로 빈칸 없이.
const lgGrid: Record<ServiceGroup, string> = {
  marketing: "lg:grid-cols-4",
  build: "lg:grid-cols-6",
};
function lgSpan(group: ServiceGroup, index: number) {
  if (group !== "build") return "";
  return index < 3 ? "lg:col-span-2" : "lg:col-span-3";
}

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
        description="마케팅 대행 4가지, 제작·개발 5가지 — 우리가 하는 일은 분명합니다. 다만 무엇을 어떻게 엮을지는 예식장마다 다르게 설계합니다. 각 서비스를 눌러 자세한 내용을 확인하세요."
        backgroundImage={pageHeroImages.services}
      />

      {/* ── 서비스 — 마케팅 대행 / 제작·개발 묶음별 카드 그리드 ── */}
      {serviceGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-24 px-6 py-20 md:py-28"
        >
          <Container size="wide">
            <Reveal className="text-center">
              <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
                {group.tagline}
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
                {group.label}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
                {group.description}
              </p>
            </Reveal>

            <div
              className={`mt-14 grid gap-5 sm:grid-cols-2 ${lgGrid[group.id]}`}
            >
              {services
                .filter((s) => s.group === group.id)
                .map((s, i) => (
                  <ServiceCard
                    key={s.id}
                    service={s}
                    className={lgSpan(group.id, i)}
                  />
                ))}
            </div>
          </Container>
        </section>
      ))}

      {/* ── 접근 방식 — 묶음별 4단계 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Approach
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              마케팅도 제작도, 네 단계로 진행합니다
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
              마케팅은 매달 돌아가는 운영 사이클로, 제작은 기획부터 오픈·유지보수까지
              단계별로 진행합니다.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-16">
            {serviceGroups.map((group) => (
              <div key={group.id}>
                <div className="flex items-baseline gap-3 border-b border-line pb-4">
                  <h3 className="text-lg font-normal tracking-tight text-paper">
                    {group.label}
                  </h3>
                  <span className="text-[0.64rem] uppercase tracking-[0.2em] text-faint">
                    {group.tagline}
                  </span>
                </div>
                <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                  {processSteps[group.id].map((step) => (
                    <Reveal key={step.no}>
                      <span className="num text-sm font-light tracking-[0.2em] text-gold">
                        {step.no}
                      </span>
                      <h4 className="mt-4 text-xl font-normal tracking-tight text-paper">
                        {step.title}
                      </h4>
                      <p className="mt-3 text-[0.95rem] font-light leading-[1.7] text-muted">
                        {step.description}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
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
