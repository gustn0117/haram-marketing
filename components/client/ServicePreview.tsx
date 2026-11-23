import Image from "next/image";
import { SERVICE_PREVIEWS } from "@/lib/service-previews";
import "./service-preview.css";

export default function ServicePreview({
  id, className = "", decorative = false, preload = false,
  sizes = "(max-width: 960px) 90vw, 45vw",
}: {
  id: string;
  className?: string;
  decorative?: boolean;
  preload?: boolean;
  sizes?: string;
}) {
  const image = SERVICE_PREVIEWS[id];
  if (!image) return null;
  return (
    <span className={`service-preview ${className}`} data-service={id} aria-hidden={decorative || undefined}>
      <Image src={image.src} alt={decorative ? "" : image.alt} fill sizes={sizes} preload={preload} />
    </span>
  );
}
