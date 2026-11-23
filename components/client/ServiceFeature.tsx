import type { ReactNode } from "react";
import { Action, Brand, Chip, Field, I, PassCode, Photo, type IconName, type PhotoId } from "./previews/primitives";
import { VenueMap } from "./previews/marketing";
import { MembershipCard } from "./previews/products";
import "./specimen-visuals.css";

function MiniHeading({ tag, title, icon }: { tag: string; title: string; icon: IconName }) {
  return <div className="pv-mini-heading"><span><small>{tag}</small><b>{title}</b></span><I name={icon} /></div>;
}

function PublishingCalendar() {
  return <div className="pv-mini-calendar"><MiniHeading tag="CONTENT CALENDAR" title="이번 달 콘텐츠 플랜" icon="calendar" /><div>{["월", "화", "수", "목", "금", "토", "일"].map(day => <small key={day}>{day}</small>)}{Array.from({ length: 14 }, (_, i) => <span key={i}>{i + 1}{[1, 5, 8, 12].includes(i) && <i className={i % 2 ? "is-post" : "is-reel"} />}</span>)}</div><footer><span><i />피드</span><span><i />릴스 · 콘텐츠</span></footer></div>;
}

function Keywords() {
  return <div className="pv-mini-keywords"><MiniHeading tag="SEARCH INTENT" title="검색 의도를 담은 키워드" icon="search" /><span><I name="search" />우리 동네 웨딩홀</span><div>{["#웨딩홀", "#예식장", "#웨딩홀투어", "#실예식", "#연회장"].map(tag => <Chip key={tag}>{tag}</Chip>)}</div><p><I name="check" />콘텐츠와 연결되는 검색 설정</p></div>;
}

function ContentFlow() {
  return <div className="pv-mini-flow"><MiniHeading tag="CUSTOMER JOURNEY" title="관심에서 상담까지" icon="arrow" /><div>{(["search", "heart", "message"] as const).map((icon, i) => <span key={icon}><i><I name={icon} /></i><b>{["발견", "관심", "문의"][i]}</b><small>{["검색 · 콘텐츠", "공간 둘러보기", "상담 예약"][i]}</small></span>)}</div></div>;
}

function Profile() {
  return <div className="pv-mini-profile"><span className="pv-profile-avatar"><Photo id="flowers" /></span><b>maison.wedding</b><p>오래도록 기억될, 우리다운 웨딩.</p><div>{["hero", "couple", "reception"].map(id => <Photo key={id} id={id as PhotoId} />)}</div><span className="pv-profile-link"><I name="up-right" />브랜드의 톤을 담은 프로필</span></div>;
}

function EditorialLayout() {
  return <div className="pv-mini-editorial"><div><Brand /><I name="menu" /></div><span><Photo id="hero" /><span>THE MAISON JOURNAL<b>Stories,<br /><em>beautifully told.</em></b></span></span><footer><span>공간 소개</span><span>웨딩 이야기</span><span>방문 안내</span></footer></div>;
}

function ArticleList() {
  return <div className="pv-mini-articles"><MiniHeading tag="BRAND CONTENT" title="다음 이야기를 준비합니다" icon="file" />{(["hero", "flowers", "couple"] as const).map((id, i) => <div key={id}><Photo id={id} /><span><small>{["SPACE", "STYLING", "REAL WEDDING"][i]}</small><b>{["빛이 머무는 예식 공간", "계절을 담은 플라워", "우리다운 웨딩의 기록"][i]}</b></span><I name="chevron" /></div>)}</div>;
}

function SeoSettings() {
  return <div className="pv-mini-seo"><MiniHeading tag="READY TO DISCOVER" title="발행 전, 한 번 더 점검" icon="globe" />{["제목 · 설명 설정", "이미지 · 대체 텍스트", "키워드 · 카테고리"].map(text => <span key={text}><I name="check" /><b>{text}</b><small>설정 완료</small></span>)}</div>;
}

function Authors() {
  return <div className="pv-mini-authors"><MiniHeading tag="CONTENT NETWORK" title="콘텐츠에 맞는 채널" icon="users" /><div>{(["couple", "team", "consultation"] as const).map((id, i) => <span key={id}><Photo id={id} /><b>{["체험 콘텐츠", "블로그", "카페"][i]}</b><small>{["공간의 경험", "깊이 있는 정보", "함께 나누는 이야기"][i]}</small></span>)}</div><p>키워드와 목적에 맞게 구성합니다.</p></div>;
}

function Monitor() {
  return <div className="pv-mini-monitor"><MiniHeading tag="PUBLICATION MONITOR" title="발행 이후에도, 꾸준히" icon="chart" />{["웨딩홀 투어", "예식장 상담", "웨딩홀 연회"].map((text, i) => <div key={text}><span><i />{text}</span><Chip tone={i === 2 ? "amber" : "green"}>{i === 2 ? "확인 중" : "발행 확인"}</Chip></div>)}<footer><I name="clock" />게시글 상태 모니터링 예시</footer></div>;
}

function VenueInformation() {
  return <div className="pv-mini-place"><Photo id="hero" /><div><small>WEDDING & CELEBRATION</small><b>메종 웨딩</b><p>위치 · 주차 · 방문 상담 안내</p><span><I name="pin" />당신을 기다리는 공간</span></div></div>;
}

function Payments() {
  return <div className="pv-mini-payments"><MiniHeading tag="CONTRACT & PAYMENT" title="계약부터 잔금까지" icon="file" />{["예식 계약", "계약금 입금", "중도금 · 잔금"].map((text, i) => <span key={text}><i><I name={i < 2 ? "check" : "clock"} /></i><b>{text}</b><Chip tone={i < 2 ? "blue" : ""}>{i < 2 ? "확인 완료" : "일정 확인"}</Chip></span>)}</div>;
}

function CoupleTasks() {
  return <div className="pv-mini-tasks"><MiniHeading tag="OUR WEDDING" title="두 사람이 함께 준비해요" icon="heart" /><div className="pv-mini-task-progress"><b>차근차근, 준비 중</b><span>3 / 5</span><i><span /></i></div>{["예식 정보 입력", "초대 인원 확인", "식순 · 음악 전달"].map((text, i) => <div key={text}><I name={i < 2 ? "check" : "clock"} />{text}<small>{i < 2 ? "완료" : "예정"}</small></div>)}</div>;
}

function PreparationSteps() {
  return <div className="pv-mini-steps"><MiniHeading tag="WEDDING WORKFLOW" title="예식별 7단계 진행 관리" icon="calendar" /><div>{["상담", "계약", "정보", "준비", "점검", "예식", "정산"].map((text, i) => <span key={text}><i className={i < 4 ? "is-done" : ""}>{i < 3 ? <I name="check" /> : i + 1}</i><small>{text}</small></span>)}</div><p>모든 예식의 현재 단계를 한눈에.</p></div>;
}

function TeamChat() {
  return <div className="pv-mini-chat"><MiniHeading tag="TEAM WORKSPACE" title="함께 준비하는 하나의 공간" icon="message" /><span><i>H</i><span><b>예식 담당자</b><p>최종 체크리스트 공유드려요.</p></span></span><span className="is-reply"><p><I name="check" />확인했습니다. 함께 준비할게요.</p></span><div><I name="shield" />직원 권한과 예식별 대화 관리</div></div>;
}

function ResponsiveSite() {
  return <div className="pv-mini-responsive"><span><Photo id="hero" /><small>MAISON WEDDING</small><b>Where love<br />finds its place.</b></span><span><Photo id="hero" /><small>MAISON</small><b>Our<br />beautiful<br />beginning.</b></span><i>PC · TABLET · MOBILE</i></div>;
}

function ContactForm() {
  return <div className="pv-mini-form"><MiniHeading tag="PRIVATE CONSULTATION" title="우리의 시작을 들려주세요" icon="message" /><Field label="성함" value="예비 신랑 · 신부님 성함" /><Field label="희망 예식일" value="날짜를 선택해 주세요" icon="calendar" /><Action>상담 신청하기</Action></div>;
}

function Benefits() {
  return <div className="pv-mini-benefits"><MiniHeading tag="JUST FOR YOUR DAY" title="이유가 있는 선택" icon="spark" />{(["heart", "pin", "users"] as const).map((icon, i) => <div key={icon}><I name={icon} /><span><b>{["우리다운 웨딩", "프라이빗 공간 투어", "세심한 맞춤 상담"][i]}</b><small>{["두 사람의 이야기를 담아", "공간의 분위기를 직접 만나고", "필요한 준비를 함께 정리해요"][i]}</small></span></div>)}</div>;
}

function CampaignVisual() {
  return <div className="pv-mini-campaign"><Photo id="couple" /><span><small>THE BEGINNING OF US</small><b>우리의 시작이<br />가장 아름다운 곳.</b><i>PRIVATE WEDDING CONSULTATION</i></span></div>;
}

function Confirmation() {
  return <div className="pv-mini-confirmation"><span><I name="check" /></span><small>THANK YOU</small><b>설레는 첫걸음,<br />함께 준비할게요.</b><p>상담 신청 완료 안내 예시</p><span className="pv-confirmation-next">이후 안내까지 자연스럽게<I name="arrow" /></span></div>;
}

function EventVisual() {
  return <div className="pv-mini-event"><span><small>WEDDING / WEEK</small><b>A day for<br /><em>your forever.</em></b><span>우리의 웨딩을 만나는 하루.</span></span><Photo id="flowers" /></div>;
}

function AdmissionPass() {
  return <div className="pv-mini-pass"><span><small>WEDDING / WEEK</small><b>모바일 입장 확인</b><Chip tone="green"><I name="check" />방문 예약 확인</Chip><p>예약부터 현장 체크인까지.</p></span><PassCode /></div>;
}

function EventOperations() {
  return <div className="pv-mini-ops"><MiniHeading tag="EVENT WORKSPACE" title="현장의 흐름도, 한눈에" icon="users" />{["사전 방문 예약", "예약 확인 안내", "현장 체크인"].map((text, i) => <span key={text}><I name={(["calendar", "message", "check"] as const)[i]} /><b>{text}</b><Chip tone="blue">관리 화면</Chip></span>)}</div>;
}

function MembershipProfile() {
  return <div className="pv-mini-member-profile"><span><I name="users" /></span><small>WELCOME TO THE CIRCLE</small><b>소중한 인연을,<br />계속 이어갑니다.</b><div><span>디지털 회원증</span><span>회원 전용 혜택</span></div></div>;
}

function Voucher() {
  return <div className="pv-mini-voucher"><span><I name="gift" /></span><small>MAISON CIRCLE</small><b>A little more,<br /><em>just for you.</em></b><p>기념일을 위한 회원 혜택</p><span className="pv-voucher-edge">MEMBERS ONLY <I name="ticket" /></span></div>;
}

function Activity() {
  return <div className="pv-mini-activity"><MiniHeading tag="YOUR MOMENTS" title="우리의 순간이 쌓이는 곳" icon="clock" />{[["회원 가입", "메종과의 첫 만남"], ["혜택 확인", "당신을 위한 멤버십"], ["방문 예약", "다시 만나 반가워요"]].map(([title, text], i) => <div key={title}><i>{i + 1}</i><span><b>{title}</b><small>{text}</small></span><I name="check" /></div>)}</div>;
}

const FEATURES: Record<string, (() => ReactNode)[]> = {
  instagram: [PublishingCalendar, Keywords, ContentFlow, Profile],
  blog: [Profile, EditorialLayout, ArticleList, SeoSettings],
  posting: [Authors, Keywords, PublishingCalendar, Monitor],
  place: [() => <VenueMap mini />, ArticleList, ContentFlow, Keywords],
  crm: [Payments, CoupleTasks, PreparationSteps, TeamChat],
  homepage: [EditorialLayout, VenueInformation, ResponsiveSite, ContactForm],
  landing: [CampaignVisual, Benefits, ContactForm, Confirmation],
  fair: [EventVisual, ContactForm, AdmissionPass, EventOperations],
  membership: [MembershipCard, MembershipProfile, Voucher, Activity],
};

export default function ServiceFeature({ id, index }: { id: string; index: number }) {
  const Feature = FEATURES[id]?.[index % 4];
  if (!Feature) return null;
  return <div className="pv-feature" data-service={id} data-feature={index % 4} aria-hidden="true"><Feature /></div>;
}
