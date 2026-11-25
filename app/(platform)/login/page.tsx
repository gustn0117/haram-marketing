import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { company } from "@/lib/content";
import { getViewer } from "@/lib/platform/dal";
import { homeOf, safeDashboardPath } from "@/lib/platform/shared";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "웨딩홀 로그인" };

/* 계약한 웨딩홀 로그인 — 아이디 · 비밀번호는 하람이 웨딩홀마다 발급 (가입 화면 없음).
   이미 로그인했으면 바로 첫 화면으로. next = 로그인 전에 열려던 플랫폼 주소 */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const viewer = await getViewer();
  if (viewer) redirect(homeOf(viewer.role));
  const { next } = await searchParams;
  const tel = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <div className="pf-login">
      <Link href="/" className="pf-brand" aria-label="하람마케팅 홈페이지로">
        <span className="pf-brand-name">하람마케팅</span>
        <span className="pf-brand-en">HARAM MARKETING</span>
      </Link>
      <main className="pf-login-card">
        <h1>웨딩홀 로그인</h1>
        <p>하람마케팅과 계약한 웨딩홀 전용입니다. 담당자에게 받은 아이디와 비밀번호를 입력해 주세요.</p>
        <LoginForm next={safeDashboardPath(next) ?? ""} />
        <p className="pf-login-help">
          아이디나 비밀번호를 모르면 담당자에게 연락해 주세요. <a href={tel}>{company.phone}</a>
        </p>
      </main>
      <p className="pf-login-sample">체험용 샘플 계정: sample / 1234</p>
    </div>
  );
}
