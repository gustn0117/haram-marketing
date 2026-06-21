import type { Metadata } from "next";
import Link from "next/link";
import { addons, aboutImage } from "@/lib/content";
import { Container, Eyebrow, SectionHeading, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import {
  IconWeb,
  IconDoc,
  IconSearch,
  IconChart,
  IconPhotoBooth,
  ArrowUpRight,
} from "@/components/icons";

const addonIcons = {
  web: IconWeb,
  venue: IconSearch,
  marketing: IconChart,
  media: IconPhotoBooth,
  print: IconDoc,
} as const;

export const metadata: Metadata = {
  title: "지원서비스",
  description:
    "예약 홈페이지·랜딩 제작, 마케팅 진단·컨설팅, 상담 DB·예약 전환 관리, 웨딩 촬영·릴스, 박람회 부스·인쇄물까지. 웨딩홀 마케팅에 필요한 지원 서비스를 함께 제공합니다.",
  alternates: { canonical: "/addons" },
};

export default function AddonsPage() {
  return (
    <>
      <PageHero
        eyebrow="ADD-ON SERVICES"
        title={
          <>
            마케팅을 둘러싼
            <br />
            <span className="text-gold">모든 것까지.</span>
          </>
        }
        description="마케팅 그 자체를 넘어, 진단부터 예약 전환까지 필요한 일들을 함께 해결해 드립니다. 마케팅 운영과 묶어 한 번에 진행할 수 있습니다."
        backgroundImage={aboutImage}
      />

      {/* 지원서비스 — 줄 구분 2열 리스트 */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="WHAT WE OFFER" title="지원서비스 영역" />
          <div className="mt-12 grid border-t border-line sm:grid-cols-2">
            {addons.map((a, i) => {
              const Icon = addonIcons[a.icon];
              return (
                <Reveal
                  key={a.id}
                  delay={i * 60}
                  className="border-b border-line sm:odd:border-r"
                >
                  <Link
                    href={`/addons/${a.id}`}
                    className="group flex h-full flex-col gap-6 px-2 py-8 transition-colors duration-500 hover:bg-surface/40 sm:p-9 md:p-10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-line-strong text-gold transition-colors duration-500 group-hover:border-gold">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-xs tracking-wide text-gold">
                        {a.tagline}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-xl md:text-2xl">{a.name}</h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {a.description}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm text-gold">
                      자세히 보기
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28">
        <Container>
          <Reveal className="flex flex-col items-center gap-8 text-center">
            <Eyebrow>START A PROJECT</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl text-balance">
              필요한 구성을 함께 정리해 드립니다
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              마케팅 운영과 지원서비스를 어떻게 묶을지 막막하시면, 목표만 알려주세요.
              맞춤으로 제안과 견적을 보내드립니다.
            </p>
            <CTAButton href="/contact">상담·견적 신청하기</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
