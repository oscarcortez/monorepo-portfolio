import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';

import { useHeroData } from '../hooks/useHeroData';

import HeroLogo from './components/HeroLogo';
import HeroGreeting from './components/HeroGreeting';
import { HeroSectionProps } from './types';
import { config } from './components/HeroGreeting/constants';

type HeroData = {
  title: string;
  subtitle: string;
  footer: string;
};

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
