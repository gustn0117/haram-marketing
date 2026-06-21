import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services, processSteps } from "@/lib/content";
import { Container, Eyebrow, SectionHeading, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "기업 행사·컨퍼런스, 공연·페스티벌, 브랜드 프로모션, 의전·운영, 포토부스, 교육·기관 행사까지. 하람파트너스의 행사기획 서비스 영역을 한눈에 확인하세요.",
  alternates: { canonical: "/services" },
};

type Card = {
  id: string;
  title: string;
  tagline: string;
  description: string;
};

const serviceCardImages: Record<string, string> = {
  corporate: "/services/hero/corporate.png",
  festival: "/services/hero/festival.png",
  brand: "/services/hero/brand.png",
  operation: "/services/hero/operation.png",
  photobooth: "/services/hero/photobooth.png",
  education: "/services/hero/education.png",
};

function OfferingCard({
  card,
  icon,
}: {
  card: Card;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={`/services/${card.id}`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={serviceCardImages[card.id]}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong bg-ink/70 text-gold backdrop-blur">
          {icon}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-7">
        <span className="font-display text-xs tracking-wide text-gold">
          {card.tagline}
        </span>
        <h3 className="font-serif text-xl">{card.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{card.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-gold">
          자세히 보기
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={
          <>
            기획부터 현장 운영까지,
            <br />
            <span className="text-white">하나의 팀이.</span>
          </>
        }
        description="행사의 기획·연출·현장 운영을 직접 책임집니다. 각 영역을 눌러 자세한 내용을 확인하세요."
        backgroundImage="/services/hero/overview.png"
      />

      {/* 서비스 영역 */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="WHAT WE DO" title="서비스 영역" />
            <Reveal delay={150} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted">
                성격이 다른 행사들을 하나의 팀이 같은 기준으로 다룹니다. 각
                영역은 독립적으로 진행할 수도, 하나의 행사 안에서 함께 구성할
                수도 있습니다. 필요한 영역을 눌러 진행 범위와 방식을 확인해
                보세요.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <OfferingCard
                  card={s}
                  icon={<ServiceIcon id={s.id as never} className="h-5 w-5" />}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-b border-line py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="모든 프로젝트는 같은 원칙으로 움직입니다"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.no}
                className="group flex flex-col gap-5 bg-surface p-8 md:p-9"
              >
                <span className="font-display text-5xl text-faint transition-colors duration-500 group-hover:text-gold">
                  {step.no}
                </span>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
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
              어떤 행사를 준비하고 계신가요?
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              행사의 목적과 규모를 알려주시면 맞춤 제안과 견적을 보내드립니다.
            </p>
            <CTAButton href="/contact">상담·견적 신청하기</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
