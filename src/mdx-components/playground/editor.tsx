import React, { useMemo } from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import { PlaygroundTabs } from '.';
import { debounce } from '@/utils/debounce';
import { theme } from './styled';

interface LanguageProps {
  code: string;
  language: PlaygroundTabs;
  onChange: (code: string) => void;
}

const LanguageMap: Record<PlaygroundTabs, Language> = {
  HTML: 'markup',
  CSS: 'css',
  JS: 'javascript',
};

const TabContentWrapper = styled.div`
  padding: 4px 4px 16px 16px;
`;

const EditorWrapper = styled.div`
  overflow: auto;
  max-height: 50vh;

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #282c34;
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border: 2px solid #282c34;
    border-radius: 6px;
    background-color: var(--color-n6);
  }
`;

const EditorContainer = styled.div`
  position: relative;

  pre {
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-size: 16px;
    pointer-events: none;

    code {
      font-family: jetbrains mono;
      word-break: break-word;
      white-space: break-spaces;
    }
  }
`;

const CodeArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var(--color-n1);
  background-color: transparent;
  font-size: 16px;
  font-family: jetbrains mono;
  word-break: break-word;
  white-space: break-spaces;
  -webkit-text-fill-color: transparent;
`;

const Editor: React.FC<LanguageProps> = ({ code, language, onChange }) => (
  <TabContentWrapper>
    <EditorWrapper>
      <EditorContainer>
        <CodeArea onChange={(e) => onChange(e.target.value)} value={code} />
        <Highlight {...defaultProps} theme={theme} code={code} language={LanguageMap[language]}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={className}>
              <code className={className}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </EditorContainer>
    </EditorWrapper>
  </TabContentWrapper>
);

export default Editor;
