import type { ReactNode } from 'react';

import type { ProjectEntry } from '../../types';
import { IndexRow } from './IndexRow';

interface ProjectIndexProps {
  heading: { title: ReactNode; en: ReactNode; hint: ReactNode };
  projects: ProjectEntry[];
}

/**
 * 표지 "대표 프로젝트" 목차. projects 배열을 그대로 순회하므로, 배열 순서 =
 * 목차 순서 = 실제 페이지 순서가 항상 일치합니다.
 */
export function ProjectIndex({ heading, projects }: ProjectIndexProps) {
  return (
    <>
      <div className="idx-h">
        <span className="t">{heading.title}</span>
        <span className="en">{heading.en}</span>
        <span className="hint">{heading.hint}</span>
      </div>
      <div className="index">
        {projects.map((project) => (
          <IndexRow key={project.id} meta={project.index} />
        ))}
      </div>
    </>
  );
}
