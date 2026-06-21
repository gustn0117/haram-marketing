import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// 사이트 본문(헤더·푸터 포함) 레이아웃 — 표지(/)에는 적용되지 않습니다.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="relative z-2 flex-1">{children}</main>
      <Footer />
    </>
  );
}
