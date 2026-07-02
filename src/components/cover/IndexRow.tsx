import type { IndexMeta } from '../../types';

/** 표지 목차의 한 행. 왼쪽 번호는 CSS 카운터(idx)가 자동으로 채웁니다. */
export function IndexRow({ meta }: { meta: IndexMeta }) {
  return (
    <div className="idx-row">
      <div className="idx-num" />
      <div className="idx-main">
        <div className="it">{meta.title}</div>
        <div className="is">{meta.summary}</div>
        <div className="ik">{meta.keywords}</div>
      </div>
      <div className="idx-right">
        <span className={`idx-org${meta.orgPersonal ? ' personal' : ''}`}>{meta.org}</span>
        <span className="idx-comp">{meta.competency}</span>
      </div>
    </div>
  );
}
