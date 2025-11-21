import { create } from 'zustand';

interface AIBuilderStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => Promise<boolean>;
  toggleIsExpanded: () => void;
}

export const useAIBuilderStore = create<AIBuilderStore>((set) => ({
  isExpanded: false,
  setIsExpanded: async (expanded: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
      set({ isExpanded: expanded });
      // Pequeño delay para asegurar que React actualice el estado
      setTimeout(() => {
        resolve(true);
      }, 50);
    });
  },
  toggleIsExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));
