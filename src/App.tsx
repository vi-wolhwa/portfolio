import { CoverPage } from './components/cover/CoverPage';
import { projects } from './data/projects';

/**
 * 포트폴리오 전체 = 표지(CoverPage) + 프로젝트 페이지들.
 *
 * 프로젝트의 "순서 / 추가 / 제외"는 전부 src/data/projects.tsx 의 배열 하나로
 * 관리됩니다. 그 배열이 (1) 표지의 목차 순서와 (2) 아래 실제 페이지 순서를
 * 동시에 결정하므로, 배열만 바꾸면 번호(01, 02 …)까지 자동으로 맞춰집니다.
 */
export default function App() {
  return (
    <>
      <CoverPage />
      {projects.map((project) => {
        const Project = project.Component;
        return <Project key={project.id} />;
      })}
    </>
  );
}
