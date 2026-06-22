import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { addons, faqs, siteUrl } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";

type Params = { slug: string };

export function generateStaticParams() {
  return addons.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const addon = addons.find((a) => a.id === slug);
  if (!addon) return { title: "지원서비스" };
  return {
    title: addon.name,
    description: addon.description,
    alternates: { canonical: `/addons/${addon.id}` },
  };
}

export default async function AddonDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const addon = addons.find((a) => a.id === slug);
  if (!addon) notFound();

  const { name, tagline, description } = addon;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${siteUrl}/home` },
      {
        "@type": "ListItem",
        position: 2,
        name: "지원서비스",
        item: `${siteUrl}/addons`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${siteUrl}/addons/${addon.id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero eyebrow={tagline} title={name} description={description} />

      {/* ── Overview — 중앙 본문 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow" className="text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Overview
          </p>
          <div className="mx-auto mt-14 flex max-w-xl flex-col gap-7">
            {addon.overview.map((p, i) => (
              <p
                key={i}
                className="text-sm font-light leading-[1.9] text-muted md:text-base"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Scope — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Scope
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
            포함 내용
          </h2>
          <ul className="mx-auto mt-16 max-w-2xl">
            {addon.scope.map((s) => (
              <li
                key={s}
                className="border-t border-line py-7 text-center last:border-b"
              >
                <span className="text-xl font-light tracking-tight text-paper md:text-2xl">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Recommended For — 중앙, 여백 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Who it&apos;s for
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
            이런 경우 추천합니다.
          </h2>
          <div className="mx-auto mt-16 flex max-w-xl flex-col gap-10 text-center">
            {addon.recommendedFor.map((r) => (
              <p
                key={r}
                className="mx-auto max-w-md text-base font-light leading-[1.8] text-paper/85"
              >
                {r}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ — 중앙 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            FAQ
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
            자주 묻는 질문
          </h2>
          <div className="mx-auto mt-16 max-w-2xl">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <CTASection
        title={`${name}, 하람마케팅과 함께하세요.`}
        description="마케팅 운영과 묶어 한 번에 진행할 수 있습니다. 필요한 구성을 알려주시면 맞춤 제안과 견적을 보내드립니다."
        label="상담·견적 신청하기"
      />
    </>
  );
}
