import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { company, processSteps, serviceGroups, services } from "@/lib/content";
import { CLIENT_SUMMARY, GROUP_BASIS, QUOTE_URL, VAT_LABEL, priceText } from "@/lib/client-details";
import { hasClientAccess } from "@/lib/client-access";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
import LockedPanel from "@/components/client/LockedPanel";

/* 요청마다 렌더링 — 정적 HTML 로 만들면 CDN 에 캐시될 수 있어 잠금이 무의미해짐 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "고객 전용 서비스 상세",
  robots: { index: false, follow: false },
};

/** 카드 너비 — 제작 · 개발 5종이 4칸 그리드에 두 줄로 꽉 차도록 (2+1+1 / 2+2) */
const WIDE = new Set(["crm", "fair", "membership"]);

/* 고객 전용 대시보드 — 소개 · 요약 · 서비스 카드 · 진행 방식 */
export default async function ClientDashboard() {
  if (!(await hasClientAccess(await cookies()))) return <LockedPanel />;

  const tel = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <div className="pt-page">
      <section className="pt-welcome" aria-labelledby="pt-welcome-title">
        <div className="pt-welcome-main">
          <p className="pt-kicker">견적서를 받은 분께만 공개하는 서비스 안내</p>
          <h1 id="pt-welcome-title">견적서에 담긴 아홉 가지 서비스</h1>
          <p className="pt-welcome-lead">
            서비스마다 무엇을 맡고, 어떤 순서로 진행하고, 무엇을 받아보시는지 한 페이지씩 정리했습니다. 왼쪽 메뉴나 아래 카드에서 필요한 서비스를 골라 보세요.
          </p>
          <div className="pt-actions">
            <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className="pt-btn is-solid">
              견적서 열기
            </a>
            <a href={tel} className="pt-btn is-ghost">
              전화 상담 {company.phone}
            </a>
          </div>
        </div>
        <dl className="pt-stats">
          <div>
            <dt>전체 서비스</dt>
            <dd>
              {services.length}
              <small>가지</small>
            </dd>
            <p>마케팅 대행 · 제작 개발</p>
          </div>
          {serviceGroups.map((group) => (
            <div key={group.id}>
              <dt>{group.label}</dt>
              <dd>
                {services.filter((service) => service.group === group.id).length}
                <small>가지</small>
              </dd>
              <p>{GROUP_BASIS[group.id]}</p>
            </div>
          ))}
          <div>
            <dt>비용 기준</dt>
            <dd className="is-text">{VAT_LABEL}</dd>
            <p>금액은 견적서 기준</p>
          </div>
        </dl>
      </section>

      {serviceGroups.map((group) => {
        const items = services.filter((service) => service.group === group.id);
        return (
          <section key={group.id} id={group.id} className="pt-group" aria-labelledby={`pt-group-${group.id}`}>
            <header className="pt-group-head">
              <div>
                <h2 id={`pt-group-${group.id}`}>
                  {group.label}
                  <span>{items.length}</span>
                </h2>
                <p>{group.description}</p>
              </div>
              <span className="pt-chip">{GROUP_BASIS[group.id]}</span>
            </header>
            <div className="pt-cards">
              {items.map((service) => (
                <Link
                  key={service.id}
                  href={`/client/${service.id}`}
                  className={`pt-card${WIDE.has(service.id) ? " is-wide" : ""}`}
                >
                  <span className="pt-card-thumb" data-device={SPECIMEN_DEVICE[service.id]}>
                    <Specimen id={service.id} />
                  </span>
                  <span className="pt-card-body">
                    <span className="pt-card-meta">
                      <span>{service.no}</span>
                      <span className="pt-chip is-quiet">{priceText(service)}</span>
                    </span>
                    <strong>{service.title}</strong>
                    <em>{service.tagline}</em>
                    <span className="pt-card-summary">{CLIENT_SUMMARY[service.id]}</span>
                    <span className="pt-card-go">자세히 보기</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="pt-tracks" aria-labelledby="pt-tracks-title">
        <header className="pt-group-head">
          <div>
            <h2 id="pt-tracks-title">진행 방식</h2>
            <p>마케팅 대행은 매달 같은 순서로 운영하고, 제작·개발은 오픈까지 네 단계로 진행합니다.</p>
          </div>
        </header>
        <div className="pt-track-grid">
          {serviceGroups.map((group) => (
            <div key={group.id} className="pt-track">
              <p className="pt-track-label">
                {group.label}
                <span>{GROUP_BASIS[group.id]}</span>
              </p>
              <ol>
                {processSteps[group.id].map((step) => (
                  <li key={step.no}>
                    <span className="pt-step-no">{step.no}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
