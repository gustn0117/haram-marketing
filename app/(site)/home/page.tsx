import type { ComponentProps } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  company,
  services,
  processSteps,
  faqs,
  metrics,
  strengths,
  heroImage,
  offeringImages,
  regions,
} from "@/lib/content";
import { Container } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  ServiceIcon,
  StrengthIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

type ServiceIconId = ComponentProps<typeof ServiceIcon>["id"];

const strategyCards = [
  {
    no: "01",
    title: "지역 검색을 선점",
    description:
      "예비부부가 가장 먼저 검색하는 지역·웨딩 키워드에서 발견되는 구조를 만듭니다.",
  },
  {
    no: "02",
    title: "후기로 신뢰를 축적",
    description:
      "홀투어, 식사, 주차, 응대 경험이 검색 결과와 SNS에서 설득력 있게 쌓이게 합니다.",
  },
  {
    no: "03",
    title: "상담 DB를 예약으로 연결",
    description:
      "광고와 랜딩, 응대 동선까지 하나로 묶어 문의가 홀투어와 계약으로 이어지게 합니다.",
  },
];

const operatingSignals = [
  "네이버 검색·플레이스",
  "블로그·체험단 후기",
  "인스타그램·릴스",
  "상담 DB·광고 전환",
  "사진·영상 콘텐츠",
  "예약 랜딩·홈페이지",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="premium-hero relative overflow-hidden">
        <Image
          src={heroImage}
          alt="고급 웨딩홀 연회장"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="premium-hero-shade absolute inset-0" aria-hidden />
        <Container
          size="wide"
          className="relative z-[2] flex min-h-[calc(88svh-3.5rem)] items-end pb-10 pt-24 lg:min-h-[calc(88svh-5rem)] lg:pb-14 lg:pt-28"
        >
          <div className="max-w-5xl">
            <span className="label rise text-gold" style={{ animationDelay: "60ms" }}>
              Wedding hall growth partner
            </span>
            <h1
              className="rise mt-5 font-serif-display text-[clamp(4rem,13vw,9rem)] leading-none text-paper"
              style={{ animationDelay: "140ms" }}
            >
              하람마케팅
            </h1>
            <p
              className="rise mt-6 max-w-2xl text-lg leading-[1.85] text-paper/82 md:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              웨딩홀의 품격을 예비부부의 상담 문의와 홀투어 예약으로
              바꾸는 예식장 전문 마케팅 파트너입니다.
            </p>

            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-[4px] bg-gold px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
              >
                무료 진단 신청
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${company.phone.replace(/-/g, "")}`}
                className="group inline-flex items-center justify-center gap-3 rounded-[4px] border border-paper/28 px-7 py-4 text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </div>

          </div>
        </Container>
      </section>

      <section className="bg-paper text-ink">
        <Container size="wide">
          <div className="grid border-x border-b border-ink/10 bg-[#fffaf3] sm:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-r border-ink/10 p-5 last:border-r-0 sm:border-b-0 md:p-7"
              >
                <p className="font-display text-4xl text-gold-deep md:text-5xl">
                  {metric.value}
                  {metric.suffix ? (
                    <span className="text-lg text-gold-deep/80">
                      {metric.suffix}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/62">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container
          size="wide"
          className="grid gap-10 py-16 md:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
        >
          <div>
            <span className="label text-gold-deep">Premium positioning</span>
            <h2 className="mt-5 max-w-2xl font-serif-display text-[clamp(2.3rem,5vw,4.8rem)] leading-[1.04]">
              웨딩홀은 예쁜 광고보다 정교한 예약 흐름이 필요합니다.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-[1.9] text-ink/70 md:text-lg">
            신랑신부는 검색에서 후보를 좁히고, 후기로 신뢰를 확인하고, SNS로
            분위기를 감각한 뒤 상담을 남깁니다. 하람마케팅은 그 모든 접점을
            하나의 예약 동선으로 설계합니다.
          </p>
        </Container>

        <Container size="wide" className="pb-20 md:pb-28">
          <div className="grid gap-3 md:grid-cols-3">
            {strategyCards.map((card) => (
              <article
                key={card.no}
                className="rounded-[8px] border border-ink/10 bg-white/55 p-6 shadow-[0_20px_60px_-46px_rgba(16,13,11,0.55)]"
              >
                <span className="folio text-3xl text-gold-deep">{card.no}</span>
                <h3 className="mt-5 font-serif text-2xl">{card.title}</h3>
                <p className="mt-4 text-sm leading-[1.85] text-ink/66">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f1e8] text-ink">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label text-gold-deep">Conversion system</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.7vw,4.3rem)] leading-[1.05]">
                예약을 만드는 6개의 운영 축
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-gold-deep"
            >
              전체 서비스 보기
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group overflow-hidden rounded-[8px] border border-ink/10 bg-[#fffaf3] shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55"
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
                      className="h-7 w-7 text-gold-deep"
                    />
                    <span className="folio text-sm text-ink/42">{service.no}</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">
                    {service.tagline}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.8] text-ink/64">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="label text-gold">Why HARAM</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              노출 보고서가 아니라 예약 성과로 말합니다.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-paper/68">
              웨딩홀 마케팅은 감각적인 콘텐츠와 촘촘한 전환 관리가 같이
              움직여야 합니다. 하람마케팅은 전략, 촬영, 광고, DB 운영을 한 팀의
              기준으로 묶습니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <article
                key={strength.id}
                className="rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6"
              >
                <StrengthIcon id={strength.id} className="h-8 w-8 text-gold" />
                <h3 className="mt-6 font-serif text-2xl">{strength.title}</h3>
                <p className="mt-4 text-sm leading-[1.85] text-paper/64">
                  {strength.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#17231f] text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="label text-gold">Operating loop</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.8vw,4.4rem)] leading-[1.05]">
                매월 더 정교해지는 예약 운영 루프
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {operatingSignals.map((signal) => (
                <span
                  key={signal}
                  className="border border-paper/12 px-3 py-3 text-center text-xs text-paper/70"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-14 grid border-t border-paper/16 md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.no}
                className="border-b border-paper/16 py-8 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
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

      <section className="bg-paper text-ink">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div>
            <span className="label text-gold-deep">Coverage</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06]">
              전국 주요 웨딩 상권을 읽고 움직입니다.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-ink/68">
              지역별 검색량, 경쟁 홀 노출, 시즌성, 박람회 흐름까지 함께 보고
              예식장마다 다른 성장 우선순위를 잡습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 border border-ink/10 sm:grid-cols-4">
            {regions.map((region) => (
              <span
                key={region}
                className="border-b border-r border-ink/10 px-4 py-4 text-center text-sm text-ink/70"
              >
                {region}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.62fr_1.38fr]"
        >
          <div>
            <span className="label text-gold">Q&A</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
              결정 전에 많이 묻는 질문
            </h2>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <Image
          src={offeringImages.brand}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="premium-cta-shade absolute inset-0" aria-hidden />
        <Container
          size="wide"
          className="relative z-[2] flex min-h-[560px] items-center py-20 md:py-28"
        >
          <div className="max-w-3xl">
            <span className="label text-gold">Start with diagnosis</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.6rem,6vw,5.4rem)] leading-none text-paper">
              우리 예식장의 빈 자리를 예약으로 바꿀 시간입니다.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.9] text-paper/74 md:text-lg">
              무료 진단으로 현재 노출, 문의, 상담 전환 상태를 먼저 확인해
              보세요. 담당 마케터가 1영업일 이내에 회신드립니다.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-[4px] bg-gold px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
            >
              무료 마케팅 진단 신청
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
