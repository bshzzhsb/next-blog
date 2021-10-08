import React from 'react';
import styled from 'styled-components';

import Link from '@/components/link';
import Search from '@/components/search';
import { navigation } from '@/settings/category';
import Icon from '@/components/icon';

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const MaxWidthWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 32px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 32px;
`;

const HeadLogo = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: ljmc;
  font-size: 24px;
`;

const NavListWrapper = styled.nav`
  display: flex;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  margin: 10px;
`;

const HeaderRight = styled.div<{ showSidebar: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 800px) {
    padding-right: 48px;
  }

  & .icon-github {
    font-size: 48px;
  }
`;

const NavItemLink = styled(Link)`
  display: flex;
  padding: 10px;
  color: var(--color-n10);
  text-decoration: none;
`;

const Header: React.FC<HeaderProps> = ({ showSidebar }) => {
  return (
    <>
      <HeaderWrapper>
        <MaxWidthWrapper>
          <HeaderContainer>
            <HeaderLeft>
              <HeadLogo href="/">博思何在</HeadLogo>
              <NavListWrapper>
                <NavList>
                  {navigation.map((item) => (
                    <NavItem key={item.title}>
                      <NavItemLink href={item.slug}>{item.title}</NavItemLink>
                    </NavItem>
                  ))}
                </NavList>
              </NavListWrapper>
            </HeaderLeft>
            <HeaderRight showSidebar={showSidebar}>
              <Search />
              <Link href="https://github.com/bshzzhsb">
                <Icon name="github" />
              </Link>
            </HeaderRight>
          </HeaderContainer>
        </MaxWidthWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;
