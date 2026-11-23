import type { Metadata } from "next";
import LockedPanel from "@/components/client/LockedPanel";

/* 잠금 화면 — proxy.ts 가 권한 없는 /quote · /client · /documents 요청을 같은 주소 그대로 여기로 rewrite 합니다. */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "고객 전용",
  robots: { index: false, follow: false },
};

export default function LockedPage() {
  return <LockedPanel />;
}
