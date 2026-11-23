import { CrmDashboard, FairPage, LandingPage, MembershipApp, VenueSite } from "./previews/screens";
import InstagramVisual from "./InstagramVisual";
import NaverVisual from "./NaverVisual";
import "./specimen.css";
import "./specimen-visuals.css";
import "./specimen-content.css";

export type Device = "phone" | "browser";

/** 기존 이미지 자리에서 사용하던 기기 종류와 크기를 그대로 유지합니다. */
export const SPECIMEN_DEVICE: Record<string, Device> = {
  instagram: "phone", blog: "browser", posting: "phone", place: "phone", crm: "browser",
  homepage: "browser", landing: "phone", fair: "browser", membership: "phone",
};

const SCREENS = {
  crm: CrmDashboard, homepage: VenueSite, landing: LandingPage,
  fair: FairPage, membership: MembershipApp,
};

const TITLES: Record<string, string> = {
  crm: "웨딩홀 CRM · ERP", homepage: "웨딩홀 홈페이지", fair: "웨딩박람회 플랫폼",
};

/** 페이지와 프레임의 배치는 그대로 두고, 그 안의 예시 화면만 교체합니다. */
export default function Specimen({ id }: { id: string }) {
  if (id === "instagram") return <InstagramVisual />;
  if (id === "blog" || id === "posting" || id === "place") return <NaverVisual id={id} />;
  const Screen = SCREENS[id as keyof typeof SCREENS];
  const device = SPECIMEN_DEVICE[id];
  if (!Screen || !device) return null;
  return (
    <div className={`mk mk-${device}-wrap mk-native`} data-service={id} aria-hidden="true">
      {device === "phone" ? (
        <div className="mk-phone">
          <div className="mk-screen">
            <span className="mk-notch" />
            <span className="mk-status" />
            <div className="pv-inline"><Screen /></div>
          </div>
        </div>
      ) : (
        <div className="mk-browser">
          <div className="mk-browser-bar">
            <span className="mk-dot" /><span className="mk-dot" /><span className="mk-dot" />
            <span className="mk-url">{TITLES[id]}</span>
          </div>
          <div className="mk-screen"><div className="pv-inline"><Screen /></div></div>
          <span className="mk-monitor-stand" />
        </div>
      )}
    </div>
  );
}
