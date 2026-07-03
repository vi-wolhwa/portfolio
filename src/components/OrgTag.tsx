import type { CSSProperties } from 'react';
import { organizations } from '@/data/organizations';
import styles from './OrgTag.module.scss';

/** 조직 태그. 색은 organizations 정의값(fg/bg)을 CSS 변수로 주입해 커스텀한다. */
export function OrgTag({ org, size = 'md' }: { org: string; size?: 'sm' | 'md' }) {
  const o = organizations[org];
  if (!o) return null;

  return (
    <span
      className={`${styles.tag} ${size === 'sm' ? styles.sm : ''}`}
      style={{ '--fg': o.fg, '--bg': o.bg } as CSSProperties}
    >
      <span className={styles.dot} aria-hidden />
      {o.label}
    </span>
  );
}
