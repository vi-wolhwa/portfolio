import type { Project } from '@/types/portfolio';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  프로젝트 데이터 (7개)
 * ─────────────────────────────────────────────────────────────────────────────
 *  01~05: story(문제→판단→결과 3막) · 06~07: service(서비스 개요 + 독립 기술 하이라이트 카드)
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
    tagline:
      '렌더링 속도를 늦추던 근본 원인을 찾아, 데이터 패칭과 렌더링 우선순위 전략을 재설계했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.04 – 2025.07',
    stack: ['# SSR', '# React-query', '# Hydration', '# startTransition'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-A1-32ae39398dfb807db2bad219d572531d',
        label: '서버사이드 통신 라이브러리 분석',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-A2-React-query-Hydration-32ce39398dfb80f3a344f81ec8943db1',
        label: 'Hydration 아키텍처 설계',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-A3-SSR-32ae39398dfb802aae4ac2102d30dd41',
        label: '렌더링 최적화 전략 설계',
      },
    ],
    problem: {
      lead: '가장 많은 트래픽이 몰리는 종목 차트의 로딩 속도가 느리다는 VoC를 지속적으로 받아왔습니다.',
      points: [
        'SSR 전환을 고려했으나, TradingView는 Canvas와 window에 의존하기 때문에 SSR이 불가능했습니다.',
        '종목 정보는 차트와 무관한 API들과 Promise.All로 묶여있었고, 유저 정보를 직렬로 호출하는 구조였습니다.',
        'API 응답을 받은 모든 컴포넌트가 동시에 렌더링을 시도하면서, TradingView의 무거운 JS 파싱과 Canvas 초기화에 자원을 집중할 수 없었습니다.',
      ],
    },
    decision: {
      lead: '사용자가 로딩이 끝났다고 느끼는 시점은 종목 차트가 완전히 그려지는 시점입니다.',
      points: [
        '압도적으로 느린 차트의 렌더링 속도를 개선하기 위해, 다른 컴포넌트의 렌더링 타이밍을 늦췄습니다.',
        '서버사이드에서 스켈레톤 UI를 Pre-render하여, 페이지가 빠르게 로딩되는 것처럼 느껴지도록 했습니다.',
        '서버사이드에서 유저/종목 정보 API를 Prefetching, Streaming하여 차트의 렌더링 시작 시점을 앞당겼고, 이외 API는 클라이언트 사이드에 남겨두어 우선순위를 물리적으로 분리했습니다.',
        '뷰포트 내/외부 컴포넌트의 우선순위를 분리하기 위해 SSR Streaming과 Dynamic-import를 시도했으나, 컴포넌트가 모두 API 응답을 기다리는 것과, Next.js의 자동 Code Splitting 덕분에 효과는 없었습니다.',
        '우선순위를 분리하는 다른 방법으로, startTransition을 활용하여 다른 컴포넌트의 렌더링을 지연시켜, 차트의 렌더링 시작 타이밍을 앞당겼습니다.',
      ],
    },
    result: {
      lead: '유의미한 실측 수치를 확보했고, 차트 렌더링 속도에 대한 VoC가 90% 감소했습니다.',
      points: [
        'FCP는 0.5s에서 0.2s로 감소했고, 차트 렌더링 완료 시점은 0.6s 빨라졌습니다.',
        'Pre-render 단계에서 스켈레톤만 렌더링하기 때문에, 유의미한 서버 비용의 증가는 없었습니다.',
        '배포일을 기점으로, 전/후 3주 동안 차트 렌더링 속도에 대한 VoC가 90% 감소했습니다.',
      ],
    },
    flow: {
      problem: '차트 로딩 속도에 대한 VoC 유입, 차트는 구조적으로 SSR 불가능',
      decision: 'SSR → 차트 프리페칭·스켈레톤 + startTransition 우선순위 설계',
      result: 'FCP -0.3s, 차트 렌더링 -0.6s, 추가 서버 비용 0, VoC 90% 감소',
    },
  },

  // ── 02 · 프로필 서비스 MFE 이관과 신규 개편 ─────────────────────────────────
  {
    id: 'profile-service-mfe-migration',
    order: 2,
    org: 'kakaopay',
    title: '프로필 서비스 MFE 이관과 신규 개편',
    tagline: '레거시 프로필 서비스를 증권 전용 MFE 인프라로 이관하고 대규모 개편을 진행했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.05 – 2025.07',
    stack: ['# MFE', '# MSW', '# API', '# Collaborate'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B1-327e39398dfb80428d5ff64f1c9caf85',
        label: '공통 패키지 승인 병목',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B2-MSW-API-329e39398dfb8035a221dd02b951b4f6',
        label: 'MSW로 API 명세 검증',
      },
    ],
    problem: {
      lead: '3개월 안에 레거시 프로필 서비스의 인프라 이관과 대규모 신규 개편을 끝내야 했습니다.',
      points: [
        '프로필은 커뮤니티와 많은 코드를 공유하지만, 공통 패키지를 고치려면 모든 팀의 승인을 받아야 합니다. 실제로 4월에 공유된 CI 개선 PR이 반영되기까지 2개월이 걸린 전례가 있어서 기간을 예측할 수 없었습니다.',
        '프로필 이관과 동시에 서버의 대규모 이관도 진행되고 있었기 때문에, 확정된 API 명세 없이 기획 초안만 보고 프론트엔드를 먼저 개발해야 하는 상황이었습니다.',
      ],
    },
    decision: {
      lead: '배포 일정을 맞추기 위해서는, 다른 팀의 승인도 API 명세 확정도 기다릴 여유가 없었습니다.',
      points: [
        '커뮤니티 코드를 공통 패키지로 올리면 일정을 맞출 수 없고, 복사해 사용하면 변경사항 추적이 어렵습니다. 결국 팀 전용 패키지를 통해 영향 범위를 팀 안으로 격리하고, 공통 패키지는 병합은 기술 부채로 남겼습니다.',
        '한편 API 명세가 확정되기 전이라, 기획 초안을 그대로 MSW 핸들러로 구현해 실제 로직을 태워보며 명세의 허점을 미리 찾았습니다. 그중 "내 프로필" 진입 시 본인 userId를 몰라 발생하던 불필요한 직렬 API 호출은, 클라이언트 대신 서버가 세션으로 사용자를 식별하는 전용 엔드포인트를 요청하여 해결했습니다.',
      ],
    },
    result: {
      lead: '주도적인 판단과 결정을 통해, 이관과 개편 모두 3개월 안에 마칠 수 있었습니다.',
      points: [
        '팀 전용 패키지를 통해 공통 패키지 승인 없이 팀 내부 검토만으로 즉시 배포할 수 있게 됐습니다. 다만 팀 전용 패키지를 전사 공통 패키지로 병합하는 것은 기술부채로 남았습니다.',
        '"내 프로필" 페이지의 응답 시간은 개발자도구 네트워크 탭 실측 기준 최소 180ms 줄었습니다. 이 과정에서 프론트엔드 구조에 맞게 API 스키마도 함께 다듬을 수 있었습니다.',
      ],
    },
    flow: {
      problem: '3개월 내 이관+개편 필요, 공통패키지 승인 · API 확정 모두 다른 팀의 일정에 의존',
      decision: '패키지는 통제 가능한 부채로 격리 + API는 MSW로 사전 검증',
      result: '공통 패키지 승인 없이 즉시 배포, 프로필 API 응답시간 180ms 단축',
    },
  },

  // ── 03 · 프로필 접근 제어 모듈 설계 ──────────────────────────────────────────
  {
    id: 'profile-access-control',
    order: 3,
    org: 'kakaopay',
    title: '프로필 접근 제어 모듈 설계',
    tagline:
      '컴포넌트가 데이터 출력과 권한 판단을 동시에 떠안지 않도록, 두 책임을 구조적으로 분리했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.05 – 2025.07',
    stack: ['# Access Control', '# SoC', '# CustomHook'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-B3-327e39398dfb80648a09f4acec413de7',
        label: '접근 제어 모듈 설계',
      },
    ],
    problem: {
      lead: '프로필 개편으로 매매 내역·포트폴리오 같은 민감 데이터가 추가되어 접근 제어가 필요해졌습니다.',
      points: [
        '기존엔 각 컴포넌트가 조건들을 if 분기로 직접 처리했는데, 이미 데이터 로딩, 콜드 케이스, 차단 여부 분기가 있는 상태에서 권한 분기까지 더해지며 한 컴포넌트가 감당해야 할 책임이 비대해졌습니다.',
        '정책이 바뀌면 권한 조건이 관여하는 모든 컴포넌트를 찾아 고쳐야 했고, 수익률처럼 더 민감한 정보를 요구하는 기능이 추가될 가능성이 있어서, 확장에는 열려있지만 변경에는 닫혀있는 설계가 필요했습니다.',
      ],
    },
    decision: {
      lead: '컴포넌트는 "무엇을 보여줄지"만 알고, "왜 못 보여주는지"는 몰라도 되도록 책임을 분리했습니다.',
      points: [
        "접근 제어를 '페이지 접근 자체를 막는 조건'과 '섹션 별 접근 권한을 제어하는 조건'으로 구분하고, useProfilePageAccess와 useProfileSectionAccess 두 훅으로 분리했습니다.",
        "각 섹션 별 필요한 권한은 config로 중앙화하고, 각 훅은 페이지에 canView와 fallback만 반환해서, 페이지는 렌더링 여부는 알 수 있지만, '왜'인지는 모르도록 설계했습니다.",
      ],
    },
    result: {
      lead: '접근 제어 로직의 중앙화를 통해 컴포넌트와 접근 제어 로직을 분리했습니다.',
      points: [
        '앞으로 새로운 약관 조건이 추가되거나 삭제되더라도 기존처럼 모든 페이지의 조건문을 수정할 필요 없이, 변경된 정책에 따라 config를 업데이트 하면 일괄적으로 적용할 수 있습니다. ',
      ],
    },
    flow: {
      problem: '민감 데이터 노출로 접근 조건 3종 → 컴포넌트가 다 알아야 하는 구조',
      decision:
        '페이지·섹션 레이어 분리 + canView·fallback 최소 반환 + 접근 제어 정책 config 중앙화',
      result: '접근 제어 로직 중앙 집중 관리, 정책의 변경에도 컴포넌트 불변',
    },
  },

  // ── 04 · 코드 리뷰 생산성 크롬 익스텐션 ──────────────────────────────────────────
  {
    id: 'code-review-chrome-extension',
    order: 4,
    org: 'kakaopay',
    title: '코드 리뷰 생산성 크롬 익스텐션',
    tagline: '정책으로는 못 풀던 GitHub의 한계를, 크롬 익스텐션으로 해결했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.05 – 2025.07',
    stack: ['# Code Review', '# Chrome Extension', '# GitHub API'],
    refs: [
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-C1-333e39398dfb8099a6a8e47c73d7b7b2',
        label: '리뷰 병목 해결 정책',
      },
      {
        kind: 'docs',
        url: 'https://app.notion.com/p/sums-log/P-C2-Github-333e39398dfb80fb855cf05272c47276',
        label: '크롬 익스텐션 개발기',
      },
    ],
    problem: {
      lead: '여러 서비스가 동시에 개발되는 환경에서 리뷰 대기 중인 PR이 10~30개까지 쌓였고, 배포일 전까지 충분히 검토되지 않은 코드가 급하게 나가곤 했습니다.',
      points: [
        'PR 상태를 확인하려면 목록을 하나씩 열어봐야 했고, 리뷰어와 리뷰이의 답변 왕복에 하루 이상 걸리는 경우가 잦아 중요한 PR이 조용히 묻혔습니다.',
        'PR 분리 규칙·리뷰 코어타임·우선순위 체계 같은 팀 정책을 먼저 시도해 효과를 봤지만, 리뷰 상태 가시성과 실시간 알림만큼은 정책으로 보완할 수 없는 GitHub 플랫폼 자체의 한계로 남았습니다. PR 작성 시 컨벤션에 맞춰 제목·템플릿을 매번 손으로 맞추는 반복 작업도 쌓여 있었습니다.',
      ],
    },
    decision: {
      lead: '가시성 문제는 PR마다 리뷰 상태를 Approve·리뷰 진행 중·리뷰 전 세 단계로 시각화하는 것으로 비교적 단순하게 풀렸지만, 실시간 알림에서는 같은 원인의 기술적 문제를 두 번 만났습니다.',
      points: [
        'GitHub는 Push를 지원하지 않아 폴링을 택했는데, setInterval은 얼마 안 가 멈췄습니다. Manifest V3의 Service Worker는 활동이 없으면 브라우저가 종료시키기 때문이었고, 종료돼도 유지되는 chrome.alarms API로 교체해 해결했습니다.',
        '이어서 Last-Modified 헤더로 304 응답을 활용해 요청을 줄이려 했지만, 전역 변수가 Service Worker 재활성화마다 초기화돼 무용지물이었습니다. 같은 원인이라 chrome.storage로 값을 유지해 해결했습니다.',
        '여기에 더해 브랜치명 컨벤션 인식으로 PR 제목·템플릿을 자동 추천하는 어시스턴트도 만들었습니다.',
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
      decision:
        '리뷰 상태 시각화 + Service Worker 문제 두 번(chrome.alarms·storage) + PR 작성 어시스턴트',
      result: '리뷰 기한 만료 PR 50%+ 감소, 사내 FE 챕터 배포',
    },
  },

  // ── 05 · responsive-keepalive ─ 반응형 트리 전환 상태 보존 라이브러리 ──────────────────────────────────────────
  {
    id: 'responsive-keepalive',
    order: 5,
    org: 'personal',
    title: 'responsive-keepalive ─ 반응형 트리 전환 상태 보존 라이브러리',
    tagline: '브레이크포인트마다 다른 트리를 렌더링해도, 상태는 잃지 않도록 만들었습니다.',
    role: 'Frontend · 개인',
    period: '2026.05 – 2026.06',
    stack: ['# NPM Package', '# Adaptive UI', '# Keep-Alive', '# Activity'],
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
      lead: 'Evenly 프로젝트에서 반응형 분기가 늘어날수록 컴포넌트 하나에 담긴 Tailwind 클래스네임이 복잡하게 뒤엉켰습니다.',
      points: [
        '브레이크포인트별로 컴포넌트를 분리했는데, isDesktop 조건부 렌더링 시 리마운트되며 상태가 유실됐습니다. 결국 상태와 로컬 상태, UI의 열림 여부까지 부모가 떠안아야 했습니다.',
        '기존엔 UI를 숨기는 방법이 두 가지뿐이었습니다. 조건부 렌더링은 트리를 파괴해 상태를 잃었고, CSS display:none은 상태는 지키지만 타이머·구독 같은 이펙트가 계속 돌아 자원을 낭비했습니다.',
      ],
    },
    decision: {
      lead: '조건부 렌더링과 display:none 사이의 딜레마는, 숨겨질 때 DOM과 상태는 그대로 두고 이펙트만 정리했다가 다시 보일 때 재실행하는 React 19.2 실험적 API <Activity>로 풀렸습니다.',
      points: [
        '핵심은 mode만 토글하고 key는 고정하는 것이었습니다. React가 같은 인스턴스로 인식해 구조를 보존하면서, 부수 효과만 안전하게 정리·재생성했습니다.',
        '그 위에 문제 크기별로 API 3종을 나눴습니다 — 트리는 useMediaVariant, 카드는 useContainerVariant, 값 하나는 useResponsiveValue입니다.',
        'SSR에서는 서버가 화면 너비를 몰라 렌더링할 컴포넌트를 판단할 수 없었습니다. 주 사용 환경을 기본값으로 렌더링한 뒤 실제 환경이 다르면 빠르게 전환했고, 구버전 React는 activate.ts에서 DIP 원칙에 따라 swap으로 자동 전환하도록 했습니다.',
      ],
    },
    result: {
      lead: '그 설계대로 동작을 검증한 뒤, 런타임 의존성 없이 npm에 배포했습니다.',
      points: ['97개 테스트와 98.6% 라인 커버리지로 완성도를 확인했습니다.'],
    },
    flow: {
      problem: 'Tailwind 클래스네임 복잡화로 컴포넌트 분리 시도 → 조건부 렌더링 시 상태 유실',
      decision: 'Activity(key 고정+mode 토글)로 상태 보존 + API 3종 분리 + SSR·구버전 대응',
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
    tagline:
      '서버가 계산을 맡는 구조에서, 프론트엔드가 진짜 책임지는 영역을 깊게 파고든 프로젝트입니다.',
    description:
      '여행·모임 지출을 모아 “누가 누구에게 얼마”를 최소 송금으로 정리해주는 더치페이 서비스입니다. 정산 계산은 서버가 맡고 있어, 저는 의도적으로 프론트엔드의 핵심 역량 — 재사용 가능한 UI 추상화와 HTTP·인증 설계 — 을 끝까지 밀어붙이는 것을 이 프로젝트의 목표로 삼았습니다.',
    role: 'Frontend',
    period: '2025.06 – 진행 중',
    stack: ['# Imperative Overlay', '# Single-flight', '# Runtime Guard'],
    refs: [{ kind: 'github', url: 'https://github.com/EvenlyTeam/evenly-frontend' }],
    highlights: [
      {
        label: '명령형 오버레이 (useOverlay)',
        tone: 'tech',
        problem:
          '지출 삭제·정산 완료·회원 탈퇴 등 확인 다이얼로그가 화면마다 반복됐는데, 매번 isOpen state와 콜백을 부모가 들고 있어야 해 보일러플레이트가 쌓였습니다.',
        solution:
          '모달을 트리에 선언하는 대신 const ok = await confirm({...}) 한 줄로 여는 Promise 기반 오버레이를 만들었습니다. Portal로 트리 밖에 렌더하고, 언마운트 시 Promise를 정리하며, 여러 개가 쌓여도 스택으로 관리되도록 설계했습니다.',
      },
      {
        label: '공유링크 대응 이중 HTTP 계층',
        tone: 'tech',
        problem:
          '인증 API는 401 응답을 받으면 토큰을 재발급해야 하지만, 비로그인자가 여는 읽기 전용 공유링크(/shared)에서 같은 인터셉터가 돌면서 불필요한 재발급 요청과 무한 루프가 발생했습니다.',
        solution:
          '인증용과 공개용 axios 인스턴스를 분리해, 재발급 인터셉터가 걸리는 요청 범위 자체를 구조적으로 갈랐습니다. 공유링크는 토큰 없이도 안전하게, 인증 요청만 재발급 흐름을 타도록 했습니다.',
      },
      {
        label: '토큰 자동 재발급 인터셉터',
        tone: 'tech',
        problem:
          'access 토큰이 만료돼 여러 요청이 동시에 401을 받으면, 각 요청이 제각기 refresh를 호출해 재발급이 중복되고 토큰 회전이 꼬였습니다.',
        solution:
          '첫 401에서만 refresh를 실행하고 나머지 요청은 그 Promise를 기다리도록 single-flight로 묶었습니다. 재발급이 끝나면 대기 요청을 새 토큰으로 재시도합니다. 다만 대기 중 refresh token이 만료되면 큐를 모두 실패 처리하고 재로그인으로 보내는 예외 처리는 여전히 신경 써야 합니다.',
      },
      {
        label: '컴파운드 컴포넌트 + 런타임 가드',
        tone: 'tech',
        problem:
          'GroupCard·Navbar 같은 합성 컴포넌트가 늘면서, 하위 조각을 부모 밖에서 잘못 쓰면 조용히 깨지는 실수가 생길 수 있었습니다.',
        solution:
          'createCompoundGuard로 Context 존재를 검사해, <GroupCard.Title>을 <GroupCard> 밖에서 쓰면 명확한 메시지의 런타임 에러를 던지게 했습니다. 오용을 침묵시키지 않고 즉시 드러내는 설계이지만, Context 값이 바뀌면 무관한 하위 컴포넌트까지 리렌더링되고 가드도 런타임에만 오용을 잡아낸다는 한계는 남아 있습니다.',
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
    tagline: '하나의 서비스를 처음부터 끝까지 만들며, 다양한 문제들을 경험하고 해결하였습니다.',
    description:
      '자주 쓰는 코드를 매번 이전 프로젝트에서 뒤지던 개발자를 위해, 코드 템플릿을 저장하고 빠르게 검색·재사용하는 서비스입니다. 프론트엔드 3인·백엔드 5인이 실사용 서비스로 배포했고, 저는 프론트엔드 개발자로 참여했습니다.',
    role: 'Frontend · FE 3인 · BE 5인',
    period: '2024.07 – 2024.11',
    stack: ['# Tree Shaking', '# Code Splitting', '# Design System', '# Accessibility'],
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
        problem:
          '핵심 기능인 코드 에디터(CodeMirror)의 압축 전 번들 크기가 8MB에 달해, 첫 화면 로드가 눈에 띄게 무거웠습니다.',
        solution:
          'bundle-analyzer로 뜯어보니 실제로 쓰지 않는 언어 문법까지 전부 포함돼 있었습니다. 지원 언어를 실사용분으로 좁혀 Tree Shaking이 걸리게 하고, 에디터는 Dynamic Import로 초기 번들에서 떼어내 webpack 압축 기준 2.2MB에서 1.4MB로 줄였습니다.',
      },
      {
        label: '디자인 시스템',
        tone: 'tech',
        problem:
          '재사용성과 선언적 레이아웃에 끌려 <Flex>를 레이아웃의 최소 단위로 도입했는데, 실제 화면에 쓸수록 direction·gap 같은 프롭스가 마크업을 뒤덮고 <Flex>가 무한 중첩됐습니다.',
        solution:
          '구조를 읽을 수 없는 "Flex Soup"과 Emotion의 의미 있는 네이밍 상실을 겪었지만, 이미 쓰인 모든 Flex를 걷어내는 전면 리팩토링은 남은 개발 공수로 감당할 수 없어 진행하지 않았습니다. 대신 이후로는 무조건적인 세분화 대신 기술 스택 특성에 맞춰 추상화 수준을 판단하는 기준으로 새 컴포넌트를 설계하고 있습니다.',
      },
      {
        label: '웹 접근성',
        tone: 'tech',
        problem:
          '모달을 열어도 초점이 뒤 배경으로 새어나가고, 비동기로 바뀐 목록을 스크린리더가 읽어주지 않았습니다.',
        solution:
          '자동 검사 도구로는 잡히지 않아 VoiceOver·TalkBack 실기기로 직접 흐름을 따라가며, 포커스 트랩으로 초점을 모달 안에 가두고 aria-live로 변경 사항을 읽어주도록 고쳤습니다.',
      },
      {
        label: '레이아웃 시프트',
        tone: 'tech',
        problem:
          '목록·상세가 로드될 때마다 아래 콘텐츠가 밀려, 누르려던 버튼이 어긋나는 레이아웃 시프트가 반복됐습니다(CLS 0.8).',
        solution:
          '스켈레톤만으로는 실제 콘텐츠와 높이가 어긋나 시프트가 남았기에, 응답 전에 최종 높이값 자체를 예약해 콘텐츠가 그 자리에 그대로 들어오도록 만들어 CLS를 0.3으로 낮췄습니다.',
      },
    ],
  },
];
