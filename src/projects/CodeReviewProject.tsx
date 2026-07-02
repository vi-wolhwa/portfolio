import { ProjectPage } from '../components/layout/ProjectPage';
import { Bullets } from '../components/sections/Bullets';
import { CodeBlock } from '../components/sections/CodeBlock';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Code } from '../components/primitives/Code';
import { Highlight } from '../components/primitives/Highlight';

export function CodeReviewProject() {
  return (
    <ProjectPage
      title="코드리뷰 생산성 도구"
      en={
        <>
          Ownership
          <br />
          Shipping
        </>
      }
      badge={{ variant: 'intern', label: '카카오페이증권 인턴 프로젝트' }}
      contextDetail="FE팀 리뷰 프로세스 개선 + GitHub 크롬 익스텐션(MV3) 제작·배포"
    >
      <ValueStatement>
        팀의 코드리뷰 병목을 정책으로 먼저 풀었고,{' '}
        <Highlight>정책만으론 안 되는 부분은 크롬 익스텐션을 직접 만들어</Highlight> 배포했다.
      </ValueStatement>

      <div className="two">
        <Section title="문제" en="Problem" style={{ marginBottom: 0 }}>
          <p>
            리뷰 대기 PR이 <strong>10~30개</strong>씩 쌓여 배포 직전에야 급하게 리뷰되는 일이 반복됐다. 리뷰 상태가
            눈에 안 보이고 실시간으로 소통할 방법도 마땅치 않았는데, 이건 팀 약속만으로는 못 메우는{' '}
            <strong>GitHub 플랫폼 자체의 한계</strong>였다.
          </p>
        </Section>
        <Section title="팀 정책" en="Process" style={{ marginBottom: 0 }}>
          <Bullets
            items={[
              { lead: 'PR 목적 분리', content: ' — 기능/리팩토링/버그를 분리해 리뷰 컨텍스트 축소' },
              { lead: '리뷰 코어타임', content: ' — 오후 1~2시 리뷰 우선 처리로 왕복 지연 감소' },
              { lead: '우선순위 칸반', content: ' — 배포일 기준 P0/P1/P2. 개선했으나 플랫폼 한계는 잔존' },
            ]}
          />
        </Section>
      </div>

      <Section title="크롬 익스텐션 — 직접 만든 것" en="What I shipped" style={{ marginTop: '13px' }}>
        <p style={{ marginBottom: '8px' }}>
          GitHub REST API는 웹소켓이나 SSE를 지원하지 않고, Enterprise 환경이라 Webhook도 쓸 수 없었다. 결국 폴링
          말고는 방법이 없었고, Rate Limit(인증 시 5,000회/시간)을 감안해 주기를 1분으로 잡았다. 이 위에 리뷰 상태
          시각화, 멀티 PR 템플릿·제목 자동화, 실시간 알림까지 세 가지 기능을 만들어 사내 FE 챕터에 배포했다.
        </p>
        <CodeBlock
          lines={[
            [{ text: '// 3개 API를 조합해 리뷰 상태를 정확히 판정하는 순수 함수', cls: 'c' }],
            [
              { text: 'const', cls: 'k' },
              { text: ' ' },
              { text: 'determineReviewStatus', cls: 'f' },
              { text: ' = (' },
            ],
            [{ text: '  myLogin: ' }, { text: 'string', cls: 'n' }, { text: ',' }],
            [{ text: '  requestedReviewers: RequestedReviewer[],' }],
            [{ text: '  reviews: Review[],' }],
            [{ text: '  timelineEvents: TimelineEvent[]' }],
            [
              { text: '): ReviewStatus => { ' },
              { text: '/* PENDING·DISMISSED 엣지까지 처리 */', cls: 'c' },
              { text: ' }' },
            ],
          ]}
        />
        <TroubleCards
          cards={[
            {
              tag: 'API 조합',
              title: '리뷰 상태 판정',
              body: (
                <>
                  <Code>reviews</Code> API의 state만으론 "재요청"을 판정 못 함 →{' '}
                  <span className="fix">requested_reviewers·reviews·timeline 3개 조합</span>, PENDING·DISMISSED
                  엣지까지 순수 함수로 처리.
                </>
              ),
            },
            {
              tag: 'MV3',
              title: '폴링이 죽는 문제',
              body: (
                <>
                  <Code>setInterval</Code>이 Service Worker 유휴 종료로 소멸 →{' '}
                  <span className="fix">chrome.alarms</span>로 브라우저가 관리하는 주기 알람 전환.
                </>
              ),
            },
            {
              tag: '영속화',
              title: '캐시 헤더 무력화',
              body: (
                <>
                  SW 재활성화마다 전역변수 초기화로 <Code>If-Modified-Since</Code>가 매번 리셋 →{' '}
                  <span className="fix">chrome.storage</span>에 lastModified 영속화.
                </>
              ),
            },
            {
              tag: '단일화',
              title: '탭 중복 폴링',
              body: (
                <>
                  Content Script는 탭마다 실행돼 중복 호출 → <span className="fix">Background 단일 폴링</span> + 다중 탭
                  낙관적 업데이트 동기화.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="결과" en="Outcome">
        <MetricGrid
          metrics={[
            { value: '50%+ 감소', green: true, label: '리뷰 기한(팀 정책) 만료 PR — FE 챕터 테스트 결과' },
            { value: 'FE 챕터 배포', label: '사내 배포 후 피드백 수집·기능 개선' },
            { value: '3-API 조합', label: 'reviews만으론 못 잡는 재요청 상태 정확 판정' },
            { value: '3개 기능', label: '상태 시각화·템플릿 자동화·실시간 알림 직접 구현' },
          ]}
        />
      </Section>

      <FootBlock
        tags={['Chrome Extension (MV3)', 'GitHub REST API', 'Service Worker', 'React', 'TypeScript']}
        links={{
          heading: '딥다이브 · Notion',
          items: [
            {
              href: 'https://app.notion.com/p/sums-log/P-C1-333e39398dfb8099a6a8e47c73d7b7b2',
              label: '코드 리뷰 병목 해결 정책',
            },
            {
              href: 'https://app.notion.com/p/sums-log/P-C2-Github-333e39398dfb80fb855cf05272c47276',
              label: 'GitHub 생산성 크롬 익스텐션 개발기',
            },
          ],
        }}
      />
    </ProjectPage>
  );
}
