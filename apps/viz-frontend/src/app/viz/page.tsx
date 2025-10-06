'use client';

// import { useS } from 'use-s-react';
// import { useEffect } from 'react';

import Layout from '@/src/app/_components/Layout';
// import { useUserHeroQuery, UserPublic } from '@/src/app/graphql/generated/graphql';

import HeroSection from './(HeroSection)';
import ContactsSection from './(ContactsSection)';
// import UserHeroQuery

export default function Page() {
  // const { data, loading, error } = useUserHeroQuery({
  //   variables: { userUuid: '088145ab-9f14-47ac-a3d4-0893afa92b4d' },
  // });

  return (
    <Layout>
      <HeroSection theme="blue" />
      <ContactsSection />
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl">Welcome to the Viz Page 123</h1>
      </div>
    </Layout>
  );
}
