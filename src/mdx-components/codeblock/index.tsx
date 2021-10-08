import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import { CodeContainer, CodeTitle, CodePre, Code } from './code';

interface CodeblockProps {
  className: string;
  children: string;
  title: string;
}

const Codeblock: React.FC<CodeblockProps> = ({ children, className, title }) => {
  const language = className.replace(/language-/, '') as Language;

  return (
    <Highlight {...defaultProps} theme={undefined} code={children.trim()} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <CodeContainer>
          {title && (
            <CodeTitle className="gatsby-code-title">
              <div>{title}</div>
            </CodeTitle>
          )}
          <CodePre className={className} language={language}>
            <Code className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Code>
          </CodePre>
        </CodeContainer>
      )}
    </Highlight>
  );
};

export default Codeblock;
