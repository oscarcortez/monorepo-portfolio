'use client';

import type { BreadcrumbItem } from '@/stores/breadcrumb-store';
import { ArrowLeftIcon, PlusIcon, ScanEyeIcon, TableOfContentsIcon } from 'lucide-react';

import Link from 'next/link';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { SectionTabs, NavButtonConfig } from '@/components/section-tabs';

export default function GreetingsLayout({ children }: { children: React.ReactNode }) {
  useBreadcrumb([
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sections', href: '/dashboard/sections' },
    { label: 'Greetings' },
  ] as BreadcrumbItem[]);

  const backHref = '/dashboard/sections/greetings';
  const tabs: NavButtonConfig[] = [
    {
      label: 'List',
      href: '/dashboard/sections/greetings/list',
      icon: TableOfContentsIcon,
    },
    { label: 'New', href: '/dashboard/sections/greetings/new', icon: PlusIcon },
    { label: 'Preview', href: '/dashboard/sections/greetings/preview', icon: ScanEyeIcon },
  ];

  return (
    <>
      <SectionTabs backHref={backHref} buttons={tabs} />
      <div className="flex flex-1 flex-col gap-5 p-2 pt-0">{children}</div>
    </>
  );
}
