import { ProjectPage } from '../components/layout/ProjectPage';
import { ComparisonTable } from '../components/sections/ComparisonTable';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Code } from '../components/primitives/Code';
import { Highlight } from '../components/primitives/Highlight';

export function MfeProject() {
  return (
    <ProjectPage
      title="프로필 서비스 MFE 이관"
      en={
        <>
          Judgment · Collab
          <br />
          Architecture
        </>
      }
      badge={{ variant: 'intern', label: '카카오페이증권 인턴 프로젝트' }}
      contextDetail="구환경 프로필 서비스 → 증권 모노레포 MicroFrontend 이관"
    >
      <ValueStatement>
        조직 안에서 판단이 필요한 순간마다 <Highlight>"부채를 통제할 수 있는가"</Highlight>를 기준 삼았다 — API는
        서버와 함께 설계하고, 접근제어 구조는 직접 짰다.
      </ValueStatement>

      <Section title="문제" en="Problem">
        <p>
          카카오페이 인프라에 종속된 구환경이 배포 병목을 만들고 있어, 독립적인 증권 인프라로 옮기는 마이그레이션이
          필요했다. 그런데 옮겨갈 공통 패키지는 <strong>한 줄만 고쳐도 5개 팀</strong>의 승인이 필요했다. 증권
          도메인이다 보니 버그 하나가 <strong>금전 손실</strong>로 이어질 수 있어, 그 수정 자체가 늘 조심스러웠다.{' '}
          <strong>API 명세가 확정되기도 전</strong>에 개발을 시작해야 했고, 민감한 금융 데이터를 다루다 보니 접근제어
          구조도 복잡했다.
        </p>
      </Section>

      <Section title="의사결정 — 통제 가능한 부채" en="Decision">
        <ComparisonTable
          headers={['선택지', '타 팀 승인', '영향 범위', '부채 성격']}
          rows={[
            {
              cells: [
                { content: '공통 패키지 수정', a: true },
                { content: '필요(병목)' },
                { content: '전사 서비스' },
                { content: '없음 — 단, 일정 예측 불가' },
              ],
            },
            {
              cells: [
                { content: '서비스 내 복사', a: true },
                { content: '불필요' },
                { content: '복사한 모든 서비스' },
                { content: '추적 불가' },
              ],
            },
            {
              pick: true,
              cells: [
                { content: '팀 전용 패키지 확장', a: true },
                { content: '불필요' },
                { content: '우리 서비스로 한정' },
                { content: '범위 통제 · 상환 경로 확보', a: true },
              ],
            },
          ]}
        />
        <p style={{ marginTop: '6px', fontSize: '9.2px', color: 'var(--muted)' }}>
          → 기준은 "속도"가 아니라 "<strong>부채를 통제할 수 있는가</strong>". 영향 범위를 팀 내부로 격리하고 배포
          주도권과 상환 경로를 동시에 확보했다. 신규 URL 구조를 설계하고 레거시 경로와의 호환을 위한 리다이렉션 전략도
          함께 수립했다.
        </p>
      </Section>

      <Section title="실행 — API 공동 설계와 접근제어 설계" en="Execution">
        <p style={{ marginBottom: '8px' }}>
          서버 개발 전 기획 초안을 <Code>MSW</Code>로 구현하며, 코드로 짜야만 드러나는 명세 결함을 사전에 발굴했다.
        </p>
        <TroubleCards
          cards={[
            {
              title: '스키마 누락 발굴',
              body: (
                <>
                  '투자의견'에 '내가 쓴 댓글'을 구분할 속성이 없음 → 기획 문서 역추적 → 기획 단계 누락 확인 →{' '}
                  <span className="fix">isComment 필드 추가</span>.
                </>
              ),
            },
            {
              title: '직렬 호출 제거',
              body: (
                <>
                  '내 프로필' 경로에 userId가 없어 <Code>userInfo→profile</Code> 직렬 호출 강제 → 세션 기반 전용
                  엔드포인트 요청 → <span className="g">샌드박스 환경 측정 기준 약 180ms 단축</span>.
                </>
              ),
            },
            {
              title: 'Boolean → Enum 제안 (기각)',
              body: (
                <>
                  접근 상태 3개 Boolean을 Enum으로 통합 제안 → 우선순위·UI 분기 결정권 문제로 기각.{' '}
                  <span className="fix">클라/서버 책임 경계</span>를 명확히 배웠다.
                </>
              ),
            },
            {
              title: '접근제어 모듈 설계',
              body: (
                <>
                  지속 확장되는 약관·등급 체계에 대응하기 위해 권한 판단을 <Code>SECTION_PERMISSION_MAP</Code> +{' '}
                  <Code>useProfileSectionAccess</Code>로 추상화 → 컴포넌트는 <Code>canView·fallback</Code> 두 값만, 조건
                  추가 시 Map만 수정.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="결과" en="Outcome">
        <MetricGrid
          metrics={[
            { value: '5 → 0', green: true, label: '패키지 수정에 필요했던 승인 팀 수' },
            { value: '~180ms', label: '직렬 호출 제거 (샌드박스 환경 측정)' },
            { value: '1곳', label: '권한 조건 변경 시 수정 지점(SECTION_PERMISSION_MAP)' },
          ]}
        />
      </Section>

      <FootBlock
        tags={['MicroFrontend', 'monorepo', 'MSW', 'React-query', 'TypeScript']}
        links={{
          heading: '딥다이브 · Notion',
          items: [
            {
              href: 'https://app.notion.com/p/sums-log/P-B1-327e39398dfb80428d5ff64f1c9caf85',
              label: '공통 패키지 승인 병목과 통제 가능한 부채',
            },
            {
              href: 'https://app.notion.com/p/sums-log/P-B2-MSW-API-329e39398dfb8035a221dd02b951b4f6',
              label: 'MSW 프로토타이핑으로 API 명세 결함 검증',
            },
            {
              href: 'https://app.notion.com/p/sums-log/P-B3-327e39398dfb80648a09f4acec413de7',
              label: '접근 제어 모듈 설계 · 컴포넌트 책임 분리',
            },
          ],
        }}
      />
    </ProjectPage>
  );
}
