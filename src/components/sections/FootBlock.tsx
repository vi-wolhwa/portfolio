import type { ReactNode } from 'react';

export interface DeepLink {
  href: string;
  label: ReactNode;
}

interface FootBlockProps {
  /** 기술 태그 목록 */
  tags: ReactNode[];
  techLabel?: ReactNode;
  /** 딥다이브/저장소 링크 묶음 — 없으면 태그만 표시 */
  links?: { heading: ReactNode; items: DeepLink[] };
}

/** 프로젝트 하단 블록: 기술 태그 + (선택) 외부 링크 목록. */
export function FootBlock({ tags, techLabel = 'tech', links }: FootBlockProps) {
  return (
    <div className="pfoot-block">
      <div className="tags">
        <span className="lb">{techLabel}</span>
        {tags.map((t, i) => (
          <span className="tk" key={i}>
            {t}
          </span>
        ))}
      </div>
      {links && (
        <div className="links">
          <div className="lh">{links.heading}</div>
          <div className="row">
            {links.items.map((l, i) => (
              <a href={l.href} key={i}>
                <span className="ar">→</span>
                <span className="u">{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
