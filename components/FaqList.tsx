import { Plus } from "@/components/icons";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((f) => (
        <details
          key={f.q}
          className="faq-item group border-t border-line-strong last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
            <span className="font-serif text-lg leading-snug">{f.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-gold transition-[transform,border-color] duration-300 group-open:rotate-45 group-hover:border-gold/60">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          {/* grid-rows 0fr→1fr 로 절제된 펼침 (모션 최소) */}
          <div className="faq-body">
            <div className="overflow-hidden">
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-[1.8] text-muted">
                {f.a}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
