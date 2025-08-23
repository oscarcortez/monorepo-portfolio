'use client';

import { useS } from 'use-s-react';

export type HeroData = {
  title: string;
  subtitle: string;
  footer: string;
};

export type NavLink = {
  content: string;
  className: string;
  onClick?: () => void;
};

const defaultData: HeroData = {
  title: 'Hi, I’m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
  subtitle:
    'I’ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces.',
  footer: 'Thanks for stopping by — welcome to my site. 💙',
};

const defaultNavLinks: NavLink[] = [
  {
    content: 'Contact me1',
    className: 'text-slate-300 hover:border-slate-500',
  },
  {
    content: 'Projects',
    className: 'text-emerald-200 hover:border-emerald-300',
  },
  {
    content: 'My mentors',
    className: 'text-indigo-200 hover:border-indigo-500',
  },
  {
    content: 'Tech tips',
    className: 'text-rose-200 hover:border-rose-300',
  },
  {
    content: 'Payments',
    className: 'text-violet-300 hover:border-violet-400',
  },
];

export function useHeroData<T = HeroData>() {
  return useS<T>({
    value: defaultData as T,
    key: 'hero-data',
  });
}

export function useNavLinks<T = NavLink[]>() {
  return useS<T>({
    value: defaultNavLinks as T,
    key: 'nav-links',
  });
}
