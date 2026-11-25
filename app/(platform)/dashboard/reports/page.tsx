import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { EmptyState, PageTitle, Pending, REPORT_ICON } from "@/components/hall/ui";
import { requireHall } from "@/lib/platform/dal";
import { getReports } from "@/lib/platform/data";
import { monthLabel } from "@/lib/platform/format";

export const metadata: Metadata = { title: "월간 리포트" };
export const viewport: Viewport = { themeColor: "#ffffff" };

/* 월간 리포트 — 달마다 하람이 정리해 올리는 운영 결과 (PDF 받기는 다음 단계에서 연결) */
export default async function ReportsPage() {
  const { hallId } = await requireHall();
  const reports = await getReports(hallId);

  return (
    <>
      <PageTitle title="월간 리포트" count={`리포트 ${reports.length}개`} />
      {reports.length ? (
        <ul className="hp-reports">
          {reports.map((report) => {
            const ready = report.status === "ready";
            return (
              <li key={report.month} className={ready ? "hp-report" : "hp-report is-preparing"}>
                <span className="hp-report-art">
                  <Image src={REPORT_ICON} alt="" width={64} height={64} />
                </span>
                <div>
                  <span className={ready ? "hp-tag is-dark" : "hp-tag is-line"}>{ready ? "발행" : "준비 중"}</span>
                  <h2>{monthLabel(report.month)} 리포트</h2>
                  <p>{report.summary}</p>
                </div>
                {ready ? (
                  <button type="button" className="hp-btn is-line" disabled>
                    PDF 받기
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState>아직 올린 리포트가 없습니다.</EmptyState>
      )}
      <Pending>PDF 받기는 아직 연결하지 않았습니다.</Pending>
    </>
  );
}
