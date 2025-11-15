'use client';

import type { BreadcrumbItem } from '@/stores/breadcrumb-store';
import { PlusIcon, ScanEyeIcon, TableOfContentsIcon } from 'lucide-react';

import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import { SectionTabs, NavButtonConfig } from '@/components/section-tabs';

export default function GreetingsLayout({ children }: { children: React.ReactNode }) {
  // useBreadcrumb([
  //   { label: 'Dashboard2', href: '/dashboard' },
  //   { label: 'Sections2', href: '/dashboard/sections' },
  //   { label: 'Greetings2', href: '/dashboard/sections/greetings' },
  // ] as BreadcrumbItem[]);
  const backHref = '/dashboard/sections/greetings';
  const tabs: NavButtonConfig[] = [
    {
      label: 'List',
      href: `${backHref}/list`,
    },
    { label: 'New', href: `${backHref}/new` },
    { label: 'Preview', href: `${backHref}/preview` },
  ];

  return (
    <>
      <SectionTabs backHref={backHref} buttons={tabs} />
      <div className="flex flex-1 flex-col gap-5 p-2 pt-0">{children}</div>
    </>
  );
}
