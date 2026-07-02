import { ProjectPage } from '../components/layout/ProjectPage';
import { FlowSteps } from '../components/sections/FlowSteps';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Code } from '../components/primitives/Code';
import { Highlight } from '../components/primitives/Highlight';

export function CodeZapProject() {
  return (
    <ProjectPage
      title="코드잽 (CodeZap)"
      en={
        <>
          Bootcamp
          <br />
          Team Project
        </>
      }
      badge={{ variant: 'bootcamp', label: '우아한테크코스 6기 · 팀 프로젝트' }}
      contextDetail="소스코드 저장·공유 플랫폼 · 5개월(2024.07–2024.11)"
    >
      <ValueStatement>
        배포 자동화부터 <Highlight>번들·CLS·웹 접근성 최적화</Highlight>까지, 서비스를 끝까지 완성도 있게 만드는
        기본기를 다졌다.
      </ValueStatement>

      <Section title="AWS CI/CD 파이프라인 구축" en="Deploy Automation">
        <FlowSteps
          steps={[
            {
              name: '빌드·검증',
              text: (
                <>
                  GitHub Actions로 배포 파이프라인 구축. 브랜치 병합 시 <strong>타입 체크·단위 테스트</strong>를 자동
                  실행해 결함을 사전에 방지하고, 빌드 단계에서 번들 사이즈를 측정해 모니터링했다.
                </>
              ),
            },
            {
              name: '정적 호스팅',
              text: (
                <>
                  S3·CloudFront 기반으로 정적 웹 호스팅 환경을 구성하고, <strong>AWS Lambda 트리거</strong>로 CloudFront
                  캐시 무효화까지 자동화했다.
                </>
              ),
            },
            {
              name: '가시화',
              text: (
                <>
                  배포 단계별 실시간 알림을 연동해 장애 대응 시간을 줄이고, 수동으로 하던 통합·배포 과정을 자동화해 소요
                  기간을 <strong>3일 → 즉시</strong>로 단축했다.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="성능·품질 트러블슈팅" en="Optimization">
        <TroubleCards
          cards={[
            {
              tag: '번들',
              title: 'CodeMirror 8MB 번들 최적화',
              body: (
                <>
                  webpack-bundle-analyzer로 비대화 원인을 파악 → 지원 언어를 축소해 Tree Shaking 적용,{' '}
                  <span className="fix">Dynamic Import 기반 Code Splitting</span>으로 초기 로드 리소스 절감.
                </>
              ),
            },
            {
              tag: 'CLS',
              title: '레이아웃 시프트 개선',
              body: (
                <>
                  부적절한 스켈레톤 UI로 CLS가 나쁘던 문제 → 데이터 응답 전 UI 영역의{' '}
                  <span className="fix">높이값을 명시적으로 예약</span>해 레이아웃 안정성 확보.
                </>
              ),
            },
            {
              tag: 'GPU',
              title: '메인 스레드 연산 분산',
              body: (
                <>
                  애니메이션 속성을 <Code>transform</Code> 등 Composite 레이어로 대체해{' '}
                  <span className="fix">렌더링 부하를 GPU로 오프로딩</span>.
                </>
              ),
            },
            {
              tag: '접근성',
              title: '스크린리더·포커스 제어',
              body: (
                <>
                  VoiceOver·Talkback으로 직접 테스트해 정보 단절 구간 식별 → 시맨틱 HTML·ARIA로 탐색 구조 보장,{' '}
                  <span className="fix">포커스 트랩</span>과 <Code>aria-live</Code>로 상태 변화 음성 피드백 제공.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="결과" en="Outcome">
        <MetricGrid
          metrics={[
            { value: '2.2MB→1.4MB', green: true, label: '전체 번들 사이즈' },
            { value: '0.8→0.3', green: true, label: 'CLS 지표 개선' },
            { value: '3일→즉시', label: '수동 통합·배포 소요 기간 단축' },
            { value: '직접 테스트', label: 'VoiceOver·Talkback 기반 접근성 검증' },
          ]}
        />
      </Section>

      <FootBlock
        tags={['React', 'TypeScript', 'Emotion', 'Webpack', 'AWS(S3/CloudFront/Lambda)', 'GitHub Actions', 'Playwright']}
        links={{
          heading: '저장소',
          items: [
            {
              href: 'https://github.com/woowacourse-teams/2024-code-zap',
              label: 'GitHub — woowacourse-teams/2024-code-zap',
            },
          ],
        }}
      />
    </ProjectPage>
  );
}
