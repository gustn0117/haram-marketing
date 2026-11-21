"use client";

import { company } from "@/lib/content";
import ClientAccessForm from "./ClientAccessForm";

/* 잠긴 고객 전용 주소(/client/...)로 바로 들어왔을 때 — 주소는 그대로 두고 이 화면을 보여 줍니다.
   비밀번호가 맞으면 지금 주소를 다시 열어 본문을 보여 줍니다(이동할 곳은 제출 순간의 주소로 정함). */
export default function LockedPanel() {
  return (
    <section className="ca-locked">
      <ClientAccessForm next="current" closeLabel="홈으로" onClose={() => window.location.assign("/")} />
      <p className="ca-locked-note">
        비밀번호는 견적서와 함께 전달드립니다. 받지 못하셨다면 {company.phone}로 문의해 주세요.
      </p>
    </section>
  );
}
