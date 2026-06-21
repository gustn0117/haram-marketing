# 하람마케팅 홈페이지 — 설계 문서

작성일: 2026-06-21

## 1. 배경 및 목표

이 폴더는 **하람파트너스(행사기획 회사)** 홈페이지 코드를 복제한 것이다. 디자인(다크·프리미엄 톤, 레이아웃, 컴포넌트 구조)은 그대로 차용하되, **콘텐츠를 웨딩홀(예식장) 전문 마케팅 회사 "하람마케팅"에 맞게 전면 재작성**한다.

- 하람파트너스(원본)는 그대로 살아 있어야 한다 → 원격 github 저장소(`gustn0117/haram-partners`)는 건드리지 않는다.
- 이 폴더는 **이력 없는 새 프로젝트**로 초기화하여 별도로 새롭게 배포한다.

### 비목표 (YAGNI)
- 디자인 시스템 재설계 X (기존 톤·레이아웃 유지)
- 새 페이지 추가 X (홈/회사소개/서비스/지원서비스/문의 구조 유지)
- 백엔드/관리자(admin, api/inquiries) 로직 변경 X (문의 폼 동작은 그대로)

## 2. 아키텍처 (변경 없음)

기존 구조를 유지한다. 사이트 콘텐츠는 거의 전부 [lib/content.ts](../../../lib/content.ts) 한 파일에서 공급되고, 페이지/컴포넌트가 이를 렌더한다.

- `lib/content.ts` — 콘텐츠 단일 소스 (가장 큰 변경 대상)
- `app/*` — 페이지 (page, about, services, addons, contact + SEO 라우트: sitemap/robots/manifest/rss)
- `components/*` — UI 컴포넌트 (Header, Footer, Strengths, icons 등)

## 3. 콘텐츠 모델 매핑 (행사 → 웨딩홀 마케팅)

### 3.1 브랜드 (`company`)
- nameKo: **하람마케팅**, nameEn: **HARAM MARKETING**
- ceo: 김영진, phone: 010-7930-1332, address: 경기도 수원시 영통구 (하람파트너스와 동일)
- tagline: **"예식장의 품격을 예약으로 잇습니다"**
- taglineEn: *Wedding Hall Marketing, Proven by Bookings*
- intro: 웨딩홀 전문 마케팅 — 노출에서 끝나지 않고 상담·예약 전환까지 책임지는 웨딩홀 특화 마케팅 파트너

### 3.2 핵심 서비스 `services[]` (6종, 그리드 구조 유지)
| ID | 제목 | tagline |
|---|---|---|
| `search` | 네이버 검색·플레이스 상위노출 | Search & Place |
| `blog` | 블로그·체험단 바이럴 | Blog & Review |
| `sns` | 인스타그램·SNS 콘텐츠 운영 | Instagram & SNS |
| `ad` | 퍼포먼스 광고·상담 DB 모집 | Performance Ads |
| `content` | 영상·사진 콘텐츠 제작(홀투어·릴스) | Film & Photo |
| `brand` | 웨딩홀 브랜딩·예약 홈페이지 | Branding & Web |

각 서비스는 기존 스키마(no, title, tagline, description, overview[], items[], scope[], recommendedFor[]) 유지하고 본문만 웨딩홀 마케팅 관점으로 작성.

> ⚠️ service `id`가 바뀌므로 `components/icons.tsx`의 `ServiceIcon` switch와 `public/services/hero/*` 이미지 참조, `offeringImages` 키를 함께 갱신해야 한다.

### 3.3 지원 서비스 `addons[]` (5종, id 유지 — 이미지 파일명 보존)
| 기존 id | 새 이름 | 비고 |
|---|---|---|
| `web` | 예약 랜딩·홈페이지 제작 | |
| `venue` | 마케팅 진단·컨설팅 | |
| `marketing` | 상담 DB·예약 전환 관리 | |
| `media` | 웨딩 촬영·릴스 제작 | |
| `print` | 박람회 부스·인쇄물 | |

### 3.4 행사 전용 → 마케팅 섹션 교체
- **핵심 강점 `strengths[]` (4종)**: `wedding`(예식장 특화) · `data`(데이터 기반 운영) · `inhouse`(자체 콘텐츠팀) · `conversion`(예약 전환까지 책임). → `components/Strengths.tsx`와 `icons.tsx`의 강점 아이콘 매핑 갱신.
- **보유 장비/오퍼레이터 섹션 → 운영 채널·역량 + 성과 지표**: `equipment[]`를 "운영 채널·역량"으로 재정의(네이버/인스타/유튜브 등). 새 `metrics[]`(관리 예식장 수, 평균 문의 증가율, 월 콘텐츠 발행 수 등)를 추가. **숫자는 교체용 임시 placeholder이며 실제 확정 시 교체한다**(과장 광고 방지 위해 코드 주석 명시).
- **조직 `departments[]`**: 마케팅 전략팀 / 콘텐츠 제작팀 / 광고·DB 운영팀.
- **프로세스 `processSteps[]` (4단계)**: 진단·전략 → 콘텐츠·채널 셋업 → 운영·광고 집행 → 성과 분석·리포트.
- **회사소개 `aboutStory[]`, 가치 `values[]`, 문의 절차 `contactFlow[]`, FAQ `faqs[]`**: 웨딩홀 마케팅 관점 전면 재작성.
- **`regions[]`**: 전국 서비스 지역 유지(areaServed SEO).

## 4. 하드코딩 문구 교체
`company.nameKo`를 쓰지 않고 직접 박힌 "하람파트너스"·행사 카피를 교체:
- `app/page.tsx` — 히어로 eyebrow("EVENT PLANNING…" → "WEDDING HALL MARKETING"), h1, intro, 섹션 제목/문구
- `app/layout.tsx` — title/description/keywords/OG/twitter, JSON-LD(@graph) knowsAbout·description, 네이버 인증코드 제거
- `components/Header.tsx`, `components/Footer.tsx` — 잔여 브랜드/카피
- `app/about|services|contact|addons` 각 페이지의 하드코딩 카피 및 PageHero 문구
- SEO 라우트: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/rss.xml/route.ts`

## 5. 이미지 전략
행사용 로컬 이미지(콘서트홀·음향장비 등)는 웨딩 마케팅과 맞지 않는다. 기존 코드의 Unsplash CDN 헬퍼 `U(id, w)` 패턴을 활용해 **웨딩홀 인테리어·웨딩 촬영·마케팅 작업 컷 등 큐레이션 이미지로 교체**하고, 참조를 `content.ts`에 모아 실제 촬영본 확보 시 URL만 교체 가능하게 한다. 페이지에서 직접 참조하던 로컬 경로(`/hero/concert-hall.png` 등)도 content의 이미지 값으로 라우팅한다.

- 한계: 실제 브랜드 사진이 없으므로 큐레이션 스톡 이미지를 placeholder로 사용. 실사진 확보 후 대체 권장.

## 6. SEO / 메타데이터
- 모든 title·description·keywords·OG·twitter를 웨딩홀 마케팅 키워드로 교체("웨딩홀 마케팅", "예식장 마케팅", "예식장 홍보", "웨딩홀 블로그", "예식장 네이버 플레이스" 등).
- JSON-LD: Organization/WebSite/ProfessionalService의 name·description·knowsAbout 갱신.
- 하람파트너스용 `naver-site-verification` 코드 제거(신규 사이트는 새로 발급 필요).
- `siteUrl`을 새 도메인 placeholder `https://harammarketing.co.kr`로 설정(확정 시 교체).

## 7. 배포 · git 초기화 (요청사항)
- `.git` 디렉터리 삭제 후 `git init`으로 **새 저장소 초기화** → 원격(`gustn0117/haram-partners`)·하람파트너스 배포는 그대로 보존(기존 이력은 원격에 남아 유실 없음), 이 폴더는 이력 없는 새 프로젝트가 된다.
- `.next` 빌드 캐시 삭제.
- `package.json` `name`: `haram-partners` → `haram-marketing`.
- `README.md` 기본 create-next-app 문구 정리(선택).
- 새 git에 초기 커밋 생성.

## 8. 검증
- `npm run build` 성공(타입 에러·깨진 import 없음).
- `npm run dev`로 홈/회사소개/서비스/지원서비스/문의 페이지 및 동적 라우트(`/services/[slug]`, `/addons/[slug]`) 렌더 확인.
- "하람파트너스"·행사 전용 문구 잔존 여부 grep으로 0건 확인.
- 깨진 이미지(404) 없는지 확인.
