import { profile } from './data/profile';
import { projects } from './data/projects';
import { usePageGuard } from './hooks/usePageGuard';
import { Cover } from './components/Cover';
import { ProjectPage } from './components/ProjectPage';
import { PrintToolbar } from './components/PrintToolbar';

export default function App() {
  usePageGuard();

  // 커버(1) + 프로젝트 N
  const total = projects.length + 1;

  return (
    <>
      <PrintToolbar />
      <main className="pages">
        <Cover profile={profile} projects={projects} pageIndex={1} total={total} />
        {projects.map((project, i) => (
          <ProjectPage key={project.id} project={project} pageIndex={i + 2} total={total} />
        ))}
      </main>
    </>
  );
}
