import { Action, Browser, Chip, I, Note, Phone, Photo, type PhotoId } from "./primitives";

const FEED: PhotoId[] = ["hero", "couple", "flowers", "reception", "flowers", "couple", "consultation", "hero", "reception"];

export function InstagramProfile() {
  return <>
    <div className="pv-ig-top"><b>maison.wedding <span>⌄</span></b><span><I name="plus" /><I name="menu" /></span></div>
    <div className="pv-ig-profile"><div className="pv-ig-avatar"><Photo id="flowers" /></div><div><b>36<small>게시물</small></b><b>1.2천<small>팔로워</small></b><b>128<small>팔로잉</small></b></div></div>
    <div className="pv-ig-bio"><b>메종 웨딩 · MAISON WEDDING</b><span>오래도록 기억될, 우리다운 웨딩.</span><small>당신의 모든 시작을 함께합니다.</small><em>maison.wedding / reservation ↗</em></div>
    <div className="pv-ig-actions"><span>팔로우</span><span>메시지</span><span>상담 예약</span></div>
    <div className="pv-ig-stories">{(["hero", "flowers", "couple", "reception"] as const).map((id, index) => <div key={index}><Photo id={id} /><small>{["SPACE", "FLOWER", "MOMENT", "DINING"][index]}</small></div>)}</div>
    <div className="pv-ig-tabs"><I name="grid" /><I name="play" /><I name="users" /></div>
    <div className="pv-ig-feed">{FEED.map((id, index) => <div key={index}><Photo id={id} />{[1, 5].includes(index) && <I name="play" />}</div>)}</div>
    <div className="pv-mobile-dock"><I name="grid" /><I name="search" /><I name="plus" /><I name="play" /><span className="pv-mini-avatar">m.</span></div>
  </>;
}

export function InstagramPost() {
  return <div className="pv-ig-post"><div className="pv-post-head"><span className="pv-mini-avatar">m.</span><span><b>maison.wedding</b><small>MAISON WEDDING</small></span><I name="menu" /></div><Photo id="couple" /><div className="pv-post-controls"><I name="heart" /><I name="message" /><I name="send" /><I name="bookmark" /></div><div className="pv-post-copy"><b>모든 순간이, 우리답게.</b><p>빛과 초록이 머무는 공간에서<br />둘만의 새로운 이야기를 시작합니다.</p><small>#메종웨딩 #웨딩홀 #우리다운웨딩</small></div></div>;
}

export function InstagramScene() {
  return <><Phone className="pv-ig-device"><InstagramProfile /></Phone><div className="pv-ig-floating"><InstagramPost /></div><Note className="pv-ig-note" icon="calendar" title="일관된 콘텐츠, 차곡차곡">브랜드의 톤을 담은 월간 콘텐츠 플랜</Note><span className="pv-orbit-label">CURATED WITH A PURPOSE.</span></>;
}

export function BlogPage() {
  return <div className="pv-blog"><div className="pv-blog-platform"><b><i>N</i> blog</b><span>기록이 쌓여, 브랜드가 됩니다.</span><I name="search" /></div><div className="pv-blog-cover"><Photo id="hero" /><div><small>THE MAISON JOURNAL</small><h3>A beautiful<br /><em>beginning.</em></h3><p>우리의 시작에 관한 이야기</p></div><span>WEDDING · SPACE · PEOPLE</span></div><div className="pv-blog-navigation"><b>전체 이야기</b><span>공간 소개</span><span>실예식 이야기</span><span>웨딩 가이드</span><span>방문 안내</span></div><div className="pv-blog-editorial"><div className="pv-blog-intro"><small>FROM THE JOURNAL</small><h4>메종의<br />새로운 이야기.</h4><span>공간을 넘어, 순간을 기록합니다.</span></div><div className="pv-blog-post-grid">{(["flowers", "couple", "reception"] as const).map((id, i) => <div key={id}><Photo id={id} /><small>{["FLOWER & STYLING", "REAL WEDDING", "DINING"][i]}</small><b>{["계절이 머무는 플라워", "두 사람이 빛나는 순간", "마음을 담은 한 끼"][i]}</b><span>MAISON JOURNAL　·　읽기 3분</span></div>)}</div></div></div>;
}

export function BlogArticle() {
  return <div className="pv-blog-article"><div className="pv-article-top"><span>m.</span><b>MAISON JOURNAL</b><I name="menu" /></div><small>SPACE / 공간 이야기</small><h4>빛이 머무는 곳,<br />우리의 시작.</h4><div className="pv-article-author"><span className="pv-mini-avatar">m.</span><span>메종 웨딩<small>공간의 이야기를 전합니다</small></span></div><Photo id="hero" /><p>자연스럽게 스며드는 빛과 계절의 색.<br />우리다운 하루를 위한 공간을 소개합니다.</p><div className="pv-article-foot"><I name="heart" /><span>공감</span><I name="message" /><span>댓글</span><I name="bookmark" /></div></div>;
}

export function BlogScene() {
  return <><Browser className="pv-blog-device" domain="blog.naver.com / maison_wedding"><BlogPage /></Browser><div className="pv-blog-floating"><BlogArticle /></div><Note className="pv-blog-note" icon="file" title="브랜드의 목소리로 쓰는 글">디자인과 콘텐츠를 함께 관리합니다</Note></>;
}

export function SearchResults() {
  return <div className="pv-search-page"><div className="pv-search-input"><b>N</b><span>웨딩홀 투어 후기</span><I name="search" /></div><div className="pv-search-tabs"><b>통합</b><span>블로그</span><span>카페</span><span>이미지</span></div><div className="pv-search-section-title">함께 준비하는 웨딩<Chip>콘텐츠 예시</Chip></div>{(["hero", "consultation", "reception"] as const).map((id, i) => <div className="pv-search-result" key={id}><div className="pv-search-source"><span className={`pv-source-icon is-${i}`}>{i === 1 ? "c" : "b"}</span><span>{["둘이 쓰는 웨딩일기", "차근차근 결혼 준비", "오늘의 웨딩 기록"][i]}<small>{i === 1 ? "카페" : "블로그"} · 웨딩 준비</small></span></div><div className="pv-search-excerpt"><div><b>{["자연광이 아름다운 웨딩홀 투어", "첫 상담, 무엇부터 물어볼까요?", "하객을 생각한 연회 공간"][i]}</b><p>직접 둘러본 공간과 준비하며 궁금했던 이야기. 하나씩 차근차근 정리했어요.</p></div><Photo id={id} /></div><span className="pv-search-tags">공간 이야기　·　웨딩 준비</span></div>)}</div>;
}

export function KeywordMonitor() {
  return <div className="pv-keyword-panel"><div className="pv-panel-heading"><span><small>CONTENT MONITOR</small><b>발행 현황 한눈에</b></span><span className="pv-live-dot">확인 중</span></div>{[["웨딩홀 투어", "블로그", "발행 완료"], ["예식장 상담", "카페", "발행 완료"], ["웨딩홀 연회", "블로그", "모니터링"]].map(([word, channel, state], i) => <div className="pv-keyword-row" key={word}><span className="pv-keyword-no">0{i + 1}</span><span><b>{word}</b><small>{channel} 콘텐츠</small></span><Chip tone={i === 2 ? "amber" : "green"}>{state}</Chip></div>)}<div className="pv-monitor-foot"><I name="clock" /><span>발행 이후에도 이어지는 모니터링</span></div></div>;
}

export function PostingScene() {
  return <><Phone className="pv-search-device"><SearchResults /></Phone><div className="pv-search-article"><BlogArticle /></div><div className="pv-search-monitor"><KeywordMonitor /></div><span className="pv-orbit-label">GOOD CONTENT. RIGHT CONTEXT.</span></>;
}

/** 도로·건물·핀을 각각 그린 벡터 지도. 실제 지역 정보가 아닙니다. */
export function VenueMap({ mini = false }: { mini?: boolean }) {
  return <div className={`pv-map${mini ? " is-mini" : ""}`}><svg viewBox="0 0 600 390" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="390" fill="#f2f1eb" />{Array.from({ length: 35 }, (_, i) => <rect key={i} x={(i % 7) * 92 - 25} y={Math.floor(i / 7) * 86 + 13} width={56 + i % 3 * 7} height={48 + i % 4 * 4} rx="4" fill={i === 9 || i === 24 ? "#d6e6cc" : "#e5e3d9"} />)}<path d="M-30 260 630 120" stroke="#fff" strokeWidth="35" /><path d="M150-40 270 430M420-40 345 430" stroke="#fff" strokeWidth="22" /><path d="M-30 260 630 120" stroke="#e9ddba" strokeWidth="16" /><path d="M150-40 270 430M420-40 345 430" stroke="#eeeae0" strokeWidth="5" /><path d="M-10 340 610 210" stroke="#fff" strokeWidth="15" /><text x="45" y="340" fill="#9ba590" fontSize="11">메종 근린공원</text><text x="425" y="90" fill="#a4a496" fontSize="10">문화거리</text><text x="235" y="235" fill="#a99870" fontSize="11" transform="rotate(-12 235 235)">웨딩로</text></svg><span className="pv-map-pin is-main"><I name="pin" /><b>MAISON WEDDING</b></span><span className="pv-map-pin is-one"><I name="pin" /></span><span className="pv-map-pin is-two"><I name="pin" /></span><span className="pv-map-station">M　메종역</span><span className="pv-map-controls">＋<i />−</span><small className="pv-map-example">예시 지도</small></div>;
}

export function PlacePage() {
  return <div className="pv-place-page"><div className="pv-search-input"><b>N</b><span>메종 웨딩</span><I name="search" /></div><div className="pv-place-gallery"><Photo id="hero" /><span><Photo id="flowers" /><Photo id="reception" /></span><small><I name="grid" />사진 보기</small></div><div className="pv-place-info"><Chip tone="green">웨딩홀 · 예식장</Chip><h3>메종 웨딩</h3><p>우리의 시작이 아름다운 곳.</p><div className="pv-place-shortcuts">{(["phone", "pin", "bookmark", "calendar"] as const).map((icon, i) => <span key={icon}><I name={icon} /><small>{["전화", "길찾기", "저장", "예약"][i]}</small></span>)}</div><Action icon="calendar">방문 상담 예약</Action><div className="pv-place-tabs"><b>홈</b><span>소식</span><span>예약</span><span>사진</span></div><div className="pv-place-detail"><I name="pin" /><span>당신을 기다리는 공간<small>위치 · 대중교통 · 주차 안내</small></span><I name="chevron" /></div><div className="pv-place-detail"><I name="clock" /><span>방문 전 예약해 주세요<small>편안한 상담을 준비하겠습니다</small></span></div><div className="pv-place-news"><Photo id="flowers" /><span><small>MAISON NEWS</small><b>새로운 계절, 새로운 웨딩.</b><p>공간의 소식을 만나보세요.</p></span></div></div></div>;
}

export function PlaceScene() {
  return <><Browser className="pv-map-device" domain="map.naver.com / place"><div className="pv-map-header"><b>N <span>지도</span></b><span><I name="search" />웨딩홀 찾기</span><I name="menu" /></div><VenueMap /><div className="pv-map-listing"><Photo id="hero" /><span><small>WEDDING & CELEBRATION</small><b>메종 웨딩</b><p>빛과 자연이 함께하는 웨딩 공간</p></span><Chip tone="green">방문 예약 ↗</Chip></div></Browser><Phone className="pv-place-device"><PlacePage /></Phone><Note className="pv-place-note" icon="pin" title="발견하고, 둘러보고, 예약하고">지역 검색부터 방문까지 이어지는 동선</Note></>;
}
