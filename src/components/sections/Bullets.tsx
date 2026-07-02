import type { ReactNode } from 'react';

export interface BulletItem {
  /** 굵게 표시되는 앞머리 (예: "순수 코어 분리 (SRP)") — 생략 가능 */
  lead?: ReactNode;
  /** 나머지 내용. lead 뒤에 이어붙으므로 보통 " — …" 형태로 시작 */
  content: ReactNode;
}

/** 코발트 사각 불릿 목록. */
export function Bullets({ items }: { items: BulletItem[] }) {
  return (
    <ul className="did">
      {items.map((item, i) => (
        <li key={i}>
          {item.lead != null && <span className="ld">{item.lead}</span>}
          {item.content}
        </li>
      ))}
    </ul>
  );
}
