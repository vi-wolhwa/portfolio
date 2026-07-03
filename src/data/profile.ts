import type { Profile } from '@/types/portfolio';

/**
 * 커버(목차) 페이지 개인 정보.
 * 왼쪽 = 이름·소개·키워드, 오른쪽 = 사진(옵션)·링크.
 * showPhoto 를 false 로 두면 오른쪽 열에 사진이 빠진다.
 */
export const profile: Profile = {
  name: '남수민',
  role: 'Frontend Engineer',
  thesis: [
    '우아한테크코스와 카카오페이증권을 거치며 수백만 사용자를 대상으로 서비스의 기획부터 개발, 배포까지 경험한 프론트엔드 엔지니어입니다.',
    '단순한 UI 구현을 넘어, 차트 렌더링 파이프라인 최적화, 의존성이 격리된 접근 제어 모듈 설계, 크롬 익스텐션 기반의 개발 생산성 향상 도구 배포 등 다양한 문제를 직접 정의하고 구조적으로 해결해 왔습니다.',
    '저만의 웹 생태계를 구축하는 <AudeModo> 프로젝트를 진행 중입니다. React/Spring을 넘어 웹 생태계 전반을 이해하고, 비즈니스의 복잡한 문제를 가장 효율적인 아키텍처로 풀어내는 올라운드 엔지니어를 목표로 합니다.',
  ],
  showPhoto: true, // public/me.png 를 사용. 사진을 빼려면 false
  photoUrl: '/me.png', // public 폴더의 파일은 '/파일명' 으로 접근한다
  contacts: [
    { label: 'Phone', value: '010-3773-1856', href: '' },
    { label: 'Email', value: 'cerezo00@naver.com', href: 'mailto:cerezo00@naver.com' },
    { label: 'GitHub', value: 'github.com/vi-wolhwa', href: 'https://github.com/vi-wolhwa' },
  ],
  keywords: [],
};
