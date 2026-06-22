import type { Metadata } from "next";
import Link from "next/link";
import { services, processSteps, offeringImages, heroImage } from "@/lib/content";
import { CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Chapter, Plate } from "@/components/carnet";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스 광고와 상담 DB, 영상·사진 콘텐츠, 브랜딩·예약 홈페이지까지. 하람마케팅의 웨딩홀 마케팅 서비스 영역을 한눈에 확인하세요.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        folio="No. 020"
        eyebrow="OUR SERVICES"
        title={
          <>
            검색 노출부터 예약까지,
            <br />
            <span className="text-gold">하나의 팀이.</span>
          </>
        }
        description="웨딩홀 마케팅의 검색·콘텐츠·광고·콘텐츠 제작을 직접 책임집니다. 각 영역을 눌러 자세한 내용을 확인하세요."
        backgroundImage={heroImage}
      />

      {/* 서비스 영역 — 좌우교차 플레이트 스프레드 */}
      <Chapter folio="01 / 02" label="WHAT WE DO" title="서비스 영역.">
        <div className="border-t border-line-strong">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group grid items-center gap-10 border-b border-line-strong py-12 lg:grid-cols-2 lg:gap-14"
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="folio text-sm text-faint">{s.no} / 06</span>
                  <span className="label mt-4 block text-gold">{s.tagline}</span>
                  <h3 className="mt-2 font-serif-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-500 group-hover:text-gold">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.85] text-muted">
                    {s.description}
                  </p>
                </div>
                <Plate
                  src={offeringImages[s.id]}
                  bleed={flip ? "left" : "right"}
                  ratio="aspect-[5/4]"
                  caption={`Plate ${String(i + 1).padStart(2, "0")}`}
                />
              </Link>
            );
          })}
        </div>
      </Chapter>

      {/* 프로세스 — 악보형 인덱스 */}
      <Chapter folio="02 / 02" label="HOW WE WORK" title="모든 마케팅은 같은 원칙으로.">
        <div className="grid divide-y divide-line-strong border-t border-line-strong md:grid-cols-4 md:divide-x md:divide-y-0">
          {processSteps.map((p) => (
            <div key={p.no} className="px-1 py-8 md:px-6 md:first:pl-0">
              <span className="folio text-[clamp(2rem,3vw,3rem)] text-gold">
                {p.no}
              </span>
              <span className="my-4 block h-5 w-px bg-gold/40" />
              <h3 className="font-serif text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Chapter>

      <CTASection
        title="어떤 예식장을 운영하고 계신가요?"
        description="예식장의 상황과 목표를 알려주시면 맞춤 제안과 견적을 보내드립니다."
      />
    </>
  );
}
