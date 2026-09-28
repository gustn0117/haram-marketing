import type { MetadataRoute } from "next";
import { siteUrl, services, addons } from "@/lib/content";

// 색인 대상 정규 URL만 — 리다이렉트(/home)·비공개(/admin) 경로는 넣지 않는다.
// scripts/indexnow.mjs가 이 목록을 그대로 읽어 네이버 IndexNow로 제출한다.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["/", "/about", "/services", "/addons", "/contact"];
  const servicePaths = services.map((s) => `/services/${s.id}`);
  const addonPaths = addons.map((a) => `/addons/${a.id}`);

  return [...staticPaths, ...servicePaths, ...addonPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/services" || path === "/addons" ? 0.8 : 0.7,
  }));
}
