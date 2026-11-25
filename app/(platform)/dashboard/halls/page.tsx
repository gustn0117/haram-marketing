import type { Metadata } from "next";
import Link from "next/link";
import { Field, PageHead, Panel, Pending, StatTile } from "@/components/platform/ui";
import { requireAdmin } from "@/lib/platform/dal";
import { getChannels, listHalls } from "@/lib/platform/data";
import { dateLabel } from "@/lib/platform/format";

export const metadata: Metadata = { title: "웨딩홀 계정" };

/* 하람 화면 — 계약한 웨딩홀 목록과 계정 발급 (발급 · 저장은 다음 단계에서 연결) */
export default async function HallsPage() {
  await requireAdmin();
  const halls = await listHalls();
  const channelCounts = await Promise.all(halls.map(async (hall) => (await getChannels(hall.id)).length));
  const active = halls.filter((hall) => hall.status === "active").length;

  return (
    <>
      <PageHead
        title="웨딩홀 계정"
        lead="계약한 웨딩홀마다 아이디와 비밀번호를 발급하고, 홈페이지와 블로그 같은 채널을 등록합니다."
      />

      <dl className="pf-stats is-3">
        <StatTile label="계약 중" value={active} unit="곳" />
        <StatTile label="계약 종료" value={halls.length - active} unit="곳" />
        <StatTile label="등록한 채널" value={channelCounts.reduce((sum, count) => sum + count, 0)} unit="개" />
      </dl>

      <Panel title="웨딩홀 목록" note="웨딩홀 이름을 누르면 계정과 채널을 봅니다.">
        <div className="pf-table-wrap" role="region" aria-label="웨딩홀 목록" tabIndex={0}>
          <table className="pf-table">
            <thead>
              <tr>
                <th scope="col">웨딩홀</th>
                <th scope="col">지역</th>
                <th scope="col">아이디</th>
                <th scope="col" className="is-num">
                  계약 서비스
                </th>
                <th scope="col" className="is-num">
                  채널
                </th>
                <th scope="col">계약 기간</th>
                <th scope="col">상태</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((hall, i) => (
                <tr key={hall.id}>
                  <th scope="row">
                    <Link href={`/dashboard/halls/${hall.id}`}>{hall.name}</Link>
                  </th>
                  <td>{hall.region}</td>
                  <td>{hall.loginId}</td>
                  <td className="is-num" title={hall.services.join(", ")}>
                    {hall.services.length}개
                  </td>
                  <td className="is-num">{channelCounts[i]}개</td>
                  <td>
                    {dateLabel(hall.contractStart)} ~ {hall.contractEnd ? dateLabel(hall.contractEnd) : ""}
                  </td>
                  <td>
                    <span className={hall.status === "active" ? "pf-chip" : "pf-chip is-quiet"}>
                      {hall.status === "active" ? "계약 중" : "계약 종료"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="웨딩홀 추가" note="계정을 만들면 웨딩홀에 아이디와 임시 비밀번호를 전달합니다.">
        <form className="pf-form">
          <fieldset disabled>
            <legend className="sr-only">웨딩홀 추가</legend>
            <div className="pf-form-grid">
              <Field label="웨딩홀 이름">
                <input name="name" />
              </Field>
              <Field label="지역">
                <input name="region" />
              </Field>
              <Field label="아이디">
                <input name="loginId" autoComplete="off" />
              </Field>
              <Field label="임시 비밀번호">
                <input name="password" autoComplete="off" />
              </Field>
              <Field label="계약 시작일">
                <input name="contractStart" type="date" />
              </Field>
              <button type="submit" className="pf-btn is-solid">
                계정 발급
              </button>
            </div>
          </fieldset>
          <Pending />
        </form>
      </Panel>
    </>
  );
}
