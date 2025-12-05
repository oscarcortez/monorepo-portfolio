'use client';

import { MessageCircle } from 'lucide-react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';
import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';

import HeroContact from './components/HeroContact';
import CommentPrompt from './components/CommentPrompt';

type ContactFromQuery = NonNullable<UserHeroQuery['userHero']['contacts']>[number];

export default function ContactSection() {
  const userUuid = useUserUuid();
  const { user } = useUserPublicData(userUuid);

  const contacts: ContactFromQuery[] = user?.contacts || [];

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center w-full dark">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Contact Me</h2>
        <p className="text-muted-foreground text-lg">Get in touch through any of these channels</p>
      </div>

      <div className="lg:col-span-1 grid grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <HeroContact key={contact.uuid} {...contact} index={index} />
        ))}
      </div>
      <CommentPrompt
        message="Want to leave a public comment?"
        linkText="Click here to share your thoughts"
        linkHref="#"
        icon={MessageCircle}
        delay={0.3}
      />
    </section>
  );
}
