'use client';

import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

import { useAIBuilderStore } from '@/src/app/viz/stores/ai-builder.store';

export function AIBuilderButton() {
  const { setIsExpanded } = useAIBuilderStore();

  const handleNavigate = async (sectionId: string) => {
    const success = await setIsExpanded(true);
    if (!success) {
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Scroll suave
        block: 'start', // Alinear al inicio
      });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={() => handleNavigate('ai-builder')}
      disabled={false}
      className={`mx-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Sparkles className="w-5 h-5" />
      <span>
        Create your site with AI <span className="text-xs font-normal opacity-80">in 2 min</span>
      </span>
      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
    </motion.button>
  );
}
