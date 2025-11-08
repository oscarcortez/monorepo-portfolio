'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import HeroLogo from './components/HeroLogo';
import { HeroSectionProps } from './types';

const HeroGreeting = dynamic(() => import('./components/HeroGreeting'), {
  ssr: false,
  loading: () => <div className="mx-20 p-4 bg-slate-900 rounded-xl shadow-lg h-64 animate-pulse" />,
});

export default function HeroSection({ theme }: HeroSectionProps) {
  const size = useWindowSize();

  useEffect(() => {
    if (theme) {
      import(`./css/${theme}-bg.css`);
    }
  }, [theme]);

  return (
    <section className="hero-section flex flex-col" style={size?.height ? { height: `${size.height}px` } : undefined}>
      <HeroLogo className="mx-auto mb-4" />
      <HeroGreeting />
    </section>
  );
}
