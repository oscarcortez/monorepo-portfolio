'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PaymentMethodCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  onSelect: () => void;
}

export function PaymentMethodCard({ title, description, icon, color, onSelect }: PaymentMethodCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01, translateY: -1 }}
      // whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative h-full overflow-hidden rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm p-6 text-left transition-all hover:border-primary/50 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-15`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div
          className={`mb-4 inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          {icon}
        </div>

        {/* Text */}
        <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{description}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-0 blur-3xl group-hover:opacity-25 dark:group-hover:opacity-20 transition-opacity`}
      />
    </motion.button>
  );
}
