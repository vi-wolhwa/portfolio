/**
 * 포트폴리오 데이터 스키마
 * -----------------------------------------------------------------------------
 * 이 스키마는 "면접관이 한 눈에 스토리를 납득한다" 는 목표를 구조로 강제한다.
 * 각 프로젝트는 반드시 세 막(문제 → 판단 → 결과)으로 흐른다.
 * 세부 작성 원칙은 /README.md 의 "글 작성 원칙" 참고.
 */

/** 상단에 크게 노출되는 참고 링크 (프로젝트당 1~3개 권장) */
export interface RefLink {
  /** 버튼에 보이는 짧은 라벨. 예: 'GitHub', 'Live', '회고', '발표' */
  label: string;
  url: string;
  /** 아이콘/색을 결정하는 종류 */
  kind: 'github' | 'live' | 'blog' | 'video' | 'docs' | 'design';
}

/** 결과 지표 (before → after). 정량 성과가 있을 때만 사용 */
export interface Metric {
  /** 지표 이름. 예: 'FCP', '리뷰 지연 PR', '재현율' */
  label: string;
  /** 개선 전 값 (없으면 생략) */
  before?: string;
  /** 개선 후 / 달성 값 */
  after: string;
  /** 요약 배지. 예: '-60%', '2주 → 3일' */
  delta?: string;
}

/** 한 막(act)을 이루는 문단. lead 는 두괄식 핵심 한 문장 */
export interface Act {
  /** 이 막의 소제목 (선택). 짧게. */
  heading?: string;
  /** 두괄식 핵심 문장. 이 한 줄만 읽어도 요지가 전달돼야 한다. */
  lead: string;
  /** 근거/디테일 불릿. 각 1~2줄, 2~4개 권장. */
  points: string[];
}

export interface Project {
  id: string;
  /** 목차·페이지에 표기되는 순번 (1부터) */
  order: number;
  title: string;
  /** 면접관이 3초 안에 '무엇을·왜'를 파악하는 한 줄 요약 */
  tagline: string;
  /** 역할·인원. 예: 'Frontend · 4인 팀' */
  role: string;
  /** 기간. 예: '2024.03 – 2024.06' */
  period: string;
  /** 기술 태그 (5~8개 권장, 나열은 최소화) */
  stack: string[];
  /** 상단 고정 참고 링크 (1~3개) */
  refs: RefLink[];

  /** 1막 — 문제·배경: 왜 이게 문제였는지 상황을 구체적으로 */
  problem: Act;
  /** 2막 — 고민 & 의사결정 (또는 트러블슈팅): 선택지→기준→결정 */
  decision: Act;
  /** 3막 — 결과: 두괄식 성과 + 지표 */
  result: Act;

  /** 결과 막에 함께 노출되는 정량 지표 (선택) */
  metrics?: Metric[];
}

export interface Profile {
  name: string;
  /** 직군 한 줄. 예: 'Frontend Developer' */
  role: string;
  /** 자신을 규정하는 한 문장 (thesis). 목차 페이지의 히어로 문구 */
  thesis: string;
  contacts: { label: string; value: string; href?: string }[];
  /** 대표 역량 키워드 (3~5개) */
  keywords: string[];
}
