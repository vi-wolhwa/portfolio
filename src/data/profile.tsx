import type { ReactNode } from 'react';

import { Highlight } from '../components/primitives/Highlight';
import type { ContactLink, SkillGroup } from '../types';

/**
 * 표지(1페이지)에 들어가는 "나"에 대한 정보. 여기 값만 바꾸면 표지가 바뀝니다.
 * 기술 스택 항목은 "언어·프레임워크·라이브러리·툴" 수준으로 적습니다
 * (startTransition 같은 개별 API는 프로젝트 본문에서 다룹니다).
 */
export const profile = {
  /** 상단 좌/우 작은 라벨 */
  kicker: ['Frontend Engineer · Portfolio', '2026 · React / TypeScript'] as ReactNode[],

  name: '남수민',
  role: 'Frontend Engineer',

  intro: (
    <>
      우아한테크코스 6기를 거쳐 카카오페이증권에서 수백만 MAU 규모 금융 서비스를 개발·운영했습니다.{' '}
      <Highlight>종목 정보 페이지 SSR 전환</Highlight>, <Highlight>프로필 서비스 MFE 이관</Highlight>,{' '}
      <Highlight>코드리뷰 생산성 도구 개발</Highlight>을 맡았고, 운영 환경을 상시 모니터링하며 데이터 정합성 결함{' '}
      <Highlight>13건</Highlight>을 선제적으로 발견해 해결했습니다. 문제는 근본 원인까지 추적하고, 반복되는 비효율은
      자동화하며, 기술적 근거로 제품 방향에도 의견을 냅니다. 필요한 도구가 없으면 직접 만듭니다 — 개인 오픈소스
      라이브러리 <Highlight>@audemodo/responsive-keepalive</Highlight>도 그렇게 나왔습니다.
    </>
  ),

  skills: [
    { label: 'Core', items: ['React', 'Next.js', 'TypeScript', 'JavaScript(ES6+)'] },
    { label: 'Testing', items: ['Jest', 'RTL', 'MSW', 'Playwright'] },
    { label: 'State', items: ['React Query', 'Zustand', 'Recoil'] },
    { label: 'DevOps', items: ['Webpack', 'AWS(S3/CloudFront)', 'GitHub Actions', 'Jenkins'] },
    { label: 'Styling', items: ['Emotion', 'Styled-components', 'Tailwind CSS'] },
    { label: '협업', items: ['Git/GitHub', 'Jira', 'Figma', 'Slack'] },
  ] as SkillGroup[],

  contact: [
    { label: 'github', href: 'https://github.com/vi-wolhwa', text: 'github.com/vi-wolhwa' },
    { label: 'email', href: 'mailto:cerezo00@naver.com', text: 'cerezo00@naver.com' },
    {
      label: 'npm',
      href: 'https://www.npmjs.com/package/@audemodo/responsive-keepalive',
      text: '@audemodo/responsive-keepalive',
    },
  ] as ContactLink[],

  indexHeading: {
    title: '대표 프로젝트',
    en: 'Selected Work',
    hint: '// 각 프로젝트 상세는 다음 장, 딥다이브는 링크로',
  },

  coverFooter: ['남수민 — Frontend Engineer Portfolio', 'github.com/vi-wolhwa'],
};
