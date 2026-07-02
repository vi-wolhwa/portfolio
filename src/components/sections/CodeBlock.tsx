import { Fragment } from 'react';

/**
 * 코드 조각 한 토큰. cls 로 색을 지정합니다:
 *   c=주석, k=키워드, s=문자열/값, f=태그·함수명, n=식별자·타입
 * cls 를 생략하면 기본 색.
 */
export type CodeToken = { text: string; cls?: 'c' | 'k' | 's' | 'f' | 'n' };

/**
 * 문법 강조가 되는 코드 블록. lines 는 "줄 배열", 각 줄은 "토큰 배열"입니다.
 * 공백/들여쓰기는 토큰의 text 안에 그대로 넣으면 <pre> 라 보존됩니다.
 */
export function CodeBlock({ lines }: { lines: CodeToken[][] }) {
  return (
    <pre>
      <code>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line.map((tok, j) =>
              tok.cls ? (
                <span key={j} className={tok.cls}>
                  {tok.text}
                </span>
              ) : (
                <Fragment key={j}>{tok.text}</Fragment>
              ),
            )}
            {i < lines.length - 1 ? '\n' : null}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}
