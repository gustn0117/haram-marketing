# 하람마케팅 홈페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 하람파트너스 행사기획 사이트를 디자인은 유지한 채 "하람마케팅" 웨딩홀 전문 마케팅 사이트로 콘텐츠 전면 재작성하고, git을 새로 초기화한다.

**Architecture:** 콘텐츠 단일 소스인 `lib/content.ts`를 재작성하고, id 변경에 따라 `components/icons.tsx`의 아이콘 매핑과 각 페이지/컴포넌트의 하드코딩 문구·이미지 참조·SEO 메타데이터를 일괄 갱신한다. 빌드 성공 + 잔존 문구 grep 0건으로 검증한다.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, TypeScript. 테스트 스위트 없음 → 검증은 `npm run build`, `next dev` 렌더, grep.

## Global Constraints

- 상호: 하람마케팅 / HARAM MARKETING. 대표 김영진, 010-7930-1332, 경기도 수원시 영통구 (하람파트너스와 동일).
- siteUrl: `https://harammarketing.co.kr` (placeholder, 확정 시 교체).
- 디자인 토큰·레이아웃·클래스 변경 금지 (다크·프리미엄 톤 유지). 콘텐츠·문구·이미지·메타데이터만 변경.
- 성과 지표 숫자는 교체용 임시 placeholder. 코드 주석으로 명시.
- "하람파트너스" 및 행사 전용 용어(행사기획/컨퍼런스/페스티벌/음향·조명/포토부스 등)는 최종 결과물에서 0건이어야 함.
- 하람파트너스용 naver-site-verification 코드 제거.

---

### Task 0: git 초기화 + 프로젝트 메타

**Files:**
- Delete: `.git/`, `.next/`
- Modify: `package.json` (name)
- Modify: `README.md`

- [ ] **Step 1:** 빌드 캐시·기존 git 제거, 새 저장소 초기화
```bash
cd "/Users/hyunsu/Documents/WEB/2026 06/하람마케팅"
rm -rf .next
rm -rf .git
git init
```
- [ ] **Step 2:** `package.json`의 `"name": "haram-partners"` → `"name": "haram-marketing"`
- [ ] **Step 3:** `README.md`를 하람마케팅용 1줄 설명으로 간소화 (create-next-app 보일러플레이트 제거)
- [ ] **Step 4:** 첫 커밋 (스펙·플랜 포함)
```bash
git add -A
git commit -m "chore: 하람마케팅 프로젝트 초기화 (git 새로 시작)"
```
Expected: 새 저장소, 원격 없음. `git remote -v` → 출력 없음.

---

### Task 1: content.ts — 브랜드·핵심 서비스·지원 서비스

**Files:**
- Modify: `lib/content.ts:6-374` (siteUrl, regions, company, services[], addons[])

**Interfaces:**
- Produces: `services[]` with ids `search, blog, sns, ad, content, brand`; `addons[]` ids unchanged `web, venue, marketing, media, print`. Task 3(icons), Task 8(images)가 이 service id들을 참조.

- [ ] **Step 1:** `siteUrl` → `https://harammarketing.co.kr`. `regions[]`는 유지(전국 서비스 지역).
- [ ] **Step 2:** `company` 객체 교체: nameKo=하람마케팅, nameEn=HARAM MARKETING, ceo/phone/address 유지, tagline="예식장의 품격을 예약으로 잇습니다", taglineEn="Wedding Hall Marketing, Proven by Bookings", intro=웨딩홀 전문 마케팅 소개문(노출→상담→예약 전환 책임).
- [ ] **Step 3:** `services[]` 6개를 아래 id/제목으로 재작성. 각 항목 스키마(no, id, title, tagline, description, overview[2], items[4], scope[5], recommendedFor[3]) 유지, 본문은 웨딩홀 마케팅 관점.
  - `search`(01) 네이버 검색·플레이스 상위노출 / Search & Place
  - `blog`(02) 블로그·체험단 바이럴 / Blog & Review
  - `sns`(03) 인스타그램·SNS 콘텐츠 운영 / Instagram & SNS
  - `ad`(04) 퍼포먼스 광고·상담 DB 모집 / Performance Ads
  - `content`(05) 영상·사진 콘텐츠 제작 / Film & Photo
  - `brand`(06) 웨딩홀 브랜딩·예약 홈페이지 / Branding & Web
- [ ] **Step 4:** `addons[]` 5개 id 유지하고 name/tagline/description/overview/scope/recommendedFor를 재정의: web=예약 랜딩·홈페이지 제작, venue=마케팅 진단·컨설팅, marketing=상담 DB·예약 전환 관리, media=웨딩 촬영·릴스 제작, print=박람회 부스·인쇄물. `AddonIcon` 타입과 각 addon의 `icon` 필드는 기존 값 유지(아이콘 글리프 재사용).
- [ ] **Step 5:** 타입체크 — `npx tsc --noEmit` → service id 변경으로 인한 icons.tsx 에러는 Task 3에서 해결 예정이므로, 이 시점 에러는 icons.tsx serviceIconMap 키 불일치만 있어야 함.
- [ ] **Step 6:** 커밋 `git add lib/content.ts && git commit -m "feat: content.ts 브랜드·서비스·지원서비스 웨딩홀 마케팅으로 교체"`

---

### Task 2: content.ts — 강점·프로세스·조직·채널·지표·스토리·FAQ·절차·이미지

**Files:**
- Modify: `lib/content.ts:376-667` (strengths, processSteps, values, departments, equipment, aboutStory, contactFlow, faqs, navLinks, aboutMenu, dropdownMenus, 이미지)

**Interfaces:**
- Produces: `StrengthId = "wedding" | "data" | "inhouse" | "conversion"`; new `metrics[]` (Task: about page Task 7가 사용); image exports `heroImage, aboutImage, offeringImages`(키=신규 service id) (Task 8가 사용).

- [ ] **Step 1:** `StrengthId` 타입과 `strengths[]`를 `wedding/data/inhouse/conversion` 4종으로 교체(예식장 특화·데이터 기반 운영·자체 콘텐츠팀·예약 전환까지 책임).
- [ ] **Step 2:** `processSteps[]` 4단계: 진단·전략 / 콘텐츠·채널 셋업 / 운영·광고 집행 / 성과 분석·리포트.
- [ ] **Step 3:** `values[]` 3개 웨딩홀 마케팅 관점 재작성.
- [ ] **Step 4:** `departments[]`: 마케팅 전략팀(Strategy) / 콘텐츠 제작팀(Creative) / 광고·DB 운영팀(Ads & CRM), duties 재작성.
- [ ] **Step 5:** `equipment[]`(약 510-530줄)을 "운영 채널·역량"으로 재정의 — 네이버(검색·플레이스), 인스타그램·SNS 등 2개 카드. `name/tagline/image/description` 스키마 유지(image는 Task 8에서 Unsplash로).
- [ ] **Step 6:** 새 export 추가 `metrics: {label:string; value:string; suffix?:string}[]` — 관리 예식장 수, 평균 문의 증가율, 월 콘텐츠 발행 수, 누적 광고 운영(예시값). 바로 위에 `// ⚠️ 교체용 임시 placeholder — 실제 수치 확정 시 교체` 주석.
- [ ] **Step 7:** `aboutStory[]` 3개 섹션 재작성(웨딩홀 마케팅 철학: 노출이 아니라 예약 / 예식장 특화 / 데이터로 증명 등).
- [ ] **Step 8:** `contactFlow[]` 6단계: 문의 접수 → 무료 진단·상담 → 전략 제안·견적 → 계약·온보딩 → 마케팅 운영 → 성과 리포트.
- [ ] **Step 9:** `faqs[]` 재작성(계약 방식·비용 산정·성과 측정·기간·예식장 특화 등 6문항).
- [ ] **Step 10:** `navLinks`(라벨 유지), `aboutMenu`(앵커 라벨 유지/조정), `dropdownMenus`는 services/addons 매핑이 id 기반이라 자동 반영. 변경 불필요 확인.
- [ ] **Step 11:** 이미지 블록(652-666): `heroImage`=웨딩홀 인테리어 Unsplash, `aboutImage`=웨딩/마케팅 컷, `offeringImages` 키를 신규 service id(search/blog/sns/ad/content/brand)로 재작성. (실제 URL은 Task 8에서 검증)
- [ ] **Step 12:** 커밋 `git commit -am "feat: content.ts 강점·프로세스·조직·지표·스토리·FAQ 웨딩홀 마케팅으로 교체"`

---

### Task 3: icons.tsx — 서비스/강점 아이콘 매핑

**Files:**
- Modify: `components/icons.tsx:259-289`

**Interfaces:**
- Consumes: service ids (Task 1), StrengthId (Task 2).
- Produces: `serviceIconMap`/`strengthIconMap` 키가 신규 id와 일치.

- [ ] **Step 1:** `serviceIconMap` 키를 신규 service id로 교체하고 적절한 기존 글리프 매핑: search→IconSearch(신규 또는 기존 적합 글리프), blog→IconDoc, sns→IconHeart(신규), ad→IconChart(신규), content→IconImage, brand→IconBrand. 없는 글리프(IconSearch/IconHeart/IconChart)는 `base` 스타일로 간단한 SVG 추가.
- [ ] **Step 2:** `strengthIconMap` 키를 `wedding→IconHeart, data→IconChart, inhouse→IconTeam, conversion→IconHub`로 교체(기존 IconTeam/IconHub 재사용).
- [ ] **Step 3:** 빌드 타입체크 `npx tsc --noEmit` → serviceIconMap/strengthIconMap 관련 에러 0건.
- [ ] **Step 4:** 커밋 `git commit -am "feat: icons 서비스·강점 아이콘 매핑 갱신"`

---

### Task 4: 공통 컴포넌트 문구 (Header, Footer, Strengths)

**Files:**
- Modify: `components/Strengths.tsx:23-40` (eyebrow "WHY HARAM PARTNERS", 제목·설명)
- Modify: `components/Header.tsx`, `components/Footer.tsx` (잔여 브랜드·행사 문구)

- [ ] **Step 1:** `Strengths.tsx` eyebrow→"WHY HARAM MARKETING", 제목/설명을 마케팅 강점 문구로 교체.
- [ ] **Step 2:** `Header.tsx` 전체 읽고 하드코딩된 "하람파트너스"/행사 문구·CTA를 교체(브랜드 표기는 company에서 오면 그대로 둠).
- [ ] **Step 3:** `Footer.tsx` 전체 읽고 회사 설명·copyright·행사 문구를 교체.
- [ ] **Step 4:** 커밋 `git commit -am "feat: 공통 컴포넌트 문구 웨딩홀 마케팅으로 교체"`

---

### Task 5: 홈 `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1:** 히어로: eyebrow "EVENT PLANNING & OPERATION"→"WEDDING HALL MARKETING", h1·서브카피·이미지 alt·`src`(Task 8에서 이미지 결정), CTA 문구 교체.
- [ ] **Step 2:** Intro statement 섹션(98-130): 하드코딩 "하람파트너스…" 본문 3문단을 웨딩홀 마케팅 소개로 교체.
- [ ] **Step 3:** Services 섹션 제목/문구(141-156), Process 섹션 제목(202-206), FAQ 섹션 문구(232-247) 교체.
- [ ] **Step 4:** 커밋 `git commit -am "feat: 홈 페이지 문구·히어로 교체"`

---

### Task 6: SEO/메타 — layout + 라우트

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`

- [ ] **Step 1:** `layout.tsx` `description` 상수, JSON-LD @graph(name/alternateName/description/knowsAbout/image), metadata(title default/template, description, keywords, OG, twitter)를 웨딩홀 마케팅 키워드로 교체.
- [ ] **Step 2:** `verification.other["naver-site-verification"]` 제거(또는 빈 객체).
- [ ] **Step 3:** `manifest.ts`, `sitemap.ts`, `robots.ts`, `rss.xml/route.ts`를 읽고 브랜드명·설명·행사 문구 교체.
- [ ] **Step 4:** 커밋 `git commit -am "feat: SEO 메타데이터·구조화데이터 웨딩홀 마케팅으로 교체"`

---

### Task 7: 하위 페이지 (about, services, contact, addons + [slug])

**Files:**
- Modify: `app/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/contact/page.tsx`, `app/addons/page.tsx`, `app/addons/[slug]/page.tsx`

- [ ] **Step 1:** 각 페이지를 읽고 하드코딩된 "하람파트너스"·행사 전용 문구(PageHero 제목/설명, 섹션 카피, alt, 장비 섹션 등)를 교체. about의 "보유 장비" 섹션은 "운영 채널·역량 + 성과 지표(metrics)"로 렌더 조정(필요 시 metrics 사용).
- [ ] **Step 2:** 이미지 `src`는 Task 8과 함께 결정(로컬 경로 → content 이미지 값 또는 Unsplash).
- [ ] **Step 3:** 커밋 `git commit -am "feat: 회사소개·서비스·문의·지원서비스 페이지 문구 교체"`

---

### Task 8: 이미지 전략 일괄 적용

**Files:**
- Modify: `lib/content.ts` (이미지 export), 이미지를 직접 참조하던 페이지들(`app/page.tsx`, `app/about/page.tsx`, `app/services/[slug]`, `app/addons/[slug]`, PageHero 호출부)

- [ ] **Step 1:** content.ts에 웨딩 테마 Unsplash URL을 `U()` 헬퍼로 정의(heroImage=웨딩홀 인테리어, aboutImage, offeringImages 6키, equipment/channel 이미지 2개). 페이지 hero 이미지용 export도 content에 모음.
- [ ] **Step 2:** 페이지에서 행사용 로컬 경로(`/hero/concert-hall.png`, `/services/hero/*`, `/equipment/*`, `/about/*`, `/addons/detail/*`)를 content 이미지 값으로 라우팅하거나 적절한 Unsplash로 교체. `next.config.ts`에 Unsplash 이미지 도메인 허용 설정 필요 시 `images.remotePatterns` 추가.
- [ ] **Step 3:** `next dev` 또는 build 후 깨진 이미지(404) 없는지 확인.
- [ ] **Step 4:** 커밋 `git commit -am "feat: 이미지 웨딩홀 마케팅 테마로 교체"`

---

### Task 9: 최종 검증

- [ ] **Step 1:** `npm run build` → 성공(에러 0).
- [ ] **Step 2:** 잔존 문구 grep — 0건이어야 함:
```bash
grep -rn "하람파트너스\|harampartners\|행사기획\|컨퍼런스\|페스티벌\|포토부스\|음향·조명\|concert-hall" app components lib --include=*.ts --include=*.tsx
```
- [ ] **Step 3:** `next dev` 실행 후 홈/about/services/contact/addons 및 `/services/search`, `/addons/web` 동적 라우트 렌더·이미지 확인.
- [ ] **Step 4:** `git remote -v`로 원격 없음(하람파트너스와 분리) 재확인.
- [ ] **Step 5:** 최종 커밋 `git commit -am "chore: 빌드·렌더 검증 완료"`
```

## Self-Review

- **Spec coverage:** 브랜드(T1), 서비스6/지원5(T1), 강점·프로세스·조직·지표·스토리·FAQ·절차(T2), 아이콘(T3), 공통 컴포넌트(T4), 홈(T5), SEO/라우트(T6), 하위 페이지(T7), 이미지(T8), git초기화(T0), 검증(T9). 스펙 전 섹션 커버됨.
- **Placeholder scan:** metrics 숫자만 의도적 placeholder(주석 명시). 그 외 TBD/TODO 없음.
- **Type consistency:** service id(search/blog/sns/ad/content/brand)와 StrengthId(wedding/data/inhouse/conversion)가 T1/T2 정의 → T3 아이콘맵 → T8 이미지키에서 일관되게 사용. addon id는 불변.
