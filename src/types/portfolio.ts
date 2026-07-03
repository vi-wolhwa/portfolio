/**
 * 포트폴리오 데이터 스키마
 * -----------------------------------------------------------------------------
 * "면접관이 한 눈에 스토리를 납득한다"는 목표를 구조로 강제한다.
 * 각 프로젝트는 문제 → 판단 → 결과 3막으로 흐르고, 하단 flow 한 줄 요약으로 닫힌다.
 * 정량 수치는 별도 카드가 아니라 각 막의 문장 안에 자연스럽게 녹여 쓴다 —
 * 섹션이 나뉘어 있어도 하나의 스토리처럼 유기적으로 이어지는 것이 핵심이다.
 * 세부 작성 원칙은 /README.md 참고.
 */

/**
 * 참고 링크 (프로젝트당 1~3개).
 * - github / npm : URL 만 입력 (라벨은 자동)
 * - docs         : 문서마다 제목이 다르므로 label 을 직접 입력
 */
export type RefLink =
  | { kind: 'github'; url: string }
  | { kind: 'npm'; url: string }
  | { kind: 'docs'; url: string; label: string };

/** 한 막(act). lead 는 두괄식 핵심 한 문장. */
export interface Act {
  /** 소제목 (선택). 짧게. */
  heading?: string;
  /** 그 한 줄만 읽어도 요지가 전달되는 문장 */
  lead: string;
  /** 근거·디테일 불릿. 각 1~2줄, 2~4개 권장. 정량 수치도 문장 안에 자연스럽게 녹여 쓴다. */
  points: string[];
}

/** 하단 flow 요약 — 문제/판단/결과 각 한 줄을 카드로 이어, 본문을 안 읽어도 흐름이 잡히게 한다. */
export interface FlowSummary {
  /** 빨간 카드 (문제) */
  problem: string;
  /** 파란 카드 (판단) */
  decision: string;
  /** 초록 카드 (결과) */
  result: string;
}

export interface Project {
  id: string;
  /** 목차·페이지 순번 (1부터) */
  order: number;
  /** 조직 태그 키 (src/data/organizations.ts 의 키) */
  org: string;
  title: string;
  /** 3초 안에 '무엇을·왜'가 읽히는 한 줄 요약 */
  tagline: string;
  /** 역할·인원. 예: 'Frontend · 4인 팀' */
  role: string;
  /** 기간. 예: '2024.03 – 2024.06' */
  period: string;
  /** 기술 태그 (5~8개 권장) */
  stack: string[];
  /** 상단 고정 참고 링크 (1~3개) */
  refs: RefLink[];

  /** 1막 — 문제·배경 */
  problem: Act;
  /** 2막 — 고민 & 의사결정 (또는 트러블슈팅) */
  decision: Act;
  /** 3막 — 결과 */
  result: Act;

  /** 하단 flow 요약 카드 (선택이지만 강력 권장) */
  flow?: FlowSummary;
}

/** 조직 태그. 색은 자유롭게 커스텀 (fg=글자, bg=배경). */
export interface Organization {
  label: string;
  fg: string;
  bg: string;
}

export interface Profile {
  name: string;
  role: string;
  /** 자신을 규정하는 한 문장 (thesis) */
  thesis: string;
  /** 오른쪽 열 사진 노출 여부 */
  showPhoto: boolean;
  /** 사진 URL (showPhoto 가 true 일 때 사용) */
  photoUrl?: string;
  contacts: { label: string; value: string; href?: string }[];
  keywords: string[];
}
