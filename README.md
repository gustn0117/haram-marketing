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

## 고객 전용 페이지 (`/client`, 비밀번호 1234)

헤더의 **고객 전용**(모바일은 자물쇠 아이콘) → 비밀번호를 넣으면 견적서에 담긴 서비스 9종의 상세 페이지(`/client`, `/client/<서비스>`)를 볼 수 있습니다.

- 비밀번호: `lib/client-access.ts` 의 `CLIENT_PASSWORD` (서버 환경변수 `CLIENT_PASSWORD` 로도 변경 가능, 바꾸면 이미 열어 둔 브라우저도 다시 잠김)
- 잠금은 서버에서: `proxy.ts` 가 열람 쿠키 없는 `/client` 요청을 같은 주소의 잠금 화면(`/locked`)으로 바꾸고, 각 페이지도 한 번 더 확인합니다. 응답은 no-store, 검색 노출 차단(noindex), 사이트맵 제외.
- 화면: 사이트 머리말 대신 포털 틀(`components/client/PortalShell.tsx` — 왼쪽 서비스 메뉴 · 위쪽 바로가기, 모바일은 서랍 메뉴). 대시보드 `app/(portal)/client/page.tsx`, 서비스 상세 `app/(portal)/client/[slug]/page.tsx`, 로그인 화면 `components/client/LockedPanel.tsx`
- 상세 문구: `lib/client-details.ts` · 예시 화면(목업): `components/client/Specimen.tsx` · 스타일: `app/(portal)/client/client.css`
