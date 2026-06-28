import type { Metadata } from "next";
import { company, contactFlow, faqs, pageHeroImages } from "@/lib/content";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { DonutChart } from "@/components/charts";
import {
  RingsMotif,
  AisleMotif,
  ChandelierMotif,
  ArcDivider,
} from "@/components/Motifs";

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
            예식장 마케팅의 시작은 <span className="foil">한 통의 문의</span>입니다.
          </>
        }
        description="진단 단계부터 함께합니다. 예식장에 대한 간단한 정보만 남겨주시면 담당 마케터가 무료 진단과 맞춤 제안을 드립니다."
        backgroundImage={pageHeroImages.contact}
      />

      {/* ── 연락처 — 중앙 정렬 텍스트 ── */}
      <section className="px-6 py-10 md:py-14">
        <Reveal>
          <Container size="narrow">
            <RingsMotif className="mb-8 w-[68px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Contact
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-12">
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
      <section className="px-6 pb-10 md:pb-14">
        <Container size="narrow">
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* ── 응답 — 회신율 단일 시각자료 (절제, 중앙 1개) ── */}
      <section className="band px-6 py-14 md:py-20">
        <Container size="wide">
          <Reveal>
            <AisleMotif className="mb-8 w-[120px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Response
            </p>
            <h2 className="mt-8 max-w-xl text-[clamp(1.7rem,3.6vw,2.75rem)] font-light leading-[1.3] tracking-[-0.025em] text-paper">
              남겨주신 문의, 빠르게 회신드립니다.
            </h2>
          </Reveal>

          <Reveal className="mt-12 flex justify-center">
            <DonutChart
              value={98}
              label="1영업일 내 회신"
              caption="문의 후 평균 회신율"
            />
          </Reveal>

          <p className="mt-12 text-center text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            예시 데이터 · 실제 응대는 문의 시점에 따라 상이합니다
          </p>
        </Container>
      </section>

      {/* ── 진행 절차 — 6단계, 중앙 미니멀 ── */}
      <section className="px-6 py-10 md:py-14">
        <Reveal>
          <Container size="narrow">
            <ChandelierMotif className="mb-8 w-[60px] text-gold/55" />
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              How it works
            </p>
            <div className="stagger mt-12 flex max-w-xl flex-col gap-12">
              {contactFlow.map((step) => (
                <div key={step.no}>
                  <span className="folio text-xs tracking-[0.24em] text-gold">
                    {step.no}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-paper md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      <Reveal className="px-6">
        <ArcDivider className="mx-auto block w-[min(82vw,640px)] text-gold/35" />
      </Reveal>

      {/* ── FAQ ── */}
      <section className="band px-6 py-14 md:py-20">
        <Reveal>
          <Container size="narrow">
            <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              FAQ
            </p>
            <div className="mx-auto mt-12 max-w-2xl">
              <FaqList items={faqs} />
            </div>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
