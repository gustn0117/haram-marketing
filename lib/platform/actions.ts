"use server";

import { redirect } from "next/navigation";
import { checkLogin } from "./accounts";
import { createSession, deleteSession } from "./session";
import { homeOf, safeDashboardPath } from "./shared";

/* 로그인 · 로그아웃 (Server Actions) */

export type LoginState = { error: string; loginId: string };

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const loginId = String(formData.get("loginId") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!loginId || !password) return { error: "아이디와 비밀번호를 입력해 주세요.", loginId };

  const viewer = await checkLogin(loginId, password);
  if (!viewer) return { error: "아이디 또는 비밀번호가 맞지 않습니다.", loginId };

  await createSession(viewer.accountId, viewer.role);
  redirect(safeDashboardPath(formData.get("next")) ?? homeOf(viewer.role));
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
