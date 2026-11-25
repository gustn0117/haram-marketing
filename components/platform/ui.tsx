import type { ReactNode } from "react";
import { CHANNEL_LABEL, STATUS_LABEL, displayUrl, num, timeAgo } from "@/lib/platform/format";
import type { Channel, ChannelKind, ChannelStatus, Freshness } from "@/lib/platform/types";

/* 웨딩홀 플랫폼 화면 조각 — 서버에서 그립니다 (스타일: app/(platform)/platform.css) */

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

/** 변동 — 순위는 오른 계단 수, 퍼센트는 늘어난 비율. 색만으로 뜻을 전하지 않도록 화살표와 글자를 함께 둡니다 */
export function Change({ value, kind, against }: { value: number | null; kind: "rank" | "percent"; against?: string }) {
  const suffix = against ? <span className="pf-change-against">{against} 대비</span> : null;
  if (value === null) return <span className="pf-change is-flat">—</span>;
  if (value === 0) {
    return (
      <span className="pf-change is-flat">
        변동 없음{suffix}
      </span>
    );
  }
  const up = value > 0;
  const size = Math.abs(value);
  const amount = kind === "rank" ? `${size}` : `${size}%`;
  const words = kind === "rank" ? `${size}계단 ${up ? "오름" : "내림"}` : `${amount} ${up ? "늘어남" : "줄어듦"}`;
  return (
    <span className={`pf-change ${up ? "is-up" : "is-down"}`}>
      <span aria-hidden="true">
        {up ? "▲" : "▼"} {amount}
      </span>
      <span className="sr-only">{words}</span>
      {suffix}
    </span>
  );
}

/** 순위 칸 — undefined = 확인하지 않는 영역, null = 확인한 범위 안에 없음 */
export function RankCell({ rank }: { rank: number | null | undefined }) {
  if (rank === undefined) {
    return (
      <span className="pf-none" title="확인하지 않는 영역">
        —
      </span>
    );
  }
  if (rank === null) return <span className="pf-rank-out">순위 밖</span>;
  return (
    <span className={rank <= 10 ? "pf-rank is-top" : "pf-rank"}>
      {rank}
      <small>위</small>
    </span>
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

/** 채널 짧은 목록 — 개요 화면 */
export function ChannelList({ channels }: { channels: Channel[] }) {
  if (channels.length === 0) return <p className="pf-empty">등록한 채널이 없습니다.</p>;
  return (
    <ul className="pf-chlist">
      {channels.map((channel) => (
        <li key={channel.id}>
          <span className="pf-chlist-kind">{CHANNEL_LABEL[channel.kind]}</span>
          <span className="pf-chlist-url">{displayUrl(channel.url)}</span>
          <StatusBadge status={channel.status} />
        </li>
      ))}
    </ul>
  );
}

/** 순서대로 놓은 가로 막대 — 이름 · 막대 · 숫자 (값이 모두 글자로 보이므로 따로 마우스 안내는 두지 않음) */
export function BarList({ rows, unit = "" }: { rows: { label: string; value: number }[]; unit?: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  const total = rows.reduce((sum, row) => sum + row.value, 0) || 1;
  return (
    <ul className="pf-bars">
      {rows.map((row) => (
        <li key={row.label}>
          <span className="pf-bars-label">{row.label}</span>
          <span className="pf-bars-track" aria-hidden="true">
            <i style={{ width: `${(row.value / max) * 100}%` }} />
          </span>
          <span className="pf-bars-value">
            {num(row.value)}
            {unit}
            <small>{Math.round((row.value / total) * 100)}%</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 자료마다 가져오는 곳과 마지막 시각 */
export function FreshnessList({ items }: { items: Freshness[] }) {
  return (
    <ul className="pf-fresh">
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <span className="pf-fresh-source">{item.source}</span>
          <span className="pf-fresh-at">{item.at ? timeAgo(item.at) : "연결 전"}</span>
        </li>
      ))}
    </ul>
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
