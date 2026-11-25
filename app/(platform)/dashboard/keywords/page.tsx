import type { Metadata } from "next";
import Link from "next/link";
import LineChart from "@/components/platform/LineChart";
import { Change, PageHead, Panel, RankCell, StatTile } from "@/components/platform/ui";
import { requireHall } from "@/lib/platform/dal";
import { getFreshness, getKeywords } from "@/lib/platform/data";
import { SURFACE_LABEL, num, timeAgo } from "@/lib/platform/format";

export const metadata: Metadata = { title: "키워드 순위" };

/** 표에 보이는 검색 영역 (카페는 자료를 붙일 때 추가) */
const SURFACES = ["integrated", "blog", "place"] as const;

/* 키워드 순위 — 위: 고른 키워드의 30일 추이, 아래: 전체 키워드 표 (?k=키워드 번호로 고름) */
export default async function KeywordsPage({ searchParams }: { searchParams: Promise<{ k?: string | string[] }> }) {
  const { hallId } = await requireHall();
  const [keywords, freshness, query] = await Promise.all([getKeywords(hallId), getFreshness(hallId), searchParams]);
  const rankAt = freshness.find((item) => item.label === "키워드 순위")?.at;
  const head = (
    <PageHead
      title="키워드 순위"
      lead="네이버 검색에서 웨딩홀이 몇 번째로 나오는지 보여 줍니다."
      aside={rankAt ? `갱신 ${timeAgo(rankAt)}` : null}
    />
  );

  if (keywords.length === 0) {
    return (
      <>
        {head}
        <Panel>
          <p className="pf-empty">확인하는 키워드가 없습니다. 하람 담당자가 키워드를 등록하면 여기에 순위가 나옵니다.</p>
        </Panel>
      </>
    );
  }

  const selected = keywords.find((row) => row.id === query.k) ?? keywords[0];
  const top10 = keywords.filter((row) => {
    const rank = row.ranks[row.primary];
    return typeof rank === "number" && rank <= 10;
  }).length;
  const up = keywords.filter((row) => (row.change7d ?? 0) > 0).length;
  const down = keywords.filter((row) => (row.change7d ?? 0) < 0).length;
  const surface = SURFACE_LABEL[selected.primary];

  return (
    <>
      {head}

      <dl className="pf-stats is-3">
        <StatTile label="확인하는 키워드" value={keywords.length} unit="개" />
        <StatTile label="10위 안" value={top10} unit="개" note="대표 검색 영역 기준" />
        <StatTile label="7일 전보다 오름" value={up} unit="개" note={`내림 ${down}개`} />
      </dl>

      <Panel id="rank-chart" title={`‘${selected.keyword}’ ${surface} 순위`} note="최근 30일, 위로 갈수록 상위입니다.">
        <LineChart
          points={selected.history.map((point) => ({ day: point.day, value: point.rank }))}
          kind="rank"
          title={`${selected.keyword} ${surface} 순위`}
          emptyText="순위 밖"
        />
      </Panel>

      <Panel title="전체 키워드" note="키워드를 누르면 위 그래프가 그 키워드로 바뀝니다.">
        <div className="pf-table-wrap" role="region" aria-label="키워드 순위 표" tabIndex={0}>
          <table className="pf-table">
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
              {keywords.map((row) => (
                <tr key={row.id} aria-current={row.id === selected.id ? "true" : undefined}>
                  <th scope="row">
                    <Link href={`/dashboard/keywords?k=${row.id}#rank-chart`}>{row.keyword}</Link>
                  </th>
                  <td className="is-num">{row.monthlySearches === null ? "—" : num(row.monthlySearches)}</td>
                  {SURFACES.map((item) => (
                    <td key={item} className="is-num">
                      <RankCell rank={row.ranks[item]} />
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
        <p className="pf-legend">
          순위 밖은 확인한 범위 안에 없다는 뜻이고, —는 확인하지 않는 영역입니다. 7일 변동은 대표 검색 영역 기준입니다.
        </p>
      </Panel>
    </>
  );
}
