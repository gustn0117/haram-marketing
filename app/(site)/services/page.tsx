import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, processSteps, offeringImages, heroImage } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/icons";

type ServiceIconId = ComponentProps<typeof ServiceIcon>["id"];

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
        description="웨딩홀 마케팅의 검색·콘텐츠·광고·콘텐츠 제작을 직접 책임집니다. 각 영역을 눌러 자세한 내용을 확인하세요."
        backgroundImage={heroImage}
      />

      <section className="bg-ink text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-3xl">
            <span className="label text-gold">Conversion system</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.7vw,4.3rem)] leading-[1.05]">
              예약을 만드는 6개의 운영 축
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-paper/68">
              흩어지기 쉬운 마케팅 채널을 한 팀이 같은 기준으로 다룹니다. 각
              영역은 독립적으로, 또는 하나의 캠페인으로 함께 구성할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={offeringImages[service.id]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-ink/18" aria-hidden />
                </div>
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <ServiceIcon
                      id={service.id as ServiceIconId}
                      className="h-7 w-7 text-gold"
                    />
                    <span className="folio text-sm text-paper/42">
                      {service.no}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">
                    {service.tagline}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.8] text-paper/64">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-2 text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="label text-gold">How we work</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.8vw,4.4rem)] leading-[1.05]">
              모든 마케팅은 같은 원칙으로.
            </h2>
          </div>
          <div className="mt-14 grid border-t border-line md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.no}
                className="border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              >
                <span className="folio text-4xl text-gold">{step.no}</span>
                <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-paper/64">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="어떤 예식장을 운영하고 계신가요?"
        description="예식장의 상황과 목표를 알려주시면 맞춤 제안과 견적을 보내드립니다."
      />
    </>
  );
}
