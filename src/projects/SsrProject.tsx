import { ProjectPage } from '../components/layout/ProjectPage';
import { ComparisonTable } from '../components/sections/ComparisonTable';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Code } from '../components/primitives/Code';
import { Highlight } from '../components/primitives/Highlight';

export function SsrProject() {
  return (
    <ProjectPage
      title="종목 정보 페이지 SSR 전환"
      en={
        <>
          Performance
          <br />
          Architecture
        </>
      }
      badge={{ variant: 'intern', label: '카카오페이증권 인턴 프로젝트' }}
      contextDetail="종목 정보 페이지 · CSR → SSR 전환 및 서버 통신 표준 수립"
    >
      <ValueStatement>
        CSR로 느리던 진입 속도를, <Highlight>통신 라이브러리 표준부터 렌더링 파이프라인 4단계까지</Highlight> 직접
        설계·검증해 SSR로 전환했다.
      </ValueStatement>

      <Section title="문제" en="Problem">
        <p>
          종목 정보 페이지가 CSR이라 진입이 느렸다. SSR로 바꾸려 했지만, 브라우저와 달리{' '}
          <strong>Node.js 런타임의 타임아웃·에러·캐싱</strong>을 안정적으로 다룰 통신 표준이 없었다. 이 표준을 만들면
          이후 다른 서비스의 SSR 전환에도 그대로 쓸 수 있는 셈이었다.
        </p>
      </Section>

      <Section title="기술 선택" en="Why this stack">
        <ComparisonTable
          headers={['후보', '역할 · 강점', '판단']}
          rows={[
            {
              cells: [
                { content: 'Next.js fetch', a: true },
                { content: 'Data Cache로 서버 캐시 공유가 강점이나, 인증·인터셉터·타임아웃을 직접 재구현' },
                { content: '미검증 코드의 런타임 리스크' },
              ],
            },
            {
              pick: true,
              cells: [
                { content: '사내 Axios', a: true },
                { content: '인증·공통 헤더·에러 로깅이 사내 표준으로 검증됨 — 즉시 재사용' },
                { content: '서버 패칭 표준 채택', a: true },
              ],
            },
            {
              pick: true,
              cells: [
                { content: 'React-query', a: true },
                { content: 'Hydration으로 서버 패칭을 클라 상태와 연결, Props Drilling 제거' },
                { content: '클라 상태 표준 채택', a: true },
              ],
            },
          ]}
        />
        <p style={{ marginTop: '6px', fontSize: '9.2px', color: 'var(--muted)' }}>
          → "성능보다 <strong>안정성·신뢰성</strong>을 우선"한 결정. 서버 패칭은 사내 Axios, 클라 상태·Hydration은
          React-query로 역할을 분리했다. React-query 도입 과정에서 모노레포 내 다른 패키지와 버전이 충돌해, 의존성을
          함께 정리하며 업그레이드했다.
        </p>
      </Section>

      <Section title="렌더링 파이프라인 4단 최적화 · 트러블슈팅" en="Optimization & Debugging">
        <p style={{ marginBottom: '8px' }}>
          Prefetch 병렬화(<Code>Promise.all</Code>) → Streaming → dynamic import 검증 → startTransition. 각 단계에서
          실제로 부딪힌 문제를 측정으로 해결했다.
        </p>
        <TroubleCards
          cards={[
            {
              tag: 'Hydration',
              title: '전역 QueryClient 캐시 오염',
              body: (
                <>
                  전역 인스턴스일 때 사용자 A의 응답 캐시가 B에게 노출됨을 재현 →{' '}
                  <span className="fix">요청별 QueryClient 생성</span>으로 격리, <Code>staleTime</Code>으로 마운트 직후
                  재요청 제거.
                </>
              ),
            },
            {
              tag: 'Streaming',
              title: 'await 제거 후 클라 재요청',
              body: (
                <>
                  <Code>dehydrate</Code>가 pending 쿼리를 직렬화하지 않아 빈 캐시가 전달됨을 추적 →{' '}
                  <span className="fix">shouldDehydrateQuery</span>로 pending까지 직렬화.
                </>
              ),
            },
            {
              tag: '측정',
              title: 'dynamic import는 미도입',
              body: (
                <>
                  FP 개선을 기대했으나 미적용·ssr:true·ssr:false 세 조건 모두 179~182ms로 실질 차이 없음. Next의 자동
                  스플리팅·prefetch로 이미 분리되어 있어 <span className="fix">가설을 기각하고 도입하지 않음</span>.
                </>
              ),
            },
            {
              tag: 'startTransition',
              title: 'TradingView 위젯 우선순위 확보',
              body: (
                <>
                  실제 페이지에서 <span className="fix">TradingView가 최우선 렌더링</span>되도록 startTransition 적용 →
                  우선순위 경쟁 상황을 재현 테스트 환경으로 구성해 검증, 렌더 시작이 41.6ms → 2.3ms로 앞당겨짐을
                  확인(Heavy 컴포넌트는 41→61ms로 후순위, 트레이드오프).
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="결과" en="Outcome">
        <MetricGrid
          metrics={[
            { value: '70→85점', green: true, label: 'Lighthouse(운영환경) — 차트·종목 정보 탭' },
            { value: '0.5s→0.2s', green: true, label: 'FCP 단축' },
            { value: '~400ms', label: 'staleTime 임계값 확인' },
            { value: '비용 0', label: 'Grafana 기준 CPU 사용량 유지, 추가 인프라 비용 없이 개선' },
          ]}
        />
      </Section>

      <FootBlock
        tags={['Next.js', 'React-query', 'SSR', 'Streaming', 'TypeScript']}
        links={{
          heading: '딥다이브 · Notion',
          items: [
            {
              href: 'https://app.notion.com/p/sums-log/P-A1-32ae39398dfb807db2bad219d572531d',
              label: '서버 사이드 통신 라이브러리 딥-다이브',
            },
            {
              href: 'https://app.notion.com/p/sums-log/P-A2-React-query-Hydration-32ce39398dfb80f3a344f81ec8943db1',
              label: 'React-query Hydration 아키텍처 설계',
            },
            {
              href: 'https://app.notion.com/p/sums-log/P-A3-SSR-32ae39398dfb802aae4ac2102d30dd41',
              label: '체감 성능 극대화 SSR 전략',
            },
          ],
        }}
      />
    </ProjectPage>
  );
}
