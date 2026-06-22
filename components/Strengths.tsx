import { strengths } from "@/lib/content";
import { Container } from "@/components/ui";
import { StrengthIcon } from "@/components/icons";

// 강점 — 다크 카드 섹션 (새 홈 'Why HARAM'과 동일 언어)
export function Strengths({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 bg-ink text-paper">
      <Container
        size="wide"
        className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.78fr_1.22fr]"
      >
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="label text-gold">Why HARAM</span>
          <h2 className="mt-5 font-serif-display text-[clamp(2.1rem,4.5vw,4.2rem)] leading-[1.05]">
            노출이 아니라, 예약으로.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.9] text-paper/68">
            웨딩홀 한 분야에만 집중합니다. 촬영·콘텐츠·광고를 자사 팀이 직접
            운영하고, 상담 문의와 예약 계약까지 숫자로 책임집니다.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.map((s) => (
            <article
              key={s.id}
              className="rounded-[8px] border border-paper/12 bg-[rgba(237,230,219,0.045)] p-6"
            >
              <StrengthIcon id={s.id} className="h-8 w-8 text-gold" />
              <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
              <p className="mt-4 text-sm leading-[1.85] text-paper/64">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
