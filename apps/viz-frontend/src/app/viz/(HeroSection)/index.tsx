'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import HeroLogo from './components/HeroLogo';
import HeroGreeting from './components/HeroGreeting';
import { HeroSectionProps } from './types';
import heroBg from './images/bg-tech2.webp';
import FunnyCursor from './components/funny-cursor';

export default function HeroSection({ theme }: HeroSectionProps) {
  useEffect(() => {
    if (theme) {
      import(`./css/${theme}-bg.css`);
    }
  }, [theme]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center dark cursor-default">
      {/* <FunnyCursor /> */}
      {/* Background Image */}
      <Image
        src={
          'https://cubxbmyavmlsyaabsupa.supabase.co/storage/v1/object/sign/monorepo-portfolio/hero/background/bg-tech2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NDM3YWM1Zi1mMGViLTQzOTAtYWYyMi0xY2JiOGIzMTdhYmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb25vcmVwby1wb3J0Zm9saW8vaGVyby9iYWNrZ3JvdW5kL2JnLXRlY2gyLndlYnAiLCJpYXQiOjE3NjM1NDMzNTAsImV4cCI6MTc5NTA3OTM1MH0.O0Lq6exS_GymgvT_8fN4thE9C-VC1IhMK0IBi_TYBUQ'
        }
        alt="Hero Background"
        fill
        className="object-cover"
        priority
        quality={75}
      />

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-none bg-gradient-to-b from-black/80 via-black/40 to-black/80 " />

      {/* Content */}
      <div className="relative z-0">
        {/* <HeroLogo className="mx-auto mb-4" /> */}
        <HeroGreeting />
      </div>
    </section>
  );
}
