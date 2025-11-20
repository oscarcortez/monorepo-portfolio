'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export function AIBuilderSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-primary/5" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by AI</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                Build Your Dream Site in
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {' '}
                  Seconds
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Describe your vision in plain English and let our AI do the heavy lifting. No coding required. Just a
                simple prompt, and boom—your complete website is ready to go.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://v0.app', '_blank')}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-primary/30 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all"
              >
                Learn More
              </motion.button>
            </div>

            <div className="pt-8 border-t border-muted/30 space-y-4">
              <p className="text-sm text-muted-foreground font-medium">Trusted by developers worldwide</p>
              <div className="flex gap-4 flex-wrap">
                {['Fast', 'Creative', 'Modern', 'Free'].map((item) => (
                  <div key={item} className="px-3 py-1 rounded-full bg-muted/40 text-sm text-foreground">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Video embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[500px]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-muted/30 bg-muted/10 shadow-2xl shadow-primary/10">
              {/* YouTube Video Embed */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="AI Website Builder Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full shadow-xl"
            >
              Fully Automated ⚡
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
