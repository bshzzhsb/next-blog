import React, { useEffect, useState } from 'react';

import Frame from './frame';
import Error from './error';

interface ResultProps {
  id: string;
  code: string;
  error: any;
  setError: (error: any) => void;
}

const Result: React.FC<ResultProps> = ({ id, code, error, setError }) => {
  useEffect(() => {
    const handleMessage = ({ data }: MessageEvent) => {
      if (data.source === `frame-${id}` && data.message.type === 'error') {
        setError(data.message.data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [id, setError]);

  return (
    <>
      <Frame srcDoc={code} />
      {error && <Error error={error} />}
    </>
  );
};

export default Result;
