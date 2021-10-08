import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 48px 0 32px;
  margin-top: 64px;
  font-size: 12px;
  color: var(--color-n10);
  font-family: gloria;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <span>总想着记录生活，却发现生活不会记录自己</span>
      <span>&copy; 2021 Built with NEXT</span>
    </FooterContainer>
  );
};

export default Footer;
