import { priceOf, type Service } from "@/lib/quote-data";

/** 금액 줄 — [기준] 금액 원~ 을 줄마다 하나씩 (첫 제작 + 월 유지보수처럼 두 줄인 서비스도 있음).
 *  part — "basis" 기준만 · "amount" 금액만 (견적표처럼 칸을 나눌 때) · 없으면 둘 다.
 *  모양은 쓰는 자리(표지 · 서비스 페이지 · 안내서 …)의 CSS 가 .price-* 로 정합니다. */
export default function PriceLines({
  service,
  part,
  className,
}: {
  service: Service;
  part?: "basis" | "amount";
  className?: string;
}) {
  return (
    <span className={className ? `price-lines ${className}` : "price-lines"}>
      {priceOf(service).lines.map((line) => (
        <span key={line.basis} className="price-line">
          {part !== "amount" && <span className="price-basis">{line.basis}</span>}
          {part !== "basis" &&
            (line.amount === null ? (
              <span className="price-tbd">견적 협의</span>
            ) : (
              <>
                <span className="price-amount">{line.amount}</span>
                <span className="price-won">원</span>
                {line.from && <span className="price-from">~</span>}
              </>
            ))}
        </span>
      ))}
    </span>
  );
}
