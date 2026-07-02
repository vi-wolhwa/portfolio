import { ContinuationPage } from '../components/layout/ContinuationPage';
import { ProjectPage } from '../components/layout/ProjectPage';
import { Bullets } from '../components/sections/Bullets';
import { CodeBlock } from '../components/sections/CodeBlock';
import { ComparisonTable } from '../components/sections/ComparisonTable';
import { FlowSteps } from '../components/sections/FlowSteps';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Code } from '../components/primitives/Code';
import { Highlight } from '../components/primitives/Highlight';

const TITLE = '@audemodo/responsive-keepalive';

export function OssProject() {
  return (
    <>
      {/* ── 1페이지 ─────────────────────────────────────────── */}
      <ProjectPage
        title={TITLE}
        en={
          <>
            Learning
            <br />
            Open Source
          </>
        }
        badge={{ variant: 'personal', label: '개인 프로젝트 · Open Source' }}
        contextDetail="v0.1.0 · MIT License · npm 배포"
      >
        <ValueStatement>
          브레이크포인트마다 완전히 다른 컴포넌트 트리를, <Highlight>상태를 잃지 않고</Highlight> 렌더링하는 React
          19.2 라이브러리.
        </ValueStatement>

        <Section title="문제" en="Problem">
          <p>
            최근 Evenly 프로젝트에서 Tailwind를 쓰면서, 스타일을 className에 직접 정의하는 방식이 반응형 분기가
            늘어날수록 코드를 빠르게 복잡하게 만드는 걸 겪었다. 네이버 같은 빅테크는 아예 모바일·데스크톱을 다른 트리로
            나누는 <strong>AWD(Adaptive Web Design)</strong> 구조로 이 문제를 풀지만, 두 트리를 각각 유지보수해야 해
            개발 비용이 크다. 그래서 Mobile·Desktop을 완전히 별도 컴포넌트로 분리하는 방법을 고민했는데, 전환 시 비활성
            트리가 통째로 언마운트돼 <strong>스크롤·입력·열린 메뉴 같은 로컬 상태</strong>가 사라지는 문제에 부딪혔다.
            구조 전환과 상태 보존을 동시에 만족하는 라이브러리도 없어 직접 만들었다.
          </p>
        </Section>

        <Section title={<>핵심 메커니즘 — &lt;Activity&gt;란</>} en="Mechanism">
          <p style={{ marginBottom: '8px' }}>
            지금까지 React에서 UI를 "숨기는" 방법은 둘뿐이었고 각각 대가가 있었다. <strong>조건부 렌더링</strong>은
            트리를 파괴해 상태를 잃고, <strong>CSS로 숨기기</strong>(<Code>display:none</Code>)는 상태는 지키지만
            타이머·구독 같은 effect가 보이지 않는 동안에도 계속 돌아 자원을 낭비한다. React 19.2가 새로 추가한{' '}
            <Code>{'<Activity mode="visible|hidden">'}</Code>는 이 둘 사이 빈틈을 메운다 — 자식을{' '}
            <Code>display:none</Code>으로 숨기면서 <strong>effect만 정리</strong>하고, 다시 <Code>visible</Code>이 되면
            effect를 재생성해 상태와 DOM은 그대로 복원한다. "상태 보존"과 "자원 낭비 없음"을 동시에 얻는 이유다.
            Activity가 없는 런타임(React&lt;19.2)에서는 자동으로 언마운트 방식(swap)으로 폴백한다.
          </p>
          <ComparisonTable
            headers={['방식', '트리 · 상태', 'effect(구독·타이머)', '대가']}
            rows={[
              {
                cells: [
                  { content: '조건부 렌더링', a: true },
                  { content: '파괴 · 소실' },
                  { content: '정리됨' },
                  { content: '돌아오면 처음부터' },
                ],
              },
              {
                cells: [
                  { content: 'display:none (CSS)', a: true },
                  { content: '유지' },
                  { content: '계속 실행(낭비)' },
                  { content: '숨은 채 자원 소모' },
                ],
              },
              {
                pick: true,
                cells: [
                  { content: <>&lt;Activity mode="hidden"&gt;</>, a: true },
                  { content: '유지' },
                  { content: '정리 → 재생성' },
                  { content: '메모리 소폭 증가' },
                ],
              },
            ]}
          />
        </Section>

        <Section title="설계" en="Design">
          <Bullets
            items={[
              {
                lead: '순수 코어 분리 (SRP)',
                content: (
                  <>
                    {' '}
                    — 24개 소스 파일 중 <Code>breakpointsToQueries</Code>·<Code>resolveMountedKeys</Code>·
                    <Code>resolveContainerVariant</Code> 등 7개를 React 없는 순수 함수로 분리해, 렌더 없이 입출력만으로
                    단위 테스트한다. 파일마다 판단은 정확히 하나씩만 맡는다.
                  </>
                ),
              },
              {
                lead: '정책 합성 (OCP)',
                content: (
                  <>
                    {' '}
                    — <Code>useMediaVariant</Code> = 원시 매칭(<Code>useMatchedVariant</Code>) → 안티스래시(
                    <Code>useSettledValue</Code>) → IME 홀드(<Code>useHeldWhileComposing</Code>) 세 훅을 파이프처럼 쌓은
                    합성. 새 정책을 더해도 기존 훅은 건드리지 않는다.
                  </>
                ),
              },
              {
                lead: '플랫폼 경계 격리 (DIP)',
                content: (
                  <>
                    {' '}
                    — <Code>React.Activity</Code>라는 구체 API에 나머지 파일이 직접 의존하지 않도록,{' '}
                    <Code>platform/activity.ts</Code> 한 곳에만 그 경계를 몰아넣었다. 네임스페이스 접근이라
                    React&lt;19.2에서도 throw 없이 <Code>undefined</Code>로 떨어져 안전하게 감지·폴백한다.
                  </>
                ),
              },
              {
                lead: '사용자 경험까지 코드로',
                content: (
                  <>
                    {' '}
                    — 한글 등 IME 조합 중엔 전환을 보류했다가 조합이 끝나면(<Code>compositionend</Code>) 적용해 입력이
                    끊기지 않게 했고, 브레이크포인트 경계에서 값이 잠깐 흔들려도 <Code>settleMs</Code>만큼 안정된 뒤에만
                    반영해 화면이 깜빡이지 않게 했다.
                  </>
                ),
              },
            ]}
          />
          <CodeBlock
            lines={[
              [{ text: '// mode만 토글, key는 고정 — 상태 보존의 핵심', cls: 'c' }],
              [{ text: 'mountedKeys.map((key) => (' }],
              [
                { text: '  ' },
                { text: '<Activity', cls: 'f' },
                { text: ' ' },
                { text: 'key', cls: 'n' },
                { text: '=' },
                { text: '{key}', cls: 's' },
                { text: ' ' },
                { text: 'mode', cls: 'n' },
                { text: '=' },
                { text: "{key === variant ? 'visible' : 'hidden'}", cls: 's' },
                { text: '>', cls: 'f' },
              ],
              [{ text: '    {renderVariant(variants[key])}' }],
              [{ text: '  ' }, { text: '</Activity>', cls: 'f' }],
              [{ text: '))' }],
            ]}
          />
        </Section>
      </ProjectPage>

      {/* ── 2페이지 (이어짐) ─────────────────────────────────── */}
      <ContinuationPage title={TITLE}>
        <Section title="아키텍처 — 4개 레이어" en="Architecture">
          <p style={{ marginBottom: '8px' }}>
            24개 소스 파일을 4단으로 나눠 <strong>위 레이어 → 아래 레이어로만</strong> 참조한다(순환 없음). 아래로
            갈수록 순수하고 React에 덜 의존한다.
          </p>
          <FlowSteps
            steps={[
              {
                name: 'L0 · 순수 리프',
                text: (
                  <>
                    <strong>breakpointsToQueries</strong>·resolveMountedKeys·resolveContainerVariant 등 순수 함수와
                    platform/activity(DIP 경계). React 없이 단독 테스트.
                  </>
                ),
              },
              {
                name: 'L1 · 원시 조립',
                text: (
                  <>
                    normalizeQueries·<strong>useMatchedVariant</strong>(raw 매칭)와 SwapVariant·KeepAliveVariants
                    컴포넌트. 정책 없는 관찰만 담당.
                  </>
                ),
              },
              {
                name: 'L2 · 공개 훅',
                text: (
                  <>
                    <strong>useMediaVariant</strong>·useContainerVariant·useSharedState와 디스패처 Responsive. L0~L1을
                    정책과 함께 합성.
                  </>
                ),
              },
              {
                name: 'L3~L4 · 팩토리·배럴',
                text: (
                  <>
                    <strong>createResponsive</strong> 팩토리가 설정 1곳으로 묶고, index.ts는 7개 공개 API만 재노출해
                    표면을 좁게 유지.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section title="SSR·폴백 안전성" en="Troubleshooting">
          <TroubleCards
            cards={[
              {
                tag: 'SSR',
                title: '서버엔 window가 없다',
                body: (
                  <>
                    서버엔 <Code>window.matchMedia</Code>가 없어 실제 뷰포트를 알 수 없음 →{' '}
                    <span className="fix">getServerSnapshot을 분리</span>해 서버에선 항상 설정된 <Code>ssr</Code>{' '}
                    variant만 반환, 하이드레이션 후 실제 값으로 1회 재조정.
                  </>
                ),
              },
              {
                tag: '폴백',
                title: <>React&lt;19.2에서 안전하게 감지</>,
                body: (
                  <>
                    named import는 없는 export를 가져오면 throw →{' '}
                    <span className="fix">네임스페이스 접근(React.Activity)</span>으로 바꿔 미지원 런타임에서도 에러
                    없이 <Code>undefined</Code>로 떨어지게 해, swap 폴백을 안전하게 분기.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section title="적용 범위" en="Scope">
          <TroubleCards
            cards={[
              {
                title: '적합한 경우',
                body: (
                  <>
                    브레이크포인트마다 컴포넌트 <span className="fix">트리 구조 자체가 바뀌고</span>, 그 안의 로컬
                    상태(입력·스크롤·열린 메뉴)를 유지해야 하는 반응형. 단순 배치만 바뀌는 경우는 CSS로 충분하다.
                  </>
                ),
              },
              {
                title: '요구 사항',
                body: (
                  <>
                    <span className="fix">React 19.2 이상</span>에서만 Activity의 이점을 온전히 쓸 수 있다. 그보다 낮은
                    버전에서는 <Code>swap</Code> 전략으로 자동 전환되어, 상태 보존 없이 언마운트 방식으로 동작한다.
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section title="엔지니어링 완성도" en="Rigor">
          <MetricGrid
            metrics={[
              { value: '97 · 98.6%', green: true, label: '테스트 통과 · 라인 커버리지' },
              { value: '0', unit: ' deps', label: '런타임 의존성 없음' },
              { value: '24개 파일', label: '4계층 아키텍처 · 순환 참조 없음' },
              { value: '정책 3종', label: 'IME-safe · SSR-safe · Anti-thrash' },
            ]}
          />
        </Section>

        <FootBlock
          tags={['React 19.2 <Activity>', 'TypeScript', 'tsup', 'Vitest', '0 runtime deps']}
          links={{
            heading: '저장소 · 문서',
            items: [
              {
                href: 'https://github.com/AudeModo/audemodo-responsive-keepalive',
                label: 'GitHub 레포지토리 (소스 · 테스트 · README)',
              },
              {
                href: 'https://audemodo.github.io/audemodo-responsive-keepalive-sample/index.html',
                label: 'Architecture & API Pipelines 문서',
              },
              {
                href: 'https://www.npmjs.com/package/@audemodo/responsive-keepalive',
                label: 'npm 패키지',
              },
            ],
          }}
        />
      </ContinuationPage>
    </>
  );
}
