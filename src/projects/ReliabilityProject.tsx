import { ProjectPage } from '../components/layout/ProjectPage';
import { FlowSteps } from '../components/sections/FlowSteps';
import { FootBlock } from '../components/sections/FootBlock';
import { MetricGrid } from '../components/sections/MetricGrid';
import { Section } from '../components/sections/Section';
import { TroubleCards } from '../components/sections/TroubleCards';
import { ValueStatement } from '../components/sections/ValueStatement';
import { Highlight } from '../components/primitives/Highlight';

export function ReliabilityProject() {
  return (
    <ProjectPage
      title="서비스 안정성 오너십"
      en={
        <>
          Reliability
          <br />
          Troubleshooting
        </>
      }
      badge={{ variant: 'intern', label: '카카오페이증권 인턴 프로젝트' }}
      contextDetail="사전검증 · 배포 · 상시 모니터링 기반 서비스 신뢰도 확보"
    >
      <ValueStatement>
        새로 만드는 것만큼 <Highlight>지키는 일</Highlight>도 맡았다 — 상시 모니터링으로 데이터 정합성 결함 13건을
        선제적으로 발견해 해결했다.
      </ValueStatement>

      <Section title="문제" en="Problem">
        <p>
          실시간 시세를 다루는 금융 서비스에서는 화면에 잘못된 숫자 하나가 뜨는 순간 바로 신뢰도 문제로 이어진다. SSR
          전환·MFE 이관이 진행되는 동안에도 신규 기능은 계속 배포돼야 했고, Prefetch 데이터와 웹소켓 실시간 데이터처럼{' '}
          <strong>서로 다른 두 소스가 어긋나는 정합성 결함</strong>은 화면상으로는 티가 잘 안 나 조용히 쌓이기 쉬웠다.
        </p>
      </Section>

      <Section title="사전검증 → 배포 → 모니터링" en="Process">
        <FlowSteps
          steps={[
            {
              name: '사전검증',
              text: (
                <>
                  신규 기능은 FE 파트 내 <strong>새너티 테스트</strong>로 초기 결함을 조기 차단. QA 리소스가 부족해
                  출시가 지연될 위기에서는 TF 내부에서 직접 QA를 진행해 배포 데드라인을 지켰다.
                </>
              ),
            },
            {
              name: '배포',
              text: (
                <>
                  배포 담당자로서 장애를 식별하면 즉각 롤백·긴급 배포로 대응했고, 빌드 파이프라인 이슈도 로그 추적으로
                  원인을 찾아 해결했다(아래 사례 참고).
                </>
              ),
            },
            {
              name: '모니터링',
              text: (
                <>
                  운영 환경을 상시 모니터링하며 데이터 정합성·렌더링 결함 <strong>13건</strong>을 먼저 찾아 해결. 임시
                  봉합이 아니라 근본 원인을 분석해 조직에 공유했다.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="13건 중 세 가지 — 데이터 정합성 트러블슈팅" en="Selected Cases">
        <TroubleCards
          cards={[
            {
              tag: '정합성',
              title: 'Prefetch·웹소켓 데이터 불일치',
              body: (
                <>
                  서버에서 미리 가져온 Prefetch 데이터와 이후 갱신되는 웹소켓 실시간 데이터가 어긋나{' '}
                  <span className="fix">실시간 거래대금 등 정보가 잘못 표시</span>되는 문제를 발견해 해결.
                </>
              ),
            },
            {
              tag: '차트',
              title: 'TradingView 60분봉 초기화',
              body: (
                <>
                  60분 차트에서 누적 시간 계산 로직에 오류가 있어 <span className="fix">캔들 데이터가 주기적으로 초기화</span>
                  되는 버그를 원인 추적 후 수정.
                </>
              ),
            },
            {
              tag: '엣지케이스',
              title: 'NXT 편출 종목 시간 오프셋',
              body: (
                <>
                  NXT(대체거래소) 편출 종목의 시간 차트에서 거래 데이터가{' '}
                  <span className="fix">16시+1캔들만큼 밀려 표시·누락</span>되는 문제를 발견해 해결.
                </>
              ),
            },
            {
              tag: '장애대응',
              title: '주주 평단가 오출력 롤백',
              body: (
                <>
                  배포 담당자로서 커뮤니티 서비스의 주주 평단가 데이터 오출력을 식별 →{' '}
                  <span className="fix">즉각 롤백 후 긴급 배포</span>로 복구. 멀티 개발 환경의 Jenkins 빌드 오류도 로그
                  추적으로 원인을 찾아 해결.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="결과" en="Outcome">
        <MetricGrid
          metrics={[
            { value: '13건', green: true, label: '선제 발견·해결한 데이터 정합성·렌더링 결함' },
            { value: '데드라인 준수', label: 'QA 리소스 부족 위기에서도 배포 일정 유지' },
            { value: '즉각 롤백', label: '장애 식별 후 긴급 배포로 신속 복구' },
          ]}
        />
      </Section>

      <FootBlock tags={['TradingView', 'WebSocket', 'Grafana', 'Jenkins', 'React-query']} />
    </ProjectPage>
  );
}
