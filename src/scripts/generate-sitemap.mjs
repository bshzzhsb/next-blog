import fs from 'fs';
import prettier from 'prettier';

import { globby } from 'globby';

const generateSitemap = async () => {
  console.log('generating sitemap.xml');

  const baseUrl = 'https://blog.bshz.xyz';

  const pages = await globby(
    [
      'src/pages/**/*.tsx',
      'src/posts/*',
      'src/posts/**/*.mdx',
      '!src/pages/_*.tsx',
      '!src/pages/**/[*.tsx',
      '!src/pages/404.tsx',
    ],
    {
      onlyFiles: false,
    },
  );

  const staticPages = pages.map((staticPagePath) => {
    staticPagePath = staticPagePath.replace(/^(src\/)/, '');
    staticPagePath = staticPagePath.replace(/^(pages\/)/, '');
    if (staticPagePath.lastIndexOf('.') !== -1) {
      staticPagePath = staticPagePath.slice(0, staticPagePath.lastIndexOf('.'));
    }
    if (staticPagePath.slice(-5) === 'index') {
      staticPagePath = staticPagePath.slice(0, -5);
    }
    if (staticPagePath.slice(-1)[0] === '/') {
      staticPagePath = staticPagePath.slice(0, -1);
    }
    return `${baseUrl}${staticPagePath ? '/' : ''}${staticPagePath}`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);

  console.log('generating sitemap.xml success');
};

generateSitemap();
