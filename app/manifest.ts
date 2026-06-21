import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.nameKo} | 행사기획·운영 전문`,
    short_name: company.nameKo,
    description:
      "행사기획 전문 하람파트너스 — 기획부터 현장 운영까지 직접 책임집니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d1b2e",
    lang: "ko",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
