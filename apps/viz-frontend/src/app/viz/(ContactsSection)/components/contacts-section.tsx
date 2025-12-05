'use client';

import { useState, ReactNode } from 'react';
import { Mail, Linkedin, Github, MessageCircle, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactItem {
  id: string;
  icon: ReactNode;
  label: string;
  value: string;
  link: string;
  color: string;
}

const CONTACTS: ContactItem[] = [
  {
    id: 'email',
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'contact@example.com',
    link: 'mailto:contact@example.com',
    color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
  },
  {
    id: 'linkedin',
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourprofile',
    link: 'https://linkedin.com/in/yourprofile',
    color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
  },
  {
    id: 'github',
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/yourprofile',
    link: 'https://github.com/yourprofile',
    color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  },
  {
    id: 'whatsapp',
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'WhatsApp',
    value: '+1 (555) 123-4567',
    link: 'https://wa.me/15551234567',
    color: 'from-green-500/20 to-green-500/5 border-green-500/30',
  },
];

export function ContactsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center w-full dark">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Contact Me</h2>
        <p className="text-muted-foreground text-lg">Get in touch through any of these channels</p>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
      {/* Left side - Contact cards */}
      <div className="lg:col-span-1 grid grid-cols-2 gap-4">
        {CONTACTS.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-4 p-5 rounded-lg border bg-gradient-to-br ${contact.color} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-background/50 group-hover:bg-background transition-colors">
                {contact.icon}
              </div>

              <div className="relative flex-grow min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{contact.label}</p>
                <p className="text-foreground font-medium truncate group-hover:text-primary transition-colors">
                  {contact.value}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(contact.value, contact.id);
                }}
                className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label={`Copy ${contact.label}`}
              >
                {copiedId === contact.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </motion.button>
            </a>
          </motion.div>
        ))}
      </div>
      {/* </div> */}

      {/* Additional contact info */}
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
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 underline decoration-2 decoration-purple-500/50 hover:decoration-purple-500 underline-offset-4"
          >
            Click here to share your thoughts
          </a>
        </p>
      </motion.div>
    </section>
  );
}
