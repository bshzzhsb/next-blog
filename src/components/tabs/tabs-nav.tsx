import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from '@/components/icon';

interface TabsNavProps<T> {
  activeTab: T;
  tabs: T[];
  onClickTab: (tab: T) => void;
  rightButton?: string;
  onClickRightButton?: () => void;
}

export const TabsNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabsNavWrapper = styled.ul<{ width: number; left: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  position: relative;
  padding: 8px 10px 8px 12px;
  font-family: jetbrains mono;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: ${(p) => p.left}px;
    width: ${(p) => p.width}px;
    height: 32px;
    background-color: var(--color-n8);
    border-radius: 4px;
    z-index: 0;
    transition: left 0.1s ease-in-out, width 0.1s ease-in-out;
  }
`;

const TabNav = styled.li<{ active: boolean }>`
  height: 20px;
  line-height: 20px;
  padding: 6px 12px;
  box-sizing: content-box;
  cursor: pointer;
  z-index: 1;
`;

export const RightButton = styled.button`
  width: 16px;
  height: 16px;
  margin-right: 16px;
  padding: 8px;
  box-sizing: content-box;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const TabsNav = <T extends string>({
  activeTab,
  tabs,
  onClickTab,
  rightButton,
  onClickRightButton,
}: TabsNavProps<T>) => {
  const [activeBgPos, setActiveBgPos] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  useEffect(() => {
    const width = activeTab.length * 9.6 + 12 * 2;
    const index = tabs.indexOf(activeTab);
    let left = 12;
    for (let i = 0; i < index; i++) {
      left += tabs[i].length * 9.6 + 12 * 2 + 4;
    }
    setActiveBgPos({ left, width });
  }, [activeTab, tabs]);

  return (
    <TabsNavContainer>
      <TabsNavWrapper left={activeBgPos.left} width={activeBgPos.width}>
        {tabs.map((tab) => (
          <TabNav key={tab} active={tab === activeTab} onClick={() => onClickTab(tab)}>
            {tab}
          </TabNav>
        ))}
      </TabsNavWrapper>
      {rightButton && (
        <RightButton onClick={onClickRightButton}>
          <Icon name="reset" />
        </RightButton>
      )}
    </TabsNavContainer>
  );
};
