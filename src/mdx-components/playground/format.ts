import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import jsParser from 'prettier/parser-babel';

export function formatHTML(html: string) {
  return prettier.format(html, { parser: 'html', plugins: [htmlParser] });
}

export function formatCSS(css: string) {
  return prettier.format(css, { parser: 'css', plugins: [cssParser] });
}

export function formatJS(js: string) {
  return prettier.format(js, { parser: 'babel', plugins: [jsParser] });
}
