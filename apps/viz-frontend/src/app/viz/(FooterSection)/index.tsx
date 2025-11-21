'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm dark">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Este sitio fue creado por{' '}
            <motion.a
              href="https://oscarcortez.dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text font-semibold text-transparent transition-all duration-300"
            >
              Oscar Cortez
              <ExternalLink className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.a>
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} • Created with passion and Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
