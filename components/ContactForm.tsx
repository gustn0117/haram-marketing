"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

const budgets = ["1천만원 이하", "1천–3천만원", "3천–1억원", "1억원 이상", "미정"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState(services[0].title);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "전송에 실패했습니다.");
      }
      form.reset();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border border-line bg-surface/50 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-sm border border-gold text-gold">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-serif text-2xl">문의가 접수되었습니다</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          담당 마케터가 영업일 기준 1일 이내에 남겨주신 연락처로 회신드리겠습니다.
          감사합니다.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-sm text-gold link-underline"
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-7 rounded-2xl border border-line bg-surface/50 p-8 md:p-10"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="담당자명" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            placeholder="홍길동"
            className="form-input"
          />
        </Field>
        <Field label="예식장·업체명" htmlFor="company">
          <input
            id="company"
            name="company"
            placeholder="(선택)"
            className="form-input"
          />
        </Field>
        <Field label="연락처" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            required
            placeholder="010-0000-0000"
            className="form-input"
          />
        </Field>
      </div>

      <Field label="관심 서비스" htmlFor="type">
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setType(s.title)}
              className={`rounded-sm border px-4 py-2 text-sm transition-all duration-300 ${
                type === s.title
                  ? "border-gold bg-gold text-white"
                  : "border-line-strong text-muted hover:border-gold hover:text-paper"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
        <input type="hidden" name="type" value={type} />
      </Field>

      <Field label="예상 예산" htmlFor="budget">
        <select id="budget" name="budget" className="form-input appearance-none">
          {budgets.map((b) => (
            <option key={b} value={b} className="bg-ink-2 text-paper">
              {b}
            </option>
          ))}
        </select>
      </Field>

      <Field label="문의 내용" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="예식장 위치·규모, 현재 마케팅 상황, 원하시는 방향 등을 자유롭게 적어주세요."
          className="form-input resize-none"
        />
      </Field>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-1 inline-flex items-center justify-center gap-3 rounded-sm bg-gold px-8 py-4 text-sm font-medium text-white transition-colors duration-500 hover:bg-gold-deep disabled:opacity-60"
      >
        {submitting ? "보내는 중…" : "문의 보내기"}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2.5">
      <span className="text-xs tracking-[0.16em] text-faint uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
