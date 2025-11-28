'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import HeroLogo from './components/HeroLogo';
import HeroGreeting from './components/HeroGreeting';
import { HeroSectionProps } from './types';
import { AIBuilderButton } from './components/ai-builder-button';

export default function HeroSection({ theme }: HeroSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (theme) {
      import(`./css/${theme}-bg.css`);
    }
  }, [theme]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-between dark relative overflow-hidden">
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
      <div className="relative z-0 flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* <HeroLogo className="mx-auto mb-4" /> */}
          <HeroGreeting />
        </div>
      </div>
      <div className="relative z-1 mb-4 w-full flex justify-center">
        <AIBuilderButton />
      </div>
    </section>
  );
}
