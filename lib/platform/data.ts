import "server-only";
import { cache } from "react";
import { SAMPLE_HALLS, sampleChannels, sampleFreshness, sampleKeywords, sampleReports, sampleTraffic } from "./sample";

/* 화면이 부르는 자료 함수 — 지금은 전부 샘플(lib/platform/sample.ts)을 돌려줍니다.

   웨딩홀 화면에서는 hallId 를 로그인 세션에서 꺼낸 값만 넘깁니다(lib/platform/dal.ts 의 requireHall).
   주소창 값으로 다른 웨딩홀 자료를 열 수 없게 하기 위해서입니다. 웨딩홀 목록(listHalls)은 하람 계정 전용입니다.

   실제 출처를 붙일 자리
   - 키워드 순위 · 월 검색량 · 블로그 · 플레이스 숫자: PC 순위 프로그램(ranktracker)이 광고주별로 모은 자료를
     서버로 동기화해서 읽음. 웨딩홀과 광고주는 Hall.trackerClientId 로 연결
   - 홈페이지 방문: haram-analytics 수집기 (웨딩홀 홈페이지에 tracker.js)
   - 플레이스 조회수: 공식 연동이 없어 하람이 직접 입력
   - 인스타그램 도달 · 반응: Meta 연동
   - 월간 리포트: 하람이 올린 PDF
   웨딩홀에게 보내지 않는 값: 계약 금액 · 내부 메모 · 경쟁 업체 추적 · 방문자 IP */

/** 방문 분석 기간 (일) */
export const TRAFFIC_RANGES = [7, 30, 90] as const;
export type TrafficRange = (typeof TRAFFIC_RANGES)[number];

export const getHall = cache(async (hallId: string) => SAMPLE_HALLS.find((hall) => hall.id === hallId) ?? null);

/** 하람 계정 전용 — 부르기 전에 requireAdmin() */
export async function listHalls() {
  return SAMPLE_HALLS;
}

export const getChannels = cache(async (hallId: string) => sampleChannels(hallId));

export const getKeywords = cache(async (hallId: string) => sampleKeywords(hallId));

export const getTraffic = cache(async (hallId: string, days: TrafficRange) => sampleTraffic(hallId, days));

export const getReports = cache(async (hallId: string) => sampleReports(hallId));

export const getFreshness = cache(async (hallId: string) => sampleFreshness(hallId));
