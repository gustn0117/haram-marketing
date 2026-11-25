import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { findAccount } from "./accounts";
import { readSession } from "./session";
import { homeOf } from "./shared";

/* 권한 확인 — 화면 · 자료 함수 앞에서 부릅니다.
   proxy.ts 는 로그인 쿠키가 있는지만 보고, 쿠키가 진짜인지와 누구인지는 여기서 확인합니다(Next 권장 방식).
   레이아웃은 화면을 옮길 때 다시 그려지지 않으므로, 각 페이지에서도 requireHall · requireAdmin 을 부릅니다. */

/** 로그인한 사람 — 없으면 null */
export const getViewer = cache(async () => {
  const session = await readSession();
  if (!session) return null;
  const viewer = await findAccount(session.sub);
  return viewer && viewer.role === session.role ? viewer : null;
});

export async function requireViewer() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");
  return viewer;
}

/** 웨딩홀 화면 — 하람 계정이면 웨딩홀 목록으로 */
export async function requireHall() {
  const viewer = await requireViewer();
  if (viewer.role !== "hall" || !viewer.hallId) redirect(homeOf(viewer.role));
  return { ...viewer, hallId: viewer.hallId };
}

/** 하람 화면 — 웨딩홀 계정이면 개요로 */
export async function requireAdmin() {
  const viewer = await requireViewer();
  if (viewer.role !== "admin") redirect(homeOf(viewer.role));
  return viewer;
}
