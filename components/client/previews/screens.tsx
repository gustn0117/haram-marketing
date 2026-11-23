import { Artwork, I, Lines, MemberCard, MiniCalendar, MockButton, MockForm, MockList, ScreenHeading, SimpleMap } from "./elements";

export function InstagramProfile() {
  return <div className="sm-screen sm-instagram">
    <ScreenHeading wordmark>Instagram</ScreenHeading>
    <div className="sm-ig-profile"><span className="sm-avatar"><Artwork variant={2} /></span><div><b>wedding.official</b><span>웨딩홀 공식 계정</span><Lines /></div></div>
    <div className="sm-ig-buttons"><span>프로필 편집</span><span>콘텐츠 관리</span></div>
    <div className="sm-stories">{["홀 소개", "웨딩", "소식", "안내"].map((label, i) => <span key={label}><Artwork variant={i} /><small>{label}</small></span>)}</div>
    <div className="sm-ig-tabs"><I name="grid" /><I name="play" /><I name="users" /></div>
    <div className="sm-feed">{Array.from({ length: 6 }, (_, i) => <Artwork key={i} variant={i} />)}</div>
    <div className="sm-dock"><I name="grid" /><I name="search" /><I name="plus" /><I name="heart" /></div>
  </div>;
}

export function BlogPage() {
  return <div className="sm-screen sm-blog">
    <ScreenHeading>blog</ScreenHeading>
    <div className="sm-blog-banner"><div><small>WEDDING JOURNAL</small><h3>웨딩홀 공식 블로그</h3><Lines /></div><Artwork /></div>
    <div className="sm-blog-body"><aside><span className="sm-round-icon"><I name="file" /></span><b>공식 블로그</b><Lines /><span>전체 글</span><span>공간 소개</span><span>웨딩 소식</span></aside><div><div className="sm-section-title"><b>새로운 이야기</b><I name="plus" /></div>{["웨딩홀 소개", "예식 이야기"].map((label, i) => <div className="sm-article" key={label}><Artwork variant={i} /><span><small>WEDDING STORY</small><b>{label}</b><Lines /></span></div>)}</div></div>
  </div>;
}

export function SearchResults() {
  return <div className="sm-screen sm-search">
    <div className="sm-searchbox"><b>N</b><span>웨딩홀</span><I name="search" /></div>
    <div className="sm-tabs"><b>통합</b><span>블로그</span><span>카페</span></div>
    {["블로그 콘텐츠", "카페 포스팅", "웨딩홀 이야기"].map((label, i) => <div className="sm-search-result" key={label}><small><i />{i === 1 ? "카페" : "블로그"}</small><div><span><b>{label}</b><Lines count={3} /></span><Artwork variant={i} /></div></div>)}
    <div className="sm-screen-note"><I name="check" />게시글 발행 · 관리</div>
  </div>;
}

export function PlacePage() {
  return <div className="sm-screen sm-place">
    <div className="sm-searchbox"><b>N</b><span>웨딩홀 찾기</span><I name="search" /></div>
    <SimpleMap />
    <div className="sm-place-title"><small>PLACE</small><h3>우리 웨딩홀</h3><Lines /></div>
    <div className="sm-shortcuts">{(["phone", "pin", "bookmark", "calendar"] as const).map((icon, i) => <span key={icon}><I name={icon} /><small>{["전화", "길찾기", "저장", "예약"][i]}</small></span>)}</div>
    <div className="sm-tabs"><b>홈</b><span>소식</span><span>사진</span></div>
    <MockList labels={["위치 · 주차 안내", "방문 상담 예약"]} icon="pin" />
  </div>;
}

export function CrmDashboard() {
  return <div className="sm-screen sm-crm"><aside><span className="sm-crm-logo">H<span>CRM · ERP</span></span>{(["grid", "users", "calendar", "file", "message"] as const).map((icon, i) => <span className={i === 2 ? "is-active" : ""} key={icon}><I name={icon} />{["대시보드", "고객 관리", "일정 관리", "계약 관리", "팀 소통"][i]}</span>)}<I name="settings" /></aside><div><div className="sm-crm-top"><span>웨딩홀 관리</span><I name="bell" /></div><div className="sm-crm-title"><h3>고객 · 일정 관리</h3><span><I name="plus" />새 일정</span></div><div className="sm-crm-summary">{(["상담", "계약", "예식 준비"] as const).map((text, i) => <span key={text}><I name={(["message", "file", "check"] as const)[i]} /><b>{text}</b><Lines count={1} /></span>)}</div><MiniCalendar compact /></div></div>;
}

export function VenueSite() {
  return <div className="sm-screen sm-website"><div className="sm-site-nav"><b>WEDDING</b><span>공간 소개</span><span>웨딩</span><span>상담 예약</span></div><div className="sm-site-hero"><div><small>OUR WEDDING SPACE</small><h3>우리의 시작을<br />담는 공간.</h3><Lines /><MockButton>공간 둘러보기</MockButton></div><Artwork /></div><div className="sm-site-cards">{["웨딩홀", "연회장", "방문 안내"].map((label, i) => <span key={label}><Artwork variant={i + 1} /><b>{label}<I name="up-right" /></b></span>)}</div></div>;
}

export function LandingPage() {
  return <div className="sm-screen sm-landing"><ScreenHeading>WEDDING / EVENT</ScreenHeading><div className="sm-landing-hero"><small>PRIVATE CONSULTATION</small><h3>웨딩홀<br />방문 상담 이벤트</h3><Artwork /><Lines /></div><div className="sm-landing-form"><MockForm title="상담 신청" compact /></div></div>;
}

export function FairPage() {
  return <div className="sm-screen sm-fair"><ScreenHeading>WEDDING FAIR</ScreenHeading><div className="sm-fair-body"><div><small>MEET YOUR WEDDING</small><h3>설레는 시작,<br />웨딩박람회.</h3><Artwork variant={1} /><Lines /></div><MockForm title="박람회 사전 예약" /></div><div className="sm-fair-steps">{(["calendar", "ticket", "check"] as const).map((icon, i) => <span key={icon}><I name={icon} /><b>{["사전 예약", "입장 확인", "방문 관리"][i]}</b></span>)}</div></div>;
}

export function MembershipApp() {
  return <div className="sm-screen sm-membership"><ScreenHeading>MEMBERSHIP</ScreenHeading><div className="sm-member-welcome"><small>WEDDING & BEYOND</small><h3>함께하는<br />회원 전용 혜택</h3></div><MemberCard /><div className="sm-shortcuts">{(["gift", "ticket", "calendar"] as const).map((icon, i) => <span key={icon}><I name={icon} /><small>{["회원 혜택", "쿠폰함", "방문 예약"][i]}</small></span>)}</div><MockList labels={["회원 전용 쿠폰", "기념일 혜택"]} icon="gift" /><div className="sm-screen-note"><I name="heart" />웨딩 이후에도 이어지는 인연</div></div>;
}
