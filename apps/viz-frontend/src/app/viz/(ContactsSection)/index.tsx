'use client';

import { Mail, Linkedin, Github, MessageCircle, Copy, Check, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';
import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  messageCircle: MessageCircle,
};

type ContactFromQuery = NonNullable<UserHeroQuery['userHero']['contacts']>[number];

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const userUuid = useUserUuid();
  const { user } = useUserPublicData(userUuid);
  const handleCopy = (text: string, uuid: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(uuid);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contacts: ContactFromQuery[] = user?.contacts || [];

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center w-full dark">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Contact Me</h2>
        <p className="text-muted-foreground text-lg">Get in touch through any of these channels</p>
      </div>

      <div className="lg:col-span-1 grid grid-cols-2 gap-4">
        {contacts.map((contact, index) => {
          const IconComponent = ICON_MAP[contact.iconName || 'mail'] || Mail;

          return (
            <motion.div
              key={contact.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-4 p-5 rounded-lg border bg-gradient-to-br ${contact.className} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-background/50 group-hover:bg-background transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="relative flex-grow min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{contact.type}</p>
                  <p className="text-foreground font-medium truncate group-hover:text-primary transition-colors">
                    {contact.displayText}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy(contact.displayText || '', contact.uuid);
                  }}
                  className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label={`Copy ${contact.type}`}
                >
                  {copiedId === contact.uuid ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary" />
                  )}
                </motion.button>
              </a>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 text-center max-w-2xl"
      >
        <p className="text-muted-foreground">
          Want to leave a public comment?{' '}
          <a
            href="#comments"
            className="inline-flex items-center gap-2 font-bold hover:opacity-80 transition-all duration-300"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 underline decoration-2 decoration-purple-400/50 hover:decoration-purple-400 underline-offset-4">
              Click here to share your thoughts
            </span>
            <MessageCircle className="w-5 h-5 text-purple-300" />
          </a>
        </p>
      </motion.div>
    </section>
  );
}
