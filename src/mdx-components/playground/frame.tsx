import React, { useEffect } from 'react';
import styled from 'styled-components';

interface FrameProps {
  srcDoc: string;
}

const StyledIframe = styled.iframe`
  border: none;

  body {
    margin: 0;
  }
`;

const Frame: React.FC<FrameProps> = ({ srcDoc }) => (
  <StyledIframe width="100%" height="100%" frameBorder="0" srcDoc={srcDoc} />
);

export default Frame;
