/* 웨딩홀 플랫폼 — 숫자 · 날짜 · 이름표 (서버와 화면 어디서든 써도 되는 값만) */

import type { ChannelKind, ChannelStatus, RankSurface } from "./types";

export const num = (value: number) => value.toLocaleString("ko-KR");

/** 'YYYY-MM-DD' → '11.25' */
export function dayLabel(day: string) {
  const [, month, date] = day.split("-");
  return `${Number(month)}.${Number(date)}`;
}

/** 'YYYY-MM' → '2026년 10월' */
export function monthLabel(month: string) {
  const [year, value] = month.split("-");
  return `${year}년 ${Number(value)}월`;
}

/** 'YYYY-MM-DD' → '2026.6.1' */
export function dateLabel(day: string) {
  const [year, month, date] = day.split("-");
  return `${year}.${Number(month)}.${Number(date)}`;
}

const stampFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** ISO 시각 → '11월 25일 09:33' (한국 시간) */
export const stampLabel = (iso: string) => stampFormat.format(new Date(iso));

/** ISO 시각 → '4분 전' · '3시간 전' · '어제' · '11월 20일 09:33' */
export function timeAgo(iso: string, now = Date.now()) {
  const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  if (hours < 48) return "어제";
  return stampLabel(iso);
}

/** 앞 기간 대비 증감(%) — 앞 기간이 0이면 비교하지 않음 */
export const percentChange = (current: number, previous: number) =>
  previous > 0 ? Math.round(((current - previous) / previous) * 1000) / 10 : null;

/** 주소 표시 — https:// 와 끝의 / 를 뺌 */
export const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const SURFACE_LABEL: Record<RankSurface, string> = {
  integrated: "통합검색",
  blog: "블로그",
  place: "플레이스",
  cafe: "카페",
};

export const CHANNEL_LABEL: Record<ChannelKind, string> = {
  homepage: "홈페이지",
  blog: "블로그",
  place: "플레이스",
  instagram: "인스타그램",
};

export const STATUS_LABEL: Record<ChannelStatus, string> = {
  collecting: "수집 중",
  pending: "확인 중",
  manual: "직접 입력",
  planned: "연동 예정",
};
