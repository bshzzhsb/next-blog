import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

interface LinkProps {
  href: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
  onClick?: () => void;
}

const ExternalLink = styled.a`
  color: var(--color-n10);

  &:focus {
    outline: 2px auto var(--color-n10);
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

const Link: React.FC<LinkProps> = ({ href, target, children, ...delegated }) => {
  let linkType;

  if (href.match(/^#/)) {
    linkType = 'hash';
  } else if (href.match(/(^http|^mailto)/i) || target === '_blank') {
    linkType = 'external';
  } else {
    linkType = 'internal';
  }

  if (typeof target === 'undefined') {
    target = linkType === 'external' ? '_blank' : '_self';
  }

  const safeRel = target === '_blank' ? 'noopener noreferrer' : '';

  if (linkType === 'internal') {
    return (
      <NextLink passHref href={href}>
        <ExternalLink {...delegated}>{children}</ExternalLink>
      </NextLink>
    );
  }

  return (
    <ExternalLink href={href} rel={safeRel} target={target} {...delegated}>
      {children}
    </ExternalLink>
  );
};

export default Link;
