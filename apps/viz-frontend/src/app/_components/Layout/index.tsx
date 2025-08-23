'use client';

import dynamic from 'next/dynamic';
import React, { JSX, PropsWithChildren } from 'react';

const WebNavigation = dynamic(() => import('./Navigation/WebNavigation'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 h-12 bg-slate-900/10 backdrop-blur-md rounded-b-xl animate-pulse" />
  ),
});

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <WebNavigation />
      {children}
    </>
  );
}
