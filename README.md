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
- 견적서의 서비스 안내 페이지(`/quote/<서비스>`)에서 [자세히 보기]를 누르면 서비스 상세 페이지(`/client/<서비스>`)로 갑니다.
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
