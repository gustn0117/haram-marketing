import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company, siteUrl, regions } from "@/lib/content";

const orgId = `${siteUrl}/#organization`;
const description =
  "웨딩홀 마케팅 전문 하람마케팅. 네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스 광고와 상담 DB, 영상·사진 콘텐츠, 예약 홈페이지까지 — 예식장의 상담 문의와 예약을 데이터로 책임지는 웨딩홀 특화 마케팅 파트너입니다.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: company.nameKo,
      alternateName: [company.nameEn, "웨딩홀 마케팅 하람마케팅", "예식장 마케팅"],
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      image: `${siteUrl}/icon.svg`,
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
      alternateName: [company.nameEn, "하람마케팅 웨딩홀 마케팅"],
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
        "웨딩홀 마케팅",
        "예식장 마케팅",
        "예식장 홍보",
        "네이버 플레이스 마케팅",
        "블로그 마케팅",
        "인스타그램 마케팅",
        "퍼포먼스 광고",
        "예식장 홈페이지 제작",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "하람마케팅 | 웨딩홀 마케팅 전문",
    template: `%s | ${company.nameKo}`,
  },
  description:
    "웨딩홀 마케팅 전문 하람마케팅. 네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스 광고와 상담 DB, 영상·사진 콘텐츠, 예약 홈페이지까지 — 노출에서 끝나지 않고 예약까지 책임지는 웨딩홀 특화 마케팅 파트너입니다.",
  keywords: [
    "웨딩홀 마케팅",
    "하람마케팅",
    "예식장 마케팅",
    "예식장 홍보",
    "웨딩홀 광고",
    "예식장 네이버 플레이스",
    "웨딩홀 블로그",
    "예식장 인스타그램",
    "웨딩홀 홈페이지 제작",
    "웨딩 마케팅 대행",
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
    title: "하람마케팅 | 웨딩홀 마케팅 전문",
    description:
      "웨딩홀 마케팅 전문 하람마케팅 — 예식장을 예약으로 채웁니다. 검색 노출부터 상담 예약까지.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "하람마케팅 웨딩홀 마케팅",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "하람마케팅 | 웨딩홀 마케팅 전문",
    description: "웨딩홀 마케팅 전문 하람마케팅 — 예식장을 예약으로 채웁니다.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14110f",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
