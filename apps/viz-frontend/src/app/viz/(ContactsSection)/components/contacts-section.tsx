'use client';

import { useState, ReactNode, ChangeEvent, FormEvent } from 'react';
import { Mail, Linkedin, Github, MessageCircle, Copy, Check, Send } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    message: '',
    sendVia: {
      email: false,
      whatsapp: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handleCheckboxChange = (channel: 'email' | 'whatsapp') => {
    setFormData((prev) => ({
      ...prev,
      sendVia: {
        ...prev.sendVia,
        [channel]: !prev.sendVia[channel],
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim() || (!formData.sendVia.email && !formData.sendVia.whatsapp)) {
      alert('Please write a message and select at least one contact method');
      return;
    }

    setIsSubmitting(true);

    try {
      // Email
      if (formData.sendVia.email) {
        window.location.href = `mailto:contact@example.com?subject=Contact from Portfolio&body=${encodeURIComponent(formData.message)}`;
      }

      // WhatsApp
      if (formData.sendVia.whatsapp) {
        window.open(`https://wa.me/15551234567?text=${encodeURIComponent(formData.message)}`, '_blank');
      }

      setSubmitted(true);
      setFormData({ message: '', sendVia: { email: false, whatsapp: false } });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center w-full dark">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Contact Me</h2>
        <p className="text-muted-foreground text-lg">Get in touch through any of these channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Contact cards */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
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

        {/* Right side - Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:col-span-2 p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Send me a message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Message textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleMessageChange}
                placeholder="Write your message here..."
                className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                rows={4}
              />
            </div>

            {/* Send via checkboxes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Send via</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.sendVia.email}
                    onChange={() => handleCheckboxChange('email')}
                    className="w-4 h-4 rounded border-primary/30 bg-background/50 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.sendVia.whatsapp}
                    onChange={() => handleCheckboxChange('whatsapp')}
                    className="w-4 h-4 rounded border-primary/30 bg-background/50 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </span>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-accent text-foreground font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : submitted ? 'Message sent!' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Additional contact info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 text-center"
      >
        <p className="text-muted-foreground">
          Prefer to chat? <span className="text-foreground font-medium">I typically respond within 24 hours</span>
        </p>
      </motion.div>
    </section>
  );
}
