import React, { useState } from 'react';
import styled from 'styled-components';

import { TabsNav, TabsNavContainer, RightButton } from './tabs-nav';
import { TabPane, TabPaneProps } from './tab-pane';

export { TabPane, TabsNavContainer, RightButton };

interface TabsProps<T> {
  defaultTab: T;
  children: React.ReactElement[];
  rightButton?: string;
  onClickRightButton?: () => void;
}

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsContentWrapper = styled.div`
  flex: 1;
`;

export const TabsContentContainer = styled.ul``;

export const TabContent = styled.li<{ active: boolean }>`
  display: ${(p) => (p.active ? 'block' : 'none')};
`;

const Tabs = <T extends string>({ defaultTab, children, rightButton, onClickRightButton }: TabsProps<T>) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const parseTabs = (children: React.ReactElement[]) => {
    return React.Children.map(children, (child: React.ReactElement<TabPaneProps<T>>) => ({
      key: child.key,
      node: child,
    }));
  };

  const tabs = parseTabs(children);

  return (
    <TabsContainer>
      <TabsNav
        activeTab={activeTab}
        tabs={tabs.map((tab) => tab.key as string)}
        rightButton={rightButton}
        onClickTab={setActiveTab}
        onClickRightButton={onClickRightButton}
      />
      <TabsContentWrapper>
        <TabsContentContainer>
          {tabs.map((tab) => (
            <TabContent key={tab.key} active={activeTab === tab.key}>
              {tab.node.props.children}
            </TabContent>
          ))}
        </TabsContentContainer>
      </TabsContentWrapper>
    </TabsContainer>
  );
};

export default Tabs;
