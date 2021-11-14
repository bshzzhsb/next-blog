import React from 'react';
import styled from 'styled-components';

interface ErrorProps {
  error: any;
}

const ErrorWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: var(--color-n2);
  word-break: break-word;
  white-space: break-spaces;
  font-family: jetbrains mono;
  font-size: 14px;
`;

const ErrorTitle = styled.div`
  font-size: 12px;
  margin-bottom: 16px;
`;

const ERROR = ` __  _   _   _   _
|__ |_| |_| | | |_|
|__ | \\ | \\ |_| | \\
`;

const Error: React.FC<ErrorProps> = ({ error }) => (
  <ErrorWrapper>
    <ErrorTitle>{ERROR}</ErrorTitle>
    <p>{error}</p>
  </ErrorWrapper>
);

export default Error;
