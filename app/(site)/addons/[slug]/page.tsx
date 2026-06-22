import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { addons, faqs, siteUrl, addonImages } from "@/lib/content";
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

      <PageHero
        eyebrow={tagline}
        title={name}
        description={description}
        backgroundImage={addonImages[addon.id]}
      />

      {/* Overview — 라이트 */}
      <section className="bg-ink-2 text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"
        >
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="label text-gold">Overview</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              이렇게 진행합니다.
            </h2>
          </div>
          <div className="flex flex-col gap-7">
            {addon.overview.map((p, i) => (
              <p
                key={i}
                className="max-w-3xl text-base leading-[1.9] text-paper/70 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Scope — 다크 */}
      <section className="bg-ink text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <span className="label text-gold">Scope</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              포함 내용
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-paper/68">
              {name} 진행에 필요한 구성을 한 번에 묶어 제공합니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {addon.scope.map((s, i) => (
              <article
                key={s}
                className="rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6 transition-colors hover:border-gold/55"
              >
                <span className="folio text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-base leading-[1.7] text-paper/85">{s}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended For — 라이트(크림) */}
      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div>
            <span className="label text-gold">Who it&apos;s for</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06]">
              이런 경우 추천합니다.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-paper/68">
              지금 예식장의 상황에 맞춰 가장 효과가 큰 순서로 제안드립니다.
            </p>
          </div>
          <div className="grid border-t border-line">
            {addon.recommendedFor.map((r, i) => (
              <div
                key={r}
                className="flex items-center gap-6 border-b border-line py-6"
              >
                <span className="folio text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-paper/80 md:text-lg">
                  {r}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ — 다크 */}
      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.62fr_1.38fr]"
        >
          <div>
            <span className="label text-gold">FAQ</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
              자주 묻는 질문
            </h2>
          </div>
          <FaqList items={faqs} />
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
