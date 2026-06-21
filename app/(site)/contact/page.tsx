import type { Metadata } from "next";
import { company, contactFlow, faqs, heroImage } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { MapPin, Phone, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "문의",
  description:
    "하람마케팅에 웨딩홀 마케팅을 문의하세요. 전화 또는 문의 폼으로 남겨주시면 영업일 기준 1일 이내에 담당 마케터가 무료 진단과 함께 회신드립니다.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Phone,
    label: "전화 문의",
    value: company.phone,
    href: `tel:${company.phone.replace(/-/g, "")}`,
  },
  { icon: MapPin, label: "오시는 길", value: company.address },
  { icon: Clock, label: "운영 시간", value: company.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title={
          <>
            예식장 마케팅의 시작은
            <br />
            <span className="text-white">한 통의 문의</span>입니다.
          </>
        }
        description="진단 단계부터 함께합니다. 예식장에 대한 간단한 정보만 남겨주시면 담당 마케터가 무료 진단과 맞춤 제안을 드립니다."
        backgroundImage={heroImage}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Info column */}
            <Reveal className="flex flex-col gap-10">
              <div className="flex flex-col gap-7">
                {channels.map((ch) => {
                  const Icon = ch.icon;
                  const content = (
                    <div className="group flex items-start gap-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-strong text-gold transition-colors duration-500 group-hover:border-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex flex-col gap-1 pt-0.5">
                        <span className="text-xs tracking-[0.16em] text-faint uppercase">
                          {ch.label}
                        </span>
                        <span className="text-base text-paper">{ch.value}</span>
                      </div>
                    </div>
                  );
                  return ch.href ? (
                    <a key={ch.label} href={ch.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={ch.label}>{content}</div>
                  );
                })}
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 진행 절차 */}
      <section className="border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="문의부터 예약까지, 이렇게 진행됩니다"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {contactFlow.map((step) => (
              <div
                key={step.no}
                className="group flex flex-col gap-4 bg-ink-2 p-8"
              >
                <span className="font-display text-4xl text-faint transition-colors duration-500 group-hover:text-gold">
                  {step.no}
                </span>
                <h3 className="font-serif text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <div className="mt-10">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
