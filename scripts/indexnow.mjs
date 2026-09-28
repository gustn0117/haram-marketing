// 네이버 IndexNow 색인 요청 — 배포된 사이트의 URL을 POST 한 번으로 제출한다.
//
//   npm run indexnow                        사이트맵(/sitemap.xml)의 모든 URL
//   npm run indexnow -- /about /services    바뀐 페이지만 (경로 또는 전체 URL)
//
// 배포 후에 실행한다 — 네이버가 라이브 사이트의 키 파일로 소유를 확인하기 때문.
// IndexNow 참여 엔진끼리는 제출 URL을 공유하므로 Bing 등에도 함께 전달된다.
import { readdirSync, readFileSync } from "node:fs";

const ENDPOINT = "https://searchadvisor.naver.com/indexnow";

// 사이트 주소는 lib/content.ts의 siteUrl 하나만 기준으로 삼는다.
const siteUrl = readFileSync("lib/content.ts", "utf8").match(
  /export const siteUrl = "([^"]+)"/,
)?.[1];
if (!siteUrl) fail("lib/content.ts에서 siteUrl을 찾지 못했습니다.");
const { host } = new URL(siteUrl);

// 키 파일: public/<키>.txt, 내용 = 키 (16진수·하이픈 8~128자)
const key = readdirSync("public")
  .filter((f) => /^[0-9a-f-]{8,128}\.txt$/i.test(f))
  .map((f) => f.slice(0, -4))
  .find((k) => readFileSync(`public/${k}.txt`, "utf8").trim() === k);
if (!key) fail("public/에 IndexNow 키 파일(<키>.txt, 내용 = 키)이 없습니다.");
const keyLocation = `${siteUrl}/${key}.txt`;

const live = await fetch(keyLocation, { redirect: "manual" });
if (live.status !== 200 || (await live.text()).trim() !== key) {
  fail(`라이브 키 파일 확인 실패(${live.status}): ${keyLocation} — 먼저 배포하세요.`);
}

const args = process.argv.slice(2);
const candidates = args.length
  ? args.map((a) => new URL(a, siteUrl).href)
  : [...(await text(`${siteUrl}/sitemap.xml`)).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].trim(),
    );

// 200으로 바로 열리는 정규 URL만 보낸다 — 리다이렉트·404를 보내면 할당량만 낭비된다.
const urlList = [];
for (const url of new Set(candidates)) {
  if (new URL(url).host !== host) {
    console.warn(`  제외 (다른 호스트) ${url}`);
    continue;
  }
  const res = await fetch(url, { method: "HEAD", redirect: "manual" });
  if (res.status === 200) urlList.push(url);
  else console.warn(`  제외 (${res.status}) ${url}`);
}
if (!urlList.length) fail("제출할 URL이 없습니다.");

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

const meaning = {
  200: "제출 완료",
  202: "접수 완료 — 키 확인 대기 중 (정상)",
  400: "요청 형식 오류",
  403: "키가 유효하지 않음 — 키 파일 없음 또는 내용 불일치",
  422: "URL이 host에 속하지 않거나 키가 맞지 않음",
  429: "요청 과다 — 잠시 후 다시 시도",
};
console.log(`\n네이버 IndexNow → ${res.status} ${meaning[res.status] ?? res.statusText}`);
urlList.forEach((u) => console.log(`  ${u}`));
console.log(`총 ${urlList.length}개`);
if (!res.ok) {
  const body = (await res.text()).trim();
  if (body) console.log(body);
  process.exit(1);
}

async function text(url) {
  const r = await fetch(url);
  if (!r.ok) fail(`${url} 가져오기 실패(${r.status})`);
  return r.text();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
