import type { Act as ActType, Card as CardType, Project } from '@/types/portfolio';
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

/** 요약 카드 한 장. before 가 있으면 before → value, 없으면 value 만. 색은 부모(막)에서 상속. */
function Card({ card }: { card: CardType }) {
  return (
    <div className={styles.card}>
      <span className={styles.cLabel}>{card.label}</span>
      <span className={styles.cValueRow}>
        {card.before && <span className={styles.cBefore}>{card.before}</span>}
        {card.before && <span className={styles.cArrow}>→</span>}
        <span className={styles.cValue}>{card.value}</span>
        {card.delta && <span className={styles.cDelta}>{card.delta}</span>}
      </span>
      {card.note && <span className={styles.cNote}>{card.note}</span>}
    </div>
  );
}

/** 한 막(문제/판단/결과)을 상태 레일 한 칸으로. 카드가 있으면 하단에 요약 카드도 붙는다. */
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

        {act.cards && act.cards.length > 0 && (
          <div className={styles.cards}>
            {act.cards.map((c) => (
              <Card key={c.label} card={c} />
            ))}
          </div>
        )}
      </div>
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
          <div key={tone} className={styles.flowStep}>
            <div className={styles.flowCard} data-tone={tone}>
              <span className={styles.flowTag}>{FLOW_LABEL[tone]}</span>
              <p className={styles.flowText}>{text}</p>
            </div>
            {i < steps.length - 1 && (
              <span className={styles.flowArrow} aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 프로젝트 1개 = A4 한 페이지. id 는 목차 앵커 이동 대상. */
export function ProjectPage({ project, pageIndex, total }: Props) {
  const { id, order, org, title, tagline, role, period, stack, refs } = project;

  return (
    <section id={id} className={`page ${styles.page}`}>
      <RefLinks refs={refs} />

      <header className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.metaLeft}>
            <span className={styles.order}>{String(order).padStart(2, '0')}</span>
            <OrgTag org={org} />
          </span>
          <span className={styles.roleRow}>
            {role} <span className={styles.sep}>·</span> {period}
          </span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <ul className={styles.stack}>
          {stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </header>

      <div className={styles.body}>
        <div className={styles.story}>
          <ActRow tone="problem" act={project.problem} />
          <ActRow tone="decision" act={project.decision} />
          <ActRow tone="result" act={project.result} />
        </div>

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
