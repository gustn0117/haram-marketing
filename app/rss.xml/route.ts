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
      title: "회사소개 — 하람파트너스",
      link: `${siteUrl}/about`,
      desc: company.intro,
    },
    {
      title: "행사 기획·운영 서비스",
      link: `${siteUrl}/services`,
      desc: "기업 행사·컨퍼런스, 공연·페스티벌, 브랜드 프로모션, 의전·운영, 포토부스, 교육·기관 행사까지 직접 진행합니다.",
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
    <title>${esc(company.nameKo)} | 행사기획</title>
    <link>${siteUrl}</link>
    <description>행사기획 전문 하람파트너스 — 기획부터 현장 운영까지.</description>
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
