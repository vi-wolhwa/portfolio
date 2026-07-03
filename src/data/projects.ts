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
  // ── 01 · 모바일 웹뷰 TradingView 렌더링 성능 최적화 ─────────────────────────
  {
    id: 'tradingview-mobile-rendering',
    order: 1,
    org: 'kakaopay',
    title: '모바일 웹뷰 TradingView 차트 렌더링 성능 최적화',
    tagline: '데이터를 기다리는 시간과 렌더링 자원 경합, 서로 다른 두 병목을 각각의 전략으로 없앴습니다.',
    role: 'Frontend · 인턴',
    period: '2025.02 – 2025.08',
    stack: ['Next.js', 'React 18', 'TypeScript', 'React-query', 'MyAxios'],
    refs: [],
    problem: {
      lead: 'Canvas 기반인 TradingView 위젯은 SSR이 불가능한데, 자원이 제한된 모바일 웹뷰에서 데이터 대기와 무거운 렌더링 연산이 동시에 겹쳐 메인 스레드를 막았습니다.',
      points: [
        '캔들 데이터를 마운트 후 직렬로 요청해 대기 시간이 길었고, 도착과 동시에 JS 파싱·Canvas 초기화가 몰려 진입 지연과 프레임드랍으로 이어졌습니다.',
      ],
    },
    decision: {
      lead: '데이터를 기다리는 시간은 서버 프리페칭으로, 렌더링 자원 경합은 우선순위 재배치로 없앴습니다.',
      points: [
        '데이터: MyAxios(안정성)와 React-query Hydration으로, 서버가 미리 가져온 데이터를 클라이언트가 끊김없이 이어받도록 표준화했습니다.',
        '렌더링: dynamic import로 지연 로딩을 시도했지만 효과가 없어 기각했습니다. "자원을 먼저 쓰는 순서"로 재정의해 startTransition으로 우선순위를 재배치했습니다.',
      ],
    },
    result: {
      lead: '데이터 대기와 자원 경합을 모두 없애며, 추가 인프라 비용 없이 체감 성능을 끌어올렸습니다.',
      points: ['줌·스크롤 시 화면이 밀리던 프레임드랍(Jank) 현상이 해소됐습니다.'],
      cards: [
        { label: 'FCP', before: '0.5s', value: '0.2s', delta: '-60%' },
        { label: '인프라 비용', before: '기존', value: '증가 없음', note: 'Grafana 기준 CPU 사용량 유지' },
      ],
    },
    flow: {
      problem: 'SSR 불가 + 데이터 대기·렌더링 연산 충돌로 메인 스레드 정체',
      decision: '서버 프리페칭 + dynamic import 기각 → startTransition 재배치',
      result: 'FCP 0.5s → 0.2s, 프레임드랍 해소, 인프라 비용 0',
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
