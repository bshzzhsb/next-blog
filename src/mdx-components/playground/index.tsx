import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Tabs, { TabPane, TabsNavContainer, TabContent, TabsContentContainer, RightButton } from '@/components/tabs';
import Editor from './editor';
import Result from './result';
import Console from './console';
import { constructCode } from './construct-code';
import { formatHTML, formatCSS, formatJS } from './format';
import { debounce } from '@/utils/debounce';

export enum PlaygroundTabs {
  HTML = 'HTML',
  CSS = 'CSS',
  JS = 'JS',
}

enum ResultTabs {
  RESULT = 'RESULT',
  CONSOLE = 'CONSOLE',
}

interface PlaygroundProps {
  id: string;
  html?: string;
  css?: string;
  js?: string;
}

const PlaygroundContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  margin: 0 -32px;
  background-color: #282c34;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048),
    0px 12px 30px rgba(0, 0, 0, 0.08);

  ${TabsNavContainer} {
    color: var(--color-n1);
    background-color: #2b333b;

    ${RightButton} {
      &:hover {
        background-color: var(--color-n7);
      }

      &:active {
        background-color: var(--color-n8);
      }

      svg {
        color: var(--color-n1);
      }
    }
  }

  ${TabsContentContainer} {
    min-height: 30vh;
    height: 100%;

    ${TabContent} {
      position: relative;
      height: 100%;
    }
  }
`;

const Playground: React.FC<PlaygroundProps> = ({ id, html = '', css = '', js = '' }) => {
  const defaultCode = useMemo(
    () => ({
      [PlaygroundTabs.HTML]: formatHTML(html),
      [PlaygroundTabs.CSS]: formatCSS(css),
      [PlaygroundTabs.JS]: formatJS(js),
    }),
    [html, css, js],
  );
  const [codes, setCodes] = useState(defaultCode);
  const [debouncedCode, setDebouncedCode] = useState(codes);
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState<null | string | Event>();

  const debouncedSetDebouncedCode = useMemo(() => debounce(setDebouncedCode, 300), []);

  const handleTextareaChange = useCallback((key: PlaygroundTabs) => {
    return (value: string) => {
      setLogs([]);
      setError(null);
      setCodes((preCodes) => ({ ...preCodes, [key]: value }));
    };
  }, []);

  useEffect(() => {
    debouncedSetDebouncedCode(codes);
  }, [codes, debouncedSetDebouncedCode]);

  const onClickRightButton = useCallback(() => {
    setCodes(defaultCode);
    setDebouncedCode(defaultCode);
  }, [defaultCode]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.code === 'KeyF') {
        e.preventDefault();
        setCodes({
          [PlaygroundTabs.HTML]: formatHTML(codes[PlaygroundTabs.HTML]),
          [PlaygroundTabs.CSS]: formatCSS(codes[PlaygroundTabs.CSS]),
          [PlaygroundTabs.JS]: formatJS(codes[PlaygroundTabs.JS]),
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [codes]);

  return (
    <PlaygroundContainer>
      <Tabs defaultTab={PlaygroundTabs.HTML} rightButton="reset" onClickRightButton={onClickRightButton}>
        {[PlaygroundTabs.HTML, PlaygroundTabs.CSS, PlaygroundTabs.JS].map((key) => (
          <TabPane key={key}>
            <Editor code={codes[key]} onChange={handleTextareaChange(key)} language={key} />
          </TabPane>
        ))}
      </Tabs>
      <div style={{ height: '100%', background: '#000' }}></div>
      <Tabs defaultTab={ResultTabs.RESULT}>
        <TabPane key={ResultTabs.RESULT}>
          <Result id={id} code={constructCode(debouncedCode, id)} error={error} setError={setError} />
        </TabPane>
        <TabPane key={ResultTabs.CONSOLE}>
          <Console id={id} logs={logs} setLogs={setLogs} />
        </TabPane>
      </Tabs>
    </PlaygroundContainer>
  );
};

export default Playground;
