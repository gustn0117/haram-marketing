import { SpineRail, MobileNav } from "@/components/Header";
import { Footer } from "@/components/Footer";

// 본문 레이아웃 — 상단 내비게이션 + 모바일 미니바. 표지(/)에는 미적용.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <span className="scroll-progress" aria-hidden />
      <SpineRail />
      <MobileNav />
      <div className="flex min-h-screen flex-col pt-14 lg:pt-20">
        <main className="relative z-2 flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
