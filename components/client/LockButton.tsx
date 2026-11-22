"use client";

import { useState, type ReactNode } from "react";

/** 잠그기 — 고객 전용 열람 쿠키를 지우고 홈으로. 모양은 className, 내용은 children(없으면 '잠그기') */
export default function ClientLockButton({
  className = "cl-lock",
  title,
  children,
}: {
  className?: string;
  title?: string;
  children?: ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className={className}
      title={title}
      aria-label="잠그기"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/client-access", { method: "DELETE" }).catch(() => null);
        window.location.assign("/");
      }}
    >
      {children ?? "잠그기"}
    </button>
  );
}
