import type { Profile, Project } from '@/types/portfolio';
import { OrgTag } from './OrgTag';
import styles from './Cover.module.scss';

interface Props {
  profile: Profile;
  projects: Project[];
  pageIndex: number;
  total: number;
}

/** 첫 페이지 — (좌) 개인 정보 / (우) 사진·링크 2단 + 목차. 목차는 projects 를 단일 출처로 생성. */
export function Cover({ profile, projects, pageIndex, total }: Props) {
  return (
    <section className={`cover ${styles.cover}`}>
      <div className={styles.top}>
        {/* 좌: 이름 · 소개 · 키워드 */}
        <div className={styles.identity}>
          <p className={styles.eyebrow}>{profile.role}</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <div className={styles.thesisWrap}>
            {profile.thesis.map((t, i) => (
              <p key={i} className={styles.thesis}>
                {t}
              </p>
            ))}
          </div>
          <ul className={styles.keywords}>
            {profile.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        {/* 우: 사진(옵션) · 링크 */}
        <aside className={styles.aside}>
          {profile.showPhoto && profile.photoUrl && (
            <img className={styles.photo} src={profile.photoUrl} alt={`${profile.name} 프로필`} />
          )}
          <ul className={styles.contacts}>
            {profile.contacts.map((c) => (
              <li key={c.label}>
                <span className={styles.cLabel}>{c.label}</span>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer noopener">
                    {c.value}
                  </a>
                ) : (
                  <span className={styles.cValue}>{c.value}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* 목차 */}
      <div className={styles.tocWrap}>
        <div className={styles.tocHead}>
          <h2>Contents</h2>
          <span className={styles.tocNote}>제목을 누르면 해당 프로젝트로 이동합니다</span>
        </div>

        <ol className={styles.toc}>
          {projects.map((p) => (
            <li key={p.id} className={styles.tocItem}>
              <span className={styles.tocOrder}>{String(p.order).padStart(2, '0')}</span>
              <span className={styles.tocBody}>
                <span className={styles.tocTitleRow}>
                  <a className={styles.tocTitle} href={`#${p.id}`}>
                    {p.title}
                  </a>
                </span>
                <span className={styles.tocLead}>{p.tagline}</span>
              </span>
              <OrgTag org={p.org} size="sm" />
            </li>
          ))}
        </ol>
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
