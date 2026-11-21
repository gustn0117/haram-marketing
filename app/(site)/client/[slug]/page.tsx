import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { company, serviceGroups, services } from "@/lib/content";
import { DETAILS, QUOTE_URL, VAT_LABEL, priceText } from "@/lib/client-details";
import { hasClientAccess } from "@/lib/client-access";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
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

function Section({ title, note, className = "", children }: { title: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <section className={`cl-wrap cl-section ${className}`}>
      <header className="cl-section-head">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </header>
      <div className="cl-section-body">{children}</div>
    </section>
  );
}

const phoneHref = `tel:${company.phone.replace(/\D/g, "")}`;
const phoneLabel = company.phone.replace(/-/g, " · ");

export default async function ClientServicePage({ params }: { params: Promise<Params> }) {
  if (!(await hasClientAccess(await cookies()))) return <LockedPanel />;

  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  const detail = DETAILS[slug];
  if (!service || !detail) notFound();

  const group = serviceGroups.find((g) => g.id === service.group)!;
  const price = priceText(service);
  const index = services.indexOf(service);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const priceGuide = service.priceNote
    ? "키워드의 검색량과 경쟁 정도에 따라 비용이 달라집니다. 함께 진행할 키워드를 정한 뒤 키워드별로 견적을 안내드립니다."
    : `${service.group === "marketing" ? "월 단위로 운영하며" : "1식 기준으로 제작하며"}, 예식장의 규모와 필요한 범위를 확인한 뒤 맞춤 견적을 드립니다.`;

  return (
    <article>
      <section className="cl-wrap cl-hero">
        <div className="cl-hero-text">
          <nav className="cl-crumbs" aria-label="현재 위치">
            <Link href="/client">서비스 전체</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/client#${group.id}`}>{group.label}</Link>
          </nav>
          <p className="cl-hero-no">{service.no}</p>
          <h1>{service.title}</h1>
          <p className="cl-hero-en">{service.tagline}</p>
          <p className="cl-hero-lead">
            <Typo text={detail.lead} />
          </p>
          <dl className="cl-specs">
            <div>
              <dt>비용</dt>
              <dd>
                {price}
                <small>{VAT_LABEL}</small>
              </dd>
            </div>
            {detail.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="cl-plate" data-device={SPECIMEN_DEVICE[service.id]}>
          <div className="cl-plate-stage">
            <Specimen id={service.id} />
          </div>
          <figcaption>예시 화면 — 실제 구성은 예식장에 맞춰 설계합니다.</figcaption>
        </figure>
      </section>

      <Section title="개요" className="cl-overview">
        {detail.overview.map((paragraph) => (
          <p key={paragraph}>
            <Typo text={paragraph} />
          </p>
        ))}
      </Section>

      <Section title="필요한 이유">
        <div className="cl-why">
          {detail.why.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <Typo text={item.body} />
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="맡는 일" note={`${detail.scope.length}가지 일을 하람마케팅이 직접 맡습니다.`}>
        <div className="cl-scope">
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
      </Section>

      <Section title="진행 방식" note={detail.flowNote}>
        <ol className="cl-flow">
          {detail.flow.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>
                <Typo text={step.body} />
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="결과물">
        <div className="cl-deliver">
          {detail.deliver.map((list) => (
            <div key={list.title}>
              <h3>{list.title}</h3>
              <ul>
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="이런 예식장에 맞습니다">
        <ul className="cl-fit">
          {detail.fit.map((item) => (
            <li key={item}>
              <Typo text={item} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="자주 묻는 질문">
        <div className="cl-faq">
          {detail.faq.map((item, faqIndex) => (
            <details key={item.q} open={faqIndex === 0}>
              <summary>{item.q}</summary>
              <p>
                <Typo text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </Section>

      <div className="cl-price-band">
        <section className="cl-wrap cl-price" aria-label="비용과 상담">
          <div>
            <h2>비용</h2>
            <p className="cl-price-value">{price}</p>
            <p>
              {priceGuide} 견적은 {VAT_LABEL} 기준으로 안내드립니다.
            </p>
            <div className="cl-price-links">
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className="cl-btn">
                견적서 보기
              </a>
            </div>
          </div>
          <div>
            <h2>상담 문의</h2>
            <a className="cl-call" href={phoneHref}>
              {phoneLabel}
            </a>
            <p>대표 {company.ceo}이 직접 받습니다. 예식장 상황을 들려주시면 필요한 범위와 비용을 함께 정리해 드립니다.</p>
            <div className="cl-price-links">
              <a href={phoneHref} className="cl-btn is-solid">
                전화로 상담하기
              </a>
              <Link href="/contact" className="cl-btn">
                상담 신청서 남기기
              </Link>
            </div>
          </div>
        </section>
      </div>

      <nav className="cl-wrap cl-pager" aria-label="다른 서비스">
        <Link href={`/client/${prev.id}`} className="cl-pager-prev">
          <small>이전 서비스</small>
          <span>
            {prev.no} {prev.title}
          </span>
        </Link>
        <Link href={`/client/${next.id}`} className="cl-pager-next">
          <small>다음 서비스</small>
          <span>
            {next.no} {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
