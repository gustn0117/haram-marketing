import type { Metadata } from "next";
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
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ArrowUpRight, Plus } from "@/components/icons";

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

      <PageHero
        eyebrow={tagline}
        title={title}
        description={description}
        backgroundImage={offeringImages[service.id]}
      />

      <ServiceBody service={service} />

      {/* FAQ — 다크 */}
      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.62fr_1.38fr]"
        >
          <div>
            <span className="label text-gold">Q&amp;A</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
              결정 전에 많이 묻는 질문
            </h2>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <CTASection
        title={`${title}, 하람마케팅과 함께하세요.`}
        description="간단한 정보만 남겨주시면 담당 마케터가 맞춤 제안과 견적을 보내드립니다."
        label="견적·상담 신청하기"
        image={offeringImages[service.id]}
      />
    </>
  );
}

function ServiceBody({ service }: { service: Service }) {
  return (
    <>
      {/* OVERVIEW — 라이트 2열 */}
      <section className="bg-ink-2 text-paper">
        <Container
          size="wide"
          className="grid gap-10 py-20 md:py-28 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16"
        >
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-paper/55 transition-colors hover:text-gold"
            >
              <ArrowUpRight className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-x-0.5" />
              서비스 전체
            </Link>
            <span className="label mt-6 block text-gold">Overview</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              이렇게 접근합니다
            </h2>
          </div>
          <div className="flex flex-col gap-7">
            {service.overview.map((p, i) => (
              <p
                key={i}
                className="max-w-3xl text-base leading-[1.9] text-paper/68 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* PROGRAM + SCOPE — 크림 배경, 번호 리스트 + 카드 */}
      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <span className="label text-gold">Program</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06]">
              주요 진행 항목
            </h2>
            <ul className="mt-10 border-t border-line">
              {service.items.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-center gap-6 border-b border-line py-5"
                >
                  <span className="folio text-2xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg leading-snug transition-transform duration-500 group-hover:translate-x-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label text-gold">Scope</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06]">
              진행 범위
            </h2>
            <div className="mt-10 rounded-[8px] border border-line bg-surface p-6 shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] md:p-8">
              <ul className="flex flex-col gap-4">
                {service.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-base">
                    <Plus className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span className="leading-[1.7] text-paper/70">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* WHO IT'S FOR — 다크 카드 3열 */}
      <section className="bg-ink text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="label text-gold">Who it&apos;s for</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              이런 분들께 추천합니다
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {service.recommendedFor.map((r, i) => (
              <article
                key={r}
                className="rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6 transition-colors hover:border-gold/55"
              >
                <span className="folio text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-base leading-[1.85] text-paper/68">
                  {r}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS — 딥그린 번호 그리드 */}
      <section className="bg-ink-2 text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="label text-gold">How we work</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.8vw,4.4rem)] leading-[1.05]">
              진행 프로세스
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
    </>
  );
}
