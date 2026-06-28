import { Plus } from "@/components/icons";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex max-w-2xl flex-col">
      {items.map((f) => (
        <details
          key={f.q}
          className="faq-item group border-t border-line last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
            <span className="text-lg font-light tracking-tight text-paper">
              {f.q}
            </span>
            <Plus
              className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="faq-body">
            <div className="overflow-hidden">
              <p className="pb-6 text-[1rem] font-light leading-[1.75] text-muted">
                {f.a}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
