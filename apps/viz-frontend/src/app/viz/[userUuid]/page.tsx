'use client';

import { useWindowSize } from '@uidotdev/usehooks';
// import { unstable_Activity, Activity } from 'react';

import Layout from '@/src/app/_components/Layout';

// import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import HeroSection from '../(HeroSection)';
import ContactsSection from '../(ContactsSection)';
import PaymentsSection from '../(PaymentsSection)';
import SkillsSection from '../(SkillsSection)';

export default function Page() {
  const size = useWindowSize();
  // const { loading } = useUserPublicData('fddbaaae-b84c-4aad-ba3d-8875c59d155c');

  if (size === undefined) {
    return <div className="bg-slate-800 h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    size?.height && (
      <Layout>
        <HeroSection theme="blue" />
        <ContactsSection />
        <PaymentsSection />
        <SkillsSection />
        <div className="text-center mt-10">
          <h1 className="font-bold text-4xl">Welcome to the Viz Page 347</h1>
        </div>
      </Layout>
    )
  );
}
