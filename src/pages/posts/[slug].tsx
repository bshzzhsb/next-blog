import React from 'react';
import styled from 'styled-components';

import { categories } from '@/settings/category';
import Main from '@/page-components/main';
import Layout from '@/page-components/layout';
import { PostProps } from '@/lib/api';
import { getAllPosts } from '@/lib/api';

interface HomeProps {
  title: string;
  posts: PostProps[];
}

const HeaderBackgroundWrapper = styled.div`
  position: relative;
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: -64px;
  width: 100%;
  height: 64px;
`;

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

const Category: React.FC<HomeProps> = React.memo(({ title, posts }) => {
  return (
    <Layout title={title}>
      <HeaderBackgroundWrapper>
        <HeaderBackground />
        <HeaderStickyBackground />
      </HeaderBackgroundWrapper>
      <MaxWidthWrapper>
        <Main posts={posts} />
      </MaxWidthWrapper>
    </Layout>
  );
});

export default Category;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts(true);
  const category = params.slug.split('/').slice(-1)[0];

  return {
    props: {
      title: categories.filter((item) => item.slug.includes(category))[0].title,
      posts: posts.filter((item) => item.slug.includes(category)),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: categories.map((category) => category.slug),
    fallback: false,
  };
}
