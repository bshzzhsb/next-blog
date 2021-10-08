import styled from 'styled-components';

interface CodePreProps {
  language: string;
}

export const CodeContainer = styled.div`
  background-color: var(--color-code-bg);
  margin: 0 -32px 16px;
  border-radius: 4px;
  font-family: jetbrains mono;
  font-size: 14px;
`;

export const CodeTitle = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-m2);
  color: var(--color-n8);
`;

export const CodePre = styled.pre<CodePreProps>`
  position: relative;
  padding: 32px;
  font-family: 'jetbrains mono';

  &::before {
    position: absolute;
    top: 0;
    left: 24px;
    content: '${(p) => p.language}';
    font-size: 12px;
    height: 14px;
    line-height: 14px;
    text-transform: uppercase;
    letter-spacing: 0.75;
    padding: 4px 8px;
    border-radius: 0 0 4px 4px;
  }

  &[class*='language-js']::before,
  &[class*='language-javascript']::before,
  &[class*='language-jsx']::before {
    background-color: #f1e05a;
  }

  &[class*='language-ts']::before,
  &[class*='language-typescript']::before,
  &[class*='language-tsx']::before {
    background-color: #2b7489;
  }

  &[class*='language-html']::before {
    background-color: #e34c26;
  }

  &[class*='language-css']::before,
  &[class*='language-scss']::before,
  &[class*='language-less']::before {
    background-color: #c6538c;
  }
`;

export const Code = styled.code`
  font-family: 'jetbrains mono';

  .token {
    display: inline;
  }
  .token.comment,
  .token.block-comment {
    color: var(--color-comment);
  }
  .token.property,
  .token.tag {
    color: var(--color-prop);
  }
  .token.attr-value {
    color: var(--color-val);
  }
  .token.number {
    color: var(--color-p6);
  }
  .token.punctuation,
  .token.plain,
  .token.unit,
  .token.parameter {
    color: var(--color-txt);
  }
  .token.keyword {
    color: var(--color-str);
  }
  .token.function {
    color: var(--color-fn);
  }
  .token.selector {
    color: var(--syntax-name);
  }
`;
