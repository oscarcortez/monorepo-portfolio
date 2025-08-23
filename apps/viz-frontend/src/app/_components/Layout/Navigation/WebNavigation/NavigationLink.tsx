'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, JSX, PropsWithChildren } from 'react';

export default function NavigationLink({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'text-sm px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl bg-transparent hover:cursor-pointer',
        props.className
      )}
    >
      {children}
    </button>
  );
}
