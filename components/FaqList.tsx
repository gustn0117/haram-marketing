import { Plus } from "@/components/icons";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((f) => (
        <details
          key={f.q}
          className="group border-t border-line last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
            <span className="font-serif text-lg leading-snug">{f.q}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-line-strong text-gold transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
