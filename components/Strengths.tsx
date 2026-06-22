import { strengths } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Strengths({
  background = "alt",
  id,
}: {
  background?: "alt" | "plain";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-line py-24 md:py-32 ${
        background === "alt" ? "bg-ink-2" : ""
      }`}
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="WHY HARAM MARKETING"
            title={
              <>
                노출이 아니라,
                <br />
                예약으로 증명합니다.
              </>
            }
          />
          <Reveal delay={150} className="max-w-sm">
            <p className="text-sm leading-relaxed text-muted">
              웨딩홀 한 분야에만 집중합니다. 촬영·콘텐츠·광고를 자사 팀이 직접
              운영하고, 상담 문의와 예약 계약까지 숫자로 책임집니다.
            </p>
          </Reveal>
        </div>

        {/* 줄 구분 2×2 에디토리얼 그리드 */}
        <div className="mt-12 grid border-t border-line-strong sm:grid-cols-2 md:mt-16">
          {strengths.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 80}
              className="flex gap-6 border-b border-line-strong px-4 py-10 sm:px-8 sm:py-11 sm:odd:border-r"
            >
              <span className="font-display text-3xl leading-none text-gold/70 sm:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl leading-snug sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
