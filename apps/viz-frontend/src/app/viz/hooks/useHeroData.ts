'use client';

import { useS } from 'use-s-react';

export type HeroData = {
  title: string;
  subtitle: string;
  footer: string;
};

const defaultData: HeroData = {
  title: 'Hi, I’m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
  subtitle:
    'I’ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces.',
  footer: 'Thanks for stopping by — welcome to my site. 💙',
};

export function useHeroData<T = HeroData>() {
  return useS<T>({
    value: defaultData as T,
    key: 'hero-data',
  });
}
