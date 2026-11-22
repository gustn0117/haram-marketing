import type { Service } from "@/lib/content";
import { priceOf } from "@/lib/client-details";

/** 비용 줄 — [기준] 금액 원~ 을 줄마다 하나씩 (첫 제작 + 월 유지보수처럼 두 줄인 서비스도 있음).
 *  서버 컴포넌트 — 금액은 비밀번호를 연 요청에서만 렌더링됩니다. 모양은 쓰는 자리 CSS 가 .pt-price-* 로 정합니다. */
export default function PriceLines({ service, className }: { service: Service; className?: string }) {
  return (
    <span className={className ? `pt-price ${className}` : "pt-price"}>
      {priceOf(service).lines.map((line) => (
        <span key={line.basis} className="pt-price-line">
          <span className="pt-price-basis">{line.basis}</span>
          {line.amount === null ? (
            <span className="pt-price-tbd">견적 협의</span>
          ) : (
            <>
              <span className="pt-price-amount">{line.amount}</span>
              <span className="pt-price-won">원</span>
              {line.from && <span className="pt-price-from">~</span>}
            </>
          )}
        </span>
      ))}
    </span>
  );
}
