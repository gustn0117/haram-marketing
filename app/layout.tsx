import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company, siteUrl, regions } from "@/lib/content";

const orgId = `${siteUrl}/#organization`;
const description =
  "행사기획 전문 하람파트너스. 기업 행사·컨퍼런스, 공연·페스티벌, 브랜드 프로모션, 포토부스, 교육·기관 행사를 기획부터 현장 운영까지 직접 진행합니다.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: company.nameKo,
      alternateName: [company.nameEn, "행사기획 하람파트너스"],
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      image: `${siteUrl}/hero/concert-hall.png`,
      description,
      founder: { "@type": "Person", name: company.ceo },
      address: {
        "@type": "PostalAddress",
        addressRegion: "경기",
        addressLocality: "수원시 영통구",
        addressCountry: "KR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: "Korean",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: company.nameKo,
      alternateName: [company.nameEn, "하람파트너스 행사기획"],
      inLanguage: "ko-KR",
      publisher: { "@id": orgId },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: company.nameKo,
      url: siteUrl,
      description,
      telephone: company.phone,
      parentOrganization: { "@id": orgId },
      address: {
        "@type": "PostalAddress",
        addressRegion: "경기",
        addressLocality: "수원시 영통구",
        addressCountry: "KR",
      },
      areaServed: regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
      knowsAbout: [
        "행사기획",
        "기업행사",
        "컨퍼런스",
        "공연기획",
        "페스티벌",
        "브랜드 프로모션",
        "포토부스",
        "교육·기관 행사",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "하람파트너스 | 행사기획·운영 전문",
    template: `%s | ${company.nameKo}`,
  },
  description:
    "행사기획 전문 하람파트너스. 기업 행사·컨퍼런스, 공연·페스티벌, 브랜드 프로모션부터 음향·조명 장비와 현장 운영까지 — 기획부터 마무리까지 직접 책임지는 행사기획 파트너입니다.",
  keywords: [
    "행사기획",
    "하람파트너스",
    "행사 기획",
    "행사대행",
    "행사 운영",
    "기업행사",
    "컨퍼런스",
    "공연기획",
    "페스티벌",
    "이벤트대행",
  ],
  applicationName: company.nameKo,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteUrl}/rss.xml` },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: company.nameKo,
    title: "하람파트너스 | 행사기획·운영 전문",
    description:
      "행사기획 전문 하람파트너스 — 브랜드의 순간을 설계합니다. 기획부터 현장 운영까지.",
    images: [
      {
        url: "/hero/concert-hall.png",
        width: 1672,
        height: 941,
        alt: "하람파트너스 행사기획",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "하람파트너스 | 행사기획·운영 전문",
    description: "행사기획 전문 하람파트너스 — 브랜드의 순간을 설계합니다.",
    images: ["/hero/concert-hall.png"],
  },
  verification: {
    other: {
      "naver-site-verification": "3b3a7ef6f32bac899fb9de75197725e1207f4602",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="relative z-2 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
