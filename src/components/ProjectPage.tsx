import type { Act as ActType, Metric, Project } from '@/types/portfolio';
import { RefLinks } from './RefLinks';
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

/** 한 막(문제/판단/결과)을 상태 레일 한 칸으로 렌더링한다. */
function ActRow({
  tone,
  act,
  metrics,
}: {
  tone: Tone;
  act: ActType;
  metrics?: Metric[];
}) {
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

        {metrics && metrics.length > 0 && (
          <div className={styles.metrics}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.mLabel}>{m.label}</span>
                <span className={styles.mValues}>
                  {m.before && <span className={styles.mBefore}>{m.before}</span>}
                  {m.before && <span className={styles.mArrow}>→</span>}
                  <span className={styles.mAfter}>{m.after}</span>
                </span>
                {m.delta && <span className={styles.mDelta}>{m.delta}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** 프로젝트 1개 = A4 한 페이지. */
export function ProjectPage({ project, pageIndex, total }: Props) {
  const { order, title, tagline, role, period, stack, refs } = project;

  return (
    <section className={`page ${styles.page}`}>
      <RefLinks refs={refs} />

      <header className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.order}>{String(order).padStart(2, '0')}</span>
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

      <div className={styles.story}>
        <ActRow tone="problem" act={project.problem} />
        <ActRow tone="decision" act={project.decision} />
        <ActRow tone="result" act={project.result} metrics={project.metrics} />
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
