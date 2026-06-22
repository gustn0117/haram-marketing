import type { Metadata } from "next";
import Link from "next/link";
import { addons, addonImages, aboutImage } from "@/lib/content";
import { CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Chapter, Plate } from "@/components/carnet";

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
        folio="No. 030"
        eyebrow="ADD-ON SERVICES"
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

      <Chapter folio="01 / 01" label="WHAT WE OFFER" title="지원서비스 영역.">
        <div className="border-t border-line-strong">
          {addons.map((a, i) => {
            const flip = i % 2 === 1;
            return (
              <Link
                key={a.id}
                href={`/addons/${a.id}`}
                className="group grid items-center gap-10 border-b border-line-strong py-12 lg:grid-cols-2 lg:gap-14"
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="folio text-sm text-faint">
                    A{String(i + 1).padStart(2, "0")} / 05
                  </span>
                  <span className="label mt-4 block text-gold">{a.tagline}</span>
                  <h3 className="mt-2 font-serif-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-500 group-hover:text-gold">
                    {a.name}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.85] text-muted">
                    {a.description}
                  </p>
                </div>
                <Plate
                  src={addonImages[a.id]}
                  bleed={flip ? "left" : "right"}
                  ratio="aspect-[5/4]"
                  caption={`Plate A${String(i + 1).padStart(2, "0")}`}
                />
              </Link>
            );
          })}
        </div>
      </Chapter>

      <CTASection
        title="필요한 구성을 함께 정리해 드립니다"
        description="마케팅 운영과 지원서비스를 어떻게 묶을지 막막하시면, 목표만 알려주세요. 맞춤으로 제안과 견적을 보내드립니다."
      />
    </>
  );
}
