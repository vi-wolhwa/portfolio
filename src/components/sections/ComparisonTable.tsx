import type { ReactNode } from 'react';

export interface CmpCell {
  content: ReactNode;
  /** true 면 굵게 + 줄바꿈 없음 (첫 열, 채택 결론 열 등) */
  a?: boolean;
}

export interface CmpRow {
  cells: CmpCell[];
  /** true 면 초록 배경 = "채택한 선택지" */
  pick?: boolean;
}

/** 선택지 비교표. 헤더 개수와 각 행의 cells 개수를 맞춰 주세요. */
export function ComparisonTable({ headers, rows }: { headers: ReactNode[]; rows: CmpRow[] }) {
  return (
    <table className="cmp">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={row.pick ? 'pick' : undefined}>
            {row.cells.map((cell, j) => (
              <td key={j} className={cell.a ? 'a' : undefined}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
