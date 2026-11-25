import type { Metadata, Viewport } from "next";
import { ChannelCard, ChannelIcon, EmptyState, PageTitle, Pending, Section } from "@/components/hall/ui";
import { requireHall } from "@/lib/platform/dal";
import { getChannels } from "@/lib/platform/data";
import { CHANNEL_LABEL } from "@/lib/platform/format";
import type { ChannelKind } from "@/lib/platform/types";

export const metadata: Metadata = { title: "채널 관리" };
export const viewport: Viewport = { themeColor: "#ffffff" };

/** 링크 등록 — 틀 단계라 입력 칸만 있고 저장은 막아 둠 */
function ChannelForm() {
  const kinds = Object.keys(CHANNEL_LABEL) as ChannelKind[];
  return (
    <form className="hp-card hp-form">
      <fieldset disabled>
        <legend className="sr-only">링크 등록</legend>
        <fieldset className="hp-choice">
          <legend className="hp-form-label">종류</legend>
          <div className="hp-choice-list">
            {kinds.map((kind, i) => (
              <label key={kind} className="hp-choice-item">
                <input type="radio" name="kind" value={kind} defaultChecked={i === 0} />
                <span>
                  <ChannelIcon kind={kind} size={30} />
                  {CHANNEL_LABEL[kind]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="hp-form-field">
          <label htmlFor="channel-url" className="hp-form-label">
            주소
          </label>
          <div className="hp-form-inline">
            <input id="channel-url" className="hp-input" name="url" type="url" placeholder="https://" />
            <button type="submit" className="hp-btn is-dark">
              링크 등록
            </button>
          </div>
        </div>
      </fieldset>
      <Pending>저장은 아직 연결하지 않았습니다. 연결하면 등록한 주소가 ‘확인 중’으로 들어가고, 하람이 확인한 뒤 숫자를 모읍니다.</Pending>
    </form>
  );
}

/* 채널 관리 — 웨딩홀이 등록한 홈페이지 · 블로그 · 플레이스 · 인스타그램 주소와 채널별 숫자, 링크 등록 */
export default async function ChannelsPage() {
  const { hallId } = await requireHall();
  const channels = await getChannels(hallId);

  return (
    <>
      <PageTitle title="채널 관리" count={`등록한 채널 ${channels.length}개`} />
      {channels.length ? (
        <ul className="hp-ch-grid">
          {channels.map((channel) => (
            <li key={channel.id}>
              <ChannelCard channel={channel} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>등록한 채널이 없습니다. 아래에서 주소를 등록해 주세요.</EmptyState>
      )}
      <Section id="channel-form" title="링크 등록" note="홈페이지, 네이버 블로그, 플레이스, 인스타그램 주소를 등록합니다.">
        <ChannelForm />
      </Section>
    </>
  );
}
