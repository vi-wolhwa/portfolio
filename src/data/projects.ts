import type { Project } from '@/types/portfolio';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  프로젝트 데이터 (6개)
 * ─────────────────────────────────────────────────────────────────────────────
 *  01~05 는 완성 예시, 06 은 빈 템플릿, 07 은 service 레이아웃 예시.
 *   - 01~04: story(문제→판단→결과 3막) / 06: story 템플릿
 *   - 07: service(서비스 개요 + 독립 기술 하이라이트 카드) — 서비스형 프로젝트용
 *
 *  variant
 *   - 미지정/'story' : problem·decision·result 3막 사용
 *   - 'service'      : overview·highlights 사용 (문제→판단→결과가 여럿 얽힌 서비스형)
 *
 *  구성 요소
 *   - org      : 조직 태그 키 (src/data/organizations.ts)
 *   - refs     : github/npm 은 url 만, docs 는 label(제목)까지
 *   - problem/decision/result : 각 막은 lead 한 줄 + points
 *   - flow     : 하단 요약 띠 (문제→판단→결과 한 줄씩, 빨강→파랑→초록) — 유일한 카드형 요약
 *
 *  원칙
 *   - 정량 수치·카드류 요약은 별도 컴포넌트가 아니라 각 막의 문장 속에 자연스럽게 녹인다.
 *     (과거 버전엔 막마다 요약 카드가 있었으나, 지면을 잡아먹고 스토리를 끊어 제거했다.)
 *   - 세 막은 서로 다른 글이 아니라 하나의 스토리다. 문제에서 진단한 원인이 판단에서
 *     그대로 다시 등장해 해결책으로 이어지고, 결과는 그 해결책이 왜 그런 수치로
 *     이어졌는지까지 설명해야 한다. 결과에 숫자만 던져놓고 끝내지 않는다.
 *   - 각 lead 는 두괄식 한 문장. 한 페이지(297mm)를 넘기지 말 것.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  // ── 01 · 모바일 웹뷰 TradingView 렌더링 성능 최적화 ─────────────────────────
  {
    id: 'tradingview-mobile-rendering',
    order: 1,
    org: 'kakaopay',
    title: '모바일 웹뷰 TradingView 차트 렌더링 성능 최적화',
    tagline: '가장 중요한 페이지가 느렸던 근본 원인을 찾아, 데이터와 렌더링 우선순위를 재설계했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.02 – 2025.08',
    stack: ['Next.js', 'React 18', 'TypeScript', 'React-query', 'MyAxios'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-A3-SSR-32ae39398dfb802aae4ac2102d30dd41',
        label: 'SSR 전략 설계 (P-A3)',
      },
    ],
    problem: {
      lead: '서비스에서 가장 많은 트래픽이 몰리는 종목 정보 페이지의 핵심인 TradingView 차트가, 모바일에서 뜨기까지 오래 걸렸습니다.',
      points: [
        '초기 렌더링을 서버로 앞당기면 해결될 거라 보고 SSR을 검토했지만, TradingView는 Canvas와 window 전역 객체에 의존해 서버에서는 애초에 그릴 수 없는 구조였습니다.',
        '결국 클라이언트가 마운트된 뒤에야 캔들 데이터를 직렬로 요청했고, 데이터가 도착하는 순간 무거운 JS 파싱과 Canvas 초기화가 한꺼번에 몰려 자원이 제한된 모바일 웹뷰의 메인 스레드를 독점했습니다. 진입은 늦어지고 줌·스크롤은 뚝뚝 끊겼습니다.',
      ],
    },
    decision: {
      lead: 'TradingView 자체는 서버에서 그릴 수 없었지만, 차트가 쓰는 데이터는 서버에서 미리 가져올 수 있었습니다.',
      points: [
        '그래서 데이터 페칭만 서버로 옮겨, 검증된 사내 인프라 MyAxios와 React-query Hydration으로 서버가 미리 가져온 데이터를 클라이언트가 끊김없이 이어받도록 표준화했습니다.',
        '데이터가 준비된 뒤에도 마운트 직후 주변 컴포넌트들이 차트와 동시에 자원을 그리며 메인 스레드를 다시 두고 경쟁했습니다. "안 보이는 컴포넌트를 늦게 그리면 빨라질 것"이란 가설로 dynamic import를 실측했지만 Next.js의 자동 코드 스플리팅과 겹쳐 효과가 없어 기각했습니다.',
        '문제를 "무엇을 그리느냐"가 아니라 "누가 자원을 먼저 쓰느냐"로 재정의해, startTransition으로 주변 컴포넌트의 렌더링을 후순위로 미루고 차트에 자원을 몰아줬습니다.',
      ],
    },
    result: {
      lead: '데이터 대기와 렌더링 경합을 차례로 없애며 체감 성능을 끌어올렸고, 서버 비용은 오히려 늘지 않았습니다.',
      points: [
        'FCP는 0.5초에서 0.2초로 줄었고, 줌·스크롤 시 화면이 밀리던 프레임드랍도 해소됐습니다.',
        '서버 비용이 그대로였던 이유는 TradingView에 필요한 종목 데이터만 서버에서 가져오고, 나머지 컴포넌트는 프리렌더 단계에서 스켈레톤만 내려보냈기 때문입니다.',
      ],
    },
    flow: {
      problem: '핵심 페이지의 차트가 느렸고, SSR도 구조적으로 불가능했음',
      decision: '데이터만 서버에서 프리페칭, 나머지는 우선순위 재배치(startTransition)',
      result: 'FCP 0.5s → 0.2s, 서버 비용 0 (데이터만 최소 범위로 프리페칭)',
    },
  },

  // ── 02 · 프로필 서비스 MFE 이관과 신규 개편 ─────────────────────────────────
  {
    id: 'profile-service-mfe-migration',
    order: 2,
    org: 'kakaopay',
    title: '프로필 서비스 MFE 이관과 신규 개편',
    tagline: '닉네임 프로필을 금융 데이터 서비스로 개편하려면, 독립 배포 인프라로의 이관이 먼저였습니다.',
    role: 'Frontend · 인턴',
    period: '2025.02 – 2025.08',
    stack: ['React', 'TypeScript', 'MSW', 'Webpack'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B1-327e39398dfb80428d5ff64f1c9caf85',
        label: '공통 패키지 승인 병목 (P-B1)',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B2-MSW-API-329e39398dfb8035a221dd02b951b4f6',
        label: 'MSW로 API 명세 검증 (P-B2)',
      },
    ],
    problem: {
      lead: '닉네임만 보여주던 프로필 서비스가 매매 내역·포트폴리오 같은 민감한 금융 데이터를 다루는 서비스로 개편되면서, 카카오페이 인프라에 묶여 있던 배포 체계부터 증권 자체의 독립 인프라로 옮겨야 했습니다.',
      points: [
        '이관과 신규 개편이 같은 타이트한 일정에 묶여 있었는데, 신규 환경의 공통 패키지를 고치려면 의존하는 모든 팀의 승인을 받아야 해서 상수 하나 추가하는 데도 배포 사이클을 통째로 놓치곤 했습니다.',
        '동시에 서버 개발도 이관 작업과 겹쳐 있어, 확정된 API 명세 없이 기획 초안만 보고 프론트엔드를 먼저 만들어야 했습니다.',
      ],
    },
    decision: {
      lead: '타이트한 일정 안에서, 배포 병목과 API 불확실성을 각각 다른 전략으로 풀었습니다.',
      points: [
        '공통 패키지를 그대로 고치면 승인 대기 기간을 예측할 수 없어 이관 일정 전체가 밀렸고, 다른 서비스로 복사해 쓰면 부채가 어디로 퍼졌는지 추적할 수 없었습니다. 결국 팀 전용 패키지에 모듈을 선언해 변경 범위를 팀 안으로 격리하고, 전사 패키지로 옮길 경로까지 남기는 절충안을 택했습니다.',
        '서버가 완성되기 전, 기획 초안을 그대로 MSW 핸들러로 구현해 실제 로직을 태워보며 명세의 허점을 미리 찾았습니다. 그 중 "내 프로필" 진입 시 자신의 userId를 몰라 발생하던 불필요한 직렬 API 호출은, 클라이언트 대신 서버가 세션으로 본인을 식별하는 전용 엔드포인트를 요청해 없앴습니다.',
      ],
    },
    result: {
      lead: '두 전략 모두 통했습니다. 이관은 팀 판단만으로 배포됐고, 신규 개발은 병목 없이 진행됐습니다.',
      points: [
        '공통 패키지 승인 없이 팀 내부 검토만으로 즉시 배포할 수 있게 되어, 매주 배포 사이클마다 반복되던 지연이 사라졌습니다.',
        '"내 프로필" 진입 API 응답 시간은 약 180ms 줄었습니다. 두 선택 모두 완벽한 정답이 아니라, 타이트한 일정 안에서 통제 가능한 리스크를 고른 결과였습니다.',
      ],
    },
    flow: {
      problem: '닉네임 레거시 → 금융 데이터 서비스, 이관과 개발이 한 일정에 충돌',
      decision: '패키지는 통제 가능한 부채로 격리 + API는 MSW로 사전 검증',
      result: '승인 없이 즉시 배포, API 응답 180ms 단축',
    },
  },

  // ── 03 · 프로필 접근 제어 모듈 설계 ──────────────────────────────────────────
  {
    id: 'profile-access-control',
    order: 3,
    org: 'kakaopay',
    title: '프로필 접근 제어 모듈 설계',
    tagline: '컴포넌트가 데이터 출력과 권한 판단을 동시에 떠안지 않도록, 두 책임을 구조적으로 분리했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.02 – 2025.08',
    stack: ['React', 'TypeScript', 'React-query'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B3-327e39398dfb80648a09f4acec413de7',
        label: '접근 제어 모듈 설계 (P-B3)',
      },
    ],
    problem: {
      lead: '프로필 개편으로 매매 내역·포트폴리오 같은 민감 데이터가 노출되며, 접근 조건이 회원 등급·약관 동의·공개 동의 3가지로 늘었습니다.',
      points: [
        '기존엔 각 컴포넌트가 이 조건들을 if 분기로 직접 처리했는데, 이미 데이터 로딩과 콜드 케이스 분기가 있는 상태라 권한 분기까지 더해지며 한 컴포넌트가 너무 많은 걸 알아야 하는 구조가 됐습니다.',
        '정책이 바뀌면 권한 조건이 관여하는 모든 컴포넌트를 찾아 고쳐야 했고, 수익률처럼 더 민감한 정보를 요구하는 기능이 추가될 예정이라 조건은 앞으로도 늘어날 상황이었습니다.',
      ],
    },
    decision: {
      lead: '목표는 컴포넌트가 "무엇을 보여줄지"만 알고 "왜 못 보여주는지"는 몰라도 되게 만드는 것이었습니다.',
      points: [
        '페이지 진입 자체를 막는 조건과 섹션마다 다른 조건은 레이어가 달라, useProfilePageAccess와 useProfileSectionAccess 두 훅으로 분리했습니다.',
        '각 훅은 canView와 fallback만 반환해 컴포넌트가 두 줄로 분기를 끝내게 했고, 어떤 탭에 어떤 조건이 필요한지는 SECTION_PERMISSION_MAP에 중앙화해 컴포넌트는 자신이 어떤 탭인지만 전달하면 되도록 했습니다.',
      ],
    },
    result: {
      lead: '새 약관 조건이 추가돼도 컴포넌트는 그대로였고, 수정 지점은 Map 하나로 좁혀졌습니다.',
      points: [
        '포트폴리오 탭에 약관 조건이 하나 늘어도 ProfilePortfolio 컴포넌트는 손대지 않고, SECTION_PERMISSION_MAP에 항목 하나만 추가하면 됐습니다.',
        '다만 캐싱으로 접근 조건을 판단하다 보니, 상대방이 방금 공개 동의를 바꿔도 바로 반영되지 않는 한계가 남았습니다. 짧은 staleTime과 pull-to-refresh로 신선도 문제를 완화하고 있습니다.',
      ],
    },
    flow: {
      problem: '민감 데이터 노출로 접근 조건 3종 → 컴포넌트가 다 알아야 하는 구조',
      decision: '페이지·섹션 레이어 분리 + canView·fallback 최소 반환 + 중앙 맵',
      result: '새 조건 추가돼도 컴포넌트 불변 (다만 데이터 신선도는 트레이드오프)',
    },
  },
  {
    id: 'code-review-chrome-extension',
    order: 4,
    org: 'kakaopay',
    title: '코드 리뷰 생산성 크롬 익스텐션',
    tagline: '정책으로는 못 풀던 GitHub의 한계를, 크롬 익스텐션으로 해결했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.02 – 2025.08',
    stack: ['TypeScript', 'Chrome Extension', 'GitHub API', 'Manifest V3'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-C1-333e39398dfb8099a6a8e47c73d7b7b2',
        label: '리뷰 병목 해결 정책 (P-C1)',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-C2-Github-333e39398dfb80fb855cf05272c47276',
        label: '크롬 익스텐션 개발기 (P-C2)',
      },
    ],
    problem: {
      lead: '여러 서비스가 동시에 개발되는 환경에서 리뷰 대기 중인 PR이 10~30개까지 쌓였고, 배포일 전까지 충분히 검토되지 않은 코드가 급하게 나가곤 했습니다.',
      points: [
        'PR 상태를 확인하려면 목록을 하나씩 열어봐야 했고, 리뷰어와 리뷰이의 답변 왕복에 하루 이상 걸리는 경우가 잦아 중요한 PR이 조용히 묻혔습니다.',
        'PR 분리 규칙·리뷰 코어타임·우선순위 체계 같은 팀 정책을 먼저 시도해 효과를 봤지만, 리뷰 상태 가시성과 실시간 알림만큼은 정책으로 보완할 수 없는 GitHub 플랫폼 자체의 한계로 남았습니다.',
      ],
    },
    decision: {
      lead: '정책으로 못 풀던 문제를 메우려 만든 세 기능 중, 가장 까다로웠던 실시간 알림에서 같은 원인의 문제를 두 번 만났습니다.',
      points: [
        'GitHub는 Push를 지원하지 않아 폴링을 택했는데, setInterval은 일정 시간 뒤 멈췄습니다. Manifest V3의 Background가 Service Worker로 동작해 활동이 없으면 브라우저가 종료시키기 때문이었고, 종료돼도 유지되는 chrome.alarms API로 교체해 해결했습니다.',
        '이어서 불필요한 요청을 줄이려 Last-Modified 헤더로 304 응답을 활용하려 했는데, 이번엔 전역 변수가 Service Worker 재활성화마다 초기화돼 무용지물이었습니다. 같은 원인이라, 값을 유지해주는 chrome.storage로 옮겨 해결했습니다.',
      ],
    },
    result: {
      lead: '정책으로 못 풀던 문제를 도구로 메우며, 팀 전체의 리뷰 습관이 달라졌습니다.',
      points: [
        '조직 내 FE 개발팀 테스트에서 리뷰 기한이 만료되는 PR이 50% 이상 줄었고, 사내 FE 챕터 전체에 배포해 피드백을 받으며 계속 다듬고 있습니다.',
      ],
    },
    flow: {
      problem: 'PR 10~30개 적체, 정책으로는 못 푼 GitHub 자체의 한계 남음',
      decision: 'Service Worker 생명주기 문제 두 번 → chrome.alarms + chrome.storage',
      result: '리뷰 기한 만료 PR 50%+ 감소, 사내 FE 챕터 배포',
    },
  },
  {
    id: 'responsive-keepalive',
    order: 5,
    org: 'personal',
    title: 'responsive-keepalive ─ 반응형 트리 전환 상태 보존 라이브러리',
    tagline: '브레이크포인트마다 다른 트리를 렌더링해도, 상태는 잃지 않도록 만들었습니다.',
    role: 'Frontend · 개인',
    period: '2026.05 – 2026.06',
    stack: ['React 19.2', 'TypeScript', 'tsup', 'Vitest'],
    refs: [
      { kind: 'github', url: 'https://github.com/AudeModo/audemodo-responsive-keepalive' },
      { kind: 'npm', url: 'https://www.npmjs.com/package/@audemodo/responsive-keepalive' },
      {
        kind: 'docs',
        url: 'https://audemodo.github.io/audemodo-responsive-keepalive-sample/index.html',
        label: 'Architecture & API Pipelines',
      },
    ],
    problem: {
      lead: 'Evenly 프로젝트에서 반응형 분기가 늘어날수록 컴포넌트 복잡도가 급증했고, 개인 프로젝트 규모에선 빅테크식 인프라 분리(AWD)를 감당할 수 없었습니다.',
      points: [
        '단일 프로젝트 안에서 모바일·데스크톱 트리를 완전히 분리하는 우회책을 시도했지만, 기기 전환 시 비활성 트리가 언마운트되며 스크롤 위치와 공유 입력값, 열린 메뉴 같은 상태가 그대로 유실됐습니다.',
        '기존엔 UI를 숨기는 방법이 두 가지뿐이었습니다. 조건부 렌더링은 트리를 파괴해 상태를 잃고, CSS display:none은 상태는 지키지만 타이머·구독 같은 이펙트가 계속 돌아 자원을 낭비했습니다. 구조 분리와 상태 보존을 동시에 만족하는 방법이 없었습니다.',
      ],
    },
    decision: {
      lead: 'React 19.2의 <Activity>는 이 둘을 동시에 풀었습니다 — 숨겨질 때 DOM과 상태는 그대로 두고, 이펙트만 정리했다가 다시 보일 때 재실행합니다.',
      points: [
        '핵심은 mode만 토글하고 key는 고정하는 것이었습니다. React가 같은 인스턴스로 인식해 구조를 보존하면서, 보이지 않는 동안의 부수 효과만 안전하게 정리·재생성할 수 있었습니다.',
        '그 위에 문제 크기에 맞는 API 3종을 나눴습니다. 트리 전체는 useMediaVariant, 카드 하나의 너비는 useContainerVariant, 값 하나만 바뀌면 useResponsiveValue — 하나의 훅으로 다 풀면 작은 변화에도 트리를 통째로 바꾸는 과잉 설계가 되기 쉬웠습니다.',
      ],
    },
    result: {
      lead: '97개 테스트와 98.6% 라인 커버리지로 완성도를 증명했고, 런타임 의존성 없이 npm에 배포했습니다.',
      points: [
        'SSR 환경에서는 서버에 없는 window 대신 설정된 ssr variant를 반환하고 하이드레이션 후 한 번만 재조정했고, React 19.2 미만에서는 상태 보존 없는 swap으로 자동 폴백하도록 했습니다.',
      ],
    },
    flow: {
      problem: '반응형 분기 급증, 트리 분리 시 상태 유실 — 구조 분리+상태 보존 동시 해결책 없음',
      decision: 'Activity(key 고정+mode 토글)로 상태 보존 + 문제 크기별 API 3종 분리',
      result: '97개 테스트·98.6% 커버리지, 0 런타임 의존성으로 npm 배포',
    },
  },
  // ── 06 · Evenly (Evenly팀 프로젝트) · service 레이아웃 ────────────────────────
  {
    id: 'evenly',
    order: 6,
    variant: 'service',
    org: 'evenly',
    title: 'Evenly — 모임 정산(더치페이) 서비스',
    tagline: '서버가 계산을 맡는 구조에서, 프론트엔드가 진짜 책임지는 영역을 깊게 파고든 프로젝트입니다.',
    description:
      '여행·모임 지출을 모아 “누가 누구에게 얼마”를 최소 송금으로 정리해주는 더치페이 서비스입니다. 정산 계산은 서버가 맡고 있어, 저는 의도적으로 프론트엔드의 핵심 역량 — 재사용 가능한 UI 추상화와 HTTP·인증 설계 — 을 끝까지 밀어붙이는 것을 이 프로젝트의 목표로 삼았습니다.',
    role: 'Frontend',
    period: '2025.06 – 진행 중',
    stack: ['React', 'TypeScript', 'React-query', 'axios', 'Zustand', 'Vite'],
    refs: [{ kind: 'github', url: 'https://github.com/EvenlyTeam/evenly-frontend' }],
    highlights: [
      {
        label: '명령형 오버레이 (useOverlay)',
        tone: 'tech',
        problem: '지출 삭제·정산 완료·회원 탈퇴 등 확인 다이얼로그가 화면마다 반복됐는데, 매번 isOpen state와 콜백을 부모가 들고 있어야 해 보일러플레이트가 쌓였습니다.',
        solution:
          '모달을 트리에 선언하는 대신 const ok = await confirm({...}) 한 줄로 여는 Promise 기반 오버레이를 만들었습니다. Portal로 트리 밖에 렌더하고, 언마운트 시 Promise를 정리하며, 여러 개가 쌓여도 스택으로 관리되도록 설계했습니다.',
      },
      {
        label: '공유링크 대응 이중 HTTP 계층',
        tone: 'tech',
        problem: '인증 API는 401이면 토큰을 재발급해야 하지만, 비로그인자가 여는 읽기 전용 공유링크(/shared)에서 같은 인터셉터가 돌면 불필요한 재발급 요청과 무한 루프가 생깁니다.',
        solution:
          '인증용과 공개용 axios 인스턴스를 분리해, 재발급 인터셉터가 걸리는 요청 범위 자체를 구조적으로 갈랐습니다. 공유링크는 토큰 없이도 안전하게, 인증 요청만 재발급 흐름을 타도록 했습니다.',
      },
      {
        label: '토큰 자동 재발급 인터셉터',
        tone: 'tech',
        problem: 'access 토큰이 만료돼 여러 요청이 동시에 401을 받으면, 각 요청이 제각기 refresh를 호출해 재발급이 중복되고 토큰 회전이 꼬였습니다.',
        solution:
          '첫 401에서만 refresh를 실행하고 나머지 요청은 그 하나의 Promise를 기다리도록 single-flight로 묶었습니다. 재발급이 끝나면 대기 중이던 요청들을 새 토큰으로 한 번에 재시도합니다.',
      },
      {
        label: '컴파운드 컴포넌트 + 런타임 가드',
        tone: 'tech',
        problem: 'GroupCard·Navbar 같은 합성 컴포넌트가 늘면서, 하위 조각을 부모 밖에서 잘못 쓰면 조용히 깨지는 실수가 생길 수 있었습니다.',
        solution:
          'createCompoundGuard로 Context 존재를 검사해, <GroupCard.Title>을 <GroupCard> 밖에서 쓰면 명확한 메시지의 런타임 에러를 던지게 했습니다. 오용을 침묵시키지 않고 즉시 드러내는 설계입니다.',
      },
    ],
  },

  // ── 07 · 코드잽 (우아한테크코스 팀 프로젝트) · service 레이아웃 ───────────────
  {
    id: 'codezap',
    order: 7,
    variant: 'service',
    org: 'woowacourse',
    title: '코드잽 — 코드 템플릿 저장·공유 서비스',
    tagline: '5개월간 하나의 서비스를 처음부터 만들며 마주친 프론트엔드 문제들을, 하나씩 파고들어 풀었습니다.',
    description:
      '자주 쓰는 코드를 매번 이전 프로젝트에서 뒤지던 개발자를 위해, 코드 템플릿을 저장하고 빠르게 검색·재사용하는 서비스입니다. 프론트엔드 3인·백엔드 5인이 실사용 서비스로 배포했고, 저는 프론트엔드 개발자로 참여했습니다.',
    role: 'Frontend · FE 3인 · BE 5인',
    period: '2024.07 – 2024.11',
    stack: ['React', 'TypeScript', 'Webpack', 'Emotion', 'CodeMirror'],
    refs: [
      { kind: 'github', url: 'https://github.com/woowacourse-teams/2024-code-zap' },
      {
        kind: 'docs',
        url: 'https://github.com/woowacourse-teams/2024-code-zap/wiki',
        label: '프로젝트 위키',
      },
    ],
    highlights: [
      {
        label: '번들 최적화',
        tone: 'tech',
        problem: '핵심 기능인 코드 에디터(CodeMirror)가 8MB에 달해, 첫 화면 로드가 눈에 띄게 무거웠습니다.',
        solution:
          'bundle-analyzer로 뜯어보니 실제로 안 쓰는 언어 문법까지 전부 포함돼 있었습니다. 지원 언어를 실사용분으로 좁혀 Tree Shaking이 걸리게 하고, 에디터는 Dynamic Import로 초기 번들에서 떼어내 2.2MB → 1.4MB로 줄였습니다.',
      },
      {
        label: '디자인 시스템',
        tone: 'tech',
        problem: '재사용성과 선언적 레이아웃에 끌려 <Flex>를 레이아웃 원자로 아토믹하게 도입했는데, 실제 화면에 쓸수록 direction·gap 같은 프롭스가 마크업을 뒤덮고 <Flex>가 무한 중첩됐습니다.',
        solution:
          '구조를 읽을 수 없는 "Flex Soup"과 Emotion의 의미 있는 네이밍 상실을 겪으며, 무조건적 세분화가 아니라 기술 스택 특성에 맞춰 추상화 수준을 제어해야 한다는 기준을 얻었습니다.',
      },
      {
        label: '웹 접근성',
        tone: 'tech',
        problem: '모달을 열어도 초점이 뒤 배경으로 새어나가고, 비동기로 바뀐 목록을 스크린리더가 읽어주지 않았습니다.',
        solution:
          '자동 검사 도구로는 잡히지 않아 VoiceOver·TalkBack 실기기로 직접 흐름을 따라가며, 포커스 트랩으로 초점을 모달 안에 가두고 aria-live로 변경 사항을 읽어주도록 고쳤습니다.',
      },
      {
        label: '레이아웃 시프트',
        tone: 'tech',
        problem: '목록·상세가 로드될 때마다 아래 콘텐츠가 밀려, 누르려던 버튼이 어긋나는 레이아웃 시프트가 반복됐습니다(CLS 0.8).',
        solution:
          '스켈레톤만으로는 실제 콘텐츠와 높이가 어긋나 시프트가 남았기에, 응답 전에 최종 높이값 자체를 예약해 콘텐츠가 그 자리에 그대로 들어오도록 만들어 CLS를 0.3으로 낮췄습니다.',
      },
    ],
  },
];
