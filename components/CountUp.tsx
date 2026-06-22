"use client";

import { useEffect, useRef, useState } from "react";

// 뷰포트 진입 시 0→목표로 카운트업 (정수). 숫자만 렌더, suffix는 부모가 처리.
export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          io.unobserve(entry.target);
          const duration = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}
