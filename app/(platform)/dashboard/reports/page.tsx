import type { Metadata } from "next";
import { PageHead, Panel, Pending } from "@/components/platform/ui";
import { requireHall } from "@/lib/platform/dal";
import { getReports } from "@/lib/platform/data";
import { monthLabel } from "@/lib/platform/format";

export const metadata: Metadata = { title: "월간 리포트" };

/* 월간 리포트 — 달마다 하람이 정리해 올리는 운영 결과 (PDF 받기는 다음 단계에서 연결) */
export default async function ReportsPage() {
  const { hallId } = await requireHall();
  const reports = await getReports(hallId);

  return (
    <>
      <PageHead title="월간 리포트" lead="매달 운영 결과를 정리해서 올립니다." />
      <Panel>
        {reports.length ? (
          <ul className="pf-reports">
            {reports.map((report) => (
              <li key={report.month}>
                <div>
                  <strong>{monthLabel(report.month)}</strong>
                  <p>{report.summary}</p>
                </div>
                <span className={report.status === "ready" ? "pf-chip" : "pf-chip is-quiet"}>
                  {report.status === "ready" ? "발행" : "준비 중"}
                </span>
                <button type="button" className="pf-btn" disabled>
                  PDF 받기
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pf-empty">아직 올린 리포트가 없습니다.</p>
        )}
        <Pending>PDF 받기는 아직 연결하지 않았습니다.</Pending>
      </Panel>
    </>
  );
}
