import { strengths } from "@/lib/content";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

// 강점 — 중앙 정렬 미니멀 (갤러리 톤)
export function Strengths({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-28 md:py-44">
      <Reveal>
      <Container size="narrow">
        <p className="text-center text-[0.72rem] uppercase tracking-[0.36em] text-gold">
          Why Haram
        </p>
        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-14 text-center">
          {strengths.map((s) => (
            <div key={s.id}>
              <h3 className="text-xl font-light tracking-tight text-paper md:text-2xl">
                {s.title}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm font-light leading-[1.9] text-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
      </Reveal>
    </section>
  );
}
