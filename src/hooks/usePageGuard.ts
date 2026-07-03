import { useEffect } from 'react';

/**
 * 각 페이지(.page, .cover) 내용이 A4 한 장(297mm)을 넘치는지 감시한다.
 * 넘치면 `.is-overflow` 클래스를 부여해 테두리를 빨간색으로 표시하고,
 * 개발 모드에서는 콘솔에 몇 번째 페이지가 넘쳤는지 경고한다.
 */
export function usePageGuard() {
  useEffect(() => {
    const TOLERANCE = 2; // px 반올림 오차 허용

    const check = () => {
      const pages = document.querySelectorAll<HTMLElement>('.page, .cover');
      pages.forEach((el, i) => {
        const overflowing = el.scrollHeight > el.clientHeight + TOLERANCE;
        el.classList.toggle('is-overflow', overflowing);
        if (overflowing && import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            `[page-guard] ${i + 1}번째 페이지의 내용이 한 장(297mm)을 초과했습니다. ` +
              `(내용 높이 ${el.scrollHeight}px > 페이지 ${el.clientHeight}px) — 항목을 줄이거나 두 페이지로 나누세요.`,
          );
        }
      });
    };

    check();
    // 웹폰트가 로드되면 글자 높이가 바뀔 수 있으므로 다시 검사
    const timer = window.setTimeout(check, 300);
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    fonts?.ready.then(check);
    window.addEventListener('resize', check);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', check);
    };
  });
}
