import type { ReactNode } from 'react';

/**
 * 2페이지짜리 프로젝트의 "이어지는 페이지" 헤더. 번호를 새로 올리지 않고(=proj
 * 카운터를 증가시키지 않고) 앞 페이지와 같은 번호를 그대로 보여줍니다.
 */
export function ProjectHeaderCont({ title, tag = 'continued' }: { title: ReactNode; tag?: string }) {
  return (
    <div className="ph-cont">
      <span className="num" />
      <span className="ttl">{title}</span>
      <span className="tag">{tag}</span>
    </div>
  );
}
