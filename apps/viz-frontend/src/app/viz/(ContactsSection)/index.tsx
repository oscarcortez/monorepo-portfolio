'use client';

import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Contact } from '@/src/app/graphql/generated/graphql-types';

import VizSection from '../_components/viz-section';

import HeroContact from './components/HeroContact';
import { ContactsSection } from './components/contacts-section';

import './index.css';

export default function ContactSection() {
  const searchParams = useSearchParams();
  const userUuid = searchParams.get('userUuid') || 'fddbaaae-b84c-4aad-ba3d-8875c59d155c';

  const { user } = useUserPublicData(userUuid);

  // console.log({ user, loading, error });
  const contacts = user?.contacts || [];
  return <ContactsSection />;
}
