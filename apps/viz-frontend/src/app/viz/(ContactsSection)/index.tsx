'use client';

import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import VizSection from '../_components/viz-section';

import HeroContact from './components/HeroContact';

import { Contact } from '@/src/app/graphql/generated/graphql';

import './index.css';

export default function HeroSection() {
  const searchParams = useSearchParams();
  const userUuid = searchParams.get('userUuid') || 'fddbaaae-b84c-4aad-ba3d-8875c59d155c';

  const { user } = useUserPublicData(userUuid);

  // console.log({ user, loading, error });
  const contacts = user?.contacts || [];
  return (
    <VizSection title="GET IN TOUCH" description="Reach out for collaboration, questions, or just to say hello!">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact: Contact) => (
          <HeroContact
            key={contact.uuid}
            title={contact.title}
            displayText={contact.displayText || ''}
            link={contact.link}
            iconPath={contact.iconPath || ''}
            copyValue={contact.link}
            className={contact.className || ''}
          />
        ))}
      </div>
    </VizSection>
  );
}
