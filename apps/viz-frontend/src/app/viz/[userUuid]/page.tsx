'use client';

import { useWindowSize } from '@uidotdev/usehooks';
// import { unstable_Activity, Activity } from 'react';

import Layout from '@/src/app/_components/Layout';

// import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import HeroSection from '../(HeroSection)';
import ContactsSection from '../(ContactsSection)';
import PaymentsSection from '../(PaymentsSection)';
import SkillsSection from '../(SkillsSection)';
import FooterSection from '../(FooterSection)';
import ResumeSection from '../(ResumeSection)';
import AiBuilderSection from '../(AiBuilderSection)';

function SectionDivider() {
  return <div className="relative h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />;
}

export default function Page() {
  // const size = useWindowSize();
  // const { loading } = useUserPublicData('fddbaaae-b84c-4aad-ba3d-8875c59d155c');

  // if (size === undefined) {
  //   return <div className="bg-read-800 h-screen w-full flex items-center justify-center">Loading...</div>;
  // }

  return (
    <Layout>
      <HeroSection theme="blue" />
      <AiBuilderSection />
      <SectionDivider />
      <ContactsSection />
      <SectionDivider />
      <PaymentsSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ResumeSection />
      <FooterSection />
    </Layout>
  );
}
