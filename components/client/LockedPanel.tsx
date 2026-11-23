"use client";

import Link from "next/link";
import { company } from "@/lib/content";
import ClientAccessForm from "./ClientAccessForm";
import Specimen from "./Specimen";

/* 고객 전용 로그인 화면 — 잠긴 주소(/client/...)로 바로 들어왔을 때 주소는 그대로 두고 화면 전체를 덮습니다.
   비밀번호가 맞으면 지금 주소를 다시 열어 본문을 보여 줍니다. 왼쪽 예시 화면은 공개 목업(상세 문구 없음). */
export default function LockedPanel() {
  return (
    <div className="ca-login">
      <aside className="ca-login-art">
        <Link href="/" className="ca-login-brand">
          <span>하람마케팅</span>
          <span>HARAM MARKETING</span>
        </Link>
        <div className="ca-login-copy">
          <p className="ca-login-kicker">고객 전용</p>
          <h1>
            하람마케팅 견적서와
            <br />서비스 9종 안내입니다
          </h1>
          <ul>
            <li>서비스별 견적과 안내 페이지</li>
            <li>진행 방식과 받아보시는 결과물</li>
            <li>비용과 바로 상담 연결</li>
          </ul>
        </div>
        <div className="ca-login-shots" aria-hidden="true">
          <div className="ca-login-shot is-browser">
            <Specimen id="crm" />
          </div>
          <div className="ca-login-shot is-phone">
            <Specimen id="instagram" />
          </div>
        </div>
      </aside>
      <section className="ca-login-form">
        <ClientAccessForm next="current" closeLabel="홈으로" onClose={() => window.location.assign("/")} variant="plain" />
        <p className="ca-locked-note">
          비밀번호는 견적서와 함께 전달드립니다. 받지 못하셨다면 {company.phone}로 문의해 주세요.
        </p>
      </section>
    </div>
  );
}
