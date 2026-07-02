# 남수민 — 프론트엔드 포트폴리오 (React)

기존 HTML 포트폴리오를 **React + TypeScript + Vite** 컴포넌트 프로젝트로 옮긴 것입니다.
디자인·레이아웃·인쇄 결과(A4 8페이지)는 기존과 동일하며, 이제 각 요소가 컴포넌트로
분리되어 있어 원하는 부분만 골라 커스터마이즈할 수 있습니다.

---

## 실행 방법

```bash
npm install      # 최초 1회
npm run dev      # 개발 서버 (수정하면 즉시 반영) → 안내되는 http://localhost:5173 접속
```

빌드가 잘 되는지 확인하려면:

```bash
npm run build    # 타입 체크 + 프로덕션 빌드 (dist/ 생성)
npm run preview  # 빌드 결과를 로컬에서 미리보기
```

## PDF로 저장 (제출용)

1. `npm run dev` 로 띄운 화면을 **크롬(Chrome)** 으로 엽니다.
2. `Ctrl+P` (Mac은 `Cmd+P`) → **PDF로 저장**.
3. 설정에서 **여백(Margins): 없음**, **배경 그래픽(Background graphics): 켜기**.
4. 저장하면 기존과 동일한 A4 8페이지 PDF가 나옵니다.

> 항목을 늘리거나 줄이면 특정 페이지가 한 장을 넘길 수 있습니다. 저장 전 인쇄
> 미리보기로 각 페이지가 잘리지 않는지 확인하세요.

---

## 폴더 구조

```
src/
├─ main.tsx                  진입점 (전역 CSS 로드)
├─ App.tsx                   표지 + 프로젝트들을 순서대로 렌더
├─ types.ts                  공통 타입 정의
│
├─ styles/
│  └─ portfolio.css          ★ 모든 디자인(색·간격·폰트·인쇄·번호 카운터)
│
├─ data/
│  ├─ profile.tsx            ★ 이름·소개·기술 스택·연락처 (표지 내용)
│  └─ projects.tsx           ★ 프로젝트 순서·목차·구성 (배열 하나)
│
├─ components/
│  ├─ primitives/            Highlight(초록 강조), Code(인라인 코드)
│  ├─ cover/                 표지 조각들 (Identity, Intro, SkillGroups, Contact, ProjectIndex …)
│  ├─ layout/                Page/ProjectPage/ContinuationPage, 헤더, 푸터
│  └─ sections/              본문 재사용 블록
│                            (Section, ValueStatement, Bullets, ComparisonTable,
│                             TroubleCards, FlowSteps, MetricGrid, FootBlock, CodeBlock, OrgBadge)
│
└─ projects/                 ★ 프로젝트별 페이지 내용
   ├─ OssProject.tsx         (responsive-keepalive, 2페이지)
   ├─ SsrProject.tsx
   ├─ MfeProject.tsx
   ├─ CodeReviewProject.tsx
   ├─ ReliabilityProject.tsx
   └─ CodeZapProject.tsx
```

★ 표시가 가장 자주 건드리게 될 파일입니다.

---

## 커스터마이즈 가이드

### 1) 표지 내용 바꾸기 → `src/data/profile.tsx`

이름·직무·소개 문단·기술 스택·연락처가 전부 여기 있습니다. 값만 바꾸면 됩니다.

### 2) 프로젝트 순서 / 추가 / 제외 → `src/data/projects.tsx`

이 배열 **하나**가 (a) 표지 목차 순서와 (b) 실제 페이지 순서를 동시에 결정합니다.
번호(01, 02 …)는 CSS 카운터가 자동으로 매기므로 순서만 바꾸면 번호도 따라 바뀝니다.

```tsx
export const projects = [
  { id: 'oss', Component: OssProject, index: { … } },  // 이 줄들을
  { id: 'ssr', Component: SsrProject, index: { … } },  // 순서 바꾸거나
  // …                                                    지우거나 추가
];
```

- **순서 변경**: 요소 순서를 바꾸세요.
- **제외**: 해당 요소를 삭제(또는 `//` 주석)하세요.
- **추가**: `src/projects/` 에 새 컴포넌트를 만들고 위 배열에 한 줄 추가하세요.

### 3) 프로젝트 내용 바꾸기 → `src/projects/*.tsx`

각 프로젝트 페이지는 아래 재사용 컴포넌트를 조립해 만듭니다. 텍스트/수치/카드/표만
바꾸면 디자인은 유지됩니다.

| 컴포넌트           | 용도                                    |
| ------------------ | --------------------------------------- |
| `<Section>`        | 소제목이 달린 한 섹션                   |
| `<ValueStatement>` | 상단 한 줄 요약(코발트 강조 박스)       |
| `<Bullets>`        | 불릿 목록 (`lead` 굵은 앞머리 + 내용)   |
| `<ComparisonTable>`| 선택지 비교표 (`pick`으로 채택 행 강조) |
| `<TroubleCards>`   | 2×2 트러블슈팅 카드                     |
| `<FlowSteps>`      | 가로 단계(프로세스) 카드                |
| `<MetricGrid>`     | 결과 수치 스트립 (`green`으로 강조)     |
| `<CodeBlock>`      | 문법 강조되는 코드 블록                 |
| `<FootBlock>`      | 하단 기술 태그 + 링크                   |
| `<Highlight>`      | 본문 속 초록 형광펜                     |
| `<Code>`           | 본문 속 인라인 코드/식별자              |

### 4) 프로젝트를 2페이지로 늘리기

`OssProject.tsx` 가 예시입니다. 첫 페이지는 `<ProjectPage>`, 이어지는 페이지는
`<ContinuationPage>` 로 감싸면 번호가 올라가지 않고 같은 프로젝트로 이어집니다.

```tsx
<>
  <ProjectPage title="…" …>{/* 1페이지 내용 */}</ProjectPage>
  <ContinuationPage title="…">{/* 2페이지 내용 */}</ContinuationPage>
</>
```

### 5) 디자인(색·간격·폰트) 바꾸기 → `src/styles/portfolio.css`

- 색은 파일 맨 위 `:root` 의 CSS 변수(`--cobalt`, `--emerald` …)에서 한 번에.
- 특정 요소 크기/여백은 해당 클래스에서.
- **고정폭(Mono) 폰트는 `.code` 와 `pre code`(코드 블록) 안에서만** 쓰도록 되어 있습니다.
  가독성 때문에 다른 곳에는 쓰지 않는 것을 권장합니다.

---

## 참고

- 한글 폰트는 `index.html` 에서 Google Fonts(Noto Sans KR)를 불러옵니다. 오프라인이면
  OS 기본 고딕으로 자동 폴백됩니다.
- 페이지 번호·프로젝트 번호는 CSS 카운터(`pg`, `proj`, `idx`)로 자동 계산되므로 직접
  숫자를 쓰지 않습니다.
