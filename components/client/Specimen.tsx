import InstagramVisual from "./InstagramVisual";
import NaverVisual from "./NaverVisual";
import DevelopmentVisual from "./DevelopmentVisual";
import "./specimen.css";
import "./specimen-visuals.css";
import "./specimen-content.css";

export type Device = "phone" | "browser";

/** 기존 이미지 자리에서 사용하던 기기 종류와 크기를 그대로 유지합니다. */
export const SPECIMEN_DEVICE: Record<string, Device> = {
  instagram: "phone", blog: "browser", posting: "phone", place: "phone", crm: "browser",
  homepage: "browser", landing: "phone", fair: "browser", membership: "phone",
};

/** 페이지와 프레임의 배치는 그대로 두고, 그 안의 예시 화면만 교체합니다. */
export default function Specimen({ id }: { id: string }) {
  if (id === "instagram") return <InstagramVisual />;
  if (id === "blog" || id === "posting" || id === "place") return <NaverVisual id={id} />;
  if (id === "crm" || id === "homepage" || id === "landing" || id === "fair" || id === "membership") {
    return <DevelopmentVisual id={id} />;
  }
  return null;
}
