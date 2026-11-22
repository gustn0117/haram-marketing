import type { CSSProperties, ReactElement, ReactNode } from "react";
import "./specimen.css";

/* 고객 전용 페이지의 서비스별 예시 화면 (견적서 프로젝트와 같은 목업) — 실제 화면이 아니라 '어떤 결과물이 나오는지'를 보여 주는 흑백 목업.
   모든 크기를 em 으로 잡아, 감싸는 요소의 font-size 하나로 통째로 줄이고 키웁니다. */

export type Device = "phone" | "browser";

export const SPECIMEN_DEVICE: Record<string, Device> = {
  instagram: "phone",
  blog: "browser",
  posting: "phone",
  place: "phone",
  crm: "browser",
  homepage: "browser",
  landing: "phone",
  fair: "browser",
  membership: "phone",
};

const w = (em: number): CSSProperties => ({ width: `${em}em` });

function Line({ em, tone = "", className = "" }: { em: number; tone?: "" | "ink" | "soft" | "light"; className?: string }) {
  return <span className={`mk-line${tone ? ` is-${tone}` : ""} ${className}`} style={w(em)} />;
}

/** 홀 사진 대신 쓰는 선 그림 — 아치 · 버진로드 · 샹들리에 */
function HallArt({ motif }: { motif: "arch" | "aisle" | "chandelier" }) {
  return (
    <svg className="mk-art" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {motif === "arch" && (
        <>
          <path d="M26 100V52a24 24 0 0 1 48 0v48" />
          <path d="M36 100V56a14 14 0 0 1 28 0v44" />
          <path d="M8 100h84" />
        </>
      )}
      {motif === "aisle" && (
        <>
          <path d="M4 100 44 46M96 100 56 46M44 46h12" />
          <path d="M44 46V30a6 6 0 0 1 12 0v16" />
          <path d="M20 79h60M30 65h40" />
        </>
      )}
      {motif === "chandelier" && (
        <>
          <path d="M50 0v26" />
          <path d="M28 40q22 16 44 0M36 33q14 10 28 0" />
          <circle cx="28" cy="46" r="2.4" />
          <circle cx="50" cy="52" r="2.4" />
          <circle cx="72" cy="46" r="2.4" />
          <path d="M12 100h76" />
        </>
      )}
    </svg>
  );
}

function Photo({ tone, motif, children, className = "" }: { tone: number; motif?: "arch" | "aisle" | "chandelier"; children?: ReactNode; className?: string }) {
  return (
    <span className={`mk-photo tone-${tone} ${className}`}>
      {motif && <HallArt motif={motif} />}
      {children}
    </span>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mk-phone">
      <div className="mk-screen">
        <span className="mk-notch" />
        <span className="mk-status" />
        {children}
      </div>
    </div>
  );
}

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="mk-browser">
      <div className="mk-browser-bar">
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-url">{url}</span>
      </div>
      <div className="mk-screen">{children}</div>
    </div>
  );
}

/* ── 01 인스타그램 — 프로필 · 하이라이트 · 피드 그리드 ── */
function InstagramMock() {
  const tiles: { tone: number; motif?: "arch" | "aisle" | "chandelier"; reel?: boolean }[] = [
    { tone: 2, motif: "arch" },
    { tone: 4, reel: true },
    { tone: 1, motif: "chandelier" },
    { tone: 5 },
    { tone: 3, motif: "aisle" },
    { tone: 2, reel: true },
    { tone: 4, motif: "arch" },
    { tone: 1 },
    { tone: 3, motif: "chandelier" },
  ];
  return (
    <Phone>
      <div className="mk-pad mk-row mk-between">
        <Line em={8.5} tone="ink" />
        <span className="mk-row mk-gap-s">
          <span className="mk-ico" />
          <span className="mk-ico" />
        </span>
      </div>
      <div className="mk-pad mk-row mk-gap-l ig-profile">
        <span className="ig-avatar">
          <HallArt motif="arch" />
        </span>
        {["게시물", "팔로워", "팔로잉"].map((label) => (
          <span key={label} className="mk-stat">
            <Line em={2.6} tone="ink" />
            <small>{label}</small>
          </span>
        ))}
      </div>
      <div className="mk-pad mk-stack-s">
        <Line em={7} tone="ink" />
        <Line em={17} />
        <Line em={12} />
      </div>
      <div className="mk-pad mk-row mk-gap-s ig-actions">
        <span className="mk-btn is-ink">문의하기</span>
        <span className="mk-btn">상담 예약</span>
      </div>
      <div className="mk-pad mk-row ig-highlights">
        {["홀", "웨딩", "후기", "상담"].map((label, index) => (
          <span key={label} className="ig-highlight">
            <Photo tone={[3, 1, 4, 2][index]} className="ig-ring" />
            <small>{label}</small>
          </span>
        ))}
      </div>
      <div className="ig-tabs">
        <span className="is-active" />
        <span />
      </div>
      <div className="ig-grid">
        {tiles.map((tile, index) => (
          <Photo key={index} tone={tile.tone} motif={tile.motif}>
            {tile.reel && <span className="ig-reel" />}
          </Photo>
        ))}
      </div>
    </Phone>
  );
}

/* ── 02 블로그 — 공식 블로그 첫 화면 ── */
function BlogMock() {
  return (
    <Browser url="blog · 웨딩홀 공식 블로그">
      <Photo tone={2} motif="aisle" className="blog-banner">
        <span className="blog-title">웨딩홀 공식 블로그</span>
      </Photo>
      <div className="blog-body">
        <aside className="blog-side">
          <span className="blog-avatar" />
          <Line em={7} tone="ink" />
          <Line em={9} />
          <ul>
            {["홀 소개", "시즌 프로모션", "실예식 이야기", "상담 안내"].map((label, index) => (
              <li key={label} className={index === 1 ? "is-active" : ""}>
                {label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="blog-posts">
          {[
            { tone: 3, motif: "arch" as const },
            { tone: 1, motif: "chandelier" as const },
            { tone: 4 },
          ].map((post, index) => (
            <div key={index} className="blog-post">
              <Photo tone={post.tone} motif={post.motif} />
              <div className="mk-stack-s">
                <small className="blog-cat">{["시즌 프로모션", "홀 소개", "실예식 이야기"][index]}</small>
                <Line em={[20, 17, 22][index]} tone="ink" />
                <Line em={26} />
                <Line em={19} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

/* ── 03 블로그 · 카페 포스팅 — 키워드 검색 결과에 쌓인 후기 ── */
function PostingMock() {
  return (
    <Phone>
      <div className="mk-pad">
        <span className="srch-box">
          <span>지역명 웨딩홀 후기</span>
          <span className="srch-glass" />
        </span>
      </div>
      <div className="mk-pad srch-tabs">
        {["통합", "블로그", "카페", "이미지"].map((label) => (
          <span key={label} className={label === "블로그" ? "is-active" : ""}>
            {label}
          </span>
        ))}
      </div>
      <div className="srch-list">
        {[
          { tag: "블로그", tone: 3, motif: "arch" as const },
          { tag: "카페", tone: 1, motif: "chandelier" as const },
          { tag: "블로그", tone: 4, motif: "aisle" as const },
          { tag: "카페", tone: 2 },
        ].map((item, index) => (
          <div key={index} className="srch-item">
            <div className="mk-stack-s">
              <span className="mk-row mk-gap-s">
                <span className="srch-src" />
                <Line em={5} tone="soft" />
                <span className="mk-chip">{item.tag}</span>
              </span>
              <Line em={[15, 13, 16, 12][index]} tone="ink" />
              <Line em={14} />
              <Line em={10} />
            </div>
            <Photo tone={item.tone} motif={item.motif} className="srch-thumb" />
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ── 04 네이버 플레이스 — 사진 · 버튼 · 탭 · 소식 ── */
function PlaceMock() {
  return (
    <Phone>
      <div className="pl-photos">
        <Photo tone={2} motif="arch" className="pl-main" />
        <Photo tone={4} motif="chandelier" />
        <Photo tone={3} motif="aisle" />
      </div>
      <div className="mk-pad mk-stack-s pl-head">
        <span className="mk-row mk-gap-s">
          <Line em={8} tone="ink" />
          <span className="mk-chip">웨딩홀</span>
        </span>
        <Line em={13} />
      </div>
      <div className="mk-pad pl-actions">
        {["전화", "길찾기", "예약", "문의"].map((label) => (
          <span key={label}>
            <span className="pl-action-ico" />
            <small>{label}</small>
          </span>
        ))}
      </div>
      <div className="pl-tabs">
        {["홈", "소식", "리뷰", "사진"].map((label) => (
          <span key={label} className={label === "홈" ? "is-active" : ""}>
            {label}
          </span>
        ))}
      </div>
      <div className="mk-pad mk-stack-m pl-info">
        {[13, 10, 15].map((em, index) => (
          <span key={index} className="mk-row mk-gap-s">
            <span className="mk-ico is-round" />
            <Line em={em} />
          </span>
        ))}
      </div>
      <div className="mk-pad pl-news">
        <Photo tone={1} motif="chandelier" />
        <div className="mk-stack-s">
          <small className="pl-news-label">소식</small>
          <Line em={9} tone="ink" />
          <Line em={11} />
        </div>
      </div>
    </Phone>
  );
}

/* ── 05 CRM · ERP — 예약 현황 대시보드 ── */
function CrmMock() {
  const halls = ["A홀", "B홀", "C홀"];
  const times = ["11:00", "13:00", "15:00", "17:00"];
  const cells: Record<string, "done" | "hold" | ""> = {
    "0-0": "done", "0-1": "done", "0-2": "hold", "1-0": "hold", "1-2": "done", "1-3": "done", "2-1": "done", "2-3": "hold",
  };
  return (
    <Browser url="관리 프로그램 · 예약 현황">
      <div className="crm">
        <nav className="crm-side">
          <span className="crm-logo" />
          {["상담", "예약", "계약", "정산", "직원"].map((label) => (
            <span key={label} className={label === "예약" ? "is-active" : ""}>
              {label}
            </span>
          ))}
        </nav>
        <div className="crm-main">
          <div className="mk-row mk-between">
            <span className="crm-title">예약 현황</span>
            <span className="mk-btn is-ink crm-add">상담 등록</span>
          </div>
          <div className="crm-kpis">
            {[
              { label: "상담 접수", value: "12" },
              { label: "홀투어", value: "8" },
              { label: "계약", value: "5" },
            ].map((kpi) => (
              <span key={kpi.label}>
                <small>{kpi.label}</small>
                <b>{kpi.value}</b>
              </span>
            ))}
          </div>
          <div className="crm-cal">
            <span />
            {times.map((time) => (
              <small key={time}>{time}</small>
            ))}
            {halls.map((hall, row) => (
              <span key={hall} className="crm-row">
                <small>{hall}</small>
                {times.map((time, col) => {
                  const state = cells[`${row}-${col}`] ?? "";
                  return (
                    <span key={time} className={`crm-cell${state ? ` is-${state}` : ""}`}>
                      {state === "done" ? "확정" : state === "hold" ? "가예약" : ""}
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ── 06 홈페이지 — 메인 화면 ── */
function HomepageMock() {
  return (
    <Browser url="웨딩홀 공식 홈페이지">
      <div className="hp-nav">
        <Line em={6} tone="ink" />
        <span className="hp-menu">
          {["홀 소개", "웨딩", "실견적", "오시는 길"].map((label) => (
            <small key={label}>{label}</small>
          ))}
        </span>
        <span className="mk-btn is-ink hp-cta">상담 신청</span>
      </div>
      <Photo tone={1} motif="aisle" className="hp-hero">
        <span className="hp-hero-copy">
          <Line em={20} tone="light" />
          <Line em={14} tone="light" />
          <span className="mk-btn hp-hero-btn">홀 둘러보기</span>
        </span>
      </Photo>
      <div className="hp-cols">
        {[
          { label: "홀 소개", tone: 3, motif: "arch" as const },
          { label: "웨딩 상품", tone: 4, motif: "chandelier" as const },
          { label: "실견적 안내", tone: 2 },
        ].map((col) => (
          <span key={col.label} className="mk-stack-s">
            <Photo tone={col.tone} motif={col.motif} />
            <small className="hp-col-label">{col.label}</small>
            <Line em={11} />
          </span>
        ))}
      </div>
    </Browser>
  );
}

/* ── 07 랜딩페이지 — 혜택 · 신청 폼 ── */
function LandingMock() {
  return (
    <Phone>
      <Photo tone={1} motif="arch" className="ld-hero">
        <span className="ld-copy">
          <span className="ld-chip">시즌 혜택</span>
          <Line em={15} tone="light" />
          <Line em={11} tone="light" />
        </span>
      </Photo>
      <div className="mk-pad mk-stack-m ld-benefits">
        {[14, 12, 15].map((em, index) => (
          <span key={index} className="mk-row mk-gap-s">
            <span className="ld-check" />
            <Line em={em} />
          </span>
        ))}
      </div>
      <div className="mk-pad mk-stack-m ld-form">
        {["이름", "연락처", "예식 희망일"].map((label) => (
          <span key={label} className="ld-field">
            <small>{label}</small>
          </span>
        ))}
        <span className="mk-btn is-ink ld-submit">상담 신청하기</span>
      </div>
    </Phone>
  );
}

/* ── 08 웨딩박람회 — 안내 · 사전 등록 · 현장 체크인 ── */
function FairMock() {
  return (
    <Browser url="웨딩박람회 · 사전 등록">
      <div className="fr-head">
        <span className="mk-stack-s">
          <span className="fr-title">웨딩박람회</span>
          <Line em={14} />
        </span>
        <span className="mk-btn is-ink">사전 등록</span>
      </div>
      <div className="fr-body">
        <div className="fr-schedule">
          <small className="fr-label">프로그램</small>
          {[12, 15, 10, 13].map((em, index) => (
            <span key={index} className="mk-row mk-gap-s fr-slot">
              <span className="fr-time" />
              <Line em={em} />
            </span>
          ))}
          <small className="fr-label">참가 혜택</small>
          <span className="fr-benefits">
            <Photo tone={3} motif="chandelier" />
            <Photo tone={4} motif="arch" />
            <Photo tone={2} motif="aisle" />
          </span>
        </div>
        <div className="mk-stack-m">
          <div className="fr-card">
            <small className="fr-label">사전 등록</small>
            {["이름", "연락처", "방문 시간"].map((label) => (
              <span key={label} className="ld-field">
                <small>{label}</small>
              </span>
            ))}
            <span className="mk-btn is-ink">등록하기</span>
          </div>
          <div className="fr-card fr-checkin">
            <span className="fr-check" />
            <span className="mk-stack-s">
              <b>체크인 완료</b>
              <Line em={9} />
            </span>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ── 09 멤버십 — 회원 카드 · 포인트 · 혜택 ── */
function MembershipMock() {
  return (
    <Phone>
      <div className="mk-pad mk-row mk-between">
        <Line em={9} tone="ink" />
        <span className="mk-ico is-round" />
      </div>
      <div className="mk-pad">
        <div className="ms-card">
          <span className="mk-row mk-between">
            <span className="ms-brand">MEMBERSHIP</span>
            <span className="ms-tier">프레스티지</span>
          </span>
          <span className="ms-chip" />
          <span className="mk-row mk-between ms-foot">
            <Line em={7} tone="light" />
            <Line em={3.5} tone="light" />
          </span>
        </div>
      </div>
      <div className="mk-pad mk-stack-s ms-points">
        <span className="mk-row mk-between">
          <small>포인트</small>
          <Line em={5} tone="ink" />
        </span>
        <span className="ms-bar">
          <span />
        </span>
      </div>
      <div className="mk-pad ms-grid">
        {["제휴 할인", "기념일 혜택", "가족 행사", "쿠폰함"].map((label) => (
          <span key={label}>
            <span className="mk-ico is-round" />
            <small>{label}</small>
          </span>
        ))}
      </div>
      <div className="mk-pad mk-stack-m ms-coupons">
        {[10, 12].map((em, index) => (
          <span key={index} className="ms-coupon">
            <Line em={em} tone="ink" />
            <Line em={7} />
          </span>
        ))}
      </div>
    </Phone>
  );
}

const MOCKS: Record<string, () => ReactElement> = {
  instagram: InstagramMock,
  blog: BlogMock,
  posting: PostingMock,
  place: PlaceMock,
  crm: CrmMock,
  homepage: HomepageMock,
  landing: LandingMock,
  fair: FairMock,
  membership: MembershipMock,
};

/** 예시 화면 — 장식이므로 보조기기에는 숨기고, 캡션은 감싸는 쪽에서 씁니다. */
export default function Specimen({ id }: { id: string }) {
  const Mock = MOCKS[id];
  if (!Mock) return null;
  return (
    <div className={`mk mk-${SPECIMEN_DEVICE[id]}-wrap`} aria-hidden="true">
      <Mock />
    </div>
  );
}
