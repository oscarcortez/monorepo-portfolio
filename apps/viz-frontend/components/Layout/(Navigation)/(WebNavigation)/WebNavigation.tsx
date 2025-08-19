'use client';

import { JSX } from 'react';

import NavigationLink from './NavigationLink';
import { navLinks } from './constants';

export default function WebNavigation(): JSX.Element {
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 
            bg-slate-900/10 backdrop-blur-md rounded-b-xl
              flex items-center justify-center gap-6 px-4 shadow-lg text-center text-balance"
    >
      {navLinks.map((link, idx) => (
        <NavigationLink key={link.content + idx} onClick={link.onClick} className={link.className}>
          {link.content}
        </NavigationLink>
      ))}
    </div>
  );
}
