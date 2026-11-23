import { Action, Brand, Browser, Chip, Field, I, Note, PassCode, Phone, Photo } from "./primitives";

const EVENTS: Record<number, { label: string; tone: string }[]> = {
  3: [{ label: "14:00 방문 상담", tone: "sand" }], 6: [{ label: "11:00 메종홀", tone: "blue" }],
  7: [{ label: "11:00 가든홀", tone: "sage" }, { label: "14:00 메종홀", tone: "blue" }],
  8: [{ label: "12:00 메종홀", tone: "blue" }], 10: [{ label: "16:00 방문 상담", tone: "sand" }],
  13: [{ label: "14:00 가든홀", tone: "sage" }], 14: [{ label: "11:00 메종홀", tone: "blue" }, { label: "14:00 가든홀", tone: "sage" }],
  15: [{ label: "12:00 메종홀", tone: "blue" }], 18: [{ label: "15:00 방문 상담", tone: "sand" }],
  21: [{ label: "11:00 가든홀", tone: "sage" }, { label: "14:00 메종홀", tone: "blue" }], 22: [{ label: "12:00 메종홀", tone: "blue" }],
  28: [{ label: "11:00 메종홀", tone: "blue" }], 29: [{ label: "14:00 가든홀", tone: "sage" }],
};

export function CrmCalendar() {
  return <div className="pv-calendar"><div className="pv-calendar-toolbar"><b>2026. 11 <span>⌄</span></b><span>〈　오늘　〉</span><div><b>월간</b><span>주간</span><span>일간</span></div></div><div className="pv-calendar-grid">{["일", "월", "화", "수", "목", "금", "토"].map(day => <b key={day} className="pv-calendar-weekday">{day}</b>)}{Array.from({ length: 35 }, (_, i) => <div className={`pv-calendar-day${i > 29 ? " is-outside" : ""}${i === 22 ? " is-today" : ""}`} key={i}><small>{i < 30 ? i + 1 : i - 29}</small>{EVENTS[i + 1]?.map(event => <span key={event.label} className={`is-${event.tone}`}>{event.label}</span>)}</div>)}</div><div className="pv-calendar-legend"><span><i className="is-blue" />메종홀</span><span><i className="is-sage" />가든홀</span><span><i className="is-sand" />방문 상담</span><small>예시 일정</small></div></div>;
}

export function CustomerPanel() {
  return <div className="pv-customer"><div className="pv-panel-heading"><span><small>WEDDING PROFILE</small><b>예식 준비 현황</b></span><I name="menu" /></div><div className="pv-customer-person"><span className="pv-customer-avatar"><I name="users" /></span><span><b>우리의 웨딩</b><small>메종홀 · 토요일 14:00</small></span><Chip tone="blue">계약 완료</Chip></div><div className="pv-customer-progress"><span>준비 진행률<b>4 / 7</b></span><i><span /></i></div><div className="pv-customer-tasks">{["계약서 확인", "계약금 입금", "예식 정보 입력", "초대 인원 확인", "최종 체크리스트"].map((text, i) => <div key={text}><span className={i < 3 ? "is-done" : ""}>{i < 3 ? <I name="check" /> : i + 1}</span><span>{text}</span><small>{i < 3 ? "완료" : "준비 중"}</small></div>)}</div><div className="pv-customer-message"><I name="message" /><span>담당자와 함께 준비해요<small>예식 준비 관련 대화를 한곳에서</small></span><I name="chevron" /></div></div>;
}

export function CrmDashboard() {
  return <div className="pv-crm"><aside className="pv-crm-sidebar"><span className="pv-crm-brand"><span>h.</span><b>haram<small>VENUE OS</small></b></span><small>WORKSPACE</small>{(["grid", "calendar", "users", "file", "chart", "message"] as const).map((icon, i) => <span className={i === 1 ? "is-active" : ""} key={icon}><I name={icon} />{["대시보드", "예약 캘린더", "고객 · 상담", "계약 관리", "매출 · 정산", "팀 메시지"][i]}{i === 5 && <i>2</i>}</span>)}<span className="pv-crm-settings"><I name="settings" />운영 설정</span><div className="pv-crm-workspace"><Photo id="hero" /><span>메종 웨딩<small>관리자 워크스페이스</small></span></div></aside><div className="pv-crm-main"><div className="pv-crm-topbar"><span>워크스페이스 <I name="chevron" /> 예약 캘린더</span><span><I name="search" /><I name="bell" /><i>H</i></span></div><div className="pv-crm-heading"><div><small>모든 예식을, 빈틈없이.</small><h3>예약 캘린더</h3></div><Action icon="plus">새 예약</Action></div><div className="pv-crm-stats">{[["이번 달 예식", "18", "calendar"], ["진행 중인 상담", "07", "message"], ["준비 완료", "12", "check"]].map(([label, number, icon]) => <div key={label}><span>{label}<I name={icon as "calendar"} /></span><b>{number}<small>건</small></b><span>현황 예시 <I name="up-right" /></span></div>)}</div><CrmCalendar /></div></div>;
}

export function CrmScene() {
  return <><Browser className="pv-crm-device" domain="workspace.haram / reservations"><CrmDashboard /></Browser><div className="pv-crm-floating"><CustomerPanel /></div><span className="pv-orbit-label">LESS ADMIN. MORE CELEBRATION.</span></>;
}

export function VenueSite({ mobile = false }: { mobile?: boolean }) {
  return <div className={`pv-site${mobile ? " is-mobile" : ""}`}><div className="pv-site-nav"><Brand /><div><span>Our Story</span><span>Wedding</span><span>Banquet</span></div><span className="pv-site-reserve">Reservation <I name="up-right" /></span><I name="menu" /></div><div className="pv-site-hero"><Photo id="hero" /><div><small>A PLACE FOR YOUR BEGINNING</small><h3>Where love<br />finds <em>its place.</em></h3><p>우리의 시작이 아름다운 곳, 메종 웨딩</p><span>메종의 공간 둘러보기 <I name="up-right" /></span></div><span className="pv-site-page">01 <i /> 03</span><small className="pv-site-scroll">SCROLL TO DISCOVER ↓</small></div><div className="pv-site-spaces"><div><small>SPACES, WITH A SOUL.</small><h4>순간을 담는 공간.</h4></div><div className="pv-site-space-cards">{(["flowers", "reception"] as const).map((id, i) => <div key={id}><Photo id={id} /><span><b>{i ? "The Dining" : "The Ceremony"}</b><I name="up-right" /></span></div>)}</div></div></div>;
}

export function HomepageScene() {
  return <><Browser className="pv-site-device"><VenueSite /></Browser><Phone className="pv-site-phone"><VenueSite mobile /></Phone><Note className="pv-site-note" icon="globe" title="어떤 화면에서도, 같은 첫인상">PC · 태블릿 · 모바일 반응형 디자인</Note></>;
}

export function ConsultationForm({ short = false }: { short?: boolean }) {
  return <div className="pv-consultation-form"><small>YOUR NEXT CHAPTER</small><h4>당신의 웨딩을<br />들려주세요.</h4><p>한 분 한 분, 차분히 함께 준비합니다.</p><Field label="성함" value="상담받으실 분의 성함" /><Field label="연락처" value="연락받으실 전화번호" />{!short && <Field label="희망 예식일" value="날짜를 선택해 주세요" icon="calendar" />}<span className="pv-form-consent"><I name="check" />개인정보 수집 및 이용 동의</span><Action>방문 상담 신청</Action><small className="pv-form-note"><I name="shield" />입력하신 정보는 상담 목적으로만 사용합니다</small></div>;
}

export function LandingPage({ mobile = false }: { mobile?: boolean }) {
  return <div className={`pv-landing${mobile ? "is-mobile" : ""}`}><div className="pv-landing-nav"><Brand /><span>PRIVATE WEDDING CONSULTATION</span><I name="menu" /></div><div className="pv-landing-body"><div className="pv-landing-story"><Photo id="couple" /><div><span>THE BEGINNING OF US.</span><h3>둘만의 이야기가<br /><em>시작되는 곳.</em></h3><p>우리다운 웨딩의 첫 페이지를 함께해요.</p><div><span><I name="spark" />맞춤 상담</span><span><I name="pin" />공간 투어</span></div></div></div><ConsultationForm short={mobile} /></div></div>;
}

export function LandingScene() {
  return <><Browser className="pv-landing-device" domain="maison.wedding / your-day"><LandingPage /></Browser><Phone className="pv-landing-phone"><LandingPage mobile /></Phone><Note className="pv-landing-note" icon="check" title="상담 신청이 접수되었어요">다음 단계까지, 자연스럽게 이어집니다</Note></>;
}

export function FairPass() {
  return <div className="pv-fair-pass"><span className="pv-fair-pass-brand">WEDDING / WEEK</span><Photo id="flowers" /><small>YOU&apos;RE INVITED</small><h4>설레는 시작을<br />만나러 갑니다.</h4><div className="pv-fair-pass-status"><I name="check" />방문 예약 확인</div><div className="pv-fair-pass-code"><PassCode /><span>ADMISSION PASS<small>입장 화면 예시</small></span></div><div className="pv-fair-pass-date"><span>VENUE<b>메종 웨딩</b></span><span>PROGRAM<b>상담 · 공간 투어</b></span></div></div>;
}

export function FairPage() {
  return <div className="pv-fair"><div className="pv-fair-nav"><b>WEDDING <span>/</span> WEEK</b><div><span>행사 소개</span><span>프로그램</span><span>방문 예약 <I name="up-right" /></span></div></div><div className="pv-fair-hero"><div><small>THE NEXT CHAPTER STARTS HERE</small><h3>A day for<br /><em>your forever.</em></h3><p>우리의 웨딩을 만나는 하루.</p><span className="pv-fair-tag"><I name="calendar" />사전 예약으로 여유롭게 만나요</span><Photo id="flowers" /></div><div className="pv-fair-registration"><small>RESERVE YOUR MOMENT</small><h4>설레는 첫걸음,<br />지금 함께해요.</h4><p>공간을 둘러보고, 이야기를 나누고.<br />우리에게 맞는 웨딩을 발견해 보세요.</p><Field label="예약자 성함" value="성함을 입력해 주세요" /><Field label="연락처" value="연락받으실 번호" /><Field label="방문 프로그램" value="맞춤 상담 · 공간 투어" icon="chevron" /><Action>방문 예약하기</Action></div></div><div className="pv-fair-programs"><span><small>01</small>Wedding Space<I name="up-right" /></span><span><small>02</small>Styling & Flower<I name="up-right" /></span><span><small>03</small>Private Consultation<I name="up-right" /></span></div></div>;
}

export function FairScene() {
  return <><Browser className="pv-fair-device" domain="weddingweek / registration"><FairPage /></Browser><Phone className="pv-fair-phone"><FairPass /></Phone><Note className="pv-fair-note" icon="ticket" title="행사의 모든 접점을, 하나로">행사 소개 → 사전 예약 → 현장 입장</Note></>;
}

export function MembershipCard() {
  return <div className="pv-member-card"><span className="pv-member-card-top">MAISON <small>THE CIRCLE</small></span><span className="pv-member-card-title">A little closer.<br /><em>A little more.</em></span><svg className="pv-card-botanical" viewBox="0 0 150 190" fill="none" aria-hidden="true"><path d="M50 200C125 115 100 30 140-5M80 145C25 140 20 85 23 85c35 0 51 15 57 60ZM101 93C145 85 150 42 147 42c-28 3-43 20-46 51ZM105 61C64 48 67 7 70 7c25 6 36 25 35 54Z" stroke="currentColor" strokeWidth=".8" /></svg><span className="pv-member-card-bottom"><span>WEDDING & BEYOND</span><span>MEMBER <I name="spark" /></span></span></div>;
}

export function MemberCoupon({ anniversary = false }: { anniversary?: boolean }) {
  return <div className="pv-member-coupon"><span className="pv-coupon-icon"><I name={anniversary ? "gift" : "ticket"} /></span><span><small>{anniversary ? "ANNIVERSARY" : "MEMBERS ONLY"}</small><b>{anniversary ? "기념일의 특별함을 더해요" : "다시 만나는 메종의 공간"}</b><p>{anniversary ? "소중한 날을 위한 회원 혜택" : "멤버십 프로그램 안내"}</p></span><I name="chevron" /></div>;
}

export function MembershipApp() {
  return <div className="pv-membership"><div className="pv-member-nav"><span>MAISON / CIRCLE</span><I name="bell" /></div><div className="pv-member-greeting"><small>YOUR STORY CONTINUES</small><h3>우리의 인연은,<br /><em>계속됩니다.</em></h3></div><MembershipCard /><div className="pv-member-shortcuts">{(["gift", "ticket", "calendar", "clock"] as const).map((icon, i) => <span key={icon}><I name={icon} /><small>{["내 혜택", "쿠폰함", "방문 예약", "이용 내역"][i]}</small></span>)}</div><div className="pv-member-benefits"><span><b>오직, 당신을 위해</b><small>모두 보기 <I name="chevron" /></small></span><MemberCoupon anniversary /><MemberCoupon /></div><div className="pv-member-footer"><I name="heart" />웨딩, 그리고 그다음의 모든 순간.</div></div>;
}

export function MembershipScene() {
  return <><Phone className="pv-member-device"><MembershipApp /></Phone><div className="pv-member-floating"><MembershipCard /></div><div className="pv-member-coupon-floating"><MemberCoupon anniversary /><MemberCoupon /></div><span className="pv-member-scene-text">A relationship,<br /><em>beautifully continued.</em></span></>;
}
