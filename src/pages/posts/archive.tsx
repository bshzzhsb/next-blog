import React from 'react';
import styled from 'styled-components';

import Link from '@/components/link';
import Layout from '@/page-components/layout';
import { PostProps, getAllPosts } from '@/lib/api';

interface ArchiveProps {
  posts: PostProps[];
}

const CategoryColorMap: Record<string, string> = {
  essay: 'var(--color-g6)',
  tech: 'var(--color-b6)',
};

const HeaderStickyBackground = styled.div`
  position: sticky;
  width: 100%;
  height: 64px;
  top: 0;
  background-color: var(--color-n1);
  z-index: 1;
`;

const MaxWidthWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  min-height: calc(100vh - 310px);
  margin: 0 auto;
  padding: 64px 32px 0;
`;

const ArchiveContainer = styled.ul`
  margin-left: 200px;
`;

const ArchiveItem = styled.li<{ category: string; year: string }>`
  position: relative;
  padding: 8px 24px;
  font-size: 18px;
  font-weight: 600;
  border-left: 2px solid ${(p) => CategoryColorMap[p.category]};

  &::before {
    position: absolute;
    top: 9px;
    left: -68px;
    content: '${(p) => p.year}';
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    font-family: jetbrains mono;
  }

  &::after {
    position: absolute;
    top: 12px;
    left: -11px;
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 4px solid ${(p) => CategoryColorMap[p.category]};
    background-color: var(--color-n1);
  }
`;

const ArchiveAnchor = styled(Link)`
  display: flex;
`;

const ArchiveTitle = styled.span`
  position: relative;
  height: 28px;
  line-height: 28px;
  box-sizing: content-box;

  &::after {
    position: absolute;
    left: 0;
    bottom: -4px;
    content: '';
    width: 100%;
    height: 2px;
    background-color: var(--color-n10);
    width: 0px;
    transition: width 0.5s ease-in-out;
  }

  ${ArchiveItem}:hover &::after {
    width: 100%;
  }
`;

const Archive: React.FC<ArchiveProps> = ({ posts }) => {
  return (
    <Layout title="归档">
      <HeaderStickyBackground />
      <MaxWidthWrapper>
        <ArchiveContainer>
          {posts.map((post, i) => {
            let showYear = '';
            const year = new Date(post.frontMatter!.date).getFullYear();
            const prePostYear = i < posts.length - 1 ? new Date(posts[i + 1].frontMatter!.date).getFullYear() : 0;
            if (year !== prePostYear) {
              showYear = String(year);
            }
            return (
              <ArchiveItem key={post.slug} category={post.slug.split('/')[0]} year={showYear}>
                <ArchiveAnchor href={`/posts/${post.slug}`}>
                  <ArchiveTitle>{post.frontMatter?.title}</ArchiveTitle>
                </ArchiveAnchor>
              </ArchiveItem>
            );
          })}
        </ArchiveContainer>
      </MaxWidthWrapper>
    </Layout>
  );
};

export default Archive;

export async function getStaticProps() {
  const posts = await getAllPosts(true);

  return {
    props: {
      posts,
    },
  };
}
