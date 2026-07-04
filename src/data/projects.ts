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
      problem: '차트 로딩 속도에 대한 VoC 유입\n차트는 구조적으로 SSR 불가능',
      decision: 'SSR → 차트 프리페칭·스켈레톤\nstartTransition 우선순위 설계',
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
      problem: '3개월 내 이관+개편 필요\n공통패키지 승인과 API 확정 모두 다른 팀의 일정에 의존',
      decision: '패키지는 통제 가능한 부채로 격리\nAPI는 MSW로 사전 검증',
      result: '공통 패키지 승인 없이 즉시 배포\n프로필 API 응답시간 180ms 단축',
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
      decision: '페이지·섹션 레이어 분리\ncanView·fallback 최소 반환\n접근 제어 정책 config 중앙화',
      result: '접근 제어 로직 중앙 집중 관리\n정책의 변경에도 컴포넌트 불변',
    },
  },

  // ── 04 · 코드 리뷰 생산성 크롬 익스텐션 ──────────────────────────────────────────
  {
    id: 'code-review-chrome-extension',
    order: 4,
    org: 'kakaopay',
    title: '코드 리뷰 생산성 크롬 익스텐션',
    tagline:
      '코드 리뷰 정책으로도 해결되지 않았던 Github의 한계를, 크롬 익스텐션으로 해결했습니다.',
    role: 'Frontend · 인턴',
    period: '2025.05 – 2025.07',
    stack: ['# Code Review', '# Chrome Extension', '# Github API'],
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
      lead: '바쁜 일정 속에서 충분히 검토되지 않은 PR이 급하게 배포되어 운영 장애를 일으키곤 했습니다.',
      points: [
        '수 많은 PR들의 리뷰 상태를 확인하려면 목록을 하나씩 열어봐야 했습니다.',
        '실시간 커뮤니케이션의 한계로 리뷰어-리뷰이 간 소통과 승인까지 수 일이 소요되었습니다.',
        'Github는 PR 멀티템플릿을 지원하지 않았기 때문에, 일관되지 않은 PR 내용은 가독성이 좋지 않았습니다.',
      ],
    },
    decision: {
      lead: 'PR의 리뷰상태 시각화와 실시간 알림을 도입하고, 템플릿 자동완성으로 컨벤션을 통일했습니다.',
      points: [
        '리뷰 상태를 None · Required · Pending · Approved 4단계로 시각화했습니다. 리뷰에 대한 답변을 받아서 재리뷰 요청을 받은 경우도 Required로 표시하여, 빠른 피드백이 가능하도록 설계했습니다.',
        'Polling 방식으로 알람을 가져와서 실시간 소통이 가능하도록 했습니다. Service Worker가 메모리 절약을 위해 종료되는 문제를 해결하기 위해 chrome.alarms API를 통해 서비스워커를 주기적으로 깨웠습니다.',
        '일관된 컨벤션을 보장하기 위하여, 브랜치명 기반의 PR 제목·본문 템플릿 자동완성 기능을 제공했습니다.',
      ],
    },
    result: {
      lead: '베타 테스트에서 기간 만료 PR이 50% 감소했으며, FE 챕터 전체에 성공적으로 배포했습니다',
      points: [
        '팀 내에서 스프린트(3주) 동안 테스트한 결과 기한이 만료되는 PR의 비율이 50% 감소했습니다.',
        'FE 전체 챕터 기술 발표에서 공개 및 배포했으며, Github Issue로 피드백을 받고 개선했습니다.',
      ],
    },
    flow: {
      problem: 'PR의 리뷰 상태 파악이 어려움\n소통 지연으로 인한 리뷰 병목\n일관성 없는 작성 양식',
      decision: 'PR 리뷰 상태 시각화\n백그라운드 실시간 알림\n브랜치명 기반 템플릿 자동완성',
      result: '리뷰 기한 만료 PR 50% 감소\n사내 FE 챕터 전체 배포',
    },
  },

  // ── 05 · responsive-keepalive ─ 반응형 트리 전환 상태 보존 라이브러리 ──────────────────────────────────────────
  {
    id: 'responsive-keepalive',
    order: 5,
    org: 'personal',
    title: '반응형 컴포넌트 트리 전환 상태 보존 라이브러리',
    tagline:
      '브레이크포인트마다 서로 다른 컴포넌트를 상태를 보존한 채로 교체할 수 있는 NPM 라이브러리입니다.',
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
      lead: 'Tailwind를 사용한 프로젝트에서 반응형 분기가 늘어날수록 컴포넌트의 가독성이 떨어졌습니다.',
      points: [
        '가독성을 위해 브레이크포인트별로 컴포넌트를 분리했더니, 조건부 렌더링에서 리마운트되며 상태가 유실됐습니다. 유실을 막으려면 두 컴포넌트 간 공유 상태와 로컬 상태를 부모가 관리해야 했습니다.',
        'display:none 속성은 상태는 지켰지만, 타이머·구독 등의 이펙트가 계속 활성화되어 자원을 낭비했습니다.',
      ],
    },
    decision: {
      lead: '상태를 지키려면 자원을 포기해야 했고, 자원을 아끼려면 상태를 포기해야 하는 줄 알았습니다.',
      points: [
        '조건부 렌더링은 자원은 아꼈지만 상태를 버렸고, display:none은 상태는 지켰지만 자원을 낭비했습니다. React의 새 API인 Activity는 화면만 감추고 상태는 그대로 둔 채 불필요한 부수 효과만 정리해, 둘 다 해결할 수 있었습니다.',
        '화면 전체 교체, 컨테이너 하나의 레이아웃 변경, 값 하나 변경과 같은 다양한 상황을 겪었습니다. 그래서 하나의 팩토리 API만 제공하는 대신, 각 상황에 사용할 수 있는 API들을 분리하였습니다. ',
        '구현 중 화면 경계를 빠르게 오가면 화면이 깜빡이고, 한글 입력 도중 화면이 전환되면 입력이 끊기는 문제를 직접 발견했습니다. 상태의 지연 업데이트와 한글 조합 중 전환 방지 옵션을 추가했습니다.',
      ],
    },
    result: {
      lead: '베타 버전을 r/reactjs에 공개해 실제 개발자들의 리뷰를 받았습니다.',
      points: [
        '리뷰어들조차 화면이 숨겨져도 이펙트가 계속 도는 것 아니냐고 오해할 만큼, 이 기능의 핵심 장점이 충분히 전달되지 않았고, 최신 API인 만큼 기능을 제대로 설명하는 아키텍처 문서를 작성했습니다.',
        "'상태를 무조건 지키는 게 항상 옳은가'라는 반문을 받고, 스크롤 위치나 포커스처럼 오히려 초기화가 맞는 상태도 있다는 걸 인정해 다음 버전 설계에 반영하기로 했습니다.",
      ],
    },
    flow: {
      problem: '조건부 렌더링 시 상태 유실\ndisplay:none은 자원 낭비',
      decision:
        '상태 보존·자원 절약, 트레이드오프 없이 둘 다 확보\n문제 크기별로 다른 해법 제공\n실사용 중 발견한 UX 문제 대응',
      result: '베타 버전 리뷰를 통해 문서화 부족 및 설계 누락 발견\n정식 버전 설계에 반영',
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
    tagline:
      'FE 개발자로서 진행한 첫 프로젝트로서, 하나의 서비스를 처음부터 만들며 다양한 문제들을 마주쳤습니다.',
    description:
      '자주 쓰는 코드를 찾기 위해서 매번 이전 프로젝트에서 뒤지던 개발자를 위해, 코드 템플릿을 저장하고 빠르게 검색·재사용하는 서비스입니다. 프론트엔드 3인·백엔드 5인이 실사용 서비스로 배포했고, UI 개발부터, 디자인시스템, E2E, 성능최적화, 웹 접근성까지 다양한 문제를 마주하고 해결하였습니다.',
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
          'bundle-analyzer로 분석해보니, 실제로 쓰지 않는 언어 문법까지 전부 포함돼 있었습니다. 지원 언어를 실사용분으로 좁혀 Tree Shaking이 걸리게 하고, 에디터는 Dynamic Import로 초기 번들에서 떼어내 webpack 압축 기준 2.2MB에서 1.4MB로 줄였습니다.',
      },
      {
        label: '디자인 시스템',
        tone: 'tech',
        problem:
          '재사용성과 선언적 레이아웃에 끌려 <Flex>를 레이아웃 최소 단위로 도입했는데, 스타일이 다양해질수록 스타일 Props가 마크업을 뒤덮었고, Styled-component의 시멘틱 네이밍 이점도 무색해졌습니다.',
        solution:
          '레이아웃을 원자 단위로 쪼개는 방식은 유틸리티 클래스를 조합하는 스택에는 어울리지만, Styled-component처럼 의미를 담아 구조를 읽게 하는 스택과는 방향이 반대라는 걸 뒤늦게 알았습니다. 이미 퍼진 <Flex>를 걷어내는 전면 리팩토링은 남은 개발 공수로 감당하기 어려워 진행하지 않았습니다. 대신 이후로는 미리 아토믹한 디자인 시스템 컴포넌트를 정의하지 않고, 요구사항에 따라 점진적으로 확장하고 있습니다.',
      },
      {
        label: '웹 접근성',
        tone: 'tech',
        problem:
          '모달을 열어도 포커스가 배경으로 새어나가고, 비동기로 바뀐 목록을 스크린리더가 읽어주지 않았습니다.',
        solution:
          'Focus Trap으로 포커스를 모달 안에 가두었고, VoiceOver·TalkBack을 통해 직접 흐름을 테스트하며 aria-live 등의 ARIA 속성으로 접근성이 취약한 곳들을 찾아서 개선했습니다.',
      },
      {
        label: '레이아웃 시프트',
        tone: 'tech',
        problem:
          '목록·상세가 로드될 때마다 아래 콘텐츠가 밀려, 누르려던 버튼이 어긋나는 레이아웃 시프트가 반복됐습니다.',
        solution:
          '스켈레톤만으로는 실제 콘텐츠와 높이가 어긋나 시프트가 남았기에, 응답 전에 line-clamp와 고정 height로 최종 높이값 자체를 예약해 콘텐츠가 그 자리에 그대로 들어오도록 만들어 CLS를 0.8에서 0.3으로 낮췄습니다.',
      },
    ],
  },
];
