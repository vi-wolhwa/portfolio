import type { Profile, Project } from '@/types/portfolio';
import styles from './Cover.module.scss';

interface Props {
  profile: Profile;
  projects: Project[];
  pageIndex: number;
  total: number;
}

/** 첫 페이지 — 개인 정보(히어로) + 목차. 목차는 projects 를 단일 출처로 생성한다. */
export function Cover({ profile, projects, pageIndex, total }: Props) {
  return (
    <section className={`cover ${styles.cover}`}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{profile.role}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.thesis}>{profile.thesis}</p>

        <ul className={styles.keywords}>
          {profile.keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <ul className={styles.contacts}>
          {profile.contacts.map((c) => (
            <li key={c.label}>
              <span className={styles.cLabel}>{c.label}</span>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noreferrer noopener">
                  {c.value}
                </a>
              ) : (
                <span>{c.value}</span>
              )}
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.tocWrap}>
        <div className={styles.tocHead}>
          <h2>Contents</h2>
          <span className={styles.tocNote}>각 프로젝트는 문제 → 판단 → 결과 순서로 읽힙니다</span>
        </div>

        <ol className={styles.toc}>
          {projects.map((p) => (
            <li key={p.id} className={styles.tocItem}>
              <span className={styles.tocOrder}>{String(p.order).padStart(2, '0')}</span>
              <span className={styles.tocBody}>
                <span className={styles.tocTitle}>{p.title}</span>
                <span className={styles.tocLead}>{p.problem.lead}</span>
              </span>
              <span className={styles.tocPage}>p.{p.order + 1}</span>
            </li>
          ))}
        </ol>
      </div>

      <footer className={styles.foot}>
        <span className={styles.legend}>
          <i data-tone="problem" /> 문제
          <i data-tone="decision" /> 판단
          <i data-tone="result" /> 결과
        </span>
        <span className={styles.pageNo}>
          {String(pageIndex).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </section>
  );
}
