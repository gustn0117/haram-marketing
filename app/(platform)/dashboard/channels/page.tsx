import type { Metadata } from "next";
import { ChannelCard, ChannelForm, PageHead, Panel } from "@/components/platform/ui";
import { requireHall } from "@/lib/platform/dal";
import { getChannels } from "@/lib/platform/data";

export const metadata: Metadata = { title: "채널 관리" };

/* 채널 관리 — 웨딩홀이 등록한 홈페이지 · 블로그 · 플레이스 · 인스타그램 주소와 채널별 숫자, 링크 등록 */
export default async function ChannelsPage() {
  const { hallId } = await requireHall();
  const channels = await getChannels(hallId);

  return (
    <>
      <PageHead title="채널 관리" lead="등록한 홈페이지, 블로그, 플레이스, 인스타그램 주소와 채널별 숫자입니다." />
      {channels.length ? (
        <div className="pf-channels">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <Panel>
          <p className="pf-empty">등록한 채널이 없습니다. 아래에서 주소를 등록해 주세요.</p>
        </Panel>
      )}
      <Panel title="링크 등록" note="홈페이지, 네이버 블로그, 플레이스, 인스타그램 주소를 등록합니다.">
        <ChannelForm />
      </Panel>
    </>
  );
}
