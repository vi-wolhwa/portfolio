import { Fragment } from 'react';
import type {
  Act as ActType,
  Highlight as HighlightType,
  Project,
  ServiceOverview,
} from '@/types/portfolio';
import { RefLinks } from './RefLinks';
import { OrgTag } from './OrgTag';
import styles from './ProjectPage.module.scss';

interface Props {
  project: Project;
  pageIndex: number;
  total: number;
}

type Tone = 'problem' | 'decision' | 'result';

const TONE_LABEL: Record<Tone, string> = {
  problem: '문제 · 배경',
  decision: '고민 & 의사결정',
  result: '결과',
};

const FLOW_LABEL: Record<Tone, string> = {
  problem: '문제',
  decision: '판단',
  result: '결과',
};

/** 한 막(문제/판단/결과)을 상태 레일 한 칸으로. 정량 수치는 points 문장 안에 녹여 쓴다. */
function ActRow({ tone, act }: { tone: Tone; act: ActType }) {
  return (
    <div className={styles.act} data-tone={tone}>
      <div className={styles.rail}>
        <span className={styles.node} aria-hidden />
      </div>

      <div className={styles.content}>
        <div className={styles.actHead}>
          <span className={styles.badge}>{TONE_LABEL[tone]}</span>
          {act.heading && <span className={styles.heading}>{act.heading}</span>}
        </div>

        <p className={styles.lead}>{act.lead}</p>

        {act.points.length > 0 && (
          <ul className={styles.points}>
            {act.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** [story] 문제 → 판단 → 결과 3막 본문. */
function StoryBody({ project }: { project: Project }) {
  return (
    <div className={styles.story}>
      {project.problem && <ActRow tone="problem" act={project.problem} />}
      {project.decision && <ActRow tone="decision" act={project.decision} />}
      {project.result && <ActRow tone="result" act={project.result} />}
    </div>
  );
}

/** [service] 서비스 개요 — 무엇을 만든 서비스인지 + 규모·역할. */
function OverviewBanner({ overview }: { overview: ServiceOverview }) {
  return (
    <div className={styles.overview}>
      <div className={styles.overviewMain}>
        <p className={styles.overviewSummary}>{overview.summary}</p>
        <ul className={styles.overviewFacts}>
          {overview.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** [service] 독립 기술 하이라이트 — story 의 톤 도트·배지 언어를 물려받은 구분선 리스트 한 줄. */
function HighlightRow({ item }: { item: HighlightType }) {
  return (
    <div className={styles.hl} data-tone={item.tone ?? 'accent'}>
      <div className={styles.hlRail}>
        <span className={styles.hlNode} aria-hidden />
      </div>
      <div className={styles.hlBody}>
        <span className={styles.hlBadge}>{item.label}</span>
        <p className={styles.hlProblem}>{item.problem}</p>
        <p className={styles.hlSolution}>{item.solution}</p>
      </div>
    </div>
  );
}

/** [service] 서비스 개요 + 기술 하이라이트 리스트 본문. */
function ServiceBody({ project }: { project: Project }) {
  return (
    <div className={styles.service}>
      {project.overview && <OverviewBanner overview={project.overview} />}
      {project.highlights && project.highlights.length > 0 && (
        <div className={styles.hlList}>
          {project.highlights.map((h) => (
            <HighlightRow key={h.label} item={h} />
          ))}
        </div>
      )}
    </div>
  );
}

/** 하단 flow 요약 — 문제(빨강) → 판단(파랑) → 결과(초록) 카드를 연결해 핵심만 보여준다. */
function FlowStrip({ flow }: { flow: NonNullable<Project['flow']> }) {
  const steps: [Tone, string][] = [
    ['problem', flow.problem],
    ['decision', flow.decision],
    ['result', flow.result],
  ];

  return (
    <div className={styles.flow}>
      <span className={styles.flowEyebrow}>한눈에 보기</span>
      <div className={styles.flowRow}>
        {steps.map(([tone, text], i) => (
          <Fragment key={tone}>
            <div className={styles.flowCard} data-tone={tone}>
              <span className={styles.flowTag}>{FLOW_LABEL[tone]}</span>
              <p className={styles.flowText}>{text}</p>
            </div>
            {i < steps.length - 1 && (
              <span className={styles.flowArrow} aria-hidden>
                →
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** 프로젝트 1개 = A4 한 페이지. id 는 목차 앵커 이동 대상. */
export function ProjectPage({ project, pageIndex, total }: Props) {
  const { id, order, org, title, tagline, period, stack, refs } = project;
  const isService = project.variant === 'service';

  return (
    <section id={id} className={`page ${styles.page}`}>
      <header className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.metaLeft}>
            <span className={styles.order}>{String(order).padStart(2, '0')}</span>
            <OrgTag org={org} />
            <ul className={styles.stack}>
              {stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </span>
          <span className={styles.roleRow}>{period}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{tagline}</p>
        {project.description && <p className={styles.description}>{project.description}</p>}
        {refs.length > 0 && (
          <div className={styles.refsRow}>
            <RefLinks refs={refs} />
          </div>
        )}
      </header>

      <div className={styles.body}>
        {isService ? <ServiceBody project={project} /> : <StoryBody project={project} />}
        {project.flow && <FlowStrip flow={project.flow} />}
      </div>

      <footer className={styles.foot}>
        <span className={styles.footName}>남수민 · Frontend Portfolio</span>
        <span className={styles.pageNo}>
          {String(pageIndex).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </section>
  );
}
