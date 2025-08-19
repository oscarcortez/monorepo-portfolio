import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';

import HeroLogo from './components/HeroLogo';
import HeroGreeting from './components/HeroGreeting';
import { HeroSectionProps } from './types';
import { config } from './components/HeroGreeting/constants';

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
      <HeroGreeting title={config.title} subtitle={config.subtitle} footer={config.footer} />
    </section>
  );
}
