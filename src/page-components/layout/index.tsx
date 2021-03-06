import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';

import Hamburger from '@/components/hamburger';
import ToTop from '@/components/to-top';

import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = showSidebar ? 'hidden' : 'auto';
  }, [showSidebar]);

  return (
    <>
      <Head>
        <title>{`${title} - 博思何在`}</title>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Header showSidebar={showSidebar} setShowSidebar={(showSidebar: boolean) => setShowSidebar(showSidebar)} />
      <Hamburger showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={(showSidebar: boolean) => setShowSidebar(showSidebar)} />
      {children}
      <Footer />
      <ToTop />
    </>
  );
};

export default Layout;
