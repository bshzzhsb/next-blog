import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface PostProps {
  dir?: string;
  slug: string;
  content?: string;
  children?: PostProps[];
  frontMatter?: {
    title: string;
    excerpt?: string;
    author?: string;
    date: string;
    image?: string;
    isPublished?: string;
    lastModified?: string;
  };
}

const postsDir = join(process.cwd(), 'src', 'posts');

interface PostSlugsProps {
  dir?: string;
  slug: string;
  children?: PostSlugsProps[];
}

export function getPostSlugs(path = ''): PostSlugsProps[] {
  return fs.readdirSync(join(postsDir, path)).reduce<PostSlugsProps[]>((pre, subFileOrDir) => {
    const subpath = `${path}${path ? '/' : ''}${subFileOrDir}`;
    if (fs.lstatSync(join(postsDir, subpath)).isDirectory()) {
      const children = getPostSlugs(subpath);
      if (children.length === 1 && children[0].slug.endsWith('/index')) {
        pre.push({
          slug: subpath,
        });
      } else {
        pre.push({
          dir: subFileOrDir,
          slug: subpath,
          children: getPostSlugs(subpath),
        });
      }
      return pre;
    } else {
      if (/\.mdx$/.test(subpath)) {
        pre.push({
          slug: subpath.replace(/\.mdx$/, ''),
        });
      }
      return pre;
    }
  }, []);
}

export function getPostBySlug(slug: string): PostProps {
  const fullPath = join(postsDir, `${slug}/index.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    frontMatter: data as PostProps['frontMatter'],
  };
}

function sortPosts(posts: PostProps): PostProps {
  if (typeof posts.children !== 'undefined') {
    if (typeof posts.children[0].dir !== 'undefined') {
      return {
        dir: posts.dir,
        slug: posts.slug,
        children: posts.children.map(sortPosts),
      };
    } else {
      return {
        dir: posts.dir,
        slug: posts.slug,
        children: (posts.children as PostProps[]).sort((post1, post2) =>
          post1.frontMatter!.date > post2.frontMatter!.date ? -1 : 1,
        ),
      };
    }
  } else {
    return posts;
  }
}

export function flatPosts(posts: PostProps): PostProps[] {
  if (typeof posts.children !== 'undefined') {
    return posts.children.reduce<PostProps[]>((pre, cur) => {
      pre.push(...flatPosts(cur));
      return pre;
    }, []);
  }
  return [posts];
}

export function getAllPosts(flat = true): PostProps[] {
  const getPosts = (slugs: PostSlugsProps): PostProps => {
    if (typeof slugs.children !== 'undefined') {
      const children = slugs.children.map(getPosts);
      if (typeof children[0].dir === 'undefined') {
        return {
          dir: slugs.dir,
          slug: slugs.slug,
          children: (children as PostProps[]).sort((post1: PostProps, post2: PostProps) =>
            post1.frontMatter!.date > post2.frontMatter!.date ? -1 : 1,
          ),
        };
      }
      return {
        dir: slugs.dir,
        slug: slugs.slug,
        children,
      };
    } else {
      return getPostBySlug(slugs.slug);
    }
  };

  const slugs = getPostSlugs();
  const posts = getPosts({ dir: '', slug: '', children: slugs });
  if (flat) {
    return sortPosts({ dir: '', slug: '', children: flatPosts(posts) }).children!;
  } else {
    return sortPosts(posts).children!;
  }
}
