import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from '../icon';
import { jump } from '@/utils/smooth-scroll';

const ToTopWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  right: calc(50vw - 550px);
  bottom: 64px;
  font-size: 32px;
  cursor: pointer;
  opacity: ${(p) => +p.show};
  transition: opacity 0.2s ease-in-out;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ToTop: React.FC = () => {
  const [showToTop, setShowToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setShowToTop(false);
      } else {
        setShowToTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    jump(0, {
      duration: 500,
      offset: 0,
    });
  };

  return (
    <ToTopWrapper onClick={handleClick} show={showToTop}>
      <Icon name="top" />
    </ToTopWrapper>
  );
};

export default ToTop;
