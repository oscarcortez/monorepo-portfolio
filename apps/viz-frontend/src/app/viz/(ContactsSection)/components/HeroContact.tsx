import { Mail, Linkedin, Github, MessageCircle, Copy, Check, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';

type ContactFromQuery = NonNullable<UserHeroQuery['userHero']['contacts']>[number];

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  messageCircle: MessageCircle,
};

interface HeroContactProps extends ContactFromQuery {
  index: number;
}

export default function HeroContact(props: HeroContactProps) {
  const handleCopy = (text: string, uuid: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(uuid);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const IconComponent = ICON_MAP[props.iconName || 'mail'] || Mail;
  return (
    <motion.div
      key={props.type}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: props.index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center gap-4 p-5 rounded-lg border bg-gradient-to-br ${props.className} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-background/50 group-hover:bg-background transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="relative flex-grow min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{props.type}</p>
          <p className="text-foreground font-medium truncate group-hover:text-primary transition-colors">
            {props.displayText}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            handleCopy(props.displayText || '', props.uuid);
          }}
          className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label={`Copy ${props.type}`}
        >
          {copiedId === props.uuid ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-primary" />
          )}
        </motion.button>
      </a>
    </motion.div>
  );
}
