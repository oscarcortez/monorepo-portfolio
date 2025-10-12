'use client';

import { useWindowSize } from '@uidotdev/usehooks';

import Layout from '@/src/app/_components/Layout';
import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import HeroSection from '../(HeroSection)';
import ContactsSection from '../(ContactsSection)';

export default function Page() {
  const size = useWindowSize();
  const { loading } = useUserPublicData('088145ab-9f14-47ac-a3d4-0893afa92b4d');

  return (
    size?.height &&
    loading && (
      <Layout>
        <HeroSection theme="blue" />
        <ContactsSection />
        <div className="text-center mt-10">
          <h1 className="font-bold text-4xl">Welcome to the Viz Page 345</h1>
        </div>
      </Layout>
    )
  );
}
