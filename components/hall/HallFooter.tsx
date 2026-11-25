import Link from "next/link";
import { company } from "@/lib/content";
import { IconPhone, Mark } from "./icons";

/* 웨딩홀 화면 · 로그인 아래 — 회색 링크 줄 · 상담 안내 · 회사 정보 (signedIn: 로그인한 웨딩홀 화면이면 숫자 문의 안내 한 줄 더) */
export default function HallFooter({ signedIn = false }: { signedIn?: boolean }) {
  const tel = `tel:${company.phone.replace(/\D/g, "")}`;
  return (
    <footer className="hp-footer">
      <nav className="hp-footer-links" aria-label="하람마케팅">
        <div className="hp-wrap">
          <Link href="/">하람마케팅 홈페이지</Link>
          <Link href="/services">서비스 안내</Link>
          <Link href="/contact">문의하기</Link>
        </div>
      </nav>
      <div className="hp-wrap hp-footer-help">
        <div>
          <h2>하람마케팅 상담 안내</h2>
          <p>{company.hours}</p>
          {signedIn ? <p>숫자가 맞지 않거나 확인할 키워드를 바꾸고 싶으면 담당자에게 알려 주세요.</p> : null}
        </div>
        <div className="hp-footer-cta">
          <IconPhone />
          <p>전화 상담</p>
          <a href={tel} className="hp-btn is-line">
            {company.phone}
          </a>
        </div>
      </div>
      <div className="hp-footer-legal">
        <div className="hp-wrap">
          <p className="hp-footer-brand">
            <Mark className="hp-mark is-sm" />
            {company.nameKo}
          </p>
          <p>
            대표 {company.ceo}
            <i aria-hidden="true" />
            {company.address}
            <i aria-hidden="true" />
            {company.phone}
          </p>
          <p>© {company.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
