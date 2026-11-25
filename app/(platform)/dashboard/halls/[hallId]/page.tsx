import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChannelCard, ChannelForm, PageHead, Panel, Pending } from "@/components/platform/ui";
import { requireAdmin } from "@/lib/platform/dal";
import { getChannels, getHall } from "@/lib/platform/data";
import { STATUS_LABEL, dateLabel } from "@/lib/platform/format";

export const metadata: Metadata = { title: "웨딩홀 상세" };

/* 하람 화면 — 웨딩홀 하나의 계정 · 자료 연결 · 등록한 채널 (재발급 · 중지 · 등록은 다음 단계에서 연결) */
export default async function HallDetailPage({ params }: { params: Promise<{ hallId: string }> }) {
  await requireAdmin();
  const { hallId } = await params;
  const hall = await getHall(hallId);
  if (!hall) notFound();
  const channels = await getChannels(hall.id);
  const homepage = channels.find((item) => item.kind === "homepage");
  const instagram = channels.find((item) => item.kind === "instagram");
  const active = hall.status === "active";

  return (
    <>
      <p className="pf-back">
        <Link href="/dashboard/halls">웨딩홀 계정</Link>
      </p>
      <PageHead title={hall.name} lead={`${hall.region} · ${active ? "계약 중" : "계약 종료"}`} />

      <div className="pf-grid-2">
        <Panel title="계정">
          <dl className="pf-facts">
            <dt>아이디</dt>
            <dd>{hall.loginId}</dd>
            <dt>로그인</dt>
            <dd>{active ? "사용 중" : "중지 (계약 종료)"}</dd>
            <dt>계약 서비스</dt>
            <dd>{hall.services.join(", ")}</dd>
            <dt>계약 기간</dt>
            <dd>
              {dateLabel(hall.contractStart)} ~ {hall.contractEnd ? dateLabel(hall.contractEnd) : ""}
            </dd>
            <dt>담당자</dt>
            <dd>{hall.manager}</dd>
          </dl>
          <fieldset className="pf-actions" disabled>
            <legend className="sr-only">계정 관리</legend>
            <button type="button" className="pf-btn">
              비밀번호 재발급
            </button>
            <button type="button" className="pf-btn">
              {active ? "로그인 중지" : "로그인 다시 열기"}
            </button>
          </fieldset>
          <Pending />
        </Panel>

        <Panel title="자료 연결" note="웨딩홀 화면의 숫자를 어디서 가져오는지 정합니다.">
          <dl className="pf-facts">
            <dt>PC 순위 프로그램</dt>
            <dd>{hall.trackerClientId ? `광고주 ${hall.trackerClientId}번` : "광고주 연결 전"}</dd>
            <dt>홈페이지 방문</dt>
            <dd>{homepage ? STATUS_LABEL[homepage.status] : "홈페이지 등록 전"}</dd>
            <dt>플레이스 조회수</dt>
            <dd>직접 입력</dd>
            <dt>인스타그램</dt>
            <dd>{instagram ? "Meta 연동 전" : "계정 등록 전"}</dd>
          </dl>
        </Panel>
      </div>

      <Panel title={`등록한 채널 ${channels.length}개`}>
        {channels.length ? (
          <div className="pf-channels">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        ) : (
          <p className="pf-empty">등록한 채널이 없습니다.</p>
        )}
      </Panel>

      <Panel title="링크 등록" note="이 웨딩홀의 홈페이지, 블로그, 플레이스, 인스타그램 주소를 등록합니다.">
        <ChannelForm />
      </Panel>
    </>
  );
}
