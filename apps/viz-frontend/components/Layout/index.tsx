'use client';

import React, { JSX, PropsWithChildren } from 'react';

import WebNavigation from './(Navigation)/(WebNavigation)/WebNavigation';

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  // const x = 1; // Example variable to demonstrate no unused variable warning

  return (
    <div className="">
      <WebNavigation links={[]} />
      {children}
    </div>
  );
}
