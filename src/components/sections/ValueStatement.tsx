import type { ReactNode } from 'react';

/** 프로젝트 상단 한 줄 요약(코발트 세로 막대 강조 박스). */
export function ValueStatement({ children }: { children: ReactNode }) {
  return <div className="val">{children}</div>;
}
