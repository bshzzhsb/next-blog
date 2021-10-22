import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import ProgressBar from '@/components/progress-bar';
import ga from '@/lib/ga';
import '@/assets/css/global.css';
import '@/assets/css/variable.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    require('@/assets/icon/iconfont');
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}
