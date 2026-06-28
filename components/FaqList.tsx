export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      {items.map((f) => (
        <details
          key={f.q}
          className="faq-item group border-t border-line last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
            <span className="text-lg font-light tracking-tight text-paper">
              {f.q}
            </span>
            <span className="shrink-0 text-xl font-light leading-none text-gold transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="faq-body">
            <div className="overflow-hidden">
              <p className="pb-6 text-[0.95rem] font-light leading-[1.85] tracking-[-0.01em] text-muted">
                {f.a}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
