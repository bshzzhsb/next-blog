import React, { useState } from 'react';
import styled from 'styled-components';

interface QuoteProps {
  content: string;
  from: string;
  en?: string;
}

const QuoteContainer = styled.div`
  position: relative;
  margin: 0 -20px 32px;
  padding: 0 32px 16px;
  background-color: var(--color-b1);
  border: 2px solid var(--color-n10);
  border-radius: 8px;
`;

const LanguageWrapper = styled.div`
  display: flex;
`;

const Language = styled.span<{ showLabel: boolean }>`
  position: relative;
  height: 28px;
  line-height: 22px;
  padding: 2px 8px 4px ${(p) => (p.showLabel ? '16px' : '8px')};
  font-size: 12px;
  border-radius: 0 0 4px 4px;
  background-color: var(--color-g2);
  cursor: pointer;

  &::before {
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
    ${(p) => p.showLabel && 'content: ""'};
    width: 6px;
    height: 6px;
    background-color: var(--color-g6);
    border-radius: 50%;
  }
`;

const Content = styled.p`
  margin-top: 16px;
  line-height: 32px;
  text-align: justify;
  text-decoration-line: underline;
  text-underline-offset: 6px;
`;

const FromWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const From = styled.span`
  box-sizing: content-box;
  height: 32px;
  line-height: 32px;
  margin-top: 8px;
`;

const Quote: React.FC<QuoteProps> = ({ content, from, en }) => {
  const [lang, setLang] = useState<'cn' | 'en'>('cn');

  return (
    <QuoteContainer>
      {en && (
        <LanguageWrapper>
          <Language showLabel={lang === 'en'} onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}>
            en
          </Language>
        </LanguageWrapper>
      )}
      {lang === 'cn' ? <Content>{content}</Content> : <Content>{en}</Content>}
      <FromWrapper>
        <From>——{from}</From>
      </FromWrapper>
    </QuoteContainer>
  );
};

export default Quote;
