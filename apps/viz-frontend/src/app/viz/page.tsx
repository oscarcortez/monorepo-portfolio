'use client';

import { useWindowSize, useWindowScroll } from '@uidotdev/usehooks';

import Layout from '@/components/Layout';

import HeroSection from './(HeroSection)/HeroSection';

export default function Page() {
  const size = useWindowSize();
  const scroll = useWindowScroll();

  return (
    <Layout>
      <HeroSection />
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl">Welcome to the Viz Page</h1>
        <p className="mt-4 text-lg">
          Window Size: {size.width} x {size.height}
        </p>
        <p className="mt-2 text-lg">Scroll Position: {scroll.y}</p>
      </div>
    </Layout>
  );
}
