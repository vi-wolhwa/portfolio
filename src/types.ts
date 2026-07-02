import type { ComponentType, ReactNode } from 'react';

/** 프로젝트가 어떤 소속에서 나온 것인지 — 배지 색이 달라집니다. */
export type OrgVariant = 'personal' | 'intern' | 'bootcamp';

/** 표지 기술 스택의 한 줄 (예: Core / React·Next.js·…) */
export interface SkillGroup {
  label: string;
  items: string[];
}

/** 표지 연락처 링크 */
export interface ContactLink {
  label: string;
  href: string;
  text: string;
}

/** 표지 "대표 프로젝트" 목차의 한 행에 들어가는 정보 */
export interface IndexMeta {
  title: ReactNode;
  summary: ReactNode;
  keywords: ReactNode;
  /** 오른쪽 소속 라벨 (예: 카카오페이증권 / 개인 프로젝트 / 우아한테크코스) */
  org: string;
  /** 개인 프로젝트면 true → 초록색으로 표시 */
  orgPersonal?: boolean;
  /** 오른쪽 역량 태그 (예: 성능 · 아키텍처) */
  competency: string;
}

/**
 * 프로젝트 하나 = 목차 메타(index) + 실제 페이지 컴포넌트(Component).
 * src/data/projects.tsx 에서 이 배열의 순서가 곧 포트폴리오의 순서입니다.
 */
export interface ProjectEntry {
  id: string;
  index: IndexMeta;
  Component: ComponentType;
}
