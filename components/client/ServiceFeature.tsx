import type { CSSProperties, ReactNode } from "react";
import { Artwork, I, Lines, MemberCard, MiniCalendar, MockButton, MockForm, MockList, SimpleMap } from "./previews/elements";
import "./specimen-visuals.css";

type Kind = "calendar" | "search" | "flow" | "profile" | "layout" | "articles" | "checklist" | "channels" | "monitor" | "map" | "payments" | "form" | "steps" | "chat" | "responsive" | "artwork" | "benefits" | "success" | "ticket" | "member" | "coupon" | "history" | "feed" | "edit" | "copy" | "tags" | "contact" | "report";
type Feature = { kind: Kind; label: string };

/** 포함 사항(lib/quote-data.ts 의 includes)과 같은 순서 · 같은 개수 */
const FEATURES: Record<string, Feature[]> = {
  instagram: [
    { kind: "calendar", label: "콘텐츠 발행" },
    { kind: "feed", label: "콘텐츠 기획" },
    { kind: "edit", label: "이미지 편집" },
    { kind: "copy", label: "문구 작성" },
    { kind: "search", label: "키워드 최적화" },
    { kind: "tags", label: "해시태그 · 위치" },
    { kind: "contact", label: "프로필 · 상담 유입" },
    { kind: "monitor", label: "반응 분석" },
    { kind: "report", label: "월간 리포트" },
  ],
  blog: [{ kind: "profile", label: "블로그 관리" }, { kind: "layout", label: "디자인 구성" }, { kind: "articles", label: "게시글 발행" }, { kind: "checklist", label: "발행 전 점검" }],
  posting: [{ kind: "channels", label: "블로그 · 카페" }, { kind: "search", label: "키워드 콘텐츠" }, { kind: "calendar", label: "꾸준한 발행" }, { kind: "monitor", label: "게시글 확인" }],
  place: [{ kind: "map", label: "지도 · 플레이스" }, { kind: "articles", label: "블로그 콘텐츠" }, { kind: "flow", label: "플레이스 유입" }, { kind: "search", label: "키워드 설정" }],
  crm: [{ kind: "payments", label: "계약 · 입금 관리" }, { kind: "form", label: "신랑신부 정보" }, { kind: "steps", label: "예식 준비 단계" }, { kind: "chat", label: "직원 소통" }],
  homepage: [{ kind: "layout", label: "홈페이지 구성" }, { kind: "artwork", label: "웨딩홀 소개" }, { kind: "responsive", label: "반응형 화면" }, { kind: "form", label: "상담 신청" }],
  landing: [{ kind: "artwork", label: "이벤트 안내" }, { kind: "benefits", label: "핵심 정보" }, { kind: "form", label: "신청 양식" }, { kind: "success", label: "신청 확인" }],
  fair: [{ kind: "artwork", label: "박람회 소개" }, { kind: "form", label: "사전 예약" }, { kind: "ticket", label: "모바일 입장권" }, { kind: "checklist", label: "방문객 관리" }],
  membership: [{ kind: "member", label: "디지털 회원증" }, { kind: "profile", label: "회원 관리" }, { kind: "coupon", label: "회원 혜택" }, { kind: "history", label: "이용 내역" }],
};

function Concept({ kind }: { kind: Kind }): ReactNode {
  switch (kind) {
    case "calendar": return <MiniCalendar compact />;
    case "map": return <SimpleMap />;
    case "member": return <MemberCard />;
    case "form": return <MockForm title="정보 입력" compact />;
    case "profile": return <div className="sm-concept-profile"><span className="sm-round-icon"><I name="users" /></span><Lines /><div>{[0, 1, 2].map(i => <Artwork key={i} variant={i} />)}</div></div>;
    case "layout": return <div className="sm-concept-layout"><div><Lines /><Artwork /></div><section>{[1, 2, 3].map(i => <Artwork key={i} variant={i} />)}</section></div>;
    case "artwork": return <div className="sm-concept-artwork"><Artwork /><Lines /></div>;
    case "responsive": return <div className="sm-concept-responsive"><span><Artwork /><Lines /></span><span><Artwork /><Lines count={1} /></span></div>;
    case "search": return <div className="sm-concept-search"><span><I name="search" /><Lines count={1} /></span><div><i># 웨딩홀</i><i># 웨딩</i><i># 공간</i></div><Lines /></div>;
    case "articles": return <div className="sm-concept-articles">{[0, 1, 2].map(i => <span key={i}><Artwork variant={i} /><Lines /></span>)}</div>;
    case "flow": return <div className="sm-concept-flow">{(["search", "heart", "message"] as const).map((icon, i) => <span key={icon}><i><I name={icon} /></i><b>{["발견", "관심", "문의"][i]}</b></span>)}</div>;
    case "channels": return <div className="sm-concept-channels"><span><I name="file" /><b>blog</b><Lines /></span><span><I name="message" /><b>cafe</b><Lines /></span></div>;
    case "monitor": return <div className="sm-concept-monitor"><div>{[35, 65, 48, 78, 60, 88].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><Lines count={1} /></div>;
    case "steps": return <div className="sm-concept-steps">{["상담", "계약", "준비", "예식"].map((text, i) => <span key={text}><i>{i < 2 ? <I name="check" /> : i + 1}</i><b>{text}</b></span>)}</div>;
    case "chat": return <div className="sm-concept-chat"><span><I name="users" /><Lines /></span><span><Lines /><I name="check" /></span><span><I name="message" /><Lines count={1} /></span></div>;
    case "payments": return <MockList labels={["계약 확인", "입금 확인", "잔금 일정"]} icon="check" />;
    case "checklist": return <MockList labels={["정보 확인", "일정 확인", "안내 완료"]} icon="check" />;
    case "benefits": return <MockList labels={["공간 안내", "방문 상담", "예약 안내"]} icon="spark" />;
    case "history": return <MockList labels={["회원 등록", "혜택 확인", "방문 예약"]} icon="clock" />;
    case "success": return <div className="sm-concept-success"><span><I name="check" /></span><b>신청 완료</b><Lines /></div>;
    case "ticket": return <div className="sm-concept-ticket"><I name="ticket" /><b>WEDDING FAIR</b><span>모바일 입장권</span><div>{Array.from({ length: 19 }, (_, i) => <i key={i} />)}</div></div>;
    case "coupon": return <div className="sm-concept-coupon"><I name="gift" /><span><small>MEMBERS ONLY</small><b>회원 전용 혜택</b><Lines count={1} /></span><I name="ticket" /></div>;
    case "feed": return <div className="sm-concept-feed">{[0, 1, 2, 3, 2].map((variant, i) => <Artwork key={i} variant={variant} />)}<span className="sm-feed-next"><I name="plus" /></span></div>;
    case "edit": return <div className="sm-concept-edit"><Artwork variant={2} /><div className="sm-sliders">{([["밝기", "62%"], ["대비", "40%"], ["색감", "74%"]] as const).map(([name, x]) => <span key={name}><b>{name}</b><i style={{ "--x": x } as CSSProperties} /></span>)}</div></div>;
    case "copy": return <div className="sm-concept-copy"><b>“</b><Lines count={3} /><span className="sm-copy-cursor"><i /><i /></span></div>;
    case "tags": return <div className="sm-concept-tags"><SimpleMap /><div className="sm-tags"><i># 웨딩홀</i><i># 예식장</i><i># 결혼식</i></div></div>;
    case "contact": return <div className="sm-concept-contact"><span className="sm-round-icon"><I name="users" /></span><Lines /><MockButton>상담 문의</MockButton></div>;
    case "report": return <MockList labels={["게시물 도달", "반응", "상담 유입"]} icon="chart" />;
  }
}

export default function ServiceFeature({ id, index }: { id: string; index: number }) {
  const list = FEATURES[id];
  if (!list?.length) return null;
  const feature = list[index % list.length];
  return <div className="pv-feature sm-feature" data-service={id} data-feature={index % list.length} aria-hidden="true"><div className="sm-feature-window"><div className="sm-feature-bar"><span><i /><i /><i /></span><small>{feature.label}</small></div><div className={`sm-concept is-${feature.kind}`}><Concept kind={feature.kind} /></div></div></div>;
}
