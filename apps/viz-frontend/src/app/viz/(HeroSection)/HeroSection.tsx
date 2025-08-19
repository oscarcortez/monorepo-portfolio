import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';

import HeroLogo from './components/HeroLogo';
import { HeroSectionProps } from './types';

export default function HeroSection({ theme }: HeroSectionProps) {
  const size = useWindowSize();
  // const scroll = useWindowScroll();

  useEffect(() => {
    if (theme) {
      import(`./css/${theme}-bg.css`);
    }
  }, [theme]);

  return (
    <section className="hero-section flex flex-col" style={size?.height ? { height: `${size.height}px` } : undefined}>
      <HeroLogo className="mx-auto mb-4" />

      <div className="mx-20 p-4 bg-slate-900 rounded-xl shadow-lg">
        <h1 className="text-center text-gray-800 dark:text-gray-400 mb-5 space-y-6">
          <p className="inline-flex items-center justify-center text-4xl font-extrabold tracking-tight text-slate-500">
            Hi, I’m Oscar Cortez — a Software Engineer with a degree in Computer Science.
          </p>
          <p className="mx-auto max-w-4xl text-lg md:text-2xl text-justify font-medium bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-relaxed">
            I’ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software
            development — from backend logic to user-facing interfaces
          </p>
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">
            Thanks for stopping by — welcome to my site. 💙
          </p>
        </h1>
      </div>
    </section>
  );
}
