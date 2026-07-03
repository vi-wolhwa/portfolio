import type { RefLink } from '@/types/portfolio';
import styles from './RefLinks.module.scss';

const KIND_LABEL: Record<RefLink['kind'], string> = {
  github: 'GITHUB',
  live: 'LIVE',
  blog: 'BLOG',
  video: 'VIDEO',
  docs: 'DOCS',
  design: 'DESIGN',
};

/** 프로젝트 페이지 상단에 고정되는 참고 링크 바. 1~3개 노출 권장. */
export function RefLinks({ refs }: { refs: RefLink[] }) {
  if (refs.length === 0) return null;

  return (
    <nav className={styles.bar} aria-label="참고 링크">
      {refs.map((ref) => (
        <a
          key={ref.url}
          className={styles.link}
          href={ref.url}
          target="_blank"
          rel="noreferrer noopener"
          data-kind={ref.kind}
        >
          <span className={styles.dot} aria-hidden />
          <span className={styles.kind}>{KIND_LABEL[ref.kind]}</span>
          <span className={styles.label}>{ref.label}</span>
          <svg className={styles.ext} viewBox="0 0 16 16" aria-hidden width="12" height="12">
            <path
              d="M6 3h7v7M13 3 4 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ))}
    </nav>
  );
}
