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

const atelierSteps = [
  {
    no: "01",
    title: "Visibility",
    body: "검색과 플레이스에서 고급 웨딩홀의 첫 인상을 선점합니다.",
  },
  {
    no: "02",
    title: "Desire",
    body: "후기, 사진, 릴스, 블로그를 하나의 브랜드 무드로 축적합니다.",
  },
  {
    no: "03",
    title: "Booking",
    body: "광고와 상담 DB, 응대 동선을 홀투어 예약으로 연결합니다.",
  },
];

const premiumStandards = [
  "지역 검색 상권 분석",
  "프리미엄 후기 자산",
  "실예식 비주얼 콘텐츠",
  "상담 DB 전환 설계",
];

const operatingSignals = [
  "Search",
  "Place",
  "Review",
  "Social",
  "Film",
  "Landing",
  "Ads",
  "CRM",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="premium-hero relative overflow-hidden">
        <Image
          src={heroImage}
          alt="조명이 켜진 고급 웨딩홀 연회장"
          fill
          priority
          sizes="100vw"
          className="luxury-image object-cover"
        />
        <div className="luxury-hero-shade absolute inset-0" aria-hidden />
        <Container
          size="wide"
          className="relative z-[2] grid min-h-[calc(84svh-3.5rem)] items-end gap-10 pb-8 pt-24 lg:min-h-[calc(86svh-5rem)] lg:grid-cols-[minmax(0,1fr)_390px] lg:pb-12 lg:pt-28"
        >
          <div className="max-w-5xl">
            <span
              className="label rise text-gold"
              style={{ animationDelay: "60ms" }}
            >
              Private wedding hall growth house
            </span>
            <h1
              className="rise mt-5 font-serif-display text-[clamp(4.6rem,14vw,10.6rem)] leading-[0.88] text-paper"
              style={{ animationDelay: "140ms" }}
            >
              하람
              <br />
              마케팅
            </h1>
            <p
              className="rise mt-7 max-w-2xl text-lg leading-[1.85] text-paper/82 md:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              고급 웨딩홀의 브랜드 가치를 흐트러뜨리지 않고, 검색부터 상담
              예약까지 품격 있게 설계합니다.
            </p>

            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-[4px] bg-gold px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
              >
                프리미엄 진단 신청
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${company.phone.replace(/-/g, "")}`}
                className="group inline-flex items-center justify-center gap-3 rounded-[4px] border border-paper/28 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </div>
          </div>

          <aside
            className="rise hidden border border-paper/18 bg-ink/48 p-6 backdrop-blur-xl lg:block"
            style={{ animationDelay: "460ms" }}
          >
            <p className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-gold">
              The Reservation Atelier
            </p>
            <div className="mt-7 divide-y divide-paper/12">
              {atelierSteps.map((step) => (
                <div key={step.no} className="grid grid-cols-[3.2rem_1fr] gap-4 py-5">
                  <span className="folio text-3xl text-paper/36">{step.no}</span>
                  <div>
                    <h2 className="font-serif text-2xl text-paper">{step.title}</h2>
                    <p className="mt-2 text-sm leading-[1.75] text-paper/62">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-paper/12 pt-5 text-xs leading-[1.8] text-paper/52">
              {regions.slice(0, 8).join(" · ")} 중심의 예식장 상권을 진단합니다.
            </p>
          </aside>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container size="wide">
          <div className="grid border-x border-b border-paper/12 bg-[rgba(237,230,219,0.035)] sm:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-r border-paper/12 p-5 last:border-r-0 sm:border-b-0 md:p-7"
              >
                <p className="font-display text-4xl text-gold md:text-5xl">
                  {metric.value}
                  {metric.suffix ? (
                    <span className="text-lg text-gold/78">{metric.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/58">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-2 text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
        >
          <div>
            <span className="label text-gold">Luxury positioning</span>
            <h2 className="mt-5 max-w-3xl font-serif-display text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.98]">
              웨딩홀의 첫인상은 가격표보다 먼저 검색됩니다.
            </h2>
          </div>
          <div className="max-w-3xl border-l border-gold/35 pl-6">
            <p className="text-base leading-[1.95] text-paper/70 md:text-lg">
              고급 예식장은 할인 문구로 팔리지 않습니다. 홀의 공간감, 실제
              후기, 응대 품질, 예약 동선이 하나의 격으로 느껴져야 선택됩니다.
              하람마케팅은 그 격을 무너뜨리지 않는 방식으로 문의와 예약을
              만듭니다.
            </p>
          </div>
        </Container>

        <Container size="wide" className="pb-20 md:pb-28">
          <div className="grid border-y border-line lg:grid-cols-4">
            {premiumStandards.map((standard, index) => (
              <div
                key={standard}
                className="border-b border-r border-line px-1 py-7 last:border-r-0 lg:border-b-0"
              >
                <span className="folio text-4xl text-gold/72">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-7 font-serif text-2xl">{standard}</h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#201515] text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <span className="label text-gold">Signature suite</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[1.02]">
                예약을 만드는 모든 접점을 한 팀의 기준으로.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-[1.9] text-paper/64">
                검색, 콘텐츠, 광고, 랜딩, 상담 DB가 따로 움직이면 브랜드의
                인상이 깨집니다. 하람마케팅은 채널을 나열하지 않고 하나의
                예약 경험으로 엮습니다.
              </p>
              <Link
                href="/services"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold"
              >
                서비스 전체 보기
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="divide-y divide-paper/14 border-y border-paper/14">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group grid gap-6 py-8 transition-colors hover:bg-[rgba(237,230,219,0.035)] md:grid-cols-[7rem_1fr_8rem] md:items-center md:px-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="folio text-4xl text-paper/32">
                      {service.no}
                    </span>
                    <ServiceIcon
                      id={service.id as ServiceIconId}
                      className="h-7 w-7 text-gold"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold/78">
                      {service.tagline}
                    </p>
                    <h3 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.45rem)] leading-tight text-paper transition-colors group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-[1.82] text-paper/60">
                      {service.description}
                    </p>
                  </div>
                  <div className="relative hidden aspect-square overflow-hidden border border-paper/12 md:block">
                    <Image
                      src={offeringImages[service.id]}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover opacity-[0.76] saturate-[0.78] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div className="relative min-h-[520px] overflow-hidden border border-paper/14">
            <Image
              src={offeringImages.content}
              alt="웨딩홀 콘텐츠 촬영 현장"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="luxury-image object-cover"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-ink/78 via-transparent to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-gold">
                In-house creative and performance
              </p>
            </div>
          </div>

          <div>
            <span className="label text-gold">Why HARAM</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02]">
              고급스러운 노출과 실제 예약, 둘 다 놓치지 않습니다.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((strength) => (
                <article
                  key={strength.id}
                  className="border border-paper/12 p-6"
                >
                  <StrengthIcon id={strength.id} className="h-8 w-8 text-gold" />
                  <h3 className="mt-6 font-serif text-2xl">
                    {strength.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-paper/62">
                    {strength.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#14231f] text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="label text-gold">Operating ritual</span>
              <h2 className="mt-5 font-serif-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[1.02]">
                매월 더 정교해지는 예약 운영.
              </h2>
            </div>
            <div className="grid grid-cols-4 border border-paper/12">
              {operatingSignals.map((signal) => (
                <span
                  key={signal}
                  className="border-b border-r border-paper/12 px-3 py-4 text-center font-display text-xs uppercase tracking-[0.16em] text-paper/62"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-14 grid border-t border-line md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.no}
                className="border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              >
                <span className="folio text-5xl text-gold">{step.no}</span>
                <h3 className="mt-7 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-[1.82] text-paper/62">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-2 text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div>
            <span className="label text-gold">Coverage</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.05]">
              전국 주요 웨딩 상권을 고급스럽게 공략합니다.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-paper/68">
              지역 검색량, 경쟁 홀 노출, 시즌성, 박람회 흐름까지 함께 보고
              예식장마다 다른 성장 우선순위를 잡습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 border border-line sm:grid-cols-4">
            {regions.map((region) => (
              <span
                key={region}
                className="border-b border-r border-line px-4 py-4 text-center text-sm text-paper/70"
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
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[1.05]">
              계약 전, 대표님들이 가장 많이 묻는 질문
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
          className="luxury-image object-cover"
        />
        <div className="premium-cta-shade absolute inset-0" aria-hidden />
        <Container
          size="wide"
          className="relative z-[2] flex min-h-[600px] items-center py-20 md:py-28"
        >
          <div className="max-w-4xl">
            <span className="label text-gold">Private diagnosis</span>
            <h2 className="mt-5 font-serif-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.95] text-paper">
              우리 예식장의 품격에 맞는 예약 전략부터 확인하세요.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-[1.9] text-paper/74 md:text-lg">
              무료 진단으로 현재 노출, 문의, 상담 전환 상태를 먼저 확인해
              보세요. 담당 마케터가 1영업일 이내에 회신드립니다.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-[4px] bg-gold px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
            >
              프리미엄 진단 신청
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
