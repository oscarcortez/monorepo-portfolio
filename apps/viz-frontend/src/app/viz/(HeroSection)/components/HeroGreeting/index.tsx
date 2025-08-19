import { JSX } from 'react';

import { HeroGreetingProps } from './types';

export default function HeroGreeting(props: HeroGreetingProps): JSX.Element {
  return (
    <div className="mx-20 p-4 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-center text-gray-800 dark:text-gray-400 mb-5 space-y-6">
        <p className="inline-flex items-center justify-center text-4xl font-extrabold tracking-tight text-slate-500">
          {props.title}
        </p>
        <p className="mx-auto max-w-4xl text-lg md:text-2xl text-justify font-medium bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-relaxed">
          {props.subtitle}
        </p>
        <p className="text-base font-medium text-gray-600 dark:text-gray-400">{props.footer}</p>
      </h1>
    </div>
  );
}
