import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import HallFooter from "@/components/hall/HallFooter";
import { IconPhone, Mark } from "@/components/hall/icons";
import { PageTitle } from "@/components/hall/ui";
import { company } from "@/lib/content";
import { getViewer } from "@/lib/platform/dal";
import { homeOf, safeDashboardPath } from "@/lib/platform/shared";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "웨딩홀 로그인" };
export const viewport: Viewport = { themeColor: "#ffffff" };

/* 계약한 웨딩홀 로그인 — 아이디 · 비밀번호는 하람이 웨딩홀마다 발급 (가입 화면 없음).
   이미 로그인했으면 바로 첫 화면으로. next = 로그인 전에 열려던 플랫폼 주소 */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const viewer = await getViewer();
  if (viewer) redirect(homeOf(viewer.role));
  const { next } = await searchParams;
  const tel = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <div className="hp">
      <a href="#hp-main" className="hp-skip">
        본문으로 건너뛰기
      </a>
      <header className="hp-header is-simple">
        <div className="hp-wrap hp-header-row">
          <Link href="/" className="hp-logo" aria-label="하람마케팅 홈페이지로">
            <Mark className="hp-mark" />
            <span className="hp-logo-name">하람마케팅</span>
            <span className="hp-logo-tag">웨딩홀 플랫폼</span>
          </Link>
          <nav className="hp-header-links" aria-label="하람마케팅">
            <Link href="/">홈페이지</Link>
            <Link href="/contact" className="is-wide">
              문의하기
            </Link>
          </nav>
        </div>
      </header>

      <main id="hp-main" className="hp-main">
        <div className="hp-wrap">
          <PageTitle title="로그인" home={{ href: "/", label: "하람마케팅" }} />
          <div className="hp-login">
            <h2>웨딩홀 로그인</h2>
            <p className="hp-login-lead">하람마케팅과 계약한 웨딩홀 전용입니다. 담당자에게 받은 아이디와 비밀번호를 입력해 주세요.</p>
            <LoginForm next={safeDashboardPath(next) ?? ""} />
            <p className="hp-divider">계정 안내</p>
            <p className="hp-login-help">
              계정은 하람마케팅이 계약한 웨딩홀마다 발급합니다. 아이디나 비밀번호를 모르면 담당자에게 연락해 주세요.
            </p>
            <a href={tel} className="hp-btn is-line is-block is-lg">
              <IconPhone />
              담당자에게 전화하기
              <span className="hp-btn-sub">{company.phone}</span>
            </a>
            <p className="hp-login-sample">
              체험용 샘플 계정 <strong>sample</strong> / <strong>1234</strong>
            </p>
          </div>
        </div>
      </main>

      <HallFooter />
    </div>
  );
}
