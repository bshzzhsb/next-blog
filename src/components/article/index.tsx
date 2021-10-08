import React from 'react';
import styled from 'styled-components';

import Link from '@/components/link';
import Icon from '@/components/icon';
import { PostProps } from '@/lib/api';

interface ArticleProps {
  post: PostProps;
}

const ArticleWrapper = styled.article`
  position: relative;
  overflow: hidden;
`;

const ContentPreviewContainer = styled(Link)`
  display: flex;
`;

const ContentPreview = styled.div`
  flex: 1;
`;

const ContentPreviewTitle = styled.h2`
  margin-bottom: 8px;
  letter-spacing: 1px;
  transition: color 0.3s ease-in-out;

  ${ContentPreviewContainer}:hover & {
    color: var(--color-str);
  }
`;

const ContentPreviewInfo = styled.div`
  display: flex;
  font-size: 12px;
  color: var(--color-n10);
`;

const ContentPreviewExcerpt = styled.p`
  margin: 8px 0;
`;

const More = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  color: var(--color-n10);

  .icon-arrow {
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  ${ContentPreviewContainer}:hover & .icon-arrow {
    opacity: 1;
  }
`;

const Article: React.FC<ArticleProps> = ({ post }) => {
  return (
    <ArticleWrapper>
      <ContentPreviewContainer href={`/posts/${post.slug}`}>
        <ContentPreview>
          <ContentPreviewTitle>{post.frontMatter?.title}</ContentPreviewTitle>
          {post.frontMatter?.excerpt && (
            <ContentPreviewInfo>
              <span>{post.frontMatter?.date}</span>
              <span>&nbsp;阅读需要{Math.ceil(post.content!.length / 800)}分钟</span>
            </ContentPreviewInfo>
          )}
          {post.frontMatter?.excerpt && <ContentPreviewExcerpt>{post.frontMatter?.excerpt}</ContentPreviewExcerpt>}
          <More>
            阅读更多
            <Icon name="arrow" />
          </More>
        </ContentPreview>
      </ContentPreviewContainer>
    </ArticleWrapper>
  );
};

export default Article;
