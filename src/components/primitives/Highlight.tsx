import type { ReactNode } from 'react';

/** 초록색 형광펜 강조. 사용: <Highlight>강조할 문구</Highlight> */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="hl">{children}</span>;
}
