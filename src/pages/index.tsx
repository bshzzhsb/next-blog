import React from 'react';
import styled from 'styled-components';

import { PostProps, getAllPosts } from '@/lib/api';
import { uploadToAlgolia } from '@/components/search/helper';
import Main from '@/page-components/main';
import Layout from '@/page-components/layout';

interface HomeProps {
  posts: PostProps[];
}

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

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <Layout title="首页">
      <HeaderStickyBackground />
      <MaxWidthWrapper>
        <Main posts={posts} />
      </MaxWidthWrapper>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await getAllPosts(true);
  if (process.env.NODE_ENV === 'production') {
    await uploadToAlgolia(posts);
  }

  return {
    props: {
      posts,
    },
  };
}
