'use client';

import { JSX } from 'react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';
import { NavLink } from '@/src/app/graphql/generated/graphql-types';

import NavigationLink from './_components/NavigationLink';
import AccountMenu from './_components/AccountMenu';

export default function WebNavigation(): JSX.Element {
  // const [language, setLanguage] = useState<'en' | 'es'>('en');
  // const [showQR, setShowQR] = useState(false);
  const { user, loading, error } = useUserPublicData('fddbaaae-b84c-4aad-ba3d-8875c59d155c');
  // console.log(user.navLinks);]
  // const siteUrl = `https://localhost:3000/viz/${user?.uuid}`;
  // const [copiedAction, setCopiedAction] = useState<string | null>(null);
  // const [showComments, setShowComments] = useState(false);
  // const [newComment, setNewComment] = useState('');
  // const handleCopy = (text: string, action: string) => {
  //   navigator.clipboard.writeText(text);
  //   setCopiedAction(action);
  //   setTimeout(() => setCopiedAction(null), 2000);
  // };
  const handleNavigate = (sectionId: string) => {
    // console.log('Navigating to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Scroll suave
        block: 'start', // Alinear al inicio
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

  // const handleComment = () => {
  //   setShowComments(true);
  // };

  // const handleLanguageToggle = () => {
  //   setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  // };
  //handleLanguageToggle
  //handleComment
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-10 
    bg-cyan-500/10 backdrop-blur-md rounded-b-xl
    flex items-center justify-between gap-6 px-4 shadow-lg md:flex"
    >
      <div className="flex items-center gap-1">
        {loading && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="mt-2 h-8 w-28" />)}
        {user?.navLinks.map((link: NavLink, idx: number) => (
          <NavigationLink key={idx} onClick={() => handleNavigate(link.url)} className={link.className || ''}>
            {link.content}
          </NavigationLink>
        ))}
      </div>
      <AccountMenu />
    </div>
  );
}
