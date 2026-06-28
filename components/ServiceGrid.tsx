import Link from "next/link";
import { services } from "@/lib/content";
import { ServiceIcon } from "@/components/ServiceIcons";

// 서비스 6종을 가로 그리드(3×2)로 — 셀마다 라인 아이콘 + 한글 제목 + 영문 라벨.
// 셀 사이 1px 헤어라인(gap-px + bg-line-strong), 외곽 프레임. 호버 시 골드(=본) 강조.
export function ServiceGrid() {
  return (
    <div className="mt-14 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-14 sm:gap-x-12 lg:grid-cols-3">
      {services.map((s) => (
        <Link
          key={s.id}
          href={`/services/${s.id}`}
          className="svc-cell group flex flex-col items-start gap-4 py-2 text-left transition-colors duration-500"
        >
          <ServiceIcon
            id={s.id}
            className="h-9 w-9 text-gold/50 transition-colors duration-500 group-hover:text-paper"
          />
          <span className="block text-lg font-light leading-snug tracking-tight text-paper transition-colors duration-500 group-hover:text-gold md:text-xl">
            {s.title}
          </span>
          <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-faint">
            {s.tagline}
          </span>
        </Link>
      ))}
    </div>
  );
}
