import type { Metadata } from "next";
import Link from "next/link";
import { addons } from "@/lib/content";
import { Container, CTASection } from "@/components/ui";
import { PageHero } from "@/components/PageHero";

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
      />

      <section className="px-6 py-28 md:py-44">
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

      <CTASection
        title="필요한 구성을 함께 정리해 드립니다"
        description="마케팅 운영과 지원서비스를 어떻게 묶을지 막막하시면, 목표만 알려주세요. 맞춤으로 제안과 견적을 보내드립니다."
      />
    </>
  );
}
