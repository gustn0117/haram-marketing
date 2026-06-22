import type { Metadata } from "next";
import Link from "next/link";
import { addons } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { DonutChart } from "@/components/charts";

export const metadata: Metadata = {
  title: "지원서비스",
  description:
    "홈페이지 제작·유지보수, 마케팅 진단·컨설팅, 상담 CRM 구축·관리, 웨딩 촬영·릴스까지. 온라인 웨딩홀 마케팅에 필요한 지원 서비스를 함께 제공합니다. (현수막 등 오프라인 제작물은 제외)",
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
      />

      <section className="px-6 py-16 md:py-24">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            What we offer
          </p>
          <ul className="mx-auto mt-16 max-w-2xl">
            {addons.map((a) => (
              <li key={a.id} className="border-t border-line last:border-b">
                <Link
                  href={`/addons/${a.id}`}
                  className="group block py-9 text-center transition-colors"
                >
                  <span className="text-2xl font-light tracking-tight text-paper transition-colors duration-500 group-hover:text-gold md:text-[1.9rem]">
                    {a.name}
                  </span>
                  <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {a.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 지원서비스 효과(데이터 시각화) ── */}
      <section className="px-6 py-16 md:py-24">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Proof
            </p>
            <h2 className="mx-auto mt-8 max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
              지원서비스는 운영을 가볍게, 전환을 무겁게.
            </h2>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-14 md:grid-cols-3 md:gap-16">
            <Reveal>
              <DonutChart
                value={92}
                label="홈페이지 상담 전환"
                caption="제작·최적화한 홈페이지의 유입 대비 상담 신청 비율"
              />
            </Reveal>
            <Reveal>
              <DonutChart
                value={64}
                label="상담 응대 단축"
                caption="CRM 도입 후 문의 응대까지 걸리는 시간 절감"
              />
            </Reveal>
            <Reveal>
              <DonutChart
                value={78}
                label="릴스 노출 기여"
                caption="웨딩 촬영·릴스가 신규 노출에서 차지하는 비중"
              />
            </Reveal>
          </div>

          <p className="mt-16 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 성과는 예식장별로 상이합니다
          </p>
        </Container>
      </section>

      <CTASection
        title="필요한 구성을 함께 정리해 드립니다"
        description="마케팅 운영과 지원서비스를 어떻게 묶을지 막막하시면, 목표만 알려주세요. 맞춤으로 제안과 견적을 보내드립니다."
      />
    </>
  );
}
