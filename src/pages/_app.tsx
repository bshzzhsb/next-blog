import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

import '@/assets/css/global.css';
import '@/assets/css/variable.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('@/assets/icon/iconfont');
  }, []);
  return <Component {...pageProps} />;
}
