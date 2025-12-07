import { Mail, Linkedin, Github, MessageCircle, Copy, Check, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

import { UserHeroQuery, ContactType } from '@/src/app/graphql/generated/graphql-types';

const COLOR_MAP: Record<ContactType, string> = {
  [ContactType.Email]: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
  [ContactType.Linkedin]: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
  [ContactType.Github]: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  [ContactType.Phone]: 'from-green-500/20 to-green-500/5 border-green-500/30',
  [ContactType.Twitter]: 'from-sky-500/20 to-sky-500/5 border-sky-500/30',
  [ContactType.Instagram]: 'from-pink-500/20 to-pink-500/5 border-pink-500/30',
  [ContactType.Discord]: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30',
  [ContactType.Facebook]: 'from-blue-600/20 to-blue-600/5 border-blue-600/30',
  [ContactType.Tiktok]: 'from-pink-600/20 to-pink-600/5 border-pink-600/30',
  [ContactType.Youtube]: 'from-red-500/20 to-red-500/5 border-red-500/30',
  [ContactType.Resume]: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
  [ContactType.Website]: 'from-slate-500/20 to-slate-500/5 border-slate-500/30',
};

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
  const colorClasses = COLOR_MAP[props.type] || 'from-gray-500/20 to-gray-500/5 border-gray-500/30';

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
        className={clsx(
          'group relative flex items-center gap-4 p-5 rounded-lg border bg-gradient-to-br backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 overflow-hidden ',
          colorClasses
          // props.className
        )}
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
          className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
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
