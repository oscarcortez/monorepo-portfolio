'use client';

import { JSX } from 'react';

import NavigationLink from './NavigationLink';

interface NavLink {
  content: string;
  onClick?: () => void;
  className?: string;
}

interface WebNavigationProps {
  links: NavLink[];
}

const navLinks: NavLink[] = [
  {
    content: 'Contact me',
    className: 'text-slate-300 hover:border-slate-500',
    onClick: () => {
      // console.log('Scroll to section 1 clicked');
    },
  },
  {
    content: 'Projects',
    className: 'text-emerald-200 hover:border-emerald-300',
    onClick: () => {
      // console.log('Scroll to section 2 clicked');
    },
  },
  {
    content: 'My mentors',
    className: 'text-indigo-200 hover:border-indigo-500',
    onClick: () => {
      // console.log('Scroll to section 3 clicked');
    },
  },
  {
    content: 'Tech tips',
    className: 'text-rose-200 hover:border-rose-300',
    onClick: () => {
      // console.log('Scroll to section 4 clicked');
    },
  },
  {
    content: 'Payments',
    className: 'text-violet-300 hover:border-violet-400',
    onClick: () => {
      // console.log('Scroll to section 5 clicked');
    },
  },
];

export default function WebNavigation({ links }: WebNavigationProps): JSX.Element {
  // const x = 1; // Example variable to demonstrate no unused variable warning

  return (
    <div className="text-center text-balance relative">
      <div className="flex justify-center items-center gap-4">
        <div className="top-0 left-1/2 fixed -translate-x-1/2 w-full max-w-4xl z-40 bg-slate-900/80 backdrop-blur-md rounded-b-xl flex-row items-center justify-center gap-6 px-4 shadow-lg hidden sm:flex">
          {navLinks.map((link, idx) => (
            <NavigationLink key={link.content + idx} onClick={link.onClick} className={link.className}>
              {link.content}
            </NavigationLink>
          ))}
        </div>
      </div>
    </div>
  );
}
