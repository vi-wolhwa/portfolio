import type { ReactNode } from 'react';

/** 표지 자기소개 문단. */
export function Intro({ children }: { children: ReactNode }) {
  return <p className="intro">{children}</p>;
}
