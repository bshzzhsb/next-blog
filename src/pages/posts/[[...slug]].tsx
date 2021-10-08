import React from 'react';
import styled from 'styled-components';

import { getPostBySlug, getPostSlugs } from '@/lib/api';
import MDXRenderer, { getMDXContent } from '@/lib/mdx-renderer';
import serialize from '@/lib/serialize';
import Layout from '@/page-components/layout';
import Heading from '@/mdx-components/heading';
import Paragraph from '@/mdx-components/paragraph';
import Codeblock from '@/mdx-components/codeblock';
import Code from '@/mdx-components/code';
import TOC from '@/components/toc';
import Quote from 'posts/essay/others/quote';
import Thought from 'posts/essay/bshz/thought';

export interface PostProps {
  slug: string;
  content: string;
  frontMatter: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    isPublished: string;
    lastModified: string;
  };
}

interface PostComponentProps {
  source: string;
  scope: Record<string, unknown>;
  frontMatter: PostProps['frontMatter'];
}

const ArticleTitleWrapper = styled.div<{ bgImage: string }>`
  position: relative;
  width: 100%;
  background-color: rgb(223 235 246);

  &::after {
    background-image: url(${(p) => p.bgImage});
  }
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: -64px;
  width: 100%;
  height: 64px;
  background-color: rgb(223 235 246);
`;

const ArticleHeaderWrapper = styled.div`
  @media screen and (max-width: 1100px) {
    max-width: 668px;
  }
  width: 100%;
  max-width: 1100px;
`;

const ArticleTitle = styled.h1`
  margin: 8px auto 16px;
  letter-spacing: 2px;
`;

const HeaderStickyBackground = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: rgb(223 235 246);
  z-index: 1;
`;

const HeaderStickyWhiteBackground = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: var(--color-n1);
  z-index: 1;
`;

const ArticleWrapper = styled.article`
  flex: 1;
  max-width: 668px;
`;

const MaxWidthWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 32px 32px;

  ${ArticleWrapper}:only-child {
    margin: auto;
  }
`;

const TocWrapper = styled.aside`
  flex: 0 100000 280px;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 160px);
  margin-left: auto;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const components = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  code: Codeblock,
  inlineCode: Code,
  Quote,
  Thought,
};

const getHeadingsFromMdx = (children: any[]) => {
  const headingTypes = ['h1', 'h2', 'h3'];
  return children
    .filter((child) => headingTypes.includes(child.props.originalType))
    .map((child) => ({
      value: child.props.children,
      level: +child.props.mdxType.replace('h', ''),
    }));
};

const Post: React.FC<PostComponentProps> = React.memo(({ source, frontMatter }) => {
  const MdxContent = getMDXContent(source, frontMatter);
  const headings = getHeadingsFromMdx(MdxContent({ components }).props.children);

  return (
    <Layout title={frontMatter.title}>
      <ArticleTitleWrapper bgImage={frontMatter.image}>
        <HeaderBackground />
        <HeaderStickyBackground />
        <MaxWidthWrapper>
          {headings.length > 0 ? (
            <ArticleHeaderWrapper>
              <ArticleTitle>{frontMatter.title}</ArticleTitle>
            </ArticleHeaderWrapper>
          ) : (
            <ArticleTitle>{frontMatter.title}</ArticleTitle>
          )}
        </MaxWidthWrapper>
      </ArticleTitleWrapper>
      <HeaderStickyWhiteBackground />
      <MaxWidthWrapper>
        <ArticleWrapper>
          <MDXRenderer components={components}>
            <MdxContent />
          </MDXRenderer>
        </ArticleWrapper>
        {headings.length > 0 && (
          <TocWrapper>
            <TOC headings={headings} />
          </TocWrapper>
        )}
      </MaxWidthWrapper>
    </Layout>
  );
});

export default Post;

export async function getStaticProps({ params }: { params: { slug: string[] } }) {
  const post = getPostBySlug(`${params.slug.join('/')}`);

  const compiledSource = await serialize(post.content!, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      source: compiledSource,
      frontMatter: post.frontMatter,
    },
  };
}

export async function getStaticPaths() {
  const slugInfos = getPostSlugs();

  const flat = (slugInfo: any): { params: { slug: string[] } }[] => {
    if (typeof slugInfo.children !== 'undefined') {
      return slugInfo.children.reduce((pre: { params: { slug: string[] } }[], cur: any) => {
        pre.push(...flat(cur));
        return pre;
      }, []);
    }
    return [{ params: { slug: slugInfo.slug.split('/') } }];
  };

  return {
    paths: slugInfos.reduce<{ params: { slug: string[] } }[]>((pre, cur) => {
      pre.push(...flat(cur));
      return pre;
    }, []),
    fallback: false,
  };
}
