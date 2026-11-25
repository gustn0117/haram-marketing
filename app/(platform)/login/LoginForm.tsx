"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/platform/actions";

const initialState: LoginState = { error: "", loginId: "" };

/* 로그인 입력 — 확인은 서버(lib/platform/actions.ts)가 하고, 맞으면 서버가 첫 화면으로 보냄 */
export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="hp-login-form">
      <input type="hidden" name="next" value={next} />
      <div className="hp-form-field">
        <label htmlFor="login-id" className="hp-form-label">
          아이디<span className="hp-req" aria-hidden="true">*</span>
        </label>
        <input
          id="login-id"
          className="hp-input is-lg"
          name="loginId"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={state.loginId}
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby="hp-login-error"
        />
      </div>
      <div className="hp-form-field">
        <label htmlFor="login-password" className="hp-form-label">
          비밀번호<span className="hp-req" aria-hidden="true">*</span>
        </label>
        <input
          id="login-password"
          className="hp-input is-lg"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby="hp-login-error"
        />
      </div>
      <p id="hp-login-error" className="hp-form-error" aria-live="polite">
        {state.error}
      </p>
      <button type="submit" className="hp-btn is-dark is-block is-lg" disabled={pending}>
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
