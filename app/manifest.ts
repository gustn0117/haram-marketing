import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.nameKo} | 웨딩홀 마케팅 전문`,
    short_name: company.nameKo,
    description:
      "웨딩홀·예식장 마케팅 전문 하람마케팅",
    start_url: "/",
    display: "standalone",
    background_color: "#100d0b",
    theme_color: "#100d0b",
    lang: "ko",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
