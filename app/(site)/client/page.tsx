import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { serviceGroups, services } from "@/lib/content";
import { CLIENT_SUMMARY, GROUP_BASIS, VAT_LABEL, priceText } from "@/lib/client-details";
import { hasClientAccess } from "@/lib/client-access";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
import LockedPanel from "@/components/client/LockedPanel";

/* 요청마다 렌더링 — 정적 HTML 로 만들면 CDN 에 캐시될 수 있어 잠금이 무의미해짐 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "고객 전용 서비스 상세",
  robots: { index: false, follow: false },
};

/* 고객 전용 — 견적서의 아홉 가지 서비스를 묶음별로 */
export default async function ClientHub() {
  if (!(await hasClientAccess(await cookies()))) return <LockedPanel />;

  return (
    <>
      <section className="cl-wrap cl-hub-intro">
        <h1>견적서에 담긴 아홉 가지 서비스</h1>
        <p>
          서비스마다 무엇을 맡고, 어떤 순서로 진행하고, 무엇을 받아보시는지 한 페이지씩 정리했습니다. 필요한 서비스를 골라 살펴보세요.
        </p>
        <dl className="cl-hub-facts">
          {serviceGroups.map((group) => (
            <div key={group.id}>
              <dt>{group.label}</dt>
              <dd>
                {services.filter((s) => s.group === group.id).length}가지 · {GROUP_BASIS[group.id]}
              </dd>
            </div>
          ))}
          <div>
            <dt>비용</dt>
            <dd>{VAT_LABEL}</dd>
          </div>
        </dl>
      </section>

      {serviceGroups.map((group) => (
        <section key={group.id} id={group.id} className="cl-wrap cl-hub-group" aria-labelledby={`cl-group-${group.id}`}>
          <header className="cl-hub-group-head">
            <h2 id={`cl-group-${group.id}`}>{group.label}</h2>
            <p>{group.description}</p>
          </header>
          <ol className="cl-hub-list">
            {services
              .filter((s) => s.group === group.id)
              .map((service) => (
                <li key={service.id}>
                  <Link href={`/client/${service.id}`} className="cl-hub-row">
                    <span className="cl-thumb" data-device={SPECIMEN_DEVICE[service.id]}>
                      <Specimen id={service.id} />
                    </span>
                    <span className="cl-hub-no">{service.no}</span>
                    <span className="cl-hub-text">
                      <strong>{service.title}</strong>
                      <em>{service.tagline}</em>
                      <span>{CLIENT_SUMMARY[service.id]}</span>
                    </span>
                    <span className="cl-hub-side">
                      <span className="cl-hub-price">{priceText(service)}</span>
                      <span className="cl-hub-go">자세히 보기</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </>
  );
}
