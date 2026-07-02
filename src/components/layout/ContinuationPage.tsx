import type { ReactNode } from 'react';

import { PageFooter } from './PageFooter';
import { ProjectHeaderCont } from './ProjectHeaderCont';

interface ContinuationPageProps {
  title: ReactNode;
  tag?: string;
  children: ReactNode;
  footerLeft?: string;
}

/**
 * 프로젝트의 두 번째 페이지 뼈대. className 은 "page"만(project 없음) — 번호를
 * 새로 올리지 않고 이어지는 페이지로 취급됩니다.
 */
export function ContinuationPage({ title, tag, children, footerLeft }: ContinuationPageProps) {
  return (
    <section className="page">
      <ProjectHeaderCont title={title} tag={tag} />
      {children}
      <PageFooter left={footerLeft} />
    </section>
  );
}
