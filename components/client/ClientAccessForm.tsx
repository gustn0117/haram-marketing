"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { safeClientPath } from "@/lib/client-access-shared";
import "./client-access.css";

/* 고객 전용 비밀번호 폼 — 헤더의 비밀번호 창과, 잠긴 주소로 바로 들어왔을 때의 잠금 화면이 함께 씀.
   확인은 서버(/api/client-access)가 하고, 맞으면 열람 쿠키를 받은 뒤 next 주소로 이동합니다. */
export default function ClientAccessForm({
  next,
  onClose,
  closeLabel = "닫기",
  asDialog = false,
  variant = "panel",
}: {
  /** 이동할 주소 — "current" 면 지금 보던 고객 전용 주소 */
  next: string;
  onClose?: () => void;
  closeLabel?: string;
  asDialog?: boolean;
  /** panel = 카드(헤더의 비밀번호 창) · plain = 바탕 없이(로그인 화면) */
  variant?: "panel" | "plain";
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!value || status === "checking") return;
    setStatus("checking");
    const response = await fetch("/api/client-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    }).catch(() => null);
    if (response?.ok) {
      // "current" = 잠금 화면에서 연 경우 — 지금 보던 고객 전용 주소를 다시 엶
      window.location.assign(next === "current" ? safeClientPath(window.location.pathname) : next);
      return;
    }
    setStatus("wrong");
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <form
      className={`ca-panel${variant === "plain" ? " is-plain" : ""}${status === "wrong" ? " is-wrong" : ""}`}
      onSubmit={submit}
      {...(asDialog ? { role: "dialog", "aria-modal": true } : {})}
      aria-labelledby="ca-title"
      aria-describedby="ca-desc"
    >
      <span className="ca-brand">HARAM MARKETING</span>
      <h2 id="ca-title">고객 전용 페이지</h2>
      <p id="ca-desc">
        견적서와 서비스별 안내를 보실 수 있습니다. 견적서와 함께 전달받은 비밀번호를 입력해 주세요.
      </p>
      <label className="ca-field">
        <span className="sr-only">비밀번호</span>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={12}
          value={value}
          onChange={(event) => {
            setValue(event.target.value.replace(/\s/g, ""));
            if (status === "wrong") setStatus("idle");
          }}
          aria-invalid={status === "wrong"}
          aria-describedby="ca-error"
        />
      </label>
      <p id="ca-error" className="ca-error" aria-live="polite">
        {status === "wrong" ? "비밀번호가 맞지 않습니다. 다시 입력해 주세요." : ""}
      </p>
      <div className="ca-actions">
        {onClose && (
          <button type="button" className="ca-btn" onClick={onClose}>
            {closeLabel}
          </button>
        )}
        <button type="submit" className="ca-btn is-solid" disabled={!value || status === "checking"}>
          {status === "checking" ? "확인 중…" : "열기"}
        </button>
      </div>
    </form>
  );
}
