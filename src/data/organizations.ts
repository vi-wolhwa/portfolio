import type { Organization } from '@/types/portfolio';

/**
 * 조직 태그 정의. 색은 자유롭게 커스텀 가능 (fg = 글자색, bg = 약한 배경색).
 * 팔레트는 현재 디자인 테마(약한 배경 + 채도 있는 글자)에 맞춰 뽑았다.
 *
 * 새 조직을 추가하려면 여기 키를 추가하고, projects.ts 의 project.org 에 그 키를 넣으면 된다.
 */
export const organizations: Record<string, Organization> = {
  // 카카오페이증권 — 노란색 계열
  kakaopay: { label: '카카오페이증권', fg: '#8A6B00', bg: '#FCF2CE' },
  // Evenly팀 — 초록색 계열
  evenly: { label: 'Evenly Team', fg: '#157A4E', bg: '#E4F4EA' },
  // 개인 프로젝트 — 회색 계열
  personal: { label: '개인 프로젝트', fg: '#5A6472', bg: '#EDF0F4' },
  // 우아한테크코스 — 하늘색(배달의민족) 계열
  woowacourse: { label: '우아한테크코스', fg: '#1585C4', bg: '#E1F1FB' },
};
