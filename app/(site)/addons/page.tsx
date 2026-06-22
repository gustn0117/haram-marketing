import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { addons, addonImages, aboutImage } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import {
  IconWeb,
  IconDoc,
  IconSearch,
  IconChart,
  IconPhotoBooth,
} from "@/components/icons";

const addonIcons = {
  web: IconWeb,
  venue: IconSearch,
  marketing: IconChart,
  media: IconPhotoBooth,
  print: IconDoc,
} as const;

export const metadata: Metadata = {
  title: "지원서비스",
  description:
    "예약 홈페이지·랜딩 제작, 마케팅 진단·컨설팅, 상담 DB·예약 전환 관리, 웨딩 촬영·릴스, 박람회 부스·인쇄물까지. 웨딩홀 마케팅에 필요한 지원 서비스를 함께 제공합니다.",
  alternates: { canonical: "/addons" },
};

export default function AddonsPage() {
  return (
    <>
      <PageHero
        eyebrow="Add-on services"
        title={
          <>
            마케팅을 둘러싼
            <br />
            <span className="text-gold">모든 것까지.</span>
          </>
        }
        description="마케팅 그 자체를 넘어, 진단부터 예약 전환까지 필요한 일들을 함께 해결해 드립니다. 마케팅 운영과 묶어 한 번에 진행할 수 있습니다."
        backgroundImage={aboutImage}
      />

      <section className="bg-ink-2 text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-3xl">
            <span className="label text-gold">What we offer</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.7vw,4.3rem)] leading-[1.05]">
              지원서비스 영역
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {addons.map((a) => {
              const Icon = addonIcons[a.icon];
              return (
                <Link
                  key={a.id}
                  href={`/addons/${a.id}`}
                  className="group overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55"
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <Image
                      src={addonImages[a.id]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-ink/18" aria-hidden />
                  </div>
                  <div className="p-6">
                    <Icon className="h-7 w-7 text-gold" />
                    <p className="mt-5 text-xs uppercase tracking-[0.22em] text-gold">
                      {a.tagline}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug">
                      {a.name}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.8] text-paper/64">
                      {a.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        title="필요한 구성을 함께 정리해 드립니다"
        description="마케팅 운영과 지원서비스를 어떻게 묶을지 막막하시면, 목표만 알려주세요. 맞춤으로 제안과 견적을 보내드립니다."
      />
    </>
  );
}
