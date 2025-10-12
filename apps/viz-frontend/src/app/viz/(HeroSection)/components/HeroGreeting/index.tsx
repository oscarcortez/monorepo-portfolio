'use client';

import { JSX } from 'react';
import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeroGreeting(): JSX.Element {
  const searchParams = useSearchParams();
  const userUuid = searchParams.get('userUuid') || '088145ab-9f14-47ac-a3d4-0893afa92b4d';
  const { user, loading } = useUserPublicData(userUuid);
  const [heroGreeting] = user?.heroGreetings ?? [];

  return (
    <div className="mx-20 p-4 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-gray-800 dark:text-gray-400 mb-5 space-y-6">
        <div className="flex mx-auto max-w-4xl items-center justify-center text-center text-4xl font-extrabold tracking-tight text-slate-500 w-full">
          {loading ? <Skeleton className="h-[45] w-full" /> : heroGreeting?.title}
        </div>
        <div className="mx-auto max-w-4xl text-lg md:text-2xl text-justify font-medium bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-relaxed">
          {loading ? <Skeleton className="h-[105] w-full" /> : heroGreeting?.content}
        </div>
        <div className="flex justify-center text-base font-medium items-center text-gray-600 dark:text-gray-400">
          {loading ? <Skeleton className="h-4 w-1/3" /> : heroGreeting?.footer}
        </div>
      </h1>
    </div>
  );
}
