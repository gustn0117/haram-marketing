import Image from "next/image";
import "./instagram-visual.css";

/** 기존 휴대폰 이미지 칸에 들어가는 독립적인 브랜드 비주얼. */
export default function InstagramVisual() {
  return (
    <div className="mk mk-phone-wrap mk-native mk-instagram-wrap" data-service="instagram" aria-hidden="true">
      <div className="mk-instagram-visual">
        <div className="mk-instagram-art">
          <Image
            src="/images/service-art/instagram-wedding-3d.webp"
            alt=""
            fill
            sizes="(max-width: 600px) 280px, 360px"
          />
        </div>
        <div className="mk-instagram-caption">
          <span>INSTAGRAM MARKETING</span>
          <b data-text="WEDDING"><span>WEDDING</span></b>
        </div>
      </div>
    </div>
  );
}
