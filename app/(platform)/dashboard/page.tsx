import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineChart from "@/components/platform/LineChart";
import { Change, ChannelList, FreshnessList, PageHead, Panel, RankCell, StatTile } from "@/components/platform/ui";
import { requireHall } from "@/lib/platform/dal";
import { getChannels, getFreshness, getHall, getKeywords, getTraffic } from "@/lib/platform/data";
import { STATUS_LABEL, SURFACE_LABEL, num, percentChange, timeAgo } from "@/lib/platform/format";
import type { ChannelKind } from "@/lib/platform/types";

export const metadata: Metadata = { title: "개요" };

/* 웨딩홀 첫 화면 — 홈페이지 방문(큰 숫자 + 30일 추이) · 채널별 숫자 · 순위가 크게 바뀐 키워드 · 자료 기준 시각 */
export default async function OverviewPage() {
  const { hallId } = await requireHall();
  const [hall, channels, keywords, traffic, freshness] = await Promise.all([
    getHall(hallId),
    getChannels(hallId),
    getKeywords(hallId),
    getTraffic(hallId, 30),
    getFreshness(hallId),
  ]);
  if (!hall) notFound();

  /** 채널의 숫자 하나 — 채널이 없거나 숫자가 없으면 이유(채널 상태 · 직접 입력 등)를 note 로 */
  const metric = (kind: ChannelKind, label: string) => {
    const channel = channels.find((item) => item.kind === kind);
    const found = channel?.metrics.find((item) => item.label === label);
    const value = found?.value ?? null;
    let note: string | undefined;
    if (!channel) note = "등록한 채널 없음";
    else if (value === null) note = channel.status === "collecting" ? (found?.note ?? "숫자 없음") : STATUS_LABEL[channel.status];
    return { value, note };
  };
  const blog = metric("blog", "어제 방문자");
  const place = metric("place", "방문자 리뷰");
  const instagram = metric("instagram", "게시물 도달");

  const top10 = keywords.filter((row) => {
    const rank = row.ranks[row.primary];
    return typeof rank === "number" && rank <= 10;
  }).length;
  const movers = keywords
    .filter((row) => row.change7d)
    .sort((a, b) => Math.abs(b.change7d ?? 0) - Math.abs(a.change7d ?? 0))
    .slice(0, 5);
  const rankAt = freshness.find((item) => item.label === "키워드 순위")?.at;
  const hasHomepage = channels.some((item) => item.kind === "homepage");

  return (
    <>
      <PageHead
        title={hall.name}
        lead={`${hall.region} · 계약 서비스 ${hall.services.join(", ")}`}
        aside={rankAt ? `순위 갱신 ${timeAgo(rankAt)}` : null}
      />

      {hasHomepage ? (
        <Panel className="pf-hero">
          <div className="pf-hero-figure">
            <p>최근 30일 홈페이지 방문</p>
            <strong>{num(traffic.totalVisits)}</strong>
            <Change value={percentChange(traffic.totalVisits, traffic.previousVisits)} kind="percent" against="이전 30일" />
          </div>
          <LineChart points={traffic.visits} kind="count" unit="회" title="최근 30일 하루 방문" />
        </Panel>
      ) : null}

      <dl className="pf-stats">
        <StatTile label="10위 안 키워드" value={top10} unit={`/ ${keywords.length}개`} note="대표 검색 영역 기준" />
        <StatTile label="블로그 어제 방문자" value={blog.value} unit="명" note={blog.note} />
        <StatTile label="플레이스 방문자 리뷰" value={place.value} unit="개" note={place.note} />
        <StatTile label="인스타그램 게시물 도달" value={instagram.value} unit="회" note={instagram.note} />
      </dl>

      <div className="pf-grid-2">
        <Panel title="순위가 크게 바뀐 키워드" note="7일 전과 비교" action={<Link href="/dashboard/keywords">키워드 전체</Link>}>
          {movers.length ? (
            <ul className="pf-movers">
              {movers.map((row) => (
                <li key={row.id}>
                  <Link href={`/dashboard/keywords?k=${row.id}#rank-chart`} className="pf-movers-name">
                    {row.keyword}
                  </Link>
                  <span className="pf-movers-rank">
                    {SURFACE_LABEL[row.primary]} <RankCell rank={row.ranks[row.primary]} />
                  </span>
                  <Change value={row.change7d} kind="rank" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="pf-empty">7일 동안 순위가 바뀐 키워드가 없습니다.</p>
          )}
        </Panel>
        <Panel title="등록한 채널" action={<Link href="/dashboard/channels">채널 관리</Link>}>
          <ChannelList channels={channels} />
        </Panel>
      </div>

      <Panel title="자료 기준 시각" note="숫자마다 가져오는 곳과 시각이 다릅니다.">
        <FreshnessList items={freshness} />
      </Panel>
    </>
  );
}
