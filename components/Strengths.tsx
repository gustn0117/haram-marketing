import { strengths } from "@/lib/content";
import { Chapter } from "@/components/carnet";

// 강점 — 지그재그 인덱스 펼침면 (home/about 공용)
export function Strengths({
  folio = "02 / 06",
  id,
}: {
  folio?: string;
  id?: string;
}) {
  return (
    <Chapter
      folio={folio}
      label="WHY HARAM"
      title="노출이 아니라, 예약으로."
      id={id}
    >
      <div className="border-t border-line-strong">
        {strengths.map((s, i) => (
          <div
            key={s.id}
            className="index-row grid gap-6 border-b border-line-strong py-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <span className="folio text-[clamp(2.4rem,4vw,3.8rem)] text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-snug">
                {s.title}
              </h3>
            </div>
            <p
              className={`max-w-[52ch] text-[0.95rem] leading-[1.95] text-muted ${
                i % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}
