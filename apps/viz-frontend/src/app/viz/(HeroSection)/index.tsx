'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';

import HeroLogo from './components/HeroLogo';
import HeroGreeting from './components/HeroGreeting';
import { HeroSectionProps } from './types';

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
