import { SpineRail, MobileNav } from "@/components/Header";
import { Footer } from "@/components/Footer";

// 본문 레이아웃 — 좌측 책등 레일(lg) + 상단 미니바(mobile). 표지(/)에는 미적용.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SpineRail />
      <MobileNav />
      <div className="flex min-h-screen flex-col pt-14 lg:pl-20 lg:pt-0">
        <main className="relative z-2 flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
