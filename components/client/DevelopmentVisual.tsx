import Image from "next/image";
import "./development-visual.css";

const ASSETS = {
  crm: "/images/service-art/crm-haram-logo-3d-lossless.webp",
  homepage: "/images/service-art/homepage-haram-logo-3d-lossless.webp",
};

/** 화면에 하람 공식 로고를 표시한 개별 3D 제작·개발 비주얼. */
export default function DevelopmentVisual({ id }: { id: keyof typeof ASSETS }) {
  return (
    <div className="mk mk-browser-wrap mk-native mk-development-wrap" data-service={id} aria-hidden="true">
      <div className="mk-development-visual">
        <div className="mk-development-art">
          <Image src={ASSETS[id]} alt="" fill unoptimized />
        </div>
      </div>
    </div>
  );
}
