'use client';

import { JSX } from 'react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';
// import { NavLink } from '@/src/app/graphql/generated/graphql-types';
import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';

import NavigationLink from './_components/NavigationLink';
import AccountMenu from './_components/AccountMenu';

export default function WebNavigation(): JSX.Element {
  const userUuid = useUserUuid();
  const { user, loading, error } = useUserPublicData(userUuid);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-10 bg-cyan-500/10 backdrop-blur-md rounded-b-xl items-center justify-center gap-6 px-4 shadow-lg text-center text-balance hidden md:flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="mt-2 h-8 w-28" />
        ))}
      </div>
    );
  }

  if (error || !user || !user.navLinks) {
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 bg-cyan-500/10 backdrop-blur-md rounded-b-xl hidden md:flex" />
    );
  }

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-10 
    bg-cyan-500/10 backdrop-blur-md rounded-b-xl
    flex items-center justify-between gap-6 px-4 shadow-lg md:flex"
    >
      <div className="flex items-center gap-1">
        {loading && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="mt-2 h-8 w-28" />)}
        {user?.navLinks?.map((link) => (
          <NavigationLink key={link.uuid} onClick={() => handleNavigate(link.url)} className={link.className || ''}>
            {link.content}
          </NavigationLink>
        ))}
      </div>
      <AccountMenu />
    </div>
  );
}
