import type { ReactNode } from 'react';
import type { OrgVariant } from '../../types';

/** 소속 배지. variant 에 따라 색이 달라집니다: personal(초록)·intern(코발트)·bootcamp(앰버). */
export function OrgBadge({ variant, children }: { variant: OrgVariant; children: ReactNode }) {
  return <span className={`org-badge ${variant}`}>{children}</span>;
}
