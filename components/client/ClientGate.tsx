"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CLIENT_HINT_COOKIE } from "@/lib/client-access-shared";
import ClientAccessForm from "./ClientAccessForm";

/* 헤더의 [고객 전용] 버튼 — 이미 열었으면 바로 이동, 아니면 비밀번호 창.
   헤더에는 backdrop-filter 가 있어 그 안의 position: fixed 가 헤더 기준으로 잡히므로, 창은 body 로 portal.
   여기서 읽는 쿠키는 버튼 모양만 바꾸는 표시이고, 실제 열람 권한은 서버(proxy · 페이지)가 판단합니다. */

const hasHint = () => document.cookie.split("; ").includes(`${CLIENT_HINT_COOKIE}=1`);
const noSubscribe = () => () => {};

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" />
      {open ? <path d="M8.5 10.5V7.2a3.5 3.5 0 0 1 6.6-1.6" /> : <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />}
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

export function ClientGate({ variant = "text" }: { variant?: "text" | "icon" }) {
  const [open, setOpen] = useState(false);
  // 서버 렌더에서는 잠긴 모양, 브라우저에서는 쿠키 표시를 읽어 자물쇠 모양만 바꿈
  const unlocked = useSyncExternalStore(noSubscribe, hasHint, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`ca-trigger${variant === "icon" ? " is-icon" : ""}`}
        onClick={() => (hasHint() ? window.location.assign("/client") : setOpen(true))}
        aria-haspopup="dialog"
        aria-label={variant === "icon" ? "고객 전용 페이지" : undefined}
      >
        <LockIcon open={unlocked} />
        {variant === "text" && <span>고객 전용</span>}
      </button>
      {/* open 은 클릭 뒤에만 true — 그때는 항상 브라우저라 document 가 있음 */}
      {open &&
        createPortal(
          <div
            className="ca-veil"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <ClientAccessForm next="/client" onClose={close} asDialog />
          </div>,
          document.body,
        )}
    </>
  );
}
