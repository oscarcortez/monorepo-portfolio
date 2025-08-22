'use client';

import Layout from '@/components/Layout';

import HeroSection from './(HeroSection)/HeroSection';

export default function Page() {
  return (
    <Layout>
      <HeroSection theme="blue" />
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl">Welcome to the Viz Page 123</h1>
      </div>
    </Layout>
  );
}
