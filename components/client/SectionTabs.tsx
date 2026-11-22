"use client";

import { useEffect, useState } from "react";

/* 상세 페이지 섹션 탭 — 위에 붙어 따라오고, 지금 보고 있는 섹션을 표시합니다. */
export default function SectionTabs({ tabs }: { tabs: { id: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-150px 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav className="pt-tabs" aria-label="이 페이지의 섹션">
      <div className="pt-tabs-track">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={active === tab.id ? "is-active" : undefined}
            aria-current={active === tab.id ? "true" : undefined}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
