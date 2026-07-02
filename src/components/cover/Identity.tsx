import type { ReactNode } from 'react';

/** 표지 이름 + 직무 줄. */
export function Identity({ name, role }: { name: ReactNode; role: ReactNode }) {
  return (
    <div className="id">
      <div className="nm">{name}</div>
      <div className="role">{role}</div>
    </div>
  );
}
