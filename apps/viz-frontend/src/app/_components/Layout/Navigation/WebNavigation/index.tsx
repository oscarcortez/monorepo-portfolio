'use client';

import { JSX } from 'react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';

import NavigationLink from './NavigationLink';

export default function WebNavigation(): JSX.Element {
  // const [navLinks] = useNavLinks<NavLink[]>();
  const { user, loading, error } = useUserPublicData('088145ab-9f14-47ac-a3d4-0893afa92b4d');

  // console.log('User in WebNavigation:', user?.navLinks, loading, error);
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 
            bg-slate-900/10 backdrop-blur-md rounded-b-xl
              items-center justify-center gap-6 px-4 shadow-lg text-center text-balance hidden md:flex"
    >
      {loading && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="mt-2 h-8 w-28" />)}
      {user?.navLinks.map((link, idx) => (
        <NavigationLink key={link.content + idx} onClick={() => console.log('hola')} className={link.className || ''}>
          {link.content}
        </NavigationLink>
      ))}
    </div>
  );
}
