import "server-only";
import { num } from "./format";
import type { Channel, ChannelKind, DayValue, Freshness, Hall, KeywordRow, RankPoint, RankSurface, Report, Traffic } from "./types";

/* 샘플 자료 — 틀 단계에서 화면을 채우는 값입니다. 실제 웨딩홀 · 실제 수치가 아닙니다.
   날짜는 오늘(한국 시간)을 기준으로 만들어 언제 열어도 최근 기간처럼 보입니다.
   숫자는 웨딩홀마다 고정된 난수로 만들어 새로고침해도 바뀌지 않습니다. */

export const SAMPLE_HALLS: Hall[] = [
  {
    id: "hall-1",
    name: "샘플 웨딩홀",
    region: "수원",
    loginId: "sample",
    services: ["인스타그램 관리 대행", "블로그 관리 대행", "플레이스 마케팅", "홈페이지 제작"],
    contractStart: "2026-06-01",
    contractEnd: null,
    manager: "하람 담당자",
    status: "active",
    trackerClientId: null,
  },
  {
    id: "hall-2",
    name: "샘플 컨벤션",
    region: "평택",
    loginId: "sample2",
    services: ["블로그·카페 포스팅", "플레이스 마케팅"],
    contractStart: "2026-09-01",
    contractEnd: "2027-08-31",
    manager: "하람 담당자",
    status: "active",
    trackerClientId: null,
  },
  {
    id: "hall-3",
    name: "샘플 가든홀",
    region: "천안",
    loginId: "sample3",
    services: ["인스타그램 관리 대행"],
    contractStart: "2026-03-01",
    contractEnd: "2026-10-31",
    manager: "하람 담당자",
    status: "paused",
    trackerClientId: null,
  },
];

const DAY = 86_400_000;
const KST = 9 * 3_600_000;

/** 오늘(한국 시간)에서 offset 일 전 — 'YYYY-MM-DD' */
const kstDay = (offset: number) => new Date(Date.now() + KST - offset * DAY).toISOString().slice(0, 10);

/** 오늘까지 n일 */
const lastDays = (n: number) => Array.from({ length: n }, (_, i) => kstDay(n - 1 - i));

/** 지금에서 minutes 분 전 — ISO 시각 */
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

/** 고정 난수 (mulberry32) — 같은 글자면 같은 순서의 0~1 값 */
function seeded(text: string) {
  let seed = 2166136261;
  for (let i = 0; i < text.length; i++) seed = Math.imul(seed ^ text.charCodeAt(i), 16777619);
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── 홈페이지 방문 ── */

const TRAFFIC_PROFILE: Record<string, { base: number; growth: number }> = {
  "hall-1": { base: 128, growth: 0.22 },
  "hall-2": { base: 71, growth: 0.12 },
  "hall-3": { base: 38, growth: 0 },
};

/** 요일별 비율 (일 ~ 토) — 주말에 웨딩홀을 많이 찾아보는 흐름 */
const WEEKDAY = [1.32, 0.9, 0.86, 0.88, 0.92, 1.05, 1.38];

const SOURCES: [string, number][] = [
  ["네이버 검색", 0.41],
  ["네이버 블로그", 0.18],
  ["인스타그램", 0.14],
  ["직접 방문", 0.12],
  ["구글 검색", 0.09],
  ["기타", 0.06],
];

const PAGES: [string, string, number][] = [
  ["/", "첫 화면", 0.34],
  ["/hall", "홀 안내", 0.19],
  ["/gallery", "웨딩 갤러리", 0.16],
  ["/dining", "식사 안내", 0.12],
  ["/reservation", "상담 예약", 0.1],
  ["/location", "오시는 길", 0.09],
];

function visitSeries(hallId: string): DayValue[] {
  const profile = TRAFFIC_PROFILE[hallId] ?? { base: 40, growth: 0 };
  const random = seeded(`visits:${hallId}`);
  const days = lastDays(180);
  return days.map((day, i) => {
    const trend = 1 + profile.growth * (i / (days.length - 1));
    const weekday = WEEKDAY[new Date(`${day}T00:00:00Z`).getUTCDay()];
    return { day, value: Math.round(profile.base * trend * weekday * (0.84 + random() * 0.32)) };
  });
}

/** 합계를 비율대로 나눔 — 반올림 차이는 마지막 칸이 받음 */
function split(total: number, shares: number[]) {
  const parts = shares.map((share) => Math.round(total * share));
  parts[parts.length - 1] = total - parts.slice(0, -1).reduce((sum, value) => sum + value, 0);
  return parts;
}

export function sampleTraffic(hallId: string, days: number): Traffic {
  const series = visitSeries(hallId);
  const visits = series.slice(-days);
  const previous = series.slice(-days * 2, -days);
  const totalVisits = visits.reduce((sum, item) => sum + item.value, 0);
  const pageviews = Math.round(totalVisits * 2.6);
  const sourceValues = split(totalVisits, SOURCES.map(([, share]) => share));
  const pageValues = split(pageviews, PAGES.map(([, , share]) => share));
  return {
    days,
    visits,
    totalVisits,
    pageviews,
    previousVisits: previous.reduce((sum, item) => sum + item.value, 0),
    sources: SOURCES.map(([label], i) => ({ label, value: sourceValues[i] })),
    pages: PAGES.map(([path, title], i) => ({ path, title, views: pageValues[i] })),
  };
}

/* ── 키워드 순위 ── */

type KeywordSeed = {
  keyword: string;
  searches: number;
  ranks: Partial<Record<RankSurface, number | null>>;
  /** 7일 전보다 오른 계단 수 */
  change: number;
  primary?: RankSurface;
};

const KEYWORDS: Record<string, KeywordSeed[]> = {
  "hall-1": [
    { keyword: "수원 웨딩홀", searches: 8900, ranks: { integrated: 4, blog: 6, place: 3 }, change: 2 },
    { keyword: "수원 결혼식장", searches: 3100, ranks: { integrated: 7, blog: 9, place: 5 }, change: -1 },
    { keyword: "영통 웨딩홀", searches: 1450, ranks: { integrated: 2, blog: 3, place: 1 }, change: 1 },
    { keyword: "광교 웨딩홀", searches: 2300, ranks: { integrated: 11, blog: 14, place: 8 }, change: 3 },
    { keyword: "수원 스몰웨딩", searches: 720, ranks: { integrated: 5, blog: 4 }, change: 0 },
    { keyword: "수원 웨딩홀 추천", searches: 1900, ranks: { integrated: 9, blog: 12, place: null }, change: 0 },
    { keyword: "수원 상견례 장소", searches: 1100, ranks: { integrated: 18, blog: 21, place: 12 }, change: -4 },
    { keyword: "수원 돌잔치 장소", searches: 980, ranks: { integrated: null, blog: 22, place: 15 }, change: 4, primary: "blog" },
  ],
  "hall-2": [
    { keyword: "평택 웨딩홀", searches: 5400, ranks: { integrated: 6, blog: 8, place: 4 }, change: 1 },
    { keyword: "평택 결혼식장", searches: 2100, ranks: { integrated: 10, blog: 13, place: 7 }, change: -2 },
    { keyword: "평택 컨벤션", searches: 880, ranks: { integrated: 3, blog: 5, place: 2 }, change: 0 },
    { keyword: "송탄 웨딩홀", searches: 610, ranks: { integrated: 8, blog: 11 }, change: 2 },
    { keyword: "평택 돌잔치", searches: 1300, ranks: { integrated: 15, blog: 19, place: 9 }, change: 1 },
  ],
};

/** 최근 30일 순위 — 7일 전 순위에서 지금 순위로 이어지고, 그 앞은 조금씩 움직임. 30위 밖은 '순위 밖' */
function rankHistory(seedText: string, current: number, change: number): RankPoint[] {
  const random = seeded(seedText);
  const days = lastDays(30);
  const ranks: number[] = new Array(days.length);
  const last = days.length - 1;
  const weekAgo = Math.max(1, current + change);
  for (let i = 0; i <= 7; i++) ranks[last - i] = Math.round(current + (weekAgo - current) * (i / 7));
  for (let i = last - 8; i >= 0; i--) {
    const roll = random();
    ranks[i] = Math.max(1, ranks[i + 1] + (roll < 0.5 ? 0 : roll < 0.75 ? 1 : -1));
  }
  return days.map((day, i) => ({
    day,
    rank: ranks[i] > 30 || (i < last - 7 && ranks[i] >= 20 && random() < 0.15) ? null : ranks[i],
  }));
}

export function sampleKeywords(hallId: string): KeywordRow[] {
  return (KEYWORDS[hallId] ?? []).map((seed, i) => {
    const primary = seed.primary ?? "integrated";
    const current = seed.ranks[primary];
    return {
      id: `kw-${i + 1}`,
      keyword: seed.keyword,
      monthlySearches: seed.searches,
      ranks: seed.ranks,
      change7d: seed.change,
      primary,
      history: typeof current === "number" ? rankHistory(`rank:${hallId}:${seed.keyword}`, current, seed.change) : [],
    };
  });
}

/* ── 등록한 채널 ── */

export function sampleChannels(hallId: string): Channel[] {
  const visits = sampleTraffic(hallId, 30);
  const homepage = (id: string, url: string): Channel => ({
    id,
    kind: "homepage",
    label: "웨딩홀 홈페이지",
    url,
    status: "collecting",
    metrics: [
      { label: "최근 30일 방문", value: visits.totalVisits, unit: "회" },
      { label: "페이지뷰", value: visits.pageviews, unit: "회" },
    ],
    updatedAt: minutesAgo(4),
  });

  if (hallId === "hall-1") {
    return [
      homepage("ch-1-home", "https://hall.example.com"),
      {
        id: "ch-1-blog",
        kind: "blog",
        label: "네이버 블로그",
        url: "https://blog.naver.com/sample_hall",
        status: "collecting",
        metrics: [
          { label: "어제 방문자", value: 312, unit: "명" },
          { label: "이웃", value: 1284, unit: "명" },
          { label: "최근 30일 발행", value: 12, unit: "건" },
        ],
        updatedAt: minutesAgo(9 * 60 + 10),
      },
      {
        id: "ch-1-place",
        kind: "place",
        label: "네이버 플레이스",
        url: "https://map.naver.com/p/entry/place/sample",
        status: "collecting",
        metrics: [
          { label: "방문자 리뷰", value: 1204, unit: "개" },
          { label: "블로그 리뷰", value: 386, unit: "개" },
          { label: "조회수", value: null, note: "직접 입력" },
        ],
        updatedAt: minutesAgo(6 * 60 + 5),
      },
      {
        id: "ch-1-insta",
        kind: "instagram",
        label: "인스타그램",
        url: "https://www.instagram.com/sample_hall",
        status: "planned",
        metrics: [
          { label: "게시물 도달", value: null, note: "연동 후" },
          { label: "반응", value: null, note: "연동 후" },
        ],
        updatedAt: null,
      },
    ];
  }

  if (hallId === "hall-2") {
    return [
      homepage("ch-2-home", "https://convention.example.com"),
      {
        id: "ch-2-blog",
        kind: "blog",
        label: "네이버 블로그",
        url: "https://blog.naver.com/sample_convention",
        status: "collecting",
        metrics: [
          { label: "어제 방문자", value: 147, unit: "명" },
          { label: "이웃", value: 516, unit: "명" },
          { label: "최근 30일 발행", value: 8, unit: "건" },
        ],
        updatedAt: minutesAgo(9 * 60 + 10),
      },
      {
        id: "ch-2-place",
        kind: "place",
        label: "네이버 플레이스",
        url: "https://map.naver.com/p/entry/place/sample2",
        status: "pending",
        metrics: [
          { label: "방문자 리뷰", value: null, note: "확인 중" },
          { label: "블로그 리뷰", value: null, note: "확인 중" },
        ],
        updatedAt: null,
      },
    ];
  }

  if (hallId === "hall-3") {
    return [
      {
        id: "ch-3-insta",
        kind: "instagram",
        label: "인스타그램",
        url: "https://www.instagram.com/sample_garden",
        status: "planned",
        metrics: [
          { label: "게시물 도달", value: null, note: "연동 후" },
          { label: "반응", value: null, note: "연동 후" },
        ],
        updatedAt: null,
      },
    ];
  }

  return [];
}

/* ── 자료 기준 시각 ── */

const FRESHNESS: Record<ChannelKind, Omit<Freshness, "at"> & { minutes: number | null }> = {
  homepage: { label: "홈페이지 방문", source: "하람 방문 수집", minutes: 4 },
  blog: { label: "블로그 숫자", source: "네이버 블로그", minutes: 9 * 60 + 10 },
  place: { label: "플레이스 리뷰", source: "네이버 플레이스", minutes: 6 * 60 + 5 },
  instagram: { label: "인스타그램", source: "Meta 연동 전", minutes: null },
};

export function sampleFreshness(hallId: string): Freshness[] {
  const kinds = new Set(sampleChannels(hallId).map((channel) => channel.kind));
  const rows: Freshness[] = [{ label: "키워드 순위", source: "PC 순위 프로그램", at: minutesAgo(3 * 60 + 12) }];
  for (const kind of ["homepage", "blog", "place", "instagram"] as const) {
    if (!kinds.has(kind)) continue;
    const { minutes, ...row } = FRESHNESS[kind];
    rows.push({ ...row, at: minutes === null ? null : minutesAgo(minutes) });
  }
  return rows;
}

/* ── 월간 리포트 ── */

export function sampleReports(hallId: string): Report[] {
  const hall = SAMPLE_HALLS.find((item) => item.id === hallId);
  if (!hall) return [];
  const random = seeded(`reports:${hallId}`);
  const [year, month] = kstDay(0).split("-").map(Number);
  const first = hall.contractStart.slice(0, 7);
  const last = hall.contractEnd?.slice(0, 7) ?? "9999-12";
  const reports: Report[] = [];
  for (let i = 0; i < 6; i++) {
    const value = new Date(Date.UTC(year, month - 1 - i, 1)).toISOString().slice(0, 7);
    if (value < first || value > last) continue;
    if (i === 0) {
      if (hall.status === "active") reports.push({ month: value, status: "preparing", summary: "이번 달 리포트는 다음 달 초에 올립니다." });
      continue;
    }
    const visits = Math.round((TRAFFIC_PROFILE[hallId]?.base ?? 40) * 30 * (0.9 + random() * 0.3));
    const top10 = 2 + Math.floor(random() * 5);
    const posts = 6 + Math.floor(random() * 8);
    reports.push({ month: value, status: "ready", summary: `홈페이지 방문 ${num(visits)}회, 10위 안 키워드 ${top10}개, 블로그 발행 ${posts}건` });
  }
  return reports;
}
