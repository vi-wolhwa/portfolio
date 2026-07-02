import type { ReactNode } from 'react';

import type { OrgVariant } from '../../types';
import { OrgBadge } from '../sections/OrgBadge';
import { PageFooter } from './PageFooter';
import { ProjectHeader } from './ProjectHeader';

interface ProjectPageProps {
  title: ReactNode;
  /** 오른쪽 영문 라벨 (줄바꿈은 <br /> 로) */
  en: ReactNode;
  /** 소속 배지: 색 variant + 라벨 텍스트 */
  badge: { variant: OrgVariant; label: ReactNode };
  /** 배지 옆 한 줄 설명 */
  contextDetail: ReactNode;
  children: ReactNode;
  footerLeft?: string;
}

/**
 * 프로젝트의 첫 페이지 뼈대: 제목줄 + 소속줄 + 본문(children) + 푸터.
 * className "page project" 의 project 가 있어야 CSS 카운터가 번호를 1 올립니다.
 */
export function ProjectPage({ title, en, badge, contextDetail, children, footerLeft }: ProjectPageProps) {
  return (
    <section className="page project">
      <ProjectHeader title={title} en={en} />
      <div className="ctxrow">
        <OrgBadge variant={badge.variant}>{badge.label}</OrgBadge>
        <span className="ctx-detail">{contextDetail}</span>
      </div>
      {children}
      <PageFooter left={footerLeft} />
    </section>
  );
}
