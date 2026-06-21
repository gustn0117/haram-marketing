import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  processSteps,
  faqs,
  siteUrl,
  company,
  offeringImages,
  type Service,
} from "@/lib/content";
import { Container, CTAButton, SectionHeading } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLeft, Plus } from "@/components/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "서비스" };
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function OfferingDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const { title, tagline, description } = service;
  const heroImage = offeringImages[service.id];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "서비스",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}/services/${service.id}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: title,
    description,
    provider: { "@type": "Organization", name: company.nameKo, url: siteUrl },
    areaServed: "KR",
    url: `${siteUrl}/services/${service.id}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />
      {/* Header — 배경형 히어로 */}
      <section className="relative flex min-h-[48vh] items-end overflow-hidden border-b border-line bg-ink pt-32 pb-14 md:min-h-[54vh] md:pb-20">
        <Image
          src={heroImage}
          alt={`${title} — 하람마케팅 웨딩홀 마케팅`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70"
          aria-hidden
        />
        <Container className="relative z-2">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            서비스 전체
          </Link>
          <div className="mt-6 flex w-full min-w-0 max-w-2xl flex-col gap-5">
            <span className="font-display min-w-0 break-normal text-sm tracking-wide text-white/70">
              {tagline}
            </span>
            <h1 className="font-serif min-w-0 break-normal text-3xl leading-[1.15] text-white [text-wrap:wrap] sm:text-4xl md:text-[2.9rem]">
              {title}
            </h1>
            <p className="min-w-0 break-normal text-base leading-relaxed text-white/80 [text-wrap:wrap]">
              {description}
            </p>
          </div>
        </Container>
      </section>

      <ServiceBody service={service} />

      {/* FAQ */}
      <section className="border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-24 md:py-28">
        <Container>
          <div className="flex flex-col items-center gap-7 text-center">
            <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl text-balance">
              {title}, 하람마케팅과 함께하세요.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              간단한 정보만 남겨주시면 담당 마케터가 맞춤 제안과 견적을
              보내드립니다.
            </p>
            <CTAButton href="/contact">견적·상담 신청하기</CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}

function ServiceBody({ service }: { service: Service }) {
  return (
    <>
      {/* Overview */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid min-w-0 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div className="flex min-w-0 flex-col gap-3">
              <span className="label">OVERVIEW</span>
              <h2 className="font-serif text-2xl sm:text-3xl">
                이렇게 접근합니다
              </h2>
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              {service.overview.map((p, i) => (
                <p
                  key={i}
                  className="min-w-0 break-normal text-base leading-[1.85] text-paper/90 [text-wrap:wrap] sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Program + Scope */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid min-w-0 gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">PROGRAM</span>
                <h2 className="font-serif text-2xl">주요 진행 항목</h2>
              </div>
              <ul className="flex flex-col">
                {service.items.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center gap-5 border-t border-line py-4 last:border-b"
                  >
                    <span className="font-display text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 break-normal text-base [text-wrap:wrap] transition-transform duration-500 group-hover:translate-x-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">SCOPE</span>
                <h2 className="font-serif text-2xl">진행 범위</h2>
              </div>
              <ul className="flex flex-col gap-3.5">
                {service.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-base">
                    <Plus className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span className="min-w-0 break-normal text-paper/90 [text-wrap:wrap]">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Recommended for */}
      <section className="border-b border-line bg-ink-2 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="WHO IT'S FOR" title="이런 분들께 추천합니다" />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {service.recommendedFor.map((r, i) => (
              <div
                key={r}
                className="flex min-w-0 flex-col gap-4 rounded-2xl border border-line bg-surface p-7"
              >
                <span className="font-display text-3xl text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="min-w-0 break-normal text-base leading-relaxed text-paper/90 [text-wrap:wrap]">
                  {r}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="진행 프로세스"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.no}
                className="group flex flex-col gap-4 bg-surface p-7"
              >
                <span className="font-display text-4xl text-faint transition-colors duration-500 group-hover:text-gold">
                  {step.no}
                </span>
                <h3 className="font-serif text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
