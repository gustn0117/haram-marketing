/* ─────────────────────────────────────────────────────────────
   견적서 저장소(haram-service-quote)의 data.ts 사본 — /quote 웹 견적서와 고객 전용 페이지(/client)의 금액이 여기서 나옵니다.
   금액 · 문구가 바뀌면 견적서 저장소의 data.ts 를 고친 뒤, 이 파일에 그대로 덮어써 복사하세요 (이 주석만 남기고).
   ───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   하람 서비스 견적서 — 가격 · 문구 · 받는 곳 단일 소스
   금액이 바뀌면 이 파일만 고치면 됩니다.
   표지 요약 · 견적표 · 합계는 모두 아래 SERVICES 에서 계산합니다.

   · 이 파일은 다른 파일을 import 하지 않습니다.
     (scripts/verify-pdf.mjs 가 이 파일을 그대로 읽어 PDF 속 금액과 대조합니다)
   · 홈페이지(haram-marketing.co.kr)의 웹 견적서(/quote)와 고객 전용 페이지(/client) 금액은 이 파일의 사본에서 나옵니다
     → 이 파일을 고친 뒤 하람마케팅 저장소 lib/quote-data.ts 에 그대로 복사하세요 (맨 위 사본 안내 주석만 남기고).
   · 내용을 바꾼 뒤에는 PDF 도 다시 만드세요 → README.md 참고
   ───────────────────────────────────────────────────────────── */

/* ─── 문서 ─── */
export const DOC = {
  /** 문서 이름 — 툴바 · 꼬리말 · 파일명 */
  title: "서비스 견적서",
  titleEn: "Service Quotation",
  scope: "마케팅 대행 · 제작 개발",
  year: "2026",
};

/* ─── 보내는 곳 ─── */
export const SENDER = {
  nameKr: "하람",
  nameEn: "HARAM",
  caption: "WEDDING CONCIERGE",
  rep: "대표 김영진",
  phone: "010-7930-1332",
};

/* ─── 받는 곳 ───
   특정 예식장에 보낼 때는 아래 네 줄만 바꾸면 됩니다.
   logo 가 null 이면 로고 자리에 이름이 글자로 들어갑니다.
   logo 예) { full: { src: "/client-logo.png", aspect: 772 / 1000 },
             wordmark: { src: "/client-wordmark.png", aspect: 1200 / 293 } }
   · full     = 심볼 + 글자 전체 로고 (표지)
   · wordmark = 글자만 잘라 낸 로고 (머리말 · 툴바처럼 작은 자리 — 세로형 로고는 작게 쓰면 글자가 안 읽힘)
   · aspect   = 가로 ÷ 세로 (원본 비율 그대로 출력) */
export type LogoAsset = { src: string; aspect: number };

export const CLIENT: {
  nameKr: string;
  nameEn: string;
  /** 표지 하단 받는 사람 표기 — 예식장용이면 "○○웨딩홀 귀중" */
  addressee: string;
  logo: null | { full: LogoAsset; wordmark: LogoAsset };
} = {
  nameKr: "웨딩홀 · 예식장",
  nameEn: "Wedding Venues",
  addressee: "웨딩홀 · 예식장 담당자님",
  logo: null,
};

/** [PDF 다운로드] 파일명 — 예식장용이면 `(${CLIENT.nameKr}) 하람 서비스 견적서.pdf` */
export const PDF_FILENAME = `${SENDER.nameKr} ${DOC.title}.pdf`;
/** 미리 만들어 둔 PDF (public/documents) — 내용이 바뀌면 npm run pdf 로 다시 만듭니다. */
export const PDF_URL = "/documents/haram-service-quotation.pdf";

/* ─── 금액 ─── */

/** true = 표기 금액에 부가세 포함 · false = 부가세 별도 */
export const VAT_INCLUDED = false;
export const VAT_LABEL = VAT_INCLUDED ? "VAT 포함" : "VAT 별도";
export const VAT_LABEL_EN = VAT_INCLUDED ? "VAT INCLUDED" : "VAT EXCLUDED";

export type GroupId = "marketing" | "build";
/** 청구 주기 — 월 = 매달 · 건 = 한 번 (건당 · 첫 제작) */
export type Cycle = "월" | "건";

export const GROUPS: {
  id: GroupId;
  label: string;
  en: string;
  /** 묶음 합계에 더하는 주기 — 주기가 다른 줄과 금액 미정 줄은 합계에서 빠지고 '별도'로 표기됩니다. */
  cycle: Cycle;
  basis: string;
  description: string;
}[] = [
  {
    id: "marketing",
    label: "마케팅 대행",
    en: "Marketing",
    cycle: "월",
    basis: "월 단위 (플레이스 건당)",
    description:
      "인스타그램 · 블로그 · 네이버 검색 · 플레이스를 대신 운영합니다.",
  },
  {
    id: "build",
    label: "제작 · 개발",
    en: "Development",
    cycle: "건",
    basis: "건당 제작 (일부 월 비용)",
    description:
      "홈페이지 · 랜딩페이지, 관리 프로그램, 박람회 플랫폼, 멤버십 프로그램을 직접 만듭니다.",
  },
];

/** 금액 한 줄 — 예) 월 200,000원 · 건당 500,000원~ · 첫 제작 2,000,000원 */
export type PriceLine = {
  cycle: Cycle;
  /** 기준 표기 — 없으면 월 → "월", 건 → "건당" (예: "첫 제작", "월 유지보수") */
  label?: string;
  /** 금액(원). 아직 정하지 않았으면 null → "견적 협의" */
  amount: number | null;
  /** true = 시작 금액 → 금액 뒤에 "~" (키워드마다 달라지는 항목) */
  from?: boolean;
};

export type Service = {
  id: string;
  group: GroupId;
  title: string;
  /** 표지 요약처럼 좁은 자리에 쓰는 짧은 이름 (없으면 title) */
  short?: string;
  en: string;
  /** 견적표 '주요 내용' — 한 줄 */
  summary: string;
  /** 서비스 페이지 설명 */
  description: string;
  /** 포함 사항 — 4개 */
  includes: string[];
  /** 금액 — 한 줄, 또는 '첫 제작 + 월 유지보수'처럼 두 줄 */
  price: PriceLine[];
  /** 금액에 붙는 짧은 조건 — 키워드마다 상이 · 3개월 운영 기준 … */
  note?: string;
  /** 비용 안내 한 문장 — 서비스 상세의 비용 칸 (없으면 기본 문장) */
  notice?: string;
};

export const SERVICES: Service[] = [
  /* ── 마케팅 대행 ── */
  {
    id: "instagram",
    group: "marketing",
    title: "인스타그램 관리 대행",
    en: "Instagram",
    summary: "주 1~2회 포스팅 · 검색엔진 최적화",
    description:
      "예식장 인스타그램 계정을 대신 운영합니다. 주 1~2회 게시글을 올리고, 올린 뒤 검색엔진 최적화와 기본 트래픽 · 검색 유도 작업을 합니다.",
    includes: [
      "주 1~2회 관련 게시글 포스팅",
      "포스팅 후 검색엔진 최적화",
      "기본 트래픽 작업",
      "검색 유도 진행",
    ],
    price: [{ cycle: "월", amount: 200_000 }],
  },
  {
    id: "blog",
    group: "marketing",
    title: "웨딩홀 블로그 관리 대행",
    en: "Blog Management",
    summary: "자사 블로그 디자인 · 주 1~2회 발행",
    description:
      "예식장 자사 블로그를 대신 관리합니다. 블로그 레이아웃과 디자인을 주기적으로 업데이트하고, 주 1~2회 게시글을 발행한 뒤 검색엔진 최적화 설정을 합니다.",
    includes: [
      "자사 블로그 관리 대행",
      "레이아웃 · 디자인 주기적 업데이트",
      "주 1~2회 게시글 발행",
      "발행 후 검색엔진 최적화 설정",
    ],
    price: [{ cycle: "월", amount: 200_000 }],
  },
  {
    id: "posting",
    group: "marketing",
    title: "네이버 블로그 · 카페 포스팅",
    short: "블로그 · 카페 포스팅",
    en: "Blog & Cafe Posting",
    summary: "검증된 블로그 상위노출 포스팅 · 모니터링",
    description:
      "체험단 · 최적화 · 준최적화 블로그처럼 검증된 블로그에 상위노출을 위한 글을 발행합니다. 키워드를 정한 뒤 주 1~2회 이상 발행해 유입량을 확보하고, 올라간 글은 분 간격 프로그램 모니터링으로 객관적인 수치를 확인합니다.",
    includes: [
      "체험단 · 최적화 · 준최적화 블로그",
      "키워드별 상위노출 게시글 발행",
      "주 1~2회 이상 발행 · 유입 확보",
      "분 간격 프로그램 모니터링",
    ],
    price: [{ cycle: "월", amount: 500_000, from: true }],
    note: "키워드마다 상이",
    notice: "표기 금액은 시작 금액입니다. 키워드마다 검색량과 경쟁 정도가 달라, 함께 진행할 키워드를 정한 뒤 최종 금액을 안내드립니다.",
  },
  {
    id: "place",
    group: "marketing",
    title: "네이버 플레이스 마케팅",
    short: "플레이스 마케팅",
    en: "Naver Place",
    summary: "지도 노출 순위 최적화 · 블로그 배포",
    description:
      "네이버 플레이스가 지역 검색 위쪽에 보이도록 지도 노출 순위 최적화, 블로그 배포, 최적화 노출 트래픽 작업을 합니다. 작업은 키워드별로 진행합니다.",
    includes: [
      "지도 노출 순위 최적화",
      "블로그 배포",
      "최적화 노출 트래픽",
      "키워드별 진행",
    ],
    price: [{ cycle: "건", amount: 500_000, from: true }],
    note: "키워드마다 상이",
    notice: "표기 금액은 시작 금액입니다. 키워드마다 검색량과 경쟁 정도가 달라, 키워드를 정한 뒤 최종 금액을 안내드립니다.",
  },

  /* ── 제작 · 개발 ── */
  {
    id: "crm",
    group: "build",
    title: "웨딩홀 CRM · ERP 전사 관리 프로그램",
    short: "CRM · ERP 관리 프로그램",
    en: "CRM · ERP",
    summary: "계약 · 입금부터 예식 당일까지 한곳에서",
    description:
      "계약부터 예식 당일까지 예식 한 건을 한곳에서 관리하는 프로그램입니다. 직원은 계약 · 입금, 일정, 예식 준비, 소통을 직원용 화면에서 다루고, 신랑신부는 전용 페이지에서 예식 정보를 입력합니다.",
    includes: [
      "계약 · 입금 · 잔금 관리",
      "신랑신부 전용 정보 페이지",
      "예식별 7단계 진행 관리",
      "직원 권한 · 대화방 · 문자",
    ],
    /* 첫 제작 금액은 아직 받지 않음 → '견적 협의' */
    price: [
      { cycle: "건", label: "첫 제작", amount: null },
      { cycle: "월", amount: 300_000 },
    ],
    notice: "첫 제작 금액은 홀 수와 운영 방식을 확인한 뒤 맞춤 견적을 드립니다.",
  },
  {
    id: "homepage",
    group: "build",
    title: "홈페이지 제작",
    en: "Website",
    summary: "예식장 전용 홈페이지 · 상담 신청",
    description:
      "홀 소개, 실견적 안내, 상담 신청이 들어간 예식장 홈페이지를 만듭니다. 모바일 화면과 검색엔진 등록까지 마치며, 도메인 · 호스팅 비용은 별도(월 1만 원 미만)입니다.",
    includes: [
      "예식장 전용 홈페이지",
      "홀 · 웨딩 상품 소개",
      "실견적 · 상담 신청 폼",
      "반응형 (모바일) 디자인",
    ],
    price: [{ cycle: "건", amount: 800_000 }],
    note: "도메인 · 호스팅 별도",
    notice: "도메인 · 호스팅 비용은 별도이며 월 1만 원 미만으로 청구됩니다.",
  },
  {
    id: "landing",
    group: "build",
    title: "랜딩페이지 제작",
    en: "Landing Page",
    summary: "박람회 · 이벤트 홍보 랜딩페이지",
    description:
      "웨딩박람회, 웨딩홀 이벤트를 알리는 한 장짜리 홍보 페이지를 만듭니다. 혜택 안내와 상담 신청을 한 화면에 담습니다.",
    includes: [
      "웨딩박람회 홍보 페이지",
      "웨딩홀 이벤트 · 프로모션",
      "상담 · 견적 신청 폼",
      "유입 경로 구분 설정",
    ],
    price: [{ cycle: "건", amount: 250_000 }],
  },
  {
    id: "fair",
    group: "build",
    title: "웨딩박람회 플랫폼 제작",
    short: "박람회 플랫폼 제작",
    en: "Wedding Fair Platform",
    summary: "박람회 안내 · 사전 등록 · 현장 접수",
    description:
      "웨딩박람회 안내, 사전 등록, 참가 혜택, 현장 상담 접수를 한 플랫폼에서 처리합니다. 금액은 3개월 운영 기준입니다.",
    includes: [
      "박람회 일정 · 혜택 안내",
      "사전 등록 · 방문 예약",
      "현장 체크인 · 상담 접수",
      "참가자 정보 관리",
    ],
    price: [{ cycle: "건", amount: 3_000_000 }],
    note: "3개월 운영 기준",
    notice: "3개월 운영 기준 금액입니다. 운영 기간과 회차는 사전 미팅에서 함께 정합니다.",
  },
  {
    id: "membership",
    group: "build",
    title: "웨딩홀 멤버십 프로그램 제작",
    short: "멤버십 프로그램 제작",
    en: "Membership Program",
    summary: "회원 등급 · 혜택 · 포인트 관리",
    description:
      "예식장 전용 멤버십 프로그램을 만듭니다. 회원 등급, 혜택, 포인트, 제휴 할인을 한 곳에서 관리하고, 첫 제작 이후에는 월 유지보수로 운영합니다.",
    includes: [
      "회원 가입 · 등급 관리",
      "혜택 · 포인트 운영",
      "제휴 업체 할인 연결",
      "모바일 회원 화면",
    ],
    price: [
      { cycle: "건", label: "첫 제작", amount: 2_000_000 },
      { cycle: "월", label: "월 유지보수", amount: 100_000 },
    ],
    notice: "첫 제작 이후에는 매달 유지보수 비용이 청구됩니다.",
  },
];

/* ─── 서비스 상세 안내서 (A4 · /detail/guide — 비밀번호로 잠김) ─── */
export const GUIDE = {
  title: "서비스 상세 안내서",
  titleEn: "Service Guide",
  /** 비밀번호를 연 브라우저만 받는 PDF (private/haram-service-guide.pdf) — 내용이 바뀌면 npm run pdf:guide */
  pdfUrl: "/detail/guide.pdf",
  pdfFilename: `${SENDER.nameKr} 서비스 상세 안내서.pdf`,
  statement: ["서비스 아홉 가지를", "두 쪽씩 정리했습니다."],
  context: ["서비스마다 맡는 일과 진행 순서,", "결과물과 비용을 적었습니다."],
  english: ["Nine services,", "two pages each."],
};

/* ─── 계산 (여기서부터는 고칠 필요 없음) ─── */

export const won = (n: number) => n.toLocaleString("ko-KR");
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** 서비스 번호 — SERVICES 순서대로 01 ~ 09 */
export const serviceNo = (s: Service) => pad2(SERVICES.indexOf(s) + 1);
export const servicesOf = (group: GroupId) => SERVICES.filter((s) => s.group === group);
export const shortName = (s: Service) => s.short ?? s.title;
export const groupOf = (id: GroupId) => GROUPS.find((g) => g.id === id)!;

/** 금액 줄의 기준 — 월 · 건당 · 첫 제작 · 월 유지보수 … */
export const basisOf = (line: PriceLine) => line.label ?? (line.cycle === "월" ? "월" : "건당");

export type PriceLineView = {
  /** 기준 — 월 · 건당 · 첫 제작 … */
  basis: string;
  /** "200,000" — 금액 미정이면 null */
  amount: string | null;
  /** 시작 금액이면 true → "원~" */
  from: boolean;
  /** "200,000원" · "500,000원~" · "견적 협의" */
  value: string;
  /** "월 200,000원" — 기준 + 금액 */
  text: string;
};

/** 금액 표기 — 줄마다 기준 · 금액. text 는 줄을 이은 한 줄 (좁은 자리 · PDF 검사용) */
export function priceOf(s: Service): { lines: PriceLineView[]; text: string; note?: string } {
  const lines = s.price.map((line) => {
    const basis = basisOf(line);
    const amount = line.amount === null ? null : won(line.amount);
    const from = Boolean(line.from);
    const value = amount === null ? "견적 협의" : `${amount}원${from ? "~" : ""}`;
    return { basis, amount, from, value, text: `${basis} ${value}` };
  });
  return { lines, text: lines.map((line) => line.text).join(" · "), note: s.note };
}

/** 묶음 합계 — 묶음 주기(마케팅 = 월, 제작 = 건)이고 금액이 정해진 줄만 더합니다.
 *  주기가 다르거나 금액 미정인 줄은 excluded 에 남습니다 — 서비스 전체가 빠지면 이름만, 일부 줄만 빠지면 '이름(기준)'. */
export function groupTotal(group: GroupId) {
  const { cycle } = groupOf(group);
  const counted: PriceLine[] = [];
  const excluded: string[] = [];
  for (const s of servicesOf(group)) {
    const inLines = s.price.filter((line) => line.cycle === cycle && line.amount !== null);
    const outLines = s.price.filter((line) => !inLines.includes(line));
    counted.push(...inLines);
    if (outLines.length) excluded.push(inLines.length ? `${shortName(s)}(${outLines.map(basisOf).join(" · ")})` : shortName(s));
  }
  const sum = counted.reduce((total, line) => total + (line.amount ?? 0), 0);
  const from = counted.some((line) => line.from);
  const hasAmount = counted.length > 0;
  return {
    sum,
    /** 시작 금액이 하나라도 섞였으면 합계도 "~" */
    from,
    /** 하나라도 더한 줄이 있는지 */
    hasAmount,
    /** 모든 줄이 합계에 들어갔는지 */
    complete: excluded.length === 0,
    excluded,
    /** 합계 칸 이름 — "마케팅 대행 월 합계" · "제작 · 개발 합계" */
    label: `${groupOf(group).label} ${cycle === "월" ? "월 합계" : "합계"}`,
    /** "900,000원~" · "견적 협의" */
    value: hasAmount ? `${won(sum)}원${from ? "~" : ""}` : "견적 협의",
  };
}

/* ─── 견적 안내사항 ─── */
export const NOTES: string[] = [
  `표기 금액은 모두 부가세(VAT) ${VAT_INCLUDED ? "포함" : "별도"} 금액입니다. ‘월’은 매달, ‘건당’ · ‘첫 제작’은 한 번 청구되며, 금액 뒤 ‘~’는 시작 금액입니다.`,
  "네이버 블로그 · 카페 포스팅과 플레이스 마케팅은 키워드마다 검색량과 경쟁 정도가 달라, 키워드를 정한 뒤 최종 금액을 안내드립니다.",
  "홈페이지 제작의 도메인 · 호스팅 비용은 별도이며 월 1만 원 미만으로 청구됩니다. 웨딩박람회 플랫폼은 3개월 운영 기준 금액입니다.",
  "필요한 서비스만 골라 진행하실 수 있습니다. 세부 작업 범위와 일정은 사전 미팅에서 협의 후 확정합니다.",
  ...(SERVICES.some((s) => s.price.some((line) => line.amount === null))
    ? ["‘견적 협의’ 항목은 예식장의 규모와 필요한 범위를 확인한 뒤 맞춤 견적을 드립니다."]
    : []),
];

/* ─── 페이지 · 목차 ─── */
export const PAGES = [
  { id: "cover", title: "표지", subtitle: "Cover" },
  { id: "quotation", title: "견적 안내", subtitle: "Quotation" },
  { id: "marketing", title: "마케팅 대행", subtitle: "Marketing" },
  { id: "build", title: "제작 · 개발", subtitle: "Development" },
  { id: "about", title: "하람 소개", subtitle: "About HARAM" },
] as const;

export type PageId = (typeof PAGES)[number]["id"];

/* ─── 표지 ─── */
export const COVER = {
  statement: ["필요한 서비스만", "골라 진행하실 수 있습니다."],
  context: ["인스타그램 · 블로그 · 플레이스 운영과", "홈페이지 · 관리 프로그램 제작 비용입니다."],
  english: ["Marketing and web", "for wedding venues."],
};

/* ─── 진행 절차 ─── */
export const PROCESS: Record<GroupId, { title: string; detail: string }[]> = {
  marketing: [
    { title: "진단 · 전략", detail: "노출 · 문의 현황과 경쟁 환경을 진단하고 예산에 맞는 전략을 세웁니다." },
    { title: "채널 · 키워드 셋업", detail: "인스타그램 · 블로그 · 플레이스를 정비하고 공략할 키워드를 정합니다." },
    { title: "운영 · 발행", detail: "콘텐츠와 포스팅을 발행하고, 들어온 문의를 상담으로 넘깁니다." },
    { title: "성과 분석 · 리포트", detail: "노출 · 문의 · 예약 데이터를 정리해 다음 달 운영에 반영합니다." },
  ],
  build: [
    { title: "상담 · 요구사항 정리", detail: "운영 방식과 꼭 필요한 기능을 듣고 제작 범위와 일정을 정합니다." },
    { title: "기획 · 설계", detail: "화면 구성과 기능 흐름을 설계하고 실제 업무에 맞는지 함께 확인합니다." },
    { title: "디자인 · 개발", detail: "예식장 분위기에 맞춘 디자인으로 개발하고 단계마다 결과를 공유합니다." },
    { title: "오픈 · 유지보수", detail: "충분히 테스트한 뒤 오픈하고, 이후 수정과 기능 개선을 이어 갑니다." },
  ],
};

/* ─── 하람 소개 ─── (**굵게** 표시한 부분은 진하게 출력) */
export const ABOUT = {
  title: "웨딩홀 · 예식장 전문 마케팅",
  description: "웨딩홀 · 예식장 마케팅만 하고, 홈페이지와 관리 프로그램도 직접 만듭니다.",
  intro: [
    "하람은 **웨딩홀 · 예식장 마케팅**만 합니다. 인스타그램, 블로그, 네이버 플레이스를 대신 운영하고, 매달 노출 · 문의 수치를 정리해 공유합니다.",
    "콘텐츠 제작과 홈페이지 · 관리 프로그램 개발도 **자사 팀이 직접** 합니다. 외주 없이 한 팀이 맡아 진행합니다.",
  ],
  strengths: [
    {
      title: "웨딩홀만 마케팅합니다",
      en: "Wedding Halls Only",
      detail:
        "다른 업종은 맡지 않습니다. 예비부부가 어떤 검색어로 홀을 찾고 무엇을 비교하는지에 맞춰 운영합니다.",
    },
    {
      title: "문의 · 예약 수로 확인",
      en: "Measured by Inquiries",
      detail:
        "노출과 유입뿐 아니라 상담 문의와 홀투어 예약 수를 매달 리포트로 정리합니다.",
    },
    {
      title: "제작 · 개발도 직접",
      en: "Built In-house",
      detail:
        "콘텐츠 제작과 디자인, 홈페이지 · 프로그램 개발을 자사 팀이 맡습니다.",
    },
    {
      title: "문의 응대 순서까지",
      en: "Inquiry Handling",
      detail:
        "들어온 문의가 상담 예약으로 이어지도록 상담 DB 관리와 응대 순서도 함께 정리합니다.",
    },
  ],
  mantra: ["결과는 문의와 예약 수로", "매달 함께 확인합니다."],
};
