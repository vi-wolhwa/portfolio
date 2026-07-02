import type { ReactNode } from 'react';

export interface Metric {
  /** 큰 수치 (예: 70→85점) */
  value: ReactNode;
  /** 수치 뒤 작은 단위 (예: " deps") — 앞 공백 포함해서 넘기면 됩니다 */
  unit?: ReactNode;
  /** true 면 초록색 (핵심 성과 강조) */
  green?: boolean;
  /** 아래 설명 라벨 */
  label: ReactNode;
}

/** 결과 수치 스트립. 3~4개가 한 줄에 균등 배치됩니다. */
export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="mets">
      {metrics.map((m, i) => (
        <div className="met" key={i}>
          <div className={`mv${m.green ? ' g' : ''}`}>
            {m.value}
            {m.unit != null && <small>{m.unit}</small>}
          </div>
          <div className="ml">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
