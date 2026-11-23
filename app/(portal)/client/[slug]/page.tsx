import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { company, serviceGroups, services } from "@/lib/content";
import { DETAILS, QUOTE_URL, VAT_LABEL, billingBasis, priceOf } from "@/lib/client-details";
import PriceLines from "@/components/client/PriceLines";
import { hasClientAccess } from "@/lib/client-access";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
import SectionTabs from "@/components/client/SectionTabs";
import Typo from "@/components/client/Typo";
import LockedPanel from "@/components/client/LockedPanel";

type Params = { slug: string };

/* 요청마다 렌더링 — 정적 HTML 로 만들면 CDN 에 캐시될 수 있어 잠금이 무의미해짐 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  return {
    title: service ? `${service.title} · 고객 전용` : "고객 전용",
    robots: { index: false, follow: false },
  };
}

const TABS = [
  { id: "overview", label: "개요" },
  { id: "scope", label: "맡는 일" },
  { id: "flow", label: "진행 방식" },
  { id: "deliver", label: "결과물" },
  { id: "fit", label: "맞는 예식장" },
  { id: "faq", label: "자주 묻는 질문" },
];

function Panel({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="pt-panel" aria-labelledby={`pt-${id}`}>
      <header className="pt-panel-head">
        <h2 id={`pt-${id}`}>{title}</h2>
        {note && <p>{note}</p>}
      </header>
      {children}
    </section>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

const tel = `tel:${company.phone.replace(/\D/g, "")}`;

/* 서비스 상세 — 머리 · 비용 카드(따라옴) · 예시 화면 · 섹션 탭 · 섹션 패널 */
export default async function ClientServicePage({ params }: { params: Promise<Params> }) {
  if (!(await hasClientAccess(await cookies()))) return <LockedPanel />;

  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  const detail = DETAILS[slug];
  if (!service || !detail) notFound();

  const group = serviceGroups.find((g) => g.id === service.group)!;
  const price = priceOf(service);
  const index = services.indexOf(service);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <div className="pt-page">
      <div className="pt-detail">
        <header className="pt-head">
          <div className="pt-head-meta">
            <span className="pt-no">{service.no}</span>
            <span className="pt-chip">{group.label}</span>
            <span className="pt-chip is-quiet">{billingBasis(service)}</span>
          </div>
          <h1>{service.title}</h1>
          <p className="pt-head-en">{service.tagline}</p>
          <p className="pt-head-lead">
            <Typo text={detail.lead} />
          </p>
        </header>

        <aside className="pt-aside" aria-label="비용과 상담">
          <div className="pt-summary">
            <div className="pt-summary-info">
              <p className="pt-summary-label">비용</p>
              <p className="pt-summary-price">
                <PriceLines service={service} />
              </p>
              <p className="pt-summary-vat">{[VAT_LABEL, price.note].filter(Boolean).join(" · ")}</p>
              {price.notice && <p className="pt-summary-notice">{price.notice}</p>}
              <dl>
                {detail.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="pt-summary-cta">
              <a href={tel} className="pt-btn is-solid is-block">
                전화로 상담하기
              </a>
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className="pt-btn is-ghost is-block">
                견적서 보기
              </a>
              <Link href="/contact" className="pt-summary-link">
                상담 신청서 남기기
              </Link>
              <p className="pt-summary-foot">
                대표 {company.ceo} · {company.phone}
              </p>
            </div>
          </div>
        </aside>

        <div className="pt-body">
          <figure className="pt-specimen" data-device={SPECIMEN_DEVICE[service.id]}>
            <div className="pt-specimen-stage">
              <Specimen id={service.id} />
            </div>
            <figcaption>예시 화면입니다. 실제 구성은 예식장에 맞춰 정합니다.</figcaption>
          </figure>

          <SectionTabs tabs={TABS} />

          <Panel id="overview" title="개요">
            <div className="pt-overview">
              {detail.overview.map((paragraph) => (
                <p key={paragraph}>
                  <Typo text={paragraph} />
                </p>
              ))}
            </div>
          </Panel>

          <Panel id="scope" title="맡는 일" note={`${detail.scope.length}가지 일을 하람마케팅이 직접 맡습니다.`}>
            <div className="pt-scope">
              {detail.scope.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <div>
                    <p>
                      <Typo text={item.body} />
                    </p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel id="flow" title="진행 방식" note={detail.flowNote}>
            <ol className="pt-steps">
              {detail.flow.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>
                    <Typo text={step.body} />
                  </p>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel id="deliver" title="결과물">
            <div className="pt-deliver">
              {detail.deliver.map((list) => (
                <div key={list.title}>
                  <h3>{list.title}</h3>
                  <ul className="pt-checks">
                    {list.items.map((item) => (
                      <li key={item}>
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>

          <Panel id="fit" title="이런 예식장에 맞습니다">
            <ul className="pt-checks pt-fit">
              {detail.fit.map((item) => (
                <li key={item}>
                  <Check />
                  <span>
                    <Typo text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel id="faq" title="자주 묻는 질문">
            <div className="pt-faq">
              {detail.faq.map((item, faqIndex) => (
                <details key={item.q} open={faqIndex === 0}>
                  <summary>{item.q}</summary>
                  <p>
                    <Typo text={item.a} />
                  </p>
                </details>
              ))}
            </div>
          </Panel>

          <section className="pt-cta" aria-label="상담">
            <div>
              <strong>{service.title} 상담</strong>
              <p>예식장 상황을 들려주시면 필요한 범위와 비용을 함께 정리해 드립니다.</p>
            </div>
            <div className="pt-actions">
              <a href={tel} className="pt-btn is-solid">
                전화로 상담하기
              </a>
              <Link href="/contact" className="pt-btn is-ghost">
                상담 신청서
              </Link>
            </div>
          </section>
        </div>
      </div>

      <nav className="pt-pager" aria-label="다른 서비스">
        <Link href={`/client/${prev.id}`} className="pt-pager-prev">
          <small>이전 서비스</small>
          <span>
            {prev.no} {prev.title}
          </span>
        </Link>
        <Link href={`/client/${next.id}`} className="pt-pager-next">
          <small>다음 서비스</small>
          <span>
            {next.no} {next.title}
          </span>
        </Link>
      </nav>
    </div>
  );
}
