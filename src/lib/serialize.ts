import { transform } from 'esbuild';
import { Pluggable } from 'unified';

const mdx = require('@mdx-js/mdx');

interface SerializeOptions {
  mdxOptions?: {
    remarkPlugins?: Pluggable[];
    rehypePlugins?: Pluggable[];
  };
  target?: string | string[];
}

async function serialize(source: string, { mdxOptions = {}, target = ['es2020', 'node12'] }: SerializeOptions) {
  mdxOptions.remarkPlugins = mdxOptions.remarkPlugins || [];
  const compiledMdx = await mdx(source, { ...mdxOptions, skipExport: true });
  const transformResult = await transform(compiledMdx, {
    loader: 'jsx',
    jsxFactory: 'mdx',
    minify: true,
    target,
  });

  return transformResult.code;
}

export default serialize;
