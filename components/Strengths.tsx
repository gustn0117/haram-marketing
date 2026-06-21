import { strengths } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { StrengthIcon } from "@/components/icons";

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
            eyebrow="WHY HARAM PARTNERS"
            title={
              <>
                장비도, 사람도
                <br />
                모두 우리 안에.
              </>
            }
          />
          <Reveal delay={150} className="max-w-sm">
            <p className="text-sm leading-relaxed text-muted">
              음향·조명 장비를 직접 보유하고, 기획·연출·운영 전 스태프가 당사
              직속으로 움직입니다. 외주로 흩어지지 않는 한 팀의 완성도.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 90}
              className="card-hover flex h-full flex-col gap-6 rounded-2xl border border-line bg-surface p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line-strong text-gold">
                <StrengthIcon id={item.id} className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
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
