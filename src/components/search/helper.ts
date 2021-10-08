import algoliasearch from 'algoliasearch';

import { PostProps } from '@/lib/api';

export interface SearchResultProps {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
export const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
export const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const index = client.initIndex(ALGOLIA_INDEX_NAME);

export function search(query: string) {
  return index
    .search<SearchResultProps>(query)
    .then(({ hits }) => {
      return hits;
    })
    .catch(() => {
      throw Error('search failed');
    });
}

export async function uploadToAlgolia(posts: PostProps[]) {
  console.log('uploading to algolia');
  const crypto = require('crypto');
  const reg = /[^\x00-\xff]|[a-z]|[0-9]/gi;
  try {
    const { objectIDs } = await index.saveObjects(
      posts.map((item) => ({
        title: item.frontMatter?.title,
        date: item.frontMatter?.date,
        excerpt: item.frontMatter?.excerpt ?? '',
        slug: item.slug,
        content: item.content?.match(reg)?.join('').slice(0, 4000),
        objectID: crypto.createHash('md5').update(item.frontMatter?.title).digest('hex'),
      })),
    );
    console.log('upload success', objectIDs);
  } catch (e) {
    console.log('upload error', e);
  }
}
