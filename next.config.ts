import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
