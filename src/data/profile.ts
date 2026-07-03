import type { Profile } from '@/types/portfolio';

/**
 * 커버(목차) 페이지 개인 정보.
 * 왼쪽 = 이름·소개·키워드, 오른쪽 = 사진(옵션)·링크.
 * showPhoto 를 false 로 두면 오른쪽 열에 사진이 빠진다.
 */
export const profile: Profile = {
  name: '남수민',
  role: 'Frontend Developer',
  thesis:
    '문제를 먼저 정의하고, 사용자·팀의 비용으로 우선순위를 정해 움직이는 프론트엔드 개발자입니다.',
  showPhoto: false, // 사진을 넣으려면 true 로 바꾸고 photoUrl 지정
  photoUrl: '', // 예: '/me.jpg' (public 폴더) 또는 외부 URL
  contacts: [
    { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
    { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com/yourname' },
    { label: 'Blog', value: 'yourblog.dev', href: 'https://yourblog.dev' },
  ],
  keywords: ['웹 성능 최적화', 'DX / 협업 자동화', '문제 정의 & 의사결정', 'React · TypeScript'],
};
