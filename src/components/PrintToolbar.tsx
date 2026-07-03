import styles from './PrintToolbar.module.scss';

/** 화면 전용 인쇄 바. 인쇄 시에는 .no-print 규칙으로 숨겨진다. */
export function PrintToolbar() {
  return (
    <div className={`${styles.toolbar} no-print`}>
      <span className={styles.hint}>A4 · 210×297mm</span>
      <button className={styles.button} type="button" onClick={() => window.print()}>
        PDF로 저장 / 인쇄
      </button>
    </div>
  );
}
