import type { Project } from '@/types/portfolio';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  프로젝트 데이터 (6개)
 * ─────────────────────────────────────────────────────────────────────────────
 *  01, 02 는 "완성 예시" 입니다. 톤과 밀도를 참고하세요.
 *   - 01: 의사결정형 (선택지 → 기준 → 결정)
 *   - 02: 트러블슈팅형 (증상 → 가설·검증 → 해결)
 *  03~06 은 그대로 채워 넣는 "빈 템플릿" 입니다.
 *
 *  글 작성 원칙(요약):
 *   1) tagline — 3초 안에 '무엇을·왜'가 읽혀야 한다.
 *   2) problem.lead — 이게 왜 문제였는지 상황·비용을 구체적으로. 기술 용어는 최소.
 *   3) decision.lead — '왜 그렇게 판단했는가'가 핵심. 대안을 버린 이유까지.
 *   4) result.lead — 두괄식 성과 먼저. 지표는 metrics(before→after)로.
 *   5) 각 lead 1줄 + points 2~4개. 한 페이지(297mm)를 넘기지 말 것.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  // ── 01 · 의사결정형 예시 ────────────────────────────────────────────────────
  {
    id: 'dashboard-ssr',
    order: 1,
    title: '결제 대시보드 초기 로딩 최적화',
    tagline: '첫 화면 로딩 지연으로 이탈하던 사용자를, 렌더링 전략을 바꿔 붙잡았습니다.',
    role: 'Frontend · 3인',
    period: '2024.03 – 2024.06',
    stack: ['Next.js', 'React', 'TypeScript', 'React Query', 'Vitest'],
    refs: [
      { label: 'GitHub', url: 'https://github.com/yourname/repo', kind: 'github' },
      { label: 'Live', url: 'https://example.com', kind: 'live' },
      { label: '회고', url: 'https://yourblog.dev/post', kind: 'blog' },
    ],
    problem: {
      lead: '데이터가 많은 첫 화면이 빈 상태로 오래 머물러, 진입 단계에서 사용자가 떠나고 있었습니다.',
      points: [
        '거래·잔액·차트를 클라이언트에서 순차 요청하다 보니 첫 유의미한 화면까지 체감 지연이 컸습니다.',
        '스켈레톤만 길게 노출돼, "느린 서비스"라는 인상이 이탈로 이어졌습니다.',
      ],
    },
    decision: {
      heading: 'CSR 유지 vs SSR 전환',
      lead: '전면 재작성 대신, 첫 화면에 필요한 데이터만 서버에서 미리 그려 보내는 방식을 택했습니다.',
      points: [
        'CSR 유지(캐싱 강화)는 지연을 줄일 뿐 "빈 화면" 문제 자체는 남는다고 판단했습니다.',
        '전면 SSR은 기존 상호작용 로직 재작성 비용이 커, 초기 표시 영역만 SSR로 한정했습니다.',
        '개인화 이후 영역은 클라이언트에서 이어 받아, 안전성과 체감 속도를 함께 확보했습니다.',
      ],
    },
    result: {
      lead: '첫 콘텐츠 표시 시점이 눈에 띄게 빨라졌고, 진입 이탈이 줄었습니다.',
      points: [
        '"화면이 바로 뜬다"는 정성 피드백을 사내 사용자에게서 확인했습니다.',
        '전환 패턴을 팀 표준 문서로 정리해 다른 화면에도 적용했습니다.',
      ],
    },
    metrics: [
      { label: 'FCP', before: '0.5s', after: '0.2s', delta: '-60%' },
      { label: '진입 이탈', before: '기준', after: '감소', delta: '↓' },
    ],
  },

  // ── 02 · 트러블슈팅형 예시 ──────────────────────────────────────────────────
  {
    id: 'pr-review-latency',
    order: 2,
    title: '리뷰 지연 PR 자동 감지 익스텐션',
    tagline: '리뷰가 밀려 배포가 늦어지던 병목을, 협업 도구로 드러내 절반 이하로 줄였습니다.',
    role: 'Frontend · 개인 주도',
    period: '2024.07 – 2024.09',
    stack: ['TypeScript', 'Chrome Extension', 'GitHub API', 'Vite'],
    refs: [
      { label: 'GitHub', url: 'https://github.com/yourname/repo', kind: 'github' },
      { label: '데모', url: 'https://example.com/demo', kind: 'video' },
    ],
    problem: {
      lead: '리뷰가 언제 밀리는지 아무도 실시간으로 알지 못해, 오래된 PR이 조용히 쌓였습니다.',
      points: [
        '리뷰 대기 상태가 각자 알림에 흩어져 있어, 팀 전체의 지연을 한눈에 볼 수단이 없었습니다.',
        '지연 PR은 컨플릭트·컨텍스트 손실로 이어져 배포 리드타임을 늘렸습니다.',
      ],
    },
    decision: {
      heading: '증상 → 가설 → 검증',
      lead: '"알림 부족"이 아니라 "지연의 가시성 부족"이 원인이라 보고, 상태를 눈앞에 띄우는 쪽으로 접근했습니다.',
      points: [
        '가설: 사람들이 게을러서가 아니라, 밀린 PR이 보이지 않아 방치된다.',
        '검증: 대기 시간이 임계치를 넘긴 PR을 화면 상단에 강조 노출하도록 프로토타입을 만들어 팀에 적용.',
        '슬랙 봇 대신 브라우저 익스텐션을 택해, 이미 보고 있는 화면 위에 바로 얹었습니다.',
      ],
    },
    result: {
      lead: '지연 PR이 눈에 보이자 자연스럽게 먼저 처리되며, 방치되는 PR이 크게 줄었습니다.',
      points: [
        '팀이 별도 학습 없이 바로 쓸 수 있도록 설치·설정을 1분 내로 단순화했습니다.',
      ],
    },
    metrics: [{ label: '지연 PR', before: '기준', after: '절반 이하', delta: '-50%+' }],
  },

  // ── 03 ~ 06 · 템플릿 (그대로 채워 넣기) ─────────────────────────────────────
  {
    id: 'project-03',
    order: 3,
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ label: 'GitHub', url: '#', kind: 'github' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      heading: '선택지 A vs B',
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 아래 지표로.',
      points: ['정성 성과 한 줄'],
    },
    metrics: [{ label: '지표', before: 'before', after: 'after', delta: '±%' }],
  },
  {
    id: 'project-04',
    order: 4,
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ label: 'GitHub', url: '#', kind: 'github' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 아래 지표로.',
      points: ['정성 성과 한 줄'],
    },
  },
  {
    id: 'project-05',
    order: 5,
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ label: 'GitHub', url: '#', kind: 'github' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 아래 지표로.',
      points: ['정성 성과 한 줄'],
    },
  },
  {
    id: 'project-06',
    order: 6,
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ label: 'GitHub', url: '#', kind: 'github' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 아래 지표로.',
      points: ['정성 성과 한 줄'],
    },
  },
];
