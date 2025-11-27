import { create } from 'zustand';

type DrawerType = 'login' | 'comment' | 'qr' | 'lang' | null;

interface DrawerStore {
  isOpen: boolean;
  drawerType: DrawerType;
  openDrawer: (type: DrawerType) => Promise<boolean>;
  closeDrawer: () => void;
  toggleDrawer: (type: DrawerType) => void;
}

export const useDrawerStore = create<DrawerStore>((set, get) => ({
  isOpen: false,
  drawerType: null,

  openDrawer: async (type: DrawerType): Promise<boolean> => {
    return new Promise((resolve) => {
      set({ isOpen: true, drawerType: type });
      setTimeout(() => {
        resolve(true);
      }, 50);
    });
  },

  closeDrawer: () => set({ isOpen: false, drawerType: null }),

  toggleDrawer: (type: DrawerType) => {
    const { isOpen, drawerType } = get();
    if (isOpen && drawerType === type) {
      set({ isOpen: false, drawerType: null });
    } else {
      set({ isOpen: true, drawerType: type });
    }
  },
}));
