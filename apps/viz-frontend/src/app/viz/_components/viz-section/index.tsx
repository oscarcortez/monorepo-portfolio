import type { JSX, ReactNode } from 'react';

type VizSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function VizSection({ title, description, children }: VizSectionProps): JSX.Element {
  return (
    <>
      <h2
        className="text-3xl text-center font-bold text-yellow-500 py-7 bg-slate-600"
        style={{
          backgroundImage: "url('/svg/patterns/circuit-board.svg')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x',
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container bg-slate-900">
        <div className="w-full max-w-4xl mx-auto mt-5 mb-10">
          {description && <p className="mb-8 text-gray-500 hidden sm:block">{description}</p>}
          {children}
        </div>
      </div>
    </>
  );
}
