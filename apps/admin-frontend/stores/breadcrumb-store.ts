import { create } from 'zustand';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbStore {
  items: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  resetBreadcrumb: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  items: [{ label: 'Dashboard', href: '/dashboard' }],

  setBreadcrumb: (items: BreadcrumbItem[]) => {
    set({ items });
  },

  resetBreadcrumb: () => {
    set({ items: [{ label: 'Dashboard', href: '/dashboard' }] });
  },
}));
