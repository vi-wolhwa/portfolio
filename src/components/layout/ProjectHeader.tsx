import type { ReactNode } from 'react';

/**
 * 프로젝트 페이지 상단 제목 줄. 왼쪽 번호(01, 02 …)는 CSS 카운터(proj)가
 * 자동으로 채우므로 직접 쓰지 않습니다. en 은 오른쪽 영문 라벨(줄바꿈 가능).
 */
export function ProjectHeader({ title, en }: { title: ReactNode; en: ReactNode }) {
  return (
    <div className="ph">
      <span className="num" />
      <span className="ttl">{title}</span>
      <span className="en">{en}</span>
    </div>
  );
}
