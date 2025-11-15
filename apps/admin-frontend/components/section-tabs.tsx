'use client';

import { ArrowLeftIcon, PlusIcon, ScanEyeIcon, TableOfContentsIcon, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export interface NavButtonConfig {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface SectionTabsProps {
  backHref: string;
  buttons: NavButtonConfig[];
}

const defaultIcons: Record<string, LucideIcon> = {
  new: PlusIcon,
  preview: ScanEyeIcon,
  list: TableOfContentsIcon,
};

export function SectionTabs({ backHref, buttons }: SectionTabsProps) {
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back" asChild>
          <Link href={backHref}>
            <ArrowLeftIcon />
          </Link>
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        {buttons.map((button) => {
          const Icon = button.icon || defaultIcons[button.label.toLowerCase()] || PlusIcon;
          return (
            <Button key={button.label.toLowerCase()} variant="outline" asChild>
              <Link href={button.href}>
                <Icon /> {button.label}
              </Link>
            </Button>
          );
        })}
      </ButtonGroup>
    </ButtonGroup>
  );
}
