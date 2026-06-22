import type { Metadata } from "next";
import Link from "next/link";
import { services, processSteps } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

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
            검색 노출부터 예약까지,
            <br />
            <span className="text-gold">하나의 팀이.</span>
          </>
        }
        description="웨딩홀 마케팅의 검색·콘텐츠·광고·제작을 한 팀이 같은 기준으로 책임집니다. 각 영역을 눌러 자세한 내용을 확인하세요."
      />

      {/* ── 서비스 — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-28 md:py-44">
        <Reveal>
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Services
          </p>
          <ul className="mx-auto mt-16 max-w-2xl">
            {services.map((s) => (
              <li key={s.id} className="border-t border-line last:border-b">
                <Link
                  href={`/services/${s.id}`}
                  className="svc-row block py-9 text-center"
                >
                  <span className="svc-title text-2xl font-light text-paper md:text-[1.9rem]">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {s.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
        </Reveal>
      </section>

      {/* ── 접근 방식 — 4단계, 중앙, 여백 ── */}
      <section className="px-6 py-28 md:py-44">
        <Reveal>
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Approach
          </p>
          <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12">
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

      <CTASection
        title="어떤 예식장을 운영하고 계신가요?"
        description="예식장의 상황과 목표를 알려주시면 맞춤 제안과 견적을 보내드립니다."
      />
    </>
  );
}
