import Link from "next/link";
import type { Service } from "@/lib/content";
import { ServiceIcon } from "@/components/ServiceIcons";

// 서비스 카드 — 홈·서비스 페이지 공용 (아이콘·번호·제목·영문 라벨·설명·비용 안내·자세히 보기)
export function ServiceCard({
  service,
  className = "",
}: {
  service: Service;
  className?: string;
}) {
  const { id, no, title, tagline, description, priceNote } = service;
  return (
    <Link
      href={`/services/${id}`}
      className={`card group flex flex-col p-8 ${className}`}
    >
      <div className="flex items-center justify-between">
        <ServiceIcon id={id} variant="static" className="h-8 w-8 text-gold" />
        <span className="folio text-sm tracking-[0.1em] text-faint">{no}</span>
      </div>
      <h3 className="mt-6 text-xl font-normal tracking-tight text-paper">
        {title}
      </h3>
      <p className="mt-1.5 text-[0.64rem] uppercase tracking-[0.2em] text-faint">
        {tagline}
      </p>
      <p className="mt-4 flex-1 text-[0.95rem] font-light leading-[1.7] text-muted">
        {description}
      </p>
      {priceNote ? (
        <p className="mt-5 text-[0.8rem] tracking-tight text-faint">
          비용 · {priceNote}
        </p>
      ) : null}
      <span className="mt-7 inline-flex items-center gap-1.5 text-sm text-gold transition-all duration-300 group-hover:gap-2.5">
        자세히 보기 <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
