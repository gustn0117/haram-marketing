import type { Metadata } from "next";
import { company, contactFlow, faqs, pageHeroImages } from "@/lib/content";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { DonutChart } from "@/components/charts";

export const metadata: Metadata = {
  title: "문의",
  description:
    "하람마케팅에 웨딩홀 마케팅을 문의하세요. 전화 또는 문의 폼으로 남겨주시면 영업일 기준 1일 이내에 담당 마케터가 무료 진단과 함께 회신드립니다.",
  alternates: { canonical: "/contact" },
};

const channels: { label: string; value: string; href?: string }[] = [
  {
    label: "전화 문의",
    value: company.phone,
    href: `tel:${company.phone.replace(/-/g, "")}`,
  },
  { label: "오시는 길", value: company.address },
  { label: "운영 시간", value: company.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            예식장 마케팅의 시작은
            <br />
            <span className="text-gold">한 통의 문의</span>입니다.
          </>
        }
        description="진단 단계부터 함께합니다. 예식장에 대한 간단한 정보만 남겨주시면 담당 마케터가 무료 진단과 맞춤 제안을 드립니다."
        backgroundImage={pageHeroImages.contact}
      />

      {/* ── 연락처 — 중앙 정렬 텍스트 ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Contact
            </p>
            <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12 text-center">
              {channels.map((ch) => (
                <div key={ch.label}>
                  <span className="text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {ch.label}
                  </span>
                  {ch.href ? (
                    <a
                      href={ch.href}
                      className="mt-4 block text-2xl font-light tracking-tight text-paper transition-colors duration-500 hover:text-gold md:text-[1.9rem]"
                    >
                      {ch.value}
                    </a>
                  ) : (
                    <p className="mt-4 text-2xl font-light tracking-tight text-paper md:text-[1.9rem]">
                      {ch.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── 문의 폼 — 중앙 (즉시 표시, 모션 없음) ── */}
      <section className="px-6 pb-16 md:pb-24">
        <Container size="narrow">
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* ── 응답 — 회신율 단일 시각자료 (절제, 중앙 1개) ── */}
      <section className="px-6 py-16 md:py-24">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Response
            </p>
            <h2 className="mx-auto mt-8 max-w-xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.4] tracking-[-0.015em] text-paper">
              남겨주신 문의, 빠르게 회신드립니다.
            </h2>
          </Reveal>

          <Reveal className="mt-16 flex justify-center">
            <DonutChart
              value={98}
              label="1영업일 내 회신"
              caption="문의 후 평균 회신율"
            />
          </Reveal>

          <p className="mt-16 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 응대는 문의 시점에 따라 상이합니다
          </p>
        </Container>
      </section>

      {/* ── 진행 절차 — 6단계, 중앙 미니멀 ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              How it works
            </p>
            <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12">
              {contactFlow.map((step) => (
                <div key={step.no} className="text-center">
                  <span className="folio text-xs tracking-[0.24em] text-gold">
                    {step.no}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm font-light leading-[1.9] text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              FAQ
            </p>
            <div className="mx-auto mt-16 max-w-2xl">
              <FaqList items={faqs} />
            </div>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
