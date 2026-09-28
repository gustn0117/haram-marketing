import type { Metadata } from "next";
import { company } from "@/lib/content";

export const ogImage = "/og.jpg";
export const rssFeed = { "application/rss+xml": "/rss.xml" };

// 하위 페이지 메타데이터 — canonical·og:url·제목·설명·대표 이미지를 한 번에 채운다.
// openGraph·twitter·alternates는 세그먼트 사이에 통째로 교체(얕은 병합)되므로, 페이지에서
// 안 채우면 루트 레이아웃 값(홈 제목·홈 URL)이 모든 페이지에 그대로 상속된다.
export function pageMetadata({
  title,
  description,
  path,
  image = ogImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${company.nameKo}`;
  return {
    title,
    description,
    alternates: { canonical: path, types: rssFeed },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: company.nameKo,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
