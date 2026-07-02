import type { ReactNode } from 'react';

export interface TroubleCard {
  /** 짙은 색 태그 pill (예: Hydration, MV3) — 생략 가능 */
  tag?: ReactNode;
  /** 카드 제목 (증상) */
  title: ReactNode;
  /** 카드 본문 (원인 → 해결). 해결 부분은 <span className="fix"> 로 강조 */
  body: ReactNode;
}

/** 2×2(기본) 트러블슈팅 카드 그리드. one 을 주면 1열. */
export function TroubleCards({ cards, one }: { cards: TroubleCard[]; one?: boolean }) {
  return (
    <div className={`tc${one ? ' one' : ''}`}>
      {cards.map((card, i) => (
        <div className="card" key={i}>
          <div className="ct">
            {card.tag != null && <span className="tag">{card.tag}</span>}
            {card.title}
          </div>
          <div className="cb">{card.body}</div>
        </div>
      ))}
    </div>
  );
}
