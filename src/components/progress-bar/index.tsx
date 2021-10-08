import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

const ProgressBar = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.set(0);
      NProgress.start();
    };

    const handleRouteChangeEnd = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  return <></>;
};

export default ProgressBar;
