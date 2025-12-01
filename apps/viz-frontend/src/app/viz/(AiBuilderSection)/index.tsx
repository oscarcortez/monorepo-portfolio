'use client';

import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import { AIBuilderSection } from './components/ai-builder-section';

export default function AiBuilderSection() {
  // const searchParams = useSearchParams();
  // const userUuid = searchParams.get('userUuid');

  // const { user } = useUserPublicData(userUuid);

  // console.log({ user, loading, error });
  // const contacts = user?.contacts || [];
  return <AIBuilderSection />;
}
