import type { Metadata } from "next";
import { company, contactFlow, faqs, heroImage } from "@/lib/content";
import { Container } from "@/components/ui";
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
        eyebrow="Get in touch"
        title={
          <>
            예식장 마케팅의 시작은
            <br />
            <span className="text-gold">한 통의 문의</span>입니다.
          </>
        }
        description="진단 단계부터 함께합니다. 예식장에 대한 간단한 정보만 남겨주시면 담당 마케터가 무료 진단과 맞춤 제안을 드립니다."
        backgroundImage={heroImage}
      />

      {/* 문의 — 연락처 + 폼 */}
      <section className="bg-paper text-ink">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
        >
          {/* 연락처 채널 */}
          <div>
            <span className="label text-gold-deep">Contact</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
              편하게 먼저 <span className="text-gold-deep">연락</span>하세요.
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.9] text-ink/68">
              전화가 빠르고, 문의 폼은 자세합니다. 어느 쪽이든 담당 마케터가
              직접 확인하고 회신드립니다.
            </p>

            <div className="mt-10 grid gap-3">
              {channels.map((ch) => {
                const Icon = ch.icon;
                const content = (
                  <div className="group flex items-start gap-5 rounded-[8px] border border-ink/10 bg-[#fffaf3] p-6 shadow-[0_24px_70px_-52px_rgba(16,13,11,0.55)] transition-colors hover:border-gold/55">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-ink/12 text-gold-deep transition-colors group-hover:border-gold-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col gap-1.5 pt-0.5">
                      <span className="text-xs uppercase tracking-[0.2em] text-gold-deep">
                        {ch.label}
                      </span>
                      <span className="text-base text-ink/82">{ch.value}</span>
                    </div>
                  </div>
                );
                return ch.href ? (
                  <a key={ch.label} href={ch.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={ch.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* 문의 폼 */}
          <div>
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* 진행 절차 */}
      <section className="bg-[#17231f] text-paper">
        <Container size="wide" className="py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <span className="label text-gold">How it works</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2.2rem,4.8vw,4.4rem)] leading-[1.05]">
              문의부터 예약까지, 이렇게 진행됩니다.
            </h2>
          </div>

          <div className="grid border-l border-t border-paper/16 sm:grid-cols-2 lg:grid-cols-3">
            {contactFlow.map((step) => (
              <article
                key={step.no}
                className="border-b border-r border-paper/16 p-8"
              >
                <span className="folio text-4xl text-gold">{step.no}</span>
                <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-paper/64">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-ink text-paper">
        <Container
          size="wide"
          className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.62fr_1.38fr]"
        >
          <div>
            <span className="label text-gold">Q&A</span>
            <h2 className="mt-5 font-serif-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
              자주 묻는 질문
            </h2>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>
    </>
  );
}
