import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { Contact } from './Contact';
import { Identity } from './Identity';
import { Intro } from './Intro';
import { ProjectIndex } from './ProjectIndex';
import { SkillGroups } from './SkillGroups';

/** 1페이지: 자기소개 + 기술 스택 + 연락처 + 대표 프로젝트 목차. */
export function CoverPage() {
  return (
    <section className="cover">
      <div className="cv-top">
        {profile.kicker.map((k, i) => (
          <span className="k" key={i}>
            {k}
          </span>
        ))}
      </div>

      <Identity name={profile.name} role={profile.role} />
      <Intro>{profile.intro}</Intro>

      <div className="meta">
        <div>
          <div className="m-t">기술 스택 / Stack</div>
          <SkillGroups groups={profile.skills} />
        </div>
        <div>
          <div className="m-t">연락처 / Contact</div>
          <Contact links={profile.contact} />
        </div>
      </div>

      <ProjectIndex heading={profile.indexHeading} projects={projects} />

      <div className="cv-foot">
        {profile.coverFooter.map((l, i) => (
          <span className="l" key={i}>
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}
