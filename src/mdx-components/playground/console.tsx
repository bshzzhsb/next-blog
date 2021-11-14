import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ConsoleProps {
  id: string;
  logs: any[];
  setLogs: (value: React.SetStateAction<any[]>) => void;
}

const ConsoleContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  background-color: var(--color-n2);
  font-size: 14px;
  font-family: jetbrains mono;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #282c34;
  }

  &::-webkit-scrollbar-track {
    border-left: 1px solid var(--color-n5);
    background-color: var(--color-n2);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: var(--color-n6);
  }
`;

const ConsoleLine = styled.p`
  border-bottom: 1px solid var(--color-n5);
  height: 22px;
  line-height: 22px;
  padding: 4px 4px 0;
  box-sizing: content-box;
`;

const Console: React.FC<ConsoleProps> = ({ id, logs, setLogs }) => {
  useEffect(() => {
    const handleMessage = ({ data }: MessageEvent) => {
      if (data.source === `frame-${id}` && data.message.type === 'log') {
        setLogs((preLogs) => [...preLogs, data.message.data]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  return (
    <ConsoleContainer>
      {logs.map((log, i) => (
        <ConsoleLine key={i}>{log.toString()}</ConsoleLine>
      ))}
    </ConsoleContainer>
  );
};

export default Console;
