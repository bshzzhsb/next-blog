import React from 'react';
import styled from 'styled-components';

import Icon from '@/components/icon';
import { slugify } from '@/utils/slugify';

interface HeadingProps {
  children: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const fontSize = [1.5, 1.35, 1.25, 1.15, 1, 1];
const marginTop = [32, 32, 32, 16, 16, 16];
const marginBottom = [24, 24, 24, 16, 16, 16];

const H = styled.h1<{ l: 1 | 2 | 3 | 4 | 5 | 6 }>`
  position: relative;
  font-size: ${(p) => fontSize[p.l - 1]}rem;
  height: 32px;
  line-height: 32px;
  margin-top: ${(p) => marginTop[p.l - 1]}px;
  margin-bottom: ${(p) => marginBottom[p.l - 1]}px;
  letter-spacing: 1px;

  &:first-child {
    margin-top: 0;
  }

  a {
    height: 32px;
    line-height: 32px;
  }
`;

const HeadingAnchor = styled.a`
  position: absolute;
  opacity: 0;
  font-size: 1.25rem;
  width: 2.25rem;
  padding-left: 0.25rem;
  padding-right: 0.75rem;
  transform: translateX(-2.25rem);

  svg {
    pointer-events: none;
  }

  ${H}:focus &, ${H}:hover & {
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
  }
`;

const Heading: React.FC<HeadingProps> = ({ children, level, ...delegated }) => {
  const anchorId = slugify(children);

  return (
    <H as={`h${level}`} l={level} id={anchorId} className="heading-item">
      <HeadingAnchor href={`#${anchorId}`}>
        <Icon name="link" />
      </HeadingAnchor>
      {children}
    </H>
  );
};

export default Heading;
