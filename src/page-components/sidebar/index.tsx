import React from 'react';
import styled from 'styled-components';

import Link from '@/components/link';
import { categories } from '@/settings/category';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

const SidebarWrapper = styled.div<{ showSidebar: boolean }>`
  position: fixed;
  inset: 0;
  background-color: var(--color-n1);
  opacity: ${(p) => (p.showSidebar ? 0.98 : 0)};
  transition: opacity 0.2s ease-in-out;
  z-index: 100;
  pointer-events: ${(p) => (p.showSidebar ? 'auto' : 'none')};
`;

const NavListWrapper = styled.nav`
  display: flex;
  margin-top: 100px;
  margin-left: 64px;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.li`
  margin: 10px;
`;

const NavItemLink = styled(Link)`
  display: flex;
  padding: 10px;
  color: var(--color-n10);
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
`;

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  return (
    <>
      <SidebarWrapper showSidebar={showSidebar}>
        <NavListWrapper>
          <NavList>
            {categories.map((item) => (
              <NavItem key={item.title} onClick={() => setShowSidebar(false)}>
                <NavItemLink href={item.slug}>{item.title}</NavItemLink>
              </NavItem>
            ))}
          </NavList>
        </NavListWrapper>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
