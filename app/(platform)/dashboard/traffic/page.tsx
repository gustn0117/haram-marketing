import type { Metadata } from "next";
import Link from "next/link";
import LineChart from "@/components/platform/LineChart";
import { BarList, Change, PageHead, Panel, StatTile } from "@/components/platform/ui";
import { requireHall } from "@/lib/platform/dal";
import { TRAFFIC_RANGES, getChannels, getFreshness, getTraffic } from "@/lib/platform/data";
import { dayLabel, displayUrl, num, percentChange, timeAgo } from "@/lib/platform/format";

export const metadata: Metadata = { title: "방문 분석" };

/* 방문 분석 — 등록한 홈페이지의 방문 (기간: ?range=7 · 30 · 90, 기본 30일). 기간은 아래 숫자 · 그래프 · 목록 전부에 적용 */
export default async function TrafficPage({ searchParams }: { searchParams: Promise<{ range?: string | string[] }> }) {
  const { hallId } = await requireHall();
  const query = await searchParams;
  const days = TRAFFIC_RANGES.find((item) => String(item) === query.range) ?? 30;
  const [traffic, channels, freshness] = await Promise.all([getTraffic(hallId, days), getChannels(hallId), getFreshness(hallId)]);
  const homepage = channels.find((item) => item.kind === "homepage");

  if (!homepage) {
    return (
      <>
        <PageHead title="방문 분석" lead="등록한 홈페이지에 들어온 방문을 보여 줍니다." />
        <Panel>
          <p className="pf-empty">
            등록한 홈페이지가 없습니다. <Link href="/dashboard/channels">채널 관리</Link>에서 홈페이지 주소를 등록하면 방문 수를 모읍니다.
          </p>
        </Panel>
      </>
    );
  }

  const peak = traffic.visits.reduce((best, item) => (item.value > best.value ? item : best));
  const visitAt = freshness.find((item) => item.label === "홈페이지 방문")?.at;

  return (
    <>
      <PageHead
        title="방문 분석"
        lead={`${displayUrl(homepage.url)}에 들어온 방문입니다.`}
        aside={visitAt ? `갱신 ${timeAgo(visitAt)}` : null}
      />

      <nav className="pf-range" aria-label="기간">
        {TRAFFIC_RANGES.map((item) => (
          <Link key={item} href={`/dashboard/traffic?range=${item}`} aria-current={item === days ? "page" : undefined}>
            최근 {item}일
          </Link>
        ))}
      </nav>

      <dl className="pf-stats">
        <StatTile
          label="방문"
          value={traffic.totalVisits}
          unit="회"
          delta={<Change value={percentChange(traffic.totalVisits, traffic.previousVisits)} kind="percent" against={`이전 ${days}일`} />}
        />
        <StatTile label="페이지뷰" value={traffic.pageviews} unit="회" />
        <StatTile label="하루 평균 방문" value={Math.round(traffic.totalVisits / days)} unit="회" />
        <StatTile label="가장 많이 온 날" value={peak.value} unit="회" note={dayLabel(peak.day)} />
      </dl>

      <Panel title={`하루 방문 (최근 ${days}일)`}>
        <LineChart points={traffic.visits} kind="count" unit="회" title={`최근 ${days}일 하루 방문`} />
      </Panel>

      <div className="pf-grid-2">
        <Panel title="들어온 경로" note={`최근 ${days}일 방문 기준`}>
          <BarList rows={traffic.sources} unit="회" />
        </Panel>
        <Panel title="많이 본 페이지" note={`최근 ${days}일 페이지뷰 기준`}>
          <div className="pf-table-wrap">
            <table className="pf-table">
              <thead>
                <tr>
                  <th scope="col">페이지</th>
                  <th scope="col" className="is-num">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {traffic.pages.map((page) => (
                  <tr key={page.path}>
                    <th scope="row">
                      {page.title}
                      <span className="pf-path">{page.path}</span>
                    </th>
                    <td className="is-num">{num(page.views)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
