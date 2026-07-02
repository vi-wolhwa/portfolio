import type { SkillGroup } from '../../types';

/** 표지 기술 스택 (2열 그리드, 카테고리별 태그). */
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="skills">
      {groups.map((group, i) => (
        <div className="sk" key={i}>
          <span className="lb">{group.label}</span>
          <span className="vv">
            {group.items.map((item, j) => (
              <span className="tk" key={j}>
                {item}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
