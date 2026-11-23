import Image from "next/image";
import "./naver-visual.css";

const ASSETS = {
  blog: "/images/service-art/blog-wedding-3d-lossless.webp",
  posting: "/images/service-art/posting-wedding-3d-lossless.webp",
  place: "/images/service-art/place-wedding-3d-lossless.webp",
};

/** 기존 서비스 이미지 영역에 표시하는, 문구 없는 개별 3D 비주얼. */
export default function NaverVisual({ id }: { id: keyof typeof ASSETS }) {
  const wide = id === "blog";
  return (
    <div className={`mk mk-${wide ? "browser" : "phone"}-wrap mk-native mk-naver-wrap`} data-service={id} aria-hidden="true">
      <div className={`mk-naver-visual${wide ? " is-wide" : ""}`}>
        <div className="mk-naver-art">
          <Image src={ASSETS[id]} alt="" fill unoptimized />
        </div>
      </div>
    </div>
  );
}
