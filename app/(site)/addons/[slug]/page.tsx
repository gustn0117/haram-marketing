import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addons, faqs, siteUrl, addonImages } from "@/lib/content";
import { Container, CTASection, SectionHeading } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLeft, Plus } from "@/components/icons";

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
  const heroImage = addonImages[addon.id];

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
      {/* Header — 배경형 히어로 */}
      <section className="relative flex min-h-[48vh] items-end overflow-hidden border-b border-line bg-ink pt-32 pb-14 md:min-h-[54vh] md:pb-20">
        <Image
          src={heroImage}
          alt={`${name} — 하람마케팅 지원서비스`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover [filter:grayscale(0.55)_sepia(0.18)_brightness(0.9)]"
        />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-ink/10 via-transparent to-ink/80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-4 z-2 rounded-2xl border sm:inset-6 md:inset-8"
          style={{ borderColor: "var(--color-gold-frame)" }}
          aria-hidden
        />
        <Container className="relative z-3">
          <Link
            href="/addons"
            className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            지원서비스 전체
          </Link>
          <div className="mt-6 flex max-w-2xl flex-col gap-5">
            <span className="label text-gold">{tagline}</span>
            <h1 className="font-serif-display min-w-0 break-normal text-3xl leading-[1.1] text-paper [text-wrap:wrap] sm:text-4xl md:text-[2.9rem]">
              {name}
            </h1>
            <p className="min-w-0 break-normal text-base leading-[1.8] text-paper/80 [text-wrap:wrap]">
              {description}
            </p>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="label">OVERVIEW</span>
              <h2 className="font-serif text-2xl sm:text-3xl">이렇게 진행합니다</h2>
            </div>
            <div className="flex flex-col gap-6">
              {addon.overview.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-[1.85] text-paper/90 sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Scope + Recommended */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">SCOPE</span>
                <h2 className="font-serif text-2xl">포함 내용</h2>
              </div>
              <ul className="flex flex-col gap-3.5">
                {addon.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-base">
                    <Plus className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-paper/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">WHO IT&apos;S FOR</span>
                <h2 className="font-serif text-2xl">이런 경우 추천합니다</h2>
              </div>
              <ul className="flex flex-col">
                {addon.recommendedFor.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-center gap-5 border-t border-line py-4 last:border-b"
                  >
                    <span className="font-display text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-paper/90">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <div className="mt-12 md:mt-16">
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
