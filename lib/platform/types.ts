/* 웨딩홀 플랫폼 자료 모양 — 화면은 이 모양만 압니다.
   지금은 lib/platform/sample.ts 의 샘플이 채우고, 실제 출처를 붙일 때는 lib/platform/data.ts 만 바꿉니다. */

export type Role = "hall" | "admin";

/** 로그인한 사람 — 화면에 내려가도 되는 값만 (비밀번호는 넣지 않음) */
export type Viewer = {
  accountId: string;
  role: Role;
  /** 웨딩홀 이름 또는 '하람마케팅' */
  name: string;
  /** 웨딩홀 계정이면 그 웨딩홀, 하람 계정이면 null */
  hallId: string | null;
};

/** 계약한 웨딩홀 — 하람이 계정(아이디 · 비밀번호)을 발급 */
export type Hall = {
  id: string;
  name: string;
  region: string;
  /** 하람이 발급한 로그인 아이디 */
  loginId: string;
  /** 계약한 서비스 이름 */
  services: string[];
  /** YYYY-MM-DD */
  contractStart: string;
  contractEnd: string | null;
  /** 하람 담당자 */
  manager: string;
  /** paused = 계약 종료 · 로그인 중지 */
  status: "active" | "paused";
  /** PC 순위 프로그램(ranktracker)의 광고주 번호 — 연결 전이면 null */
  trackerClientId: number | null;
};

export type ChannelKind = "homepage" | "blog" | "place" | "instagram";

/** collecting = 숫자를 모으는 중 · pending = 등록 뒤 확인 중 · manual = 직접 입력 · planned = 연동 예정 */
export type ChannelStatus = "collecting" | "pending" | "manual" | "planned";

export type Metric = {
  label: string;
  /** null = 아직 숫자 없음 (note 로 이유 표시) */
  value: number | null;
  unit?: string;
  note?: string;
};

/** 웨딩홀이 등록한 링크 하나 (홈페이지 · 블로그 · 플레이스 · 인스타그램) */
export type Channel = {
  id: string;
  kind: ChannelKind;
  label: string;
  url: string;
  status: ChannelStatus;
  metrics: Metric[];
  /** ISO 시각, 아직 숫자가 없으면 null */
  updatedAt: string | null;
};

/** 순위를 보는 네이버 검색 영역 */
export type RankSurface = "integrated" | "blog" | "place" | "cafe";

/** rank null = 확인한 범위 안에 없음 (순위 밖) */
export type RankPoint = { day: string; rank: number | null };

export type KeywordRow = {
  id: string;
  keyword: string;
  /** 월 검색량 (PC + 모바일) */
  monthlySearches: number | null;
  /** 영역별 지금 순위 — 값이 없으면 확인하지 않는 영역, null 이면 순위 밖 */
  ranks: Partial<Record<RankSurface, number | null>>;
  /** 7일 전보다 오른 계단 수 (+ 오름 · − 내림) */
  change7d: number | null;
  /** 추이를 보여 줄 대표 영역 */
  primary: RankSurface;
  /** 대표 영역의 최근 30일 */
  history: RankPoint[];
};

export type DayValue = { day: string; value: number };

export type Traffic = {
  days: number;
  visits: DayValue[];
  totalVisits: number;
  pageviews: number;
  /** 바로 앞 같은 길이 기간의 방문 수 */
  previousVisits: number;
  sources: { label: string; value: number }[];
  pages: { path: string; title: string; views: number }[];
};

export type Report = {
  /** YYYY-MM */
  month: string;
  status: "ready" | "preparing";
  summary: string;
};

/** 자료마다 마지막으로 가져온 시각 */
export type Freshness = {
  label: string;
  source: string;
  /** ISO 시각, 연결 전이면 null */
  at: string | null;
};
