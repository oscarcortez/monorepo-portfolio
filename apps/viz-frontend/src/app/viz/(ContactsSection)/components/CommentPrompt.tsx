'use client';

import { motion } from 'framer-motion';
import { MessageCircle, LucideIcon } from 'lucide-react';

import { useDrawerStore } from 'src/app/viz/stores/right-drawer.store';

interface CommentPromptProps {
  delay?: number;
  message?: string;
  linkText?: string;
  icon?: LucideIcon;
}

export default function CommentPrompt({
  delay = 0.5,
  message = 'Want to leave a public comment?',
  linkText = 'Click here to share your thoughts',
  icon: Icon = MessageCircle,
}: CommentPromptProps) {
  const { openDrawer } = useDrawerStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-12 p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 text-center max-w-2xl"
    >
      <p className="text-muted-foreground">
        {message}{' '}
        <button
          onClick={() => openDrawer('comment')}
          className="inline-flex items-center gap-2 font-bold hover:opacity-80 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 underline decoration-2 decoration-purple-400/50 hover:decoration-purple-400 underline-offset-4">
            {linkText}
          </span>
          <Icon className="w-5 h-5 text-purple-300" />
        </button>
      </p>
    </motion.div>
  );
}
