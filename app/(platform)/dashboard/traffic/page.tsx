import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { IconOut } from "@/components/hall/icons";
import LineChart from "@/components/hall/LineChart";
import { BarList, Change, EmptyState, FilterRow, PageTitle, RankedPages, Section, StatCard } from "@/components/hall/ui";
import { requireHall } from "@/lib/platform/dal";
import { TRAFFIC_RANGES, getChannels, getFreshness, getTraffic } from "@/lib/platform/data";
import { dayLabel, displayUrl, percentChange, timeAgo } from "@/lib/platform/format";

export const metadata: Metadata = { title: "방문 분석" };
export const viewport: Viewport = { themeColor: "#ffffff" };

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
        <PageTitle title="방문 분석" />
        <EmptyState
          action={
            <Link href="/dashboard/channels#channel-form" className="hp-btn is-dark">
              홈페이지 주소 등록
            </Link>
          }
        >
          등록한 홈페이지가 없습니다. 홈페이지 주소를 등록하면 방문 수를 모읍니다.
        </EmptyState>
      </>
    );
  }

  const peak = traffic.visits.reduce((best, item) => (item.value > best.value ? item : best));
  const visitAt = freshness.find((item) => item.label === "홈페이지 방문")?.at;

  return (
    <>
      <PageTitle
        title="방문 분석"
        count={
          <a href={homepage.url} target="_blank" rel="noopener noreferrer" className="hp-title-link">
            <span className="hp-out-text">{displayUrl(homepage.url)}</span>
            <IconOut />
            <span className="sr-only">(새 창)</span>
          </a>
        }
        aside={visitAt ? `갱신 ${timeAgo(visitAt)}` : null}
      />

      <div className="hp-filter">
        <FilterRow
          label="기간"
          options={TRAFFIC_RANGES.map((item) => ({
            href: `/dashboard/traffic?range=${item}`,
            label: `최근 ${item}일`,
            current: item === days,
          }))}
        />
      </div>

      <dl className="hp-stats">
        <StatCard
          label="방문"
          value={traffic.totalVisits}
          unit="회"
          delta={<Change value={percentChange(traffic.totalVisits, traffic.previousVisits)} kind="percent" against={`이전 ${days}일`} />}
        />
        <StatCard label="페이지뷰" value={traffic.pageviews} unit="회" />
        <StatCard label="하루 평균 방문" value={Math.round(traffic.totalVisits / days)} unit="회" />
        <StatCard label="가장 많이 온 날" value={peak.value} unit="회" note={dayLabel(peak.day)} />
      </dl>

      <Section title="하루 방문" note={`최근 ${days}일`}>
        <div className="hp-card">
          <LineChart points={traffic.visits} kind="count" unit="회" title={`최근 ${days}일 하루 방문`} />
        </div>
      </Section>

      <div className="hp-grid-2">
        <Section title="들어온 경로" note={`최근 ${days}일 방문 기준`}>
          <div className="hp-card">
            <BarList rows={traffic.sources} unit="회" />
          </div>
        </Section>
        <Section title="많이 본 페이지" note={`최근 ${days}일 페이지뷰 기준`}>
          <div className="hp-card">
            <RankedPages pages={traffic.pages} />
          </div>
        </Section>
      </div>
    </>
  );
}
