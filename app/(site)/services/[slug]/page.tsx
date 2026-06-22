import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  processSteps,
  faqs,
  siteUrl,
  company,
  type Service,
} from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${siteUrl}/home` },
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

      <PageHero eyebrow={tagline} title={title} description={description} />

      <ServiceBody service={service} />

      <CTASection
        title={`${title}, 하람마케팅과 함께하세요.`}
        description="간단한 정보만 남겨주시면 담당 마케터가 맞춤 제안과 견적을 보내드립니다."
        label="견적·상담 신청하기"
      />
    </>
  );
}

function ServiceBody({ service }: { service: Service }) {
  return (
    <>
      {/* ── OVERVIEW — 중앙 2문단 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow" className="text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Overview
          </p>
          <div className="mx-auto mt-16 flex max-w-xl flex-col gap-7">
            {service.overview.map((p, i) => (
              <p
                key={i}
                className="text-base font-light leading-[1.9] text-muted"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROGRAM — 중앙 리스트 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Program
          </p>
          <ul className="mx-auto mt-16 max-w-2xl">
            {service.items.map((item) => (
              <li
                key={item}
                className="border-t border-line py-7 text-center last:border-b"
              >
                <span className="text-xl font-light tracking-tight text-paper md:text-2xl">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── SCOPE — 중앙 리스트 (아이콘 없이) ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Scope
          </p>
          <ul className="mx-auto mt-16 flex max-w-xl flex-col gap-6 text-center">
            {service.scope.map((s) => (
              <li
                key={s}
                className="text-sm font-light leading-[1.9] text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── WHO IT'S FOR — 중앙 텍스트 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Who it&apos;s for
          </p>
          <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12 text-center">
            {service.recommendedFor.map((r) => (
              <p
                key={r}
                className="mx-auto max-w-md text-lg font-light leading-[1.7] text-paper md:text-xl"
              >
                {r}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROCESS — 중앙 미니멀 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            How we work
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
      </section>

      {/* ── FAQ — 중앙 미니멀 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Q&amp;A
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
            결정 전에 많이 묻는 질문
          </h2>
          <div className="mx-auto mt-14 max-w-2xl">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      {/* ── back link — 작은 link-underline ── */}
      <section className="px-6 pb-12 text-center">
        <Link
          href="/services"
          className="link-underline text-sm tracking-[0.18em] text-gold"
        >
          ← 서비스 전체
        </Link>
      </section>
    </>
  );
}
