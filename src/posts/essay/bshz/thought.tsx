import React from 'react';
import styled from 'styled-components';

interface ThoughtProps {
  content: string;
}

const ThoughtContainer = styled.div`
  position: relative;
  margin: 0 -20px 32px;
  padding: 0 32px 24px;
  background-color: var(--color-b1);
  border: 2px solid var(--color-n10);
  border-radius: 8px;
`;

const Content = styled.p`
  margin-top: 16px;
  line-height: 32px;
  text-align: justify;
  text-decoration-line: underline;
  text-underline-offset: 6px;
`;

const Thought: React.FC<ThoughtProps> = ({ content }) => (
  <ThoughtContainer>
    <Content>{content}</Content>
  </ThoughtContainer>
);

export default Thought;
