import type { Project } from '@/types/portfolio';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  프로젝트 데이터 (6개)
 * ─────────────────────────────────────────────────────────────────────────────
 *  01, 02 는 "완성 예시"(톤·밀도·카드/flow 사용법 참고), 03~06 은 빈 템플릿.
 *   - 01: 의사결정형   / 링크: github + docs
 *   - 02: 트러블슈팅형 / 링크: github + npm + docs
 *
 *  구성 요소
 *   - org      : 조직 태그 키 (src/data/organizations.ts)
 *   - refs     : github/npm 은 url 만, docs 는 label(제목)까지
 *   - problem/decision/result : 각 막은 lead 한 줄 + points + (선택) cards
 *   - cards    : 어느 막에든 붙일 수 있는 요약 카드 (막 색을 상속)
 *   - flow     : 하단 요약 띠 (문제→판단→결과 한 줄씩, 빨강→파랑→초록)
 *
 *  원칙: 각 lead 는 두괄식 한 문장. 한 페이지(297mm)를 넘기지 말 것.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  // ── 01 · 의사결정형 예시 ────────────────────────────────────────────────────
  {
    id: 'dashboard-ssr',
    order: 1,
    org: 'kakaopay',
    title: '결제 대시보드 초기 로딩 최적화',
    tagline: '첫 화면 로딩 지연으로 이탈하던 사용자를, 렌더링 전략을 바꿔 붙잡았습니다.',
    role: 'Frontend · 3인',
    period: '2024.03 – 2024.06',
    stack: ['Next.js', 'React', 'TypeScript', 'React Query'],
    refs: [
      { kind: 'github', url: 'https://github.com/yourname/repo' },
      { kind: 'docs', url: 'https://yourblog.dev/post', label: '회고 글' },
    ],
    problem: {
      lead: '데이터가 많은 첫 화면이 빈 상태로 오래 머물러, 진입 단계에서 사용자가 떠나고 있었습니다.',
      points: [
        '거래·잔액·차트를 클라이언트에서 순차 요청해 첫 유의미한 화면까지 체감 지연이 컸습니다.',
        '스켈레톤만 길게 노출돼 "느린 서비스"라는 인상이 이탈로 이어졌습니다.',
      ],
      cards: [{ label: '첫 화면 FCP', value: '0.5s', note: '스켈레톤 장시간 노출' }],
    },
    decision: {
      heading: 'CSR 유지 vs SSR 전환',
      lead: '전면 재작성 대신, 첫 화면에 필요한 데이터만 서버에서 미리 그려 보내기로 했습니다.',
      points: [
        'CSR 유지(캐싱 강화)는 지연만 줄일 뿐 "빈 화면" 문제 자체는 남는다고 판단했습니다.',
        '전면 SSR은 상호작용 로직 재작성 비용이 커, 초기 표시 영역만 SSR로 한정했습니다.',
      ],
    },
    result: {
      lead: '첫 콘텐츠 표시가 눈에 띄게 빨라졌고, 진입 이탈이 줄었습니다.',
      points: ['전환 패턴을 팀 표준 문서로 정리해 다른 화면에도 적용했습니다.'],
      cards: [
        { label: 'FCP', before: '0.5s', value: '0.2s', delta: '-60%' },
        { label: '진입 이탈', before: '기준', value: '감소', delta: '↓' },
      ],
    },
    flow: {
      problem: '첫 화면이 빈 채로 오래 머물러 진입 이탈 발생 (FCP 0.5s)',
      decision: '전면 SSR 대신 초기 표시 영역만 부분 SSR로 한정',
      result: 'FCP 0.2s로 개선, 전환 패턴을 팀 표준화',
    },
  },

  // ── 02 · 트러블슈팅형 예시 (npm 라이브러리) ─────────────────────────────────
  {
    id: 'responsive-keepalive',
    order: 2,
    org: 'personal',
    title: '반응형 전환 시 상태 보존 라이브러리',
    tagline: '반응형 분기에서 컴포넌트가 리마운트되며 입력·스크롤이 날아가던 문제를 라이브러리로 해결했습니다.',
    role: 'Frontend · 개인',
    period: '2024.07 – 2024.09',
    stack: ['React', 'TypeScript', 'Rollup', 'Vitest'],
    refs: [
      { kind: 'github', url: 'https://github.com/yourname/repo' },
      { kind: 'npm', url: 'https://www.npmjs.com/package/your-package' },
      { kind: 'docs', url: 'https://yourblog.dev/guide', label: '사용 가이드' },
    ],
    problem: {
      lead: '데스크톱·모바일 레이아웃을 분기하면 그 순간 컴포넌트가 리마운트돼 사용자의 작업이 사라졌습니다.',
      points: [
        '분기 경계에서 입력하던 폼 값과 스크롤 위치가 초기화됐습니다.',
        '리사이즈가 잦은 구간에서는 마운트가 반복돼 화면이 깜빡였습니다.',
      ],
    },
    decision: {
      heading: '증상 → 가설 → 검증',
      lead: '"조건부 렌더링으로 인한 트리 교체"가 원인이라 보고, 상태를 살린 채 전환하는 쪽으로 접근했습니다.',
      points: [
        '가설: 분기마다 다른 트리를 그려 React가 언마운트로 처리한다.',
        '검증: 전환을 디바운스하고 상태를 보존하도록 감싸자 리마운트가 사라졌습니다.',
      ],
      cards: [{ label: '핵심 선택', value: '상태 보존 + 디바운스', note: '트리 교체 대신 유지' }],
    },
    result: {
      lead: '전환 중에도 입력·스크롤이 유지되고, 깜빡임이 사라졌습니다.',
      points: ['npm에 배포하고 설치·적용을 한 줄로 끝나게 문서화했습니다.'],
      cards: [{ label: '리마운트', before: '분기마다', value: '0회', delta: '제거' }],
    },
    flow: {
      problem: '반응형 분기 시 리마운트로 입력·스크롤 유실',
      decision: '트리 교체 대신 상태 보존 + 전환 디바운스',
      result: '전환 중 상태 유지, npm 배포 및 문서화',
    },
  },

  // ── 03 ~ 06 · 템플릿 (그대로 채워 넣기) ─────────────────────────────────────
  {
    id: 'project-03',
    order: 3,
    org: 'woowacourse',
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ kind: 'github', url: '#' }],
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
      lead: '두괄식으로 성과를 먼저. 정량은 카드로.',
      points: ['정성 성과 한 줄'],
      cards: [{ label: '지표', before: 'before', value: 'after', delta: '±%' }],
    },
    flow: {
      problem: '문제 한 줄 요약',
      decision: '판단 한 줄 요약',
      result: '결과 한 줄 요약',
    },
  },
  {
    id: 'project-04',
    order: 4,
    org: 'evenly',
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ kind: 'github', url: '#' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 카드로.',
      points: ['정성 성과 한 줄'],
    },
    flow: {
      problem: '문제 한 줄 요약',
      decision: '판단 한 줄 요약',
      result: '결과 한 줄 요약',
    },
  },
  {
    id: 'project-05',
    order: 5,
    org: 'personal',
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ kind: 'github', url: '#' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 카드로.',
      points: ['정성 성과 한 줄'],
    },
    flow: {
      problem: '문제 한 줄 요약',
      decision: '판단 한 줄 요약',
      result: '결과 한 줄 요약',
    },
  },
  {
    id: 'project-06',
    order: 6,
    org: 'kakaopay',
    title: '프로젝트 제목을 입력하세요',
    tagline: '한 줄 요약 — 무엇을 왜 했는지 3초 안에 읽히도록.',
    role: 'Frontend · N인',
    period: '2024.00 – 2024.00',
    stack: ['React', 'TypeScript', '...'],
    refs: [{ kind: 'github', url: '#' }],
    problem: {
      lead: '이게 왜 문제였는지, 어떤 상황·비용이었는지 한 문장으로 못박으세요.',
      points: ['문제를 구체적으로 보여주는 근거 1', '문제의 영향/비용 2'],
    },
    decision: {
      lead: '무엇을 놓고 고민했고, 왜 그 결정을 내렸는지(대안을 버린 이유 포함).',
      points: ['고려한 대안과 기준 1', '최종 판단의 근거 2'],
    },
    result: {
      lead: '두괄식으로 성과를 먼저. 정량은 카드로.',
      points: ['정성 성과 한 줄'],
    },
    flow: {
      problem: '문제 한 줄 요약',
      decision: '판단 한 줄 요약',
      result: '결과 한 줄 요약',
    },
  },
];
