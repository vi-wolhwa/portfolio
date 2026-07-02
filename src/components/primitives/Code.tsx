import type { ReactNode } from 'react';

/** 본문 속 인라인 코드/식별자 표기 (고정폭 폰트는 여기서만 적용). 사용: <Code>staleTime</Code> */
export function Code({ children }: { children: ReactNode }) {
  return <span className="code">{children}</span>;
}
