import type { ReactNode } from 'react';

export interface FlowStep {
  /** 단계 이름 (예: 사전검증) */
  name: ReactNode;
  /** 단계 설명 */
  text: ReactNode;
}

/** 가로로 나열되는 단계(프로세스) 카드들. */
export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flow">
      {steps.map((step, i) => (
        <div className="fstep" key={i}>
          <div className="fn">{step.name}</div>
          <div className="ft">{step.text}</div>
        </div>
      ))}
    </div>
  );
}
