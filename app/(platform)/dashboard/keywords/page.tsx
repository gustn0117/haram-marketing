import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { IconClose } from "@/components/hall/icons";
import LineChart from "@/components/hall/LineChart";
import { Change, EmptyState, FilterRow, PageTitle, RankText, SURFACES, rankKey, rankWords } from "@/components/hall/ui";
import { requireHall } from "@/lib/platform/dal";
import { getFreshness, getKeywords } from "@/lib/platform/data";
import { SURFACE_LABEL, num, timeAgo } from "@/lib/platform/format";
import type { KeywordRow } from "@/lib/platform/types";

export const metadata: Metadata = { title: "키워드 순위" };
export const viewport: Viewport = { themeColor: "#ffffff" };

type Query = { k?: string | string[]; q?: string | string[]; view?: string | string[]; sort?: string | string[] };
type Choice = { id: string; label: string };

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const VIEWS: (Choice & { test: (row: KeywordRow) => boolean })[] = [
  { id: "all", label: "전체", test: () => true },
  { id: "top10", label: "10위 안", test: (row) => rankKey(row) <= 10 },
  { id: "up", label: "오른 키워드", test: (row) => (row.change7d ?? 0) > 0 },
  { id: "down", label: "내린 키워드", test: (row) => (row.change7d ?? 0) < 0 },
];

const SORTS: (Choice & { compare: (a: KeywordRow, b: KeywordRow) => number })[] = [
  { id: "rank", label: "순위 높은 순", compare: (a, b) => rankKey(a) - rankKey(b) },
  { id: "search", label: "검색량 많은 순", compare: (a, b) => (b.monthlySearches ?? -1) - (a.monthlySearches ?? -1) },
  {
    id: "change",
    label: "변동 큰 순",
    compare: (a, b) => Math.abs(b.change7d ?? 0) - Math.abs(a.change7d ?? 0) || rankKey(a) - rankKey(b),
  },
];

/** 띄어쓰기를 빼고 비교 — '수원웨딩홀'로 찾아도 '수원 웨딩홀'이 나오게 */
const squash = (text: string) => text.replace(/\s+/g, "").toLowerCase();

/* 키워드 순위 — 거르기(?view · ?sort · ?q) · 고른 키워드의 30일 추이(?k) · 키워드 표(좁은 화면은 목록) */
export default async function KeywordsPage({ searchParams }: { searchParams: Promise<Query> }) {
  const { hallId } = await requireHall();
  const [keywords, freshness, query] = await Promise.all([getKeywords(hallId), getFreshness(hallId), searchParams]);
  const rankAt = freshness.find((item) => item.label === "키워드 순위")?.at;
  const title = (
    <PageTitle title="키워드 순위" count={`키워드 ${keywords.length}개`} aside={rankAt ? `순위 갱신 ${timeAgo(rankAt)}` : null} />
  );

  if (keywords.length === 0) {
    return (
      <>
        {title}
        <EmptyState>확인하는 키워드가 없습니다. 하람 담당자가 키워드를 등록하면 여기에 순위가 나옵니다.</EmptyState>
      </>
    );
  }

  const q = (first(query.q) ?? "").trim().slice(0, 40);
  const view = VIEWS.find((item) => item.id === first(query.view)) ?? VIEWS[0];
  const sort = SORTS.find((item) => item.id === first(query.sort)) ?? SORTS[0];
  const k = first(query.k) ?? "";

  /** 지금 고른 값에서 몇 개만 바꾼 주소 — 기본값은 주소에서 뺌 */
  const href = (patch: Partial<Record<"q" | "view" | "sort" | "k", string>>) => {
    const next = { q, view: view.id, sort: sort.id, k, ...patch };
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.view !== "all") params.set("view", next.view);
    if (next.sort !== "rank") params.set("sort", next.sort);
    if (next.k) params.set("k", next.k);
    const text = params.toString();
    return text ? `/dashboard/keywords?${text}` : "/dashboard/keywords";
  };

  const matching = q ? keywords.filter((row) => squash(row.keyword).includes(squash(q))) : keywords;
  const rows = matching.filter(view.test).sort(sort.compare);
  const selected = keywords.find((row) => row.id === k) ?? rows[0] ?? matching[0] ?? keywords[0];
  const surface = SURFACE_LABEL[selected.primary];
  const others = (row: KeywordRow) =>
    SURFACES.filter((item) => item !== row.primary && row.ranks[item] !== undefined)
      .map((item) => `${SURFACE_LABEL[item]} ${rankWords(row.ranks[item])}`)
      .join(" · ");

  return (
    <>
      {title}

      <div className="hp-filter">
        <FilterRow
          label="보기"
          options={VIEWS.map((item) => ({
            href: href({ view: item.id, k: "" }),
            label: (
              <>
                {item.label}
                <small>{matching.filter(item.test).length}</small>
              </>
            ),
            current: item.id === view.id,
          }))}
        />
        <FilterRow
          label="정렬"
          options={SORTS.map((item) => ({ href: href({ sort: item.id, k: "" }), label: item.label, current: item.id === sort.id }))}
        />
        {q ? (
          <FilterRow label="검색">
            <span className="hp-filter-search">
              ‘{q}’ 검색 결과 {matching.length}개
            </span>
            <Link href={href({ q: "", k: "" })} scroll={false} className="hp-filter-clear">
              <IconClose />
              검색 지우기
            </Link>
          </FilterRow>
        ) : null}
      </div>

      {matching.length === 0 ? (
        <EmptyState
          action={
            <Link href={href({ q: "", k: "" })} className="hp-btn is-line">
              전체 키워드 보기
            </Link>
          }
        >
          ‘{q}’ 들어간 키워드가 없습니다.
        </EmptyState>
      ) : (
        <>
          <section className="hp-card hp-kw-detail" id="rank-chart" aria-labelledby="kw-detail-name">
            <div className="hp-kw-detail-head">
              <div>
                <span className="hp-tag is-dark">{surface}</span>
                <h2 id="kw-detail-name">{selected.keyword}</h2>
                <p className="hp-meta">
                  월 검색 {selected.monthlySearches === null ? "—" : num(selected.monthlySearches)}
                  <i aria-hidden="true" />
                  최근 30일, 위로 갈수록 상위
                </p>
              </div>
              <p className="hp-kw-detail-now">
                <strong>{rankWords(selected.ranks[selected.primary])}</strong>
                <Change value={selected.change7d} kind="rank" against="7일 전" />
              </p>
            </div>
            <LineChart
              points={selected.history.map((point) => ({ day: point.day, value: point.rank }))}
              kind="rank"
              title={`${selected.keyword} ${surface} 순위`}
              emptyText="순위 밖"
            />
          </section>

          <section className="hp-section is-tight" aria-labelledby="kw-list-title">
            <div className="hp-section-head">
              <div>
                <h2 id="kw-list-title">키워드 목록</h2>
                <p>
                  {rows.length}개 · 키워드를 누르면 위 그래프가 그 키워드로 바뀝니다.
                </p>
              </div>
            </div>
            {rows.length ? (
              <>
                <div className="hp-table-wrap hp-kw-table" role="region" aria-label="키워드 순위 표" tabIndex={0}>
                  <table className="hp-table is-board">
                    <thead>
                      <tr>
                        <th scope="col">키워드</th>
                        <th scope="col" className="is-num">
                          월 검색량
                        </th>
                        {SURFACES.map((item) => (
                          <th key={item} scope="col" className="is-num">
                            {SURFACE_LABEL[item]}
                          </th>
                        ))}
                        <th scope="col" className="is-num">
                          7일 변동
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} aria-current={row.id === selected.id ? "true" : undefined}>
                          <th scope="row">
                            <Link href={`${href({ k: row.id })}#rank-chart`}>{row.keyword}</Link>
                          </th>
                          <td className="is-num">{row.monthlySearches === null ? "—" : num(row.monthlySearches)}</td>
                          {SURFACES.map((item) => (
                            <td key={item} className="is-num">
                              <RankText rank={row.ranks[item]} />
                            </td>
                          ))}
                          <td className="is-num">
                            <Change value={row.change7d} kind="rank" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="hp-kw-list">
                  {rows.map((row) => (
                    <li key={row.id} aria-current={row.id === selected.id ? "true" : undefined}>
                      <Link href={`${href({ k: row.id })}#rank-chart`} className="hp-kw-row">
                        <span className="hp-kw-row-name">{row.keyword}</span>
                        <span className="hp-kw-row-rank">
                          {SURFACE_LABEL[row.primary]} <RankText rank={row.ranks[row.primary]} />
                        </span>
                        <span className="hp-kw-row-meta">
                          월 검색 {row.monthlySearches === null ? "—" : num(row.monthlySearches)}
                          {others(row) ? ` · ${others(row)}` : ""}
                        </span>
                        <Change value={row.change7d} kind="rank" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="hp-legend">
                  순위 밖은 확인한 범위 안에 없다는 뜻이고, —는 확인하지 않는 영역입니다. 7일 변동은 대표 검색 영역 기준으로,
                  오르면 빨간 ▲, 내리면 파란 ▼입니다.
                </p>
              </>
            ) : (
              <EmptyState
                action={
                  <Link href={href({ view: "all", k: "" })} scroll={false} className="hp-btn is-line">
                    전체 보기
                  </Link>
                }
              >
                ‘{view.label}’에 맞는 키워드가 없습니다.
              </EmptyState>
            )}
          </section>
        </>
      )}
    </>
  );
}
