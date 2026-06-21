import { siteUrl, company, services, addons } from "@/lib/content";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items = [
    {
      title: "회사소개 — 하람마케팅",
      link: `${siteUrl}/about`,
      desc: company.intro,
    },
    {
      title: "웨딩홀 마케팅 서비스",
      link: `${siteUrl}/services`,
      desc: "네이버 검색·플레이스, 블로그·체험단, 인스타그램·SNS, 퍼포먼스 광고와 상담 DB, 영상·사진 콘텐츠, 예약 홈페이지까지 직접 진행합니다.",
    },
    ...services.map((s) => ({
      title: s.title,
      link: `${siteUrl}/services/${s.id}`,
      desc: s.description,
    })),
    ...addons.map((a) => ({
      title: a.name,
      link: `${siteUrl}/addons/${a.id}`,
      desc: a.description,
    })),
  ];

  const buildDate = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(company.nameKo)} | 웨딩홀 마케팅</title>
    <link>${siteUrl}</link>
    <description>웨딩홀 마케팅 전문 하람마케팅 — 노출에서 끝나지 않고 예약까지.</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.link}</guid>
      <description>${esc(i.desc)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
