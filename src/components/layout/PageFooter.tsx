/** 프로젝트 페이지 하단 푸터. 오른쪽 페이지 번호는 CSS 카운터(pg)가 자동으로 채웁니다. */
export function PageFooter({ left = '남수민 — Portfolio' }: { left?: string }) {
  return (
    <div className="pfoot">
      <span>{left}</span>
      <span className="pg" />
    </div>
  );
}
