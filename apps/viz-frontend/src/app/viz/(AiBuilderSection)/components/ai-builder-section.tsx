'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Youtube, MessageCircle, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { useAIBuilderStore } from '@/src/app/viz/stores/ai-builder.store';

export function AIBuilderSection() {
  const { isExpanded, setIsExpanded } = useAIBuilderStore();

  return (
    <section className="relative  px-4 sm:px-6 lg:px-8 overflow-hidden dark">
      <div className="absolute inset-0" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto">
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="py-24"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Powered by AI</span>
                </div>

                <h2 className="text-5xl sm:text-6xl font-bold leading-tight text-balance mb-6">
                  Build Your Dream Site in
                  <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Seconds
                  </span>
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Describe your vision in plain English and let our AI do the heavy lifting. No coding required. Just a
                  simple prompt, and boom—your complete website is ready to go.
                </p>

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <ChevronDown className="w-4 h-4 rotate-180" />
                  Hide details
                </motion.button>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-1 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Ready to create?</h3>
                      <p className="text-muted-foreground">
                        Start building your perfect website in seconds with AI-powered generation.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open('https://v0.app', '_blank')}
                      className="group w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      Start Creating Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <div className="space-y-3 pt-4">
                      {['No coding required', '100% customizable', 'Deploy instantly'].map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="lg:col-span-1 group p-8 rounded-2xl border border-muted/30 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                      <Youtube className="w-6 h-6 text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-foreground">Watch Tutorial</h3>
                      <p className="text-sm text-muted-foreground">
                        See how to create a professional page in just a few clicks using AI
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all pt-2">
                      <span className="text-sm font-medium">View Steps</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="lg:col-span-1 p-8 rounded-2xl border border-muted/30 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Created by</p>

                    <a
                      href="#contact"
                      className="block text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                      Oscar Cortez
                    </a>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Crafting beautiful digital experiences powered by artificial intelligence.
                    </p>

                    <div className="pt-4 border-t border-muted/20">
                      <p className="text-xs text-muted-foreground mb-3">Get in touch</p>
                      <div className="flex gap-2">
                        <motion.a
                          href="https://discord.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 rounded-lg bg-muted/40 hover:bg-blue-500/20 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                        </motion.a>
                        <motion.a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 rounded-lg bg-muted/40 hover:bg-sky-500/20 transition-colors"
                        >
                          <Zap className="w-4 h-4 text-sky-500" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t border-muted/20"
              >
                {[
                  { label: 'Sites Created', value: '10K+' },
                  { label: 'Average Build Time', value: '2 min' },
                  { label: 'Satisfaction Rate', value: '98%' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center py-4">
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
