import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconChevron, IconOut, IconPhone, IconPlus } from "@/components/hall/icons";
import LineChart from "@/components/hall/LineChart";
import {
  Change,
  ChannelIcon,
  ChannelTile,
  EmptyState,
  FreshnessList,
  KeywordCard,
  REPORT_ICON,
  Section,
  Sparkline,
  rankKey,
} from "@/components/hall/ui";
import { company } from "@/lib/content";
import { requireHall } from "@/lib/platform/dal";
import { getChannels, getFreshness, getHall, getKeywords, getReports, getTraffic } from "@/lib/platform/data";
import { CHANNEL_LABEL, displayUrl, num, percentChange, timeAgo } from "@/lib/platform/format";

export const metadata: Metadata = { title: "개요" };
export const viewport: Viewport = { themeColor: "#ffffff" };

/** 키워드 카드 순서 (?kw=moved) */
const KEYWORD_TABS = [
  { id: "rank", label: "순위 높은 순" },
  { id: "moved", label: "많이 바뀐 순" },
] as const;

/** 'YYYY-MM' → '10월' */
const monthOnly = (month: string) => `${Number(month.split("-")[1])}월`;

/* 웨딩홀 첫 화면 — 인사 · 요약 배너 3개(방문 · 키워드 · 리포트) · 내 채널 바로가기 ·
   키워드 카드 4개 · 홈페이지 방문 그래프 · 채널 · 자료 기준 시각 */
export default async function OverviewPage({ searchParams }: { searchParams: Promise<{ kw?: string | string[] }> }) {
  const { hallId } = await requireHall();
  const [hall, channels, keywords, traffic, reports, freshness, query] = await Promise.all([
    getHall(hallId),
    getChannels(hallId),
    getKeywords(hallId),
    getTraffic(hallId, 30),
    getReports(hallId),
    getFreshness(hallId),
    searchParams,
  ]);
  if (!hall) notFound();

  const tab = KEYWORD_TABS.find((item) => item.id === query.kw)?.id ?? "rank";
  const ordered =
    tab === "moved"
      ? keywords
          .filter((row) => row.change7d)
          .sort((a, b) => Math.abs(b.change7d ?? 0) - Math.abs(a.change7d ?? 0) || rankKey(a) - rankKey(b))
      : [...keywords].sort((a, b) => rankKey(a) - rankKey(b));
  const shown = ordered.slice(0, 4);
  const top10 = keywords.filter((row) => rankKey(row) <= 10).length;
  const homepage = channels.find((item) => item.kind === "homepage");
  const latest = reports.find((item) => item.status === "ready");
  const preparing = reports.find((item) => item.status === "preparing");
  const rankAt = freshness.find((item) => item.label === "키워드 순위")?.at;
  const tel = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <>
      <section className="hp-hello" aria-labelledby="hp-hello-name">
        <div className="hp-hello-id">
          <span className="hp-avatar is-xl" aria-hidden="true">
            {hall.name.slice(0, 1)}
          </span>
          <div>
            <h1 id="hp-hello-name">{hall.name}</h1>
            <p className="hp-meta">
              {hall.region}
              <i aria-hidden="true" />
              계약 서비스 {hall.services.length}개
              {rankAt ? (
                <>
                  <i aria-hidden="true" />
                  순위 갱신 {timeAgo(rankAt)}
                </>
              ) : null}
            </p>
          </div>
        </div>
        <div className="hp-hello-actions">
          <Link href="/dashboard/channels#channel-form" className="hp-btn is-line">
            링크 등록
          </Link>
          <Link href="/dashboard/reports" className="hp-btn is-dark">
            월간 리포트
          </Link>
        </div>
      </section>

      <ul className="hp-banners" aria-label="요약">
        <li>
          {homepage ? (
            <Link href="/dashboard/traffic" className="hp-banner is-dark">
              <span className="hp-banner-label">홈페이지 방문 · 최근 30일</span>
              <strong className="hp-banner-value">
                {num(traffic.totalVisits)}
                <small>회</small>
              </strong>
              <Change value={percentChange(traffic.totalVisits, traffic.previousVisits)} kind="percent" against="이전 30일" />
              <span className="hp-banner-go">
                방문 분석 보기
                <IconChevron />
              </span>
              <Sparkline values={traffic.visits.map((item) => item.value)} className="hp-banner-spark" />
            </Link>
          ) : (
            <Link href="/dashboard/channels#channel-form" className="hp-banner is-dark">
              <span className="hp-banner-label">홈페이지 방문</span>
              <strong className="hp-banner-value is-text">등록한 홈페이지가 없습니다</strong>
              <span className="hp-banner-sub">홈페이지 주소를 등록하면 방문 수를 모읍니다.</span>
              <span className="hp-banner-go">
                링크 등록하기
                <IconChevron />
              </span>
            </Link>
          )}
        </li>
        <li>
          <Link href="/dashboard/keywords?view=top10" className="hp-banner is-bone">
            <span className="hp-banner-label">키워드 순위 · 대표 검색 영역</span>
            <strong className="hp-banner-value">
              10위 안 {top10}
              <small>개</small>
            </strong>
            <span className="hp-banner-sub">확인하는 키워드 {keywords.length}개 중</span>
            {keywords.length ? (
              <span className="hp-dots" aria-hidden="true">
                {keywords.map((row, i) => (
                  <i key={row.id} className={i < top10 ? "is-on" : undefined} />
                ))}
              </span>
            ) : null}
            <span className="hp-banner-go">
              키워드 순위 보기
              <IconChevron />
            </span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reports" className="hp-banner is-gray">
            <span className="hp-banner-label">월간 리포트</span>
            {latest ? (
              <strong className="hp-banner-value">
                {monthOnly(latest.month)}
                <small>리포트</small>
              </strong>
            ) : (
              <strong className="hp-banner-value is-text">아직 올린 리포트가 없습니다</strong>
            )}
            {preparing ? <span className="hp-banner-sub">{monthOnly(preparing.month)} 리포트는 준비 중입니다.</span> : null}
            <span className="hp-banner-go">
              리포트 보기
              <IconChevron />
            </span>
            <Image src={REPORT_ICON} alt="" width={118} height={118} className="hp-banner-art" />
          </Link>
        </li>
      </ul>

      <nav className="hp-quick" aria-label="바로가기">
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>
              <a href={channel.url} target="_blank" rel="noopener noreferrer" className="hp-pill">
                <span className="hp-pill-icon">
                  <ChannelIcon kind={channel.kind} size={30} />
                </span>
                내 {CHANNEL_LABEL[channel.kind]}
                <IconOut className="hp-pill-out" />
                <span className="sr-only">(새 창)</span>
              </a>
            </li>
          ))}
          <li>
            <Link href="/dashboard/channels#channel-form" className="hp-pill">
              <span className="hp-pill-icon">
                <IconPlus />
              </span>
              링크 등록
            </Link>
          </li>
          <li>
            <a href={tel} className="hp-pill">
              <span className="hp-pill-icon">
                <IconPhone />
              </span>
              담당자 전화
            </a>
          </li>
        </ul>
      </nav>

      <Section
        title="키워드 순위"
        note="네이버 검색에서 몇 번째로 나오는지, 대표 검색 영역 기준"
        end={
          keywords.length ? (
            <nav className="hp-tabs" aria-label="키워드 순서">
              {KEYWORD_TABS.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === "rank" ? "/dashboard" : `/dashboard?kw=${item.id}`}
                  scroll={false}
                  aria-current={tab === item.id ? "true" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null
        }
      >
        {shown.length ? (
          <>
            <ul className="hp-kw-grid">
              {shown.map((row) => (
                <li key={row.id}>
                  <KeywordCard row={row} />
                </li>
              ))}
            </ul>
            <div className="hp-more-row">
              <Link href="/dashboard/keywords" className="hp-btn is-line is-wide">
                키워드 {keywords.length}개 전체 보기
                <IconChevron />
              </Link>
            </div>
          </>
        ) : (
          <EmptyState>
            {tab === "moved"
              ? "7일 동안 순위가 바뀐 키워드가 없습니다."
              : "확인하는 키워드가 없습니다. 하람 담당자가 키워드를 등록하면 여기에 순위가 나옵니다."}
          </EmptyState>
        )}
      </Section>

      {homepage ? (
        <Section
          title="홈페이지 방문"
          note={`${displayUrl(homepage.url)} · 최근 30일 하루 방문`}
          more={{ href: "/dashboard/traffic", label: "방문 분석" }}
        >
          <div className="hp-card">
            <LineChart points={traffic.visits} kind="count" unit="회" title="최근 30일 하루 방문" />
          </div>
        </Section>
      ) : null}

      <Section title="내 채널" note="등록한 링크와 채널별 숫자" more={{ href: "/dashboard/channels", label: "채널 관리" }}>
        {channels.length ? (
          <ul className="hp-tile-grid">
            {channels.map((channel) => (
              <li key={channel.id}>
                <ChannelTile channel={channel} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            action={
              <Link href="/dashboard/channels#channel-form" className="hp-btn is-dark">
                링크 등록
              </Link>
            }
          >
            등록한 채널이 없습니다.
          </EmptyState>
        )}
      </Section>

      <Section title="자료 기준 시각" note="숫자마다 가져오는 곳과 시각이 다릅니다.">
        <FreshnessList items={freshness} />
      </Section>
    </>
  );
}
