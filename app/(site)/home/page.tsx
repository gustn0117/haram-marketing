import type { Metadata } from "next";
import Link from "next/link";
import { services, metrics, processSteps } from "@/lib/content";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO — 풀스크린, 중앙, 극대 여백 ── */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <span
          className="rise text-[0.72rem] uppercase tracking-[0.42em] text-gold"
          style={{ animationDelay: "80ms" }}
        >
          Wedding Hall Marketing
        </span>
        <h1
          className="rise mt-12 text-[clamp(3.2rem,9vw,7rem)] font-light leading-[0.98] tracking-[-0.03em] text-paper"
          style={{ animationDelay: "200ms" }}
        >
          하람마케팅
        </h1>
        <p
          className="rise mt-10 text-base font-light tracking-tight text-muted sm:text-lg"
          style={{ animationDelay: "360ms" }}
        >
          예식장을 예약으로 채웁니다
        </p>

        <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.4em] text-faint">
          Scroll
        </span>
      </section>

      {/* ── 선언문 ── */}
      <section className="px-6 py-32 md:py-52">
        <Container size="narrow" className="text-center">
          <p className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-light leading-[1.65] tracking-[-0.01em] text-paper/90">
            보기 좋은 조회수가 아니라,{" "}
            <span className="text-gold">실제로 식장을 채우는 예약</span>을
            만듭니다.
          </p>
        </Container>
      </section>

      {/* ── 서비스 — 중앙 정렬 리스트 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Services
          </p>
          <ul className="mx-auto mt-16 max-w-2xl">
            {services.map((s) => (
              <li key={s.id} className="border-t border-line last:border-b">
                <Link
                  href={`/services/${s.id}`}
                  className="group block py-9 text-center transition-colors"
                >
                  <span className="text-2xl font-light tracking-tight text-paper transition-colors duration-500 group-hover:text-gold md:text-[1.9rem]">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.24em] text-faint">
                    {s.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 지표 — 절제된 중앙 숫자 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="wide">
          <div className="grid gap-16 text-center sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-5xl font-light tracking-tight text-paper md:text-6xl">
                  {m.value}
                  {m.suffix ? (
                    <span className="text-2xl text-gold">{m.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-5 text-[0.66rem] uppercase tracking-[0.22em] text-faint">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 접근 방식 — 4단계, 중앙, 여백 ── */}
      <section className="px-6 py-28 md:py-44">
        <Container size="narrow">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Approach
          </p>
          <div className="mx-auto mt-16 flex max-w-xl flex-col gap-12">
            {processSteps.map((step) => (
              <div key={step.no} className="text-center">
                <span className="text-sm font-light tracking-[0.2em] text-gold">
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
      </section>

      {/* ── 마무리 ── */}
      <section className="px-6 py-40 md:py-56">
        <Container size="narrow" className="text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-gold">
            Start with diagnosis
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-paper">
            예식장의 빈 자리를
            <br />
            예약으로 바꿀 시간입니다.
          </p>
          <Link
            href="/contact"
            className="link-underline mt-14 inline-block text-sm tracking-[0.18em] text-gold"
          >
            무료 진단 신청 →
          </Link>
        </Container>
      </section>
    </>
  );
}
