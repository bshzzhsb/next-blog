import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { slugify } from '@/utils/slugify';
import { smoothScroll } from '@/utils/smooth-scroll';
import { debounce } from '@/utils/debounce';

interface TOCProps {
  headings: {
    level: number;
    value: string;
  }[];
}

interface TOCHeadingProps {
  level: number;
}

const TOCTitle = styled.div`
  font-size: 1.25rem;
`;

const TOCContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 176px);
  overflow: auto;
  scrollbar-width: 0;
  margin-top: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TOCHeading = styled.a<TOCHeadingProps>`
  font-size: ${(p) => (p.level === 1 ? '16px' : p.level === 2 ? '15px' : '14px')};
  padding-left: ${(p) => (p.level - 1) * 12}px;
  color: var(--color-n11);

  & + & {
    margin-top: 8px;
  }

  &.active-toc-item {
    font-weight: 600;
  }
`;

const TOC: React.FC<TOCProps> = React.memo(({ headings }) => {
  const tocContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dispose = smoothScroll({
      duration: (distance: number) => (Math.abs(distance) < 500 ? Math.abs(distance) : 500),
      offset: -64,
    });
    return () => {
      dispose();
    };
  }, []);

  useEffect(() => {
    const tocList = document.getElementsByClassName('toc-item');
    const tocContainerHeight = tocContainerRef.current!.offsetHeight;
    const focusActiveToc = debounce((index: number) => {
      const activeToc = tocList[index];
      if (activeToc) {
        const activeTocScrollHeight = (activeToc as HTMLElement).offsetTop;
        tocContainerRef.current?.scrollTo(0, activeTocScrollHeight - tocContainerHeight / 2 + 20);
      }
    }, 20);
    const handleScroll = () => {
      if (typeof tocList !== 'undefined') {
        const top = document.documentElement.scrollTop;
        Array.from(tocList).forEach((toc) => {
          toc.classList.remove('active-toc-item');
        });
        for (let i = 0; i < tocList.length; i++) {
          const headingElement = document.getElementById(slugify(headings[i].value));
          if ((headingElement as HTMLElement).offsetTop - 74 > top) {
            const index = i === 0 ? i : i - 1;
            tocList[index].classList.add('active-toc-item');
            focusActiveToc(index);
            break;
          }
        }
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <TOCTitle>目录</TOCTitle>
      <TOCContainer ref={tocContainerRef}>
        {headings.map((heading) => {
          const anchorId = slugify(heading.value);
          return (
            <TOCHeading key={anchorId} level={heading.level} href={`#${anchorId}`} className="toc-item">
              {heading.value}
            </TOCHeading>
          );
        })}
      </TOCContainer>
    </div>
  );
});

export default TOC;
