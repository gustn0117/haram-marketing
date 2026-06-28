import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { addonHeroImages, addons, faqs, siteUrl } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { DonutChart } from "@/components/charts";
import { RingsMotif, ArcDivider } from "@/components/Motifs";

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

      <PageHero
        eyebrow={tagline}
        title={name}
        description={description}
        backgroundImage={addonHeroImages[addon.id]}
      />

      {/* ── Overview — 중앙 본문 ── */}
      <section className="px-6 py-14 md:py-20">
        <Container size="narrow" className="text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Overview
          </p>
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-7">
            {addon.overview.map((p, i) => (
              <p
                key={i}
                className="text-[1rem] font-light leading-[1.75] text-muted md:text-base"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Scope — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-14 md:py-20">
        <Container size="narrow">
          <Reveal>
            <RingsMotif className="mx-auto mb-8 block w-[68px] text-gold/55" />
          </Reveal>
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Scope
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(2rem,4.8vw,3.5rem)] font-light leading-[1.16] tracking-[-0.03em] text-paper">
            포함 내용
          </h2>
          <ul className="mt-12 max-w-2xl">
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
      <section className="px-6 py-14 md:py-20">
        <Container size="narrow">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Who it&apos;s for
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(2rem,4.8vw,3.5rem)] font-light leading-[1.16] tracking-[-0.03em] text-paper">
            이런 경우 추천합니다.
          </h2>
          <div className="mx-auto mt-12 flex max-w-xl flex-col gap-10 text-center">
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

      {/* ── Proof — 단일 도넛, 중앙 ── */}
      <section className="px-6 py-14 md:py-20">
        <Container size="narrow">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Proof
            </p>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.7rem,3.6vw,2.75rem)] font-light leading-[1.3] tracking-[-0.025em] text-paper">
              상담 전환에 보탬이 됩니다.
            </h2>
          </Reveal>

          <Reveal className="mx-auto mt-12 flex justify-center">
            <DonutChart
              value={86}
              label={`${name} 기여`}
              caption="평균 상담 전환 기여도"
            />
          </Reveal>

          <p className="mt-12 text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      <Reveal className="px-6">
        <ArcDivider className="mx-auto block w-[min(82vw,640px)] text-gold/35" />
      </Reveal>

      {/* ── FAQ — 중앙 ── */}
      <section className="px-6 py-14 md:py-20">
        <Container size="narrow">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            FAQ
          </p>
          <h2 className="mx-auto mt-10 max-w-xl text-center text-[clamp(2rem,4.8vw,3.5rem)] font-light leading-[1.16] tracking-[-0.03em] text-paper">
            자주 묻는 질문
          </h2>
          <div className="mt-12 max-w-2xl">
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
