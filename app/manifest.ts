import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.nameKo} | 웨딩홀 마케팅 전문`,
    short_name: company.nameKo,
    description:
      "웨딩홀 마케팅 전문 하람마케팅 — 노출에서 끝나지 않고 예약까지 책임집니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#100d0b",
    theme_color: "#100d0b",
    lang: "ko",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
