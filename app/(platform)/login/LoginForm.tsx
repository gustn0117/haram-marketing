"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/platform/actions";

const initialState: LoginState = { error: "", loginId: "" };

/* 로그인 입력 — 확인은 서버(lib/platform/actions.ts)가 하고, 맞으면 서버가 첫 화면으로 보냄 */
export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="pf-login-form">
      <input type="hidden" name="next" value={next} />
      <label className="pf-field">
        <span>아이디</span>
        <input
          name="loginId"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={state.loginId}
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby="pf-login-error"
        />
      </label>
      <label className="pf-field">
        <span>비밀번호</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby="pf-login-error"
        />
      </label>
      <p id="pf-login-error" className="pf-form-error" aria-live="polite">
        {state.error}
      </p>
      <button type="submit" className="pf-btn is-solid is-block" disabled={pending}>
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
