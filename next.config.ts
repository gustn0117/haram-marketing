import type { NextConfig } from "next";
import { siteUrl } from "./lib/content";

// 대표 호스트(siteUrl) 정규식 — has.value는 ^…$로 감싼 정규식으로 매칭된다.
const hostPattern = new URL(siteUrl).host.replace(/\./g, "\\.");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    // 검색엔진이 한 주소만 색인하도록 대표 URL(https + www 없음)로 통일.
    // 네이버 가이드가 301을 권장해 permanent(308) 대신 301을 쓴다.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${hostPattern}` }],
        destination: `${siteUrl}/:path*`,
        statusCode: 301,
      },
      {
        // cf-visitor: Cloudflare가 방문자 접속 스킴을 담아 보내는 헤더 — {"scheme":"http"}
        source: "/:path*",
        has: [
          { type: "host", value: hostPattern },
          { type: "header", key: "cf-visitor", value: '.*"scheme":"http".*' },
        ],
        destination: `${siteUrl}/:path*`,
        statusCode: 301,
      },
      // 옛 홈 주소 — 홈은 이제 / 에서 바로 렌더한다.
      { source: "/home", destination: "/", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // 모든 페이지(HTML/RSC)는 항상 재검증 — 배포 즉시 반영.
        // 중간 캐시(프록시·브라우저)가 s-maxage=1년으로 HTML을 동결하던 문제 제거.
        // /_next/ (콘텐츠 해시된 정적 자산)는 제외해 immutable 장기 캐시 유지.
        source: "/((?!_next/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
