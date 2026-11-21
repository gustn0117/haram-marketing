"use client";

import { useState } from "react";

/** 잠그기 — 고객 전용 열람 쿠키를 지우고 홈으로 */
export default function ClientLockButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className="cl-lock"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/client-access", { method: "DELETE" }).catch(() => null);
        window.location.assign("/");
      }}
    >
      잠그기
    </button>
  );
}
