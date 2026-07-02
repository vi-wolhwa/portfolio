import type { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  /** 한글 소제목 (예: 문제, 결과) */
  title: ReactNode;
  /** 영문 보조 라벨 (예: Problem, Outcome) — 생략 가능 */
  en?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}

/** 프로젝트 본문의 한 섹션. 코발트 세로 막대 + 제목 + 내용. */
export function Section({ title, en, children, style }: SectionProps) {
  return (
    <div className="sec" style={style}>
      <div className="sh">
        <span className="t">{title}</span>
        {en != null && <span className="en">{en}</span>}
      </div>
      {children}
    </div>
  );
}
