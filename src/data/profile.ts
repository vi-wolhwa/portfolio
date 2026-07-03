import type { Profile } from '@/types/portfolio';

/**
 * 커버(목차) 페이지에 들어가는 개인 정보.
 * thesis 는 "나는 어떤 개발자인가"를 한 문장으로 못박는 히어로 문구다.
 * 실제 정보로 교체하세요.
 */
export const profile: Profile = {
  name: '남수민',
  role: 'Frontend Developer',
  thesis:
    '문제를 먼저 정의하고, 사용자·팀의 비용으로 우선순위를 정해 움직이는 프론트엔드 개발자입니다.',
  contacts: [
    { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
    { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com/yourname' },
    { label: 'Blog', value: 'yourblog.dev', href: 'https://yourblog.dev' },
  ],
  keywords: ['웹 성능 최적화', 'DX / 협업 자동화', '문제 정의 & 의사결정', 'React · TypeScript'],
};
