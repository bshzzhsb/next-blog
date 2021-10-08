import React from 'react';
import styled from 'styled-components';

import Article from '@/components/article';
import { PostProps } from '@/lib/api';

interface MainProps {
  posts: PostProps[];
}

const MainWrapper = styled.main`
  max-width: 640px;
  margin: 0 auto;

  @media screen and (max-width: 800px) {
    padding: 0 16px;
  }
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Main: React.FC<MainProps> = React.memo(({ posts }) => (
  <MainWrapper>
    <ArticleContainer>
      {posts.map((post) => (
        <Article key={post.slug} post={post} />
      ))}
    </ArticleContainer>
  </MainWrapper>
));

export default Main;
