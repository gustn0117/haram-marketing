import type { MetadataRoute } from "next";
import { siteUrl, services, addons } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/home", "/about", "/services", "/addons", "/contact"];
  const servicePaths = services.map((s) => `/services/${s.id}`);
  const addonPaths = addons.map((a) => `/addons/${a.id}`);

  return [...staticPaths, ...servicePaths, ...addonPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" || path === "/addons" ? 0.8 : 0.7,
  }));
}
