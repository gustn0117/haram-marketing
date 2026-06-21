"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company, heroImage } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

/**
 * 겉표지(커버) — 홈 첫 진입 시 풀스크린으로 덮는 오버레이.
 * 본문은 그대로 DOM에 남으므로 SEO 영향 없음.
 * 세션당 한 번만 노출(들어간 뒤에는 다시 표시되지 않음).
 */
export function Cover() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem("haram-entered") === "1";
    } catch {
      entered = false;
    }
    if (entered) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function enter() {
    setLeaving(true);
    try {
      sessionStorage.setItem("haram-entered", "1");
    } catch {
      /* noop */
    }
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setShow(false);
    }, 700);
  }

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-ink transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
      />
      <div className="absolute inset-0 bg-ink/82" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/45 to-ink"
        aria-hidden
      />

      {/* 샴페인 헤어라인 인셋 프레임 */}
      <div
        className="pointer-events-none absolute inset-4 rounded-2xl border sm:inset-6 md:inset-8"
        style={{ borderColor: "rgba(201, 168, 106, 0.28)" }}
        aria-hidden
      />

      <div className="relative z-2 flex flex-col items-center gap-8 px-6 text-center">
        <div
          className="rise flex items-center gap-4"
          style={{ animationDelay: "100ms" }}
        >
          <span className="h-px w-10 bg-gold/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
            Wedding Hall Marketing
          </span>
          <span className="h-px w-10 bg-gold/60" />
        </div>

        <div
          className="rise flex flex-col items-center gap-3"
          style={{ animationDelay: "220ms" }}
        >
          <h1 className="font-serif text-5xl leading-none text-paper sm:text-6xl md:text-7xl">
            {company.nameKo}
          </h1>
          <span className="font-display text-sm uppercase tracking-[0.5em] text-gold/80">
            {company.nameEn}
          </span>
        </div>

        <p
          className="rise max-w-md text-base leading-relaxed text-paper/70 sm:text-lg"
          style={{ animationDelay: "380ms" }}
        >
          {company.tagline}
        </p>

        <button
          type="button"
          onClick={enter}
          className="rise group mt-2 inline-flex items-center gap-3 rounded-sm bg-gold px-9 py-4 text-sm font-medium tracking-tight text-ink transition-colors duration-500 hover:bg-gold-bright"
          style={{ animationDelay: "540ms" }}
          aria-label="홈페이지 들어가기"
        >
          들어가기
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
