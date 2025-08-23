import { NavLink } from './types';

export const navLinks: NavLink[] = [
  {
    content: 'Contact me',
    className: 'text-slate-300 hover:border-slate-500',
    // onClick: () => {
    //   console.log('Scroll to section 1 clicked');
    // },
  },
  {
    content: 'Projects',
    className: 'text-emerald-200 hover:border-emerald-300',
    // onClick: () => {
    //   console.log('Scroll to section 2 clicked');
    // },
  },
  {
    content: 'My mentors',
    className: 'text-indigo-200 hover:border-indigo-500',
    // onClick: () => {
    //   console.log('Scroll to section 3 clicked');
    // },
  },
  {
    content: 'Tech tips',
    className: 'text-rose-200 hover:border-rose-300',
    // onClick: () => {
    //   console.log('Scroll to section 4 clicked');
    // },
  },
  {
    content: 'Payments',
    className: 'text-violet-300 hover:border-violet-400',
    // onClick: () => {
    //   console.log('Scroll to section 5 clicked');
    // },
  },
];
