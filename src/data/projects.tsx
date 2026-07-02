import type { ProjectEntry } from '../types';

import { CodeReviewProject } from '../projects/CodeReviewProject';
import { CodeZapProject } from '../projects/CodeZapProject';
import { MfeProject } from '../projects/MfeProject';
import { OssProject } from '../projects/OssProject';
import { ReliabilityProject } from '../projects/ReliabilityProject';
import { SsrProject } from '../projects/SsrProject';

/**
 * ★ 포트폴리오의 순서·구성은 이 배열 하나로 결정됩니다. ★
 *
 *  - 순서 바꾸기 : 배열 요소의 순서를 바꾸면 목차와 페이지 번호가 함께 갱신됩니다.
 *  - 프로젝트 빼기 : 해당 요소를 주석 처리하거나 삭제하세요.
 *  - 프로젝트 추가 : src/projects/ 에 새 컴포넌트를 만들고 아래에 한 줄 추가하세요.
 *
 * 각 요소의 index 는 "표지 목차"에 쓰이고, Component 는 "실제 상세 페이지"입니다.
 */
export const projects: ProjectEntry[] = [
  {
    id: 'oss',
    Component: OssProject,
    index: {
      title: '@audemodo/responsive-keepalive',
      summary: '브레이크포인트마다 다른 컴포넌트 트리를 상태 손실 없이 렌더링하는 React 19.2 라이브러리.',
      keywords: <>React 19.2 &lt;Activity&gt; · TypeScript · tsup · 97 tests</>,
      org: '개인 프로젝트',
      orgPersonal: true,
      competency: '학습 · 오픈소스',
    },
  },
  {
    id: 'ssr',
    Component: SsrProject,
    index: {
      title: '종목 정보 페이지 SSR 전환',
      summary: 'CSR→SSR 전환. 통신 라이브러리 표준 수립부터 렌더링 파이프라인 4단 최적화·검증까지.',
      keywords: 'Next.js · React-query · SSR · Streaming',
      org: '카카오페이증권',
      competency: '성능 · 아키텍처',
    },
  },
  {
    id: 'mfe',
    Component: MfeProject,
    index: {
      title: '프로필 서비스 MFE 이관',
      summary: '모노레포 이관. "통제 가능한 부채" 의사결정, MSW로 API 공동 설계, 접근제어 모듈 아키텍처.',
      keywords: 'MicroFrontend · monorepo · MSW · React-query',
      org: '카카오페이증권',
      competency: '판단 · 협업 · 설계',
    },
  },
  {
    id: 'code-review',
    Component: CodeReviewProject,
    index: {
      title: '코드리뷰 생산성 도구 (크롬 익스텐션)',
      summary: '리뷰 병목을 팀 정책으로 개선하고, 플랫폼 한계는 크롬 익스텐션을 직접 만들어 배포.',
      keywords: 'Chrome Extension (MV3) · GitHub API · React',
      org: '카카오페이증권',
      competency: '오너십 · shipping',
    },
  },
  {
    id: 'reliability',
    Component: ReliabilityProject,
    index: {
      title: '서비스 안정성 오너십',
      summary: '사전검증·배포·상시 모니터링으로 데이터 정합성 결함 13건을 선제적으로 발견해 해결.',
      keywords: 'TradingView · WebSocket · Grafana · Jenkins',
      org: '카카오페이증권',
      competency: '안정성 · 트러블슈팅',
    },
  },
  {
    id: 'codezap',
    Component: CodeZapProject,
    index: {
      title: '코드잽 (CodeZap)',
      summary: '소스코드 저장·공유 플랫폼. CI/CD 자동화, 번들·CLS 최적화, 웹 접근성까지 직접 구현.',
      keywords: 'React · AWS · GitHub Actions · Playwright',
      org: '우아한테크코스',
      competency: '기본기 · 협업',
    },
  },
];
