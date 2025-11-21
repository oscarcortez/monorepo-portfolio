'use client';

import { ReactNode } from 'react';
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
import { DividerSection } from '../_components/divider-section';

interface Section {
  id: string;
  component: ReactNode;
  showDividerAfter?: boolean; // Controlar divider por sección
  order?: number; // Ordenar dinámicamente
}

export default function Page() {
  const sections: Section[] = [
    { id: 'hero', component: <HeroSection theme="blue" />, showDividerAfter: true },
    { id: 'ai-builder', component: <AiBuilderSection />, showDividerAfter: true },
    { id: 'contacts', component: <ContactsSection />, showDividerAfter: true },
    { id: 'payments', component: <PaymentsSection />, showDividerAfter: true },
    { id: 'skills', component: <SkillsSection />, showDividerAfter: true },
    { id: 'resume', component: <ResumeSection />, showDividerAfter: false },
    { id: 'footer', component: <FooterSection />, showDividerAfter: false },
  ];

  return (
    <Layout>
      {sections.map((section, index) => (
        <div key={section.id} id={section.id}>
          {' '}
          {/* ← Agregar ID aquí */}
          {section.component}
          {index < sections.length - 1 && <DividerSection />}
        </div>
      ))}
    </Layout>
  );
}
