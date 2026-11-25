import type { ReactNode } from "react";
import { CHANNEL_LABEL, STATUS_LABEL, displayUrl, num, timeAgo } from "@/lib/platform/format";
import type { Channel, ChannelKind, ChannelStatus } from "@/lib/platform/types";

/* 하람 관리자 화면 조각 — 서버에서 그립니다 (스타일: app/(platform)/platform.css).
   웨딩홀 화면 조각은 components/hall/ui.tsx */

export function PageHead({ title, lead, aside }: { title: string; lead?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="pf-head">
      <div className="pf-head-text">
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </div>
      {aside ? <div className="pf-head-aside">{aside}</div> : null}
    </header>
  );
}

export function Panel({
  title,
  note,
  action,
  id,
  className = "",
  children,
}: {
  title?: string;
  note?: string;
  action?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`pf-panel ${className}`.trim()} id={id}>
      {title || action ? (
        <div className="pf-panel-head">
          <div>
            {title ? <h2>{title}</h2> : null}
            {note ? <p>{note}</p> : null}
          </div>
          {action ? <div className="pf-panel-action">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** 숫자 한 칸 — <dl className="pf-stats"> 안에 둡니다 */
export function StatTile({
  label,
  value,
  unit,
  delta,
  note,
}: {
  label: string;
  value: number | null;
  unit?: string;
  delta?: ReactNode;
  note?: string;
}) {
  return (
    <div className="pf-stat">
      <dt>{label}</dt>
      <dd className="pf-stat-value">
        {value === null ? <span className="pf-none">—</span> : num(value)}
        {value !== null && unit ? <small>{unit}</small> : null}
      </dd>
      {delta ? <dd className="pf-stat-delta">{delta}</dd> : null}
      {note ? <dd className="pf-stat-note">{note}</dd> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: ChannelStatus }) {
  return (
    <span className={`pf-status is-${status}`}>
      <i aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** 등록한 채널 하나 — 종류 · 주소 · 상태 · 대표 숫자 */
export function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <article className="pf-channel">
      <div className="pf-channel-top">
        <span className="pf-channel-kind">{CHANNEL_LABEL[channel.kind]}</span>
        <StatusBadge status={channel.status} />
      </div>
      <h3>{channel.label}</h3>
      <p className="pf-channel-url">{displayUrl(channel.url)}</p>
      <dl className="pf-channel-metrics">
        {channel.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              {metric.value === null ? (
                <span className="pf-none">{metric.note ?? "—"}</span>
              ) : (
                <>
                  {num(metric.value)}
                  {metric.unit ? <small>{metric.unit}</small> : null}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="pf-channel-time">{channel.updatedAt ? `갱신 ${timeAgo(channel.updatedAt)}` : "아직 숫자가 없습니다"}</p>
    </article>
  );
}

/** 아직 연결하지 않은 기능 안내 */
export function Pending({ children = "저장 기능은 아직 연결하지 않았습니다." }: { children?: ReactNode }) {
  return <p className="pf-pending">{children}</p>;
}

export function Field({ label, grow = false, children }: { label: string; grow?: boolean; children: ReactNode }) {
  return (
    <label className={`pf-field${grow ? " is-grow" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

/** 링크 등록 — 틀 단계라 입력 칸만 있고 저장은 막아 둠 */
export function ChannelForm() {
  return (
    <form className="pf-form">
      <fieldset disabled>
        <legend className="sr-only">링크 등록</legend>
        <div className="pf-form-row">
          <Field label="종류">
            <select name="kind" defaultValue="homepage">
              {(Object.keys(CHANNEL_LABEL) as ChannelKind[]).map((kind) => (
                <option key={kind} value={kind}>
                  {CHANNEL_LABEL[kind]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="주소" grow>
            <input name="url" type="url" placeholder="https://" />
          </Field>
          <button type="submit" className="pf-btn is-solid">
            링크 등록
          </button>
        </div>
      </fieldset>
      <Pending>저장은 아직 연결하지 않았습니다. 연결하면 등록한 주소가 ‘확인 중’으로 들어가고, 하람이 확인한 뒤 숫자를 모읍니다.</Pending>
    </form>
  );
}
