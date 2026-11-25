# 하람마케팅 (HARAM MARKETING)

웨딩홀(예식장) 전문 마케팅 회사 하람마케팅 공식 홈페이지입니다.
Next.js 16 · React 19 · Tailwind v4 기반.

## 개발

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
```

## 네이버 색인 요청 (IndexNow)

배포 후 실행합니다. 키 파일은 `public/<키>.txt`입니다.

```bash
npm run indexnow                       # 사이트맵의 모든 페이지
npm run indexnow -- /about /services   # 바뀐 페이지만
```

## 콘텐츠 수정

사이트의 거의 모든 텍스트·서비스·이미지 정보는 [`lib/content.ts`](lib/content.ts) 한 파일에서 관리됩니다. 정보가 확정되면 이 파일만 교체하면 전체 사이트에 반영됩니다.

## 고객 전용 (`/quote` · `/client`, 비밀번호 1234)

헤더의 **고객 전용**(모바일은 자물쇠 아이콘)을 누르고 비밀번호를 넣으면 **웹 견적서(`/quote`)**가 열립니다.
- 견적서의 서비스 안내 페이지(`/quote/<서비스>`)에는 서비스 상세 페이지(`/client/<서비스>`)로 넘어가는 버튼을 두지 않습니다. 상세 페이지는 주소로만 열립니다.
- 견적서 머리말의 **잠그기**를 누르면 열람이 끝나고 홈으로 돌아갑니다.

- 비밀번호: `lib/client-access.ts` 의 `CLIENT_PASSWORD` (서버 환경변수 `CLIENT_PASSWORD` 로도 변경 가능, 바꾸면 이미 열어 둔 브라우저도 다시 잠김)
- 잠금은 서버에서 합니다. 대상은 `/quote` · `/client` · `/documents`(견적서 PDF) 아래 전부입니다.
  - `proxy.ts`가 열람 쿠키가 없는 요청을 같은 주소 그대로 잠금 화면(`/locked`)으로 바꿉니다.
  - 각 페이지도 한 번 더 확인합니다.
  - 응답은 no-store이고, 검색 노출을 막고(noindex), 사이트맵에서 뺍니다.
- 화면: 사이트 머리말 대신 포털 틀(`components/client/PortalShell.tsx` — 위쪽 바 하나: 하람마케팅(홈페이지로) · 위치 표시 · 견적서 보기 · 잠그기 · 전화 상담). 대시보드 `app/(portal)/client/page.tsx`, 서비스 상세 `app/(portal)/client/[slug]/page.tsx`, 로그인 화면 `components/client/LockedPanel.tsx`
- 상세 문구: `lib/client-details.ts` · 예시 화면(목업): `components/client/Specimen.tsx` · 스타일: `app/(portal)/client/client.css`
- 비용: `lib/client-details.ts` 의 `CLIENT_PRICES`는 `lib/quote-data.ts`(견적서 data.ts 사본)에서 가져옵니다. 아래 '웹 견적서'의 갱신 방법을 따릅니다.
  - 금액은 서버 컴포넌트에서만 그려서 브라우저 JS 파일에는 들어가지 않습니다.

## 웨딩홀 플랫폼 (`/login` · `/dashboard`) — 틀

계약한 웨딩홀마다 하람이 아이디와 비밀번호를 발급하고, 웨딩홀이 로그인해서 등록한 홈페이지 · 블로그 · 플레이스 · 인스타그램의 숫자와 키워드 순위를 보는 화면입니다. 지금은 **틀만** 있고 숫자는 모두 샘플입니다(화면 위에 '샘플 데이터' 안내).

- 로그인: `/login` (홈페이지 머리말의 **로그인**, 모바일은 메뉴 안). 가입 화면은 없습니다.
  - 샘플 웨딩홀 계정: `sample` / `1234`(샘플 웨딩홀), `sample2` / `1234`(샘플 컨벤션). `sample3`은 계약 종료라 로그인이 막힙니다.
  - 하람 계정: `haram` / 문의 관리(`/admin`)와 같은 `ADMIN_PASSWORD`(없으면 `1234`)
- 웨딩홀 화면: 개요 `/dashboard`(키워드 카드 순서 `?kw=moved`) · 키워드 순위 `/dashboard/keywords`(`?view=top10|up|down` · `?sort=search|change` · 검색 `?q=` · 그래프 키워드 `?k=`) · 방문 분석 `/dashboard/traffic`(기간 `?range=7|30|90`) · 채널 관리 `/dashboard/channels` · 월간 리포트 `/dashboard/reports`
- 하람 화면: 웨딩홀 계정 `/dashboard/halls` · 웨딩홀 상세 `/dashboard/halls/<웨딩홀>`
- 디자인
  - 로그인 · 웨딩홀 화면은 흰 바탕 플랫폼입니다(참고: wedipedia.co.kr). 흰 바탕에 검은 글자, 굵은 제목, 둥근 카드를 씁니다.
  - 넓은 화면의 위쪽 구성: 샘플 안내 띠, 작은 링크 줄, 로고 + 키워드 검색 + 계정 창, 가운데 메뉴.
  - 좁은 화면(767px 이하)에서는 위 막대가 붙어 있고, 메뉴는 아래 탭바로 바뀝니다.
  - 변동 표시는 한국식입니다. 오르면 빨간 ▲, 내리면 파란 ▼이고, 화살표와 읽기용 글자를 함께 둡니다.
  - 채널 아이콘은 홈페이지 서비스 3D 그림을 작게 줄인 사본(`public/images/platform/`)입니다.
  - 하람 관리자 화면은 어두운 관리 틀 그대로입니다.
- 잠금
  - `proxy.ts`가 로그인 쿠키(`hm_platform`)가 없는 `/dashboard` 요청을 `/login?next=<주소>`로 보냅니다.
  - 각 페이지가 `lib/platform/dal.ts`의 `requireHall` · `requireAdmin`으로 서명 · 계정 · 역할을 다시 확인합니다. 웨딩홀 자료 함수에는 로그인 세션의 웨딩홀만 넘기므로, 주소창을 바꿔도 다른 웨딩홀 자료는 열리지 않습니다.
  - 세션: `lib/platform/session.ts` — 서버가 서명한 쿠키, 12시간. 서명 비밀 값은 서버 환경변수 `PLATFORM_SESSION_SECRET`입니다. 없으면 서버를 켤 때마다 새로 만들어서, 재시작하면 모두 다시 로그인합니다.
- 파일: 자료 모양 `lib/platform/types.ts` · 자료 함수 `lib/platform/data.ts` · 샘플 `lib/platform/sample.ts` · 계정 `lib/platform/accounts.ts` · 로그인/로그아웃 `lib/platform/actions.ts` · 화면 `app/(platform)/`
  - 웨딩홀 화면 · 로그인: 틀 `components/hall/HallShell.tsx` · 아래 `components/hall/HallFooter.tsx` · 조각 `components/hall/ui.tsx` · 그래프 `components/hall/LineChart.tsx` · 스타일 `app/(platform)/hall.css`
  - 하람 관리자 화면: 틀 `components/platform/PlatformShell.tsx` · 조각 `components/platform/ui.tsx` · 스타일 `app/(platform)/platform.css`
- 아직 연결하지 않은 것 (화면에도 '아직 연결하지 않았습니다'로 표시)
  - 계정 발급 · 비밀번호 재발급 · 로그인 중지, 링크 등록 저장, 리포트 PDF 받기: 계정과 채널을 저장할 DB가 필요합니다. 비밀번호는 해시로만 보관하고 로그인 시도 횟수 제한을 함께 붙입니다.
  - 실제 숫자: `lib/platform/data.ts`의 함수만 바꾸면 화면은 그대로입니다.
    - 키워드 순위 · 월 검색량 · 블로그 · 플레이스 리뷰: PC 순위 프로그램(ranktracker)이 광고주별로 모은 자료를 서버로 동기화 (`Hall.trackerClientId`로 웨딩홀과 광고주 연결)
    - 홈페이지 방문: haram-analytics 수집기 (웨딩홀 홈페이지에 tracker.js)
    - 플레이스 조회수: 공식 연동이 없어 직접 입력
    - 인스타그램 도달 · 반응: Meta 연동
  - 웨딩홀에게 보내지 않는 값: 계약 금액 · 내부 메모 · 경쟁 업체 추적 · 방문자 IP

## 웹 견적서 (`/quote`)

haram-marketing.co.kr/quote 는 견적서를 받은 분께 보내는 웹 견적서입니다. 고객 전용이라 비밀번호(1234)를 넣어야 열립니다.

- 화면은 두 가지입니다.
  - **`/quote` 견적서 메뉴(흰 바탕):** 첫 화면, 서비스 9가지 카드, 견적 정리, 진행 방식, 하람 소개가 이어집니다. 카드를 누르면 서비스 안내 페이지가 열립니다.
  - **`/quote/[서비스]` 서비스 안내 페이지:** 서비스 하나를 랜딩페이지 한 장으로 보여 줍니다(예: `/quote/instagram`).
    - 구성: 첫 화면, 포함 사항, 진행 방식, 비용, 이전 · 다음 서비스
    - 첫 화면은 플랫폼 색입니다. 인스타그램은 그라데이션, 네이버 블로그 · 카페 · 플레이스는 네이버 초록, 제작 · 개발은 서비스별 배경색입니다.
    - 아래 구역은 흰 바탕이고, 같은 색을 포인트로 씁니다.
- 기존 카드 그리드·구역·이미지 자리의 위치와 크기를 그대로 유지합니다. `components/quote/shared.tsx`의 `Hatch`가 정해진 사진 자리를 채우고, `components/client/Specimen.tsx`는 기존 기기 프레임 안의 예시 화면만 구성합니다.
- 사진: `public/images/preview-photos/` · 사진 생성 기록: `docs/preview-photo-assets.json`. 기기 목업 내부는 `components/client/previews/screens.tsx`에서 사진·상세 수치 없이 도형과 짧은 기능명으로 표현합니다. 각 포함 사항의 이미지 내용은 `components/client/ServiceFeature.tsx`에 있습니다.
- 인스타그램 대표 비주얼: `components/client/InstagramVisual.tsx` · 문구 없이 투명 배경의 3D 로고와 웨딩 링(`public/images/service-art/instagram-wedding-3d-lossless.webp`)만 표시합니다. 원본 1254px 무손실 이미지에 추가 압축을 적용하지 않습니다. 생성 기록은 `docs/instagram-wedding-3d.json`에 있습니다.
- 블로그 관리 · 블로그/카페 포스팅 · 플레이스 대표 비주얼: `components/client/NaverVisual.tsx` · 서비스별 3D 심벌과 웨딩 링을 각각 사용합니다. `public/images/service-art/`의 원본 해상도 무손실 이미지를 추가 압축 없이 표시하고, 뒤 사진과 장식 문구는 표시하지 않습니다. 생성 프롬프트와 파일 정보는 `docs/naver-service-art.json`에 있습니다.
- 제작·개발 5종 대표 비주얼: `components/client/DevelopmentVisual.tsx` · 전사 관리 = 흑연색 세로 클립보드·A4 종이·체크, 홈페이지 = 펄 화이트·크롬 기기, 랜딩페이지 = 밝은 가로형 브라우저 창·검은 클릭 커서, 박람회 플랫폼 = 실버·반투명 유리 연결 허브, 멤버십 = 따뜻한 토프 카드·브라스 혜택 배지로 구분합니다. 무채색 계열 안에서 명도·재질·형태를 달리하고, 기존 이미지 자리·그리드·원본 해상도·무손실 화질을 유지합니다. 생성 프롬프트와 파일 정보는 `docs/development-service-materials.json`에 있습니다.
- 전사 관리·랜딩페이지·멤버십은 입체 레이어, 시점, 모서리, 금속 마감을 정교하게 다시 제작했습니다. 클립보드는 겹친 종이와 완료 배지, 랜딩페이지는 UI·버튼·커서의 깊이, 멤버십은 얇은 금속 카드·혜택 바우처·작은 등급 배지로 표현합니다. 현재 생성 기록과 파일 정보는 `docs/refined-service-art.json`에 있습니다.
- 3D 이미지 뒤 배경: `components/client/service-backgrounds.css`에서 전사 관리 = 남색 그라데이션·점, 홈페이지 = 블루그레이 그라데이션·격자, 랜딩페이지 = 슬레이트 블루 그라데이션·사선, 플랫폼 = 세이지 그라데이션·동심원, 멤버십 = 그레이지 그라데이션·세로 선으로 구분합니다. 부드러운 빛 번짐을 더하고, `/quote`의 카드·첫 화면과 `/client`의 카드·상세 이미지 영역에 동일한 배경을 사용합니다. 이미지와 기존 배치는 유지합니다.
- 파일:
  - `app/(quote)/quote/page.tsx`(메뉴)
  - `app/(quote)/quote/[slug]/page.tsx`(안내 페이지)
  - `app/(quote)/quote/quote.css`
  - `components/quote/` — `QuoteHeader` · `shared` · `PriceLines`
- 머리말은 사이트 머리말(`components/Header.tsx`)과 같은 모양이고, 메뉴만 견적서 목차입니다.
  - 묶음에 마우스를 올리면 서비스 목록이 흰 바탕으로 펼쳐집니다.
  - 휴대폰 전체 메뉴도 흰 바탕입니다.
- 연결:
  - [자세히 보기]와 '고객 전용'은 고객 전용 페이지(`/client`, 비밀번호)로 갑니다.
  - [PDF 받기]는 `public/documents/haram-service-quotation.pdf`를 내려받습니다.
- 머리말 '고객 전용'과 고객 전용 페이지의 [견적서 보기]가 `/quote`로 옵니다. 모든 페이지는 검색 노출을 막고(noindex) 사이트맵에 넣지 않습니다.
- 금액 · 문구를 바꿀 때:
  1. 견적서 저장소(haram-service-quote)의 `data.ts`를 고칩니다.
  2. 그 파일을 `lib/quote-data.ts`에 그대로 복사합니다. 맨 위 '사본' 안내 주석은 남깁니다.
  3. 견적서 저장소에서 `npm run pdf`로 PDF를 다시 만듭니다.
  4. 만든 PDF를 `public/documents/haram-service-quotation.pdf`에 덮어씁니다.
