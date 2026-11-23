import Image from "next/image";
import "./development-visual.css";

const ASSETS = {
  crm: "/images/service-art/crm-checklist-3d-lossless.webp",
  homepage: "/images/service-art/homepage-designed-3d-lossless.webp",
  landing: "/images/service-art/landing-conversion-3d-lossless.webp",
  fair: "/images/service-art/fair-platform-3d-lossless.webp",
  membership: "/images/service-art/membership-benefits-3d-lossless.webp",
};

/** 기존 이미지 자리 안에 서비스별로 다른 개별 3D 비주얼을 표시합니다. */
export default function DevelopmentVisual({ id }: { id: keyof typeof ASSETS }) {
  const wide = id !== "landing" && id !== "membership";
  return (
    <div className={`mk mk-${wide ? "browser" : "phone"}-wrap mk-native mk-development-wrap`} data-service={id} aria-hidden="true">
      <div className={`mk-development-visual${wide ? " is-wide" : ""}`}>
        <div className="mk-development-art">
          <Image src={ASSETS[id]} alt="" fill unoptimized />
        </div>
      </div>
    </div>
  );
}
