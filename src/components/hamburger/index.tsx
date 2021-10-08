import React from 'react';
import styled from 'styled-components';

interface HamburgerProps {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

const HamburgerWrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  z-index: 101;

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const HamburgerContainer = styled.div`
  position: relative;
  width: 20px;
  height: 16px;
  cursor: pointer;
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background-color: var(--color-n13);
  transition: transform 0.3s ease-in-out;
`;

const TopLine = styled(Line)<{ showSidebar: boolean }>`
  top: 0;
  ${(p) => (p.showSidebar ? 'transform: translateY(7px) rotate(45deg) scale(1.5);' : '')};
`;

const MiddleLine = styled(Line)<{ showSidebar: boolean }>`
  top: 7px;
  ${(p) => (p.showSidebar ? 'transform: scale(0);' : '')};
`;

const BottomLine = styled(Line)<{ showSidebar: boolean }>`
  top: 14px;
  ${(p) => (p.showSidebar ? 'transform: translateY(-7px) rotate(-45deg) scale(1.5);' : '')};
`;

const Hamburger: React.FC<HamburgerProps> = ({ showSidebar, setShowSidebar }) => (
  <HamburgerWrapper onClick={() => setShowSidebar(!showSidebar)}>
    <HamburgerContainer>
      <TopLine showSidebar={showSidebar} />
      <MiddleLine showSidebar={showSidebar} />
      <BottomLine showSidebar={showSidebar} />
    </HamburgerContainer>
  </HamburgerWrapper>
);

export default Hamburger;
