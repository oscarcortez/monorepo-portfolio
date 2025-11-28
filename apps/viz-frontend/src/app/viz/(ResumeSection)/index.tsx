'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import resumeSvg from './svg/resume.svg';

export default function ResumeSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const cvUrl = window.location.origin + '/cv.pdf';
    navigator.clipboard.writeText(cvUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden dark">
      {/* Fondo decorativo */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" /> */}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Are you looking for a
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Software Developer?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I have my résumé ready with all my experience, projects, and technical skills. Download it to learn more
                about my professional background and how I can contribute to your team.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <motion.div whileHover={{ y: -5 }} className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Exp.</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">20+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="https://cubxbmyavmlsyaabsupa.supabase.co/storage/v1/object/sign/monorepo-portfolio/hero/resume/resume-oct-2025.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NDM3YWM1Zi1mMGViLTQzOTAtYWYyMi0xY2JiOGIzMTdhYmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb25vcmVwby1wb3J0Zm9saW8vaGVyby9yZXN1bWUvcmVzdW1lLW9jdC0yMDI1LnBkZiIsImlhdCI6MTc2MzU0NDE2MywiZXhwIjoxNzk1MDgwMTYzfQ.b1GklLYhlLGGgUIxBtMR_dcFc_lcLz5DbaVSpiVe9LI"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg transition-all "
              >
                <Download size={20} />
                Download CV
              </motion.a>

              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold transition-all ${
                  copied
                    ? 'bg-primary/20 text-primary border-primary'
                    : 'bg-card text-foreground hover:border-primary hover:bg-card/80'
                }`}
              >
                {copied ? '✓ Link copied' : '📋 Copy link'}
              </motion.button>
            </div>
          </motion.div>

          <Image src={resumeSvg} alt="Resume Illustration" width={400} height={400} className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
