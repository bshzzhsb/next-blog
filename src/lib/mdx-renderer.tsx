import React from 'react';
import { MDXProvider, mdx } from '@mdx-js/react';

interface MDXRendererProps {
  children: React.ReactNode;
  components?: Record<string, React.ReactNode>;
}

export const getMDXContent = (source: string, scope: Record<string, unknown>) => {
  const fullScope = { React, mdx, ...scope };
  const keys = Object.keys(fullScope);
  const values = Object.values(fullScope);
  const fn = new Function('_fn', ...keys, `${source}; return MDXContent`);
  const content = fn({}, ...values);
  return content;
};

const MDXRenderer: React.FC<MDXRendererProps> = React.memo(({ children, components = {} }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
));

export default MDXRenderer;
