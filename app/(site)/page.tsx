import { services, processSteps, company } from "@/lib/content";
import { Container, CTAButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

// 메타데이터(canonical "/"·OG·RSS)는 루트 레이아웃 기본값을 그대로 쓴다.
export default function HomePage() {
  return (
    <>
      {/* ── HERO — 명확한 가치 제안 + CTA ── */}
      <section className="relative flex min-h-[90svh] items-center overflow-hidden px-6 pt-24 text-center">
        <span className="hero-photo-bg" aria-hidden />
        <Container size="default" className="relative z-2">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Wedding Hall Marketing
            </p>
            <h1 className="mx-auto mt-7 max-w-3xl text-[clamp(2rem,5.4vw,3.7rem)] font-light leading-[1.22] tracking-[-0.02em] text-paper">
              웨딩홀·예식장 전문 마케팅
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[1.05rem] font-light leading-[1.8] text-muted">
              {company.intro}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 서비스 9종 — 카드 3열 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              Our Services
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              마케팅 대행 4가지, 제작·개발 5가지
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-[1.75] text-muted">
              필요한 서비스만 골라 진행할 수 있습니다.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── 진행 방식 — 마케팅 운영 4단계 ── */}
      <section className="px-6 py-20 md:py-28">
        <Container size="wide">
          <Reveal className="text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
              How We Work
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
              마케팅은 매달 4단계로 운영합니다
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.marketing.map((step) => (
              <Reveal key={step.no}>
                <span className="num text-3xl font-light text-gold/70">
                  {step.no}
                </span>
                <h3 className="mt-4 text-lg font-normal tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] font-light leading-[1.7] text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 마무리 CTA ── */}
      <section className="relative overflow-hidden border-t border-line px-6 py-24 text-center md:py-32">
        <span className="closing-photo-bg" aria-hidden />
        <Container size="narrow" className="relative z-2">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.25] tracking-[-0.02em] text-paper">
              진단과 상담은 무료입니다
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[1rem] font-light leading-[1.75] text-muted">
              예식장 상황을 남겨 주시면 1영업일 안에 담당자가 연락드립니다.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton href="/contact">무료 진단 신청</CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
