'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { toast } from 'sonner';

import GmailIcon from '@/src/svg/gmailIcon.svg';
import LinkedinIcon from '@/src/svg/linkedinIcon.svg';
import YoutubeIcon from '@/src/svg/youtubeIcon.svg';
import GithubIcon from '@/src/svg/githubIcon.svg';
import WhatsappIcon from '@/src/svg/whatsappIcon.svg';
import LetterIcon from '@/src/svg/letterIcon.svg';
import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import HeroContact from './components/HeroContact';
import './index.css';

export default function HeroSection() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const { user, loading, error } = useUserPublicData('088145ab-9f14-47ac-a3d4-0893afa92b4d');
  console.log(user?.contacts);

  const contacts = user?.contacts || [];
  return (
    <>
      <h2 className="text-3xl text-center font-bold text-yellow-500 bg-slate-600 py-4">GET IN TOUCH</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container bg-slate-900">
        <div className="w-full max-w-4xl mx-auto mt-5 mb-10">
          <p className="mb-8 text-gray-500 hidden sm:block">
            Reach out for collaboration, questions, or just to say hello!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <HeroContact
                key={contact.uuid}
                title={contact.title}
                displayText={contact.displayText || ''}
                link={contact.link}
                iconPath={contact.iconPath || ''}
                copyValue={'asdfas'}
              />
            ))}
            {/* <HeroContact
              title="Email"
              displayText="oscarkortez@gmail.com"
              link="mailto:oscarkortez@gmail.com" //
              iconPath="/svg/gmailIcon.svg"
              copyValue="oscarkortez@gmail.com"
              className="google-gradient-border" //
            /> */}

            <div className="google-gradient-border bg-slate-800 rounded-xl shadow flex items-center justify-between group transition py-3 px-5">
              <div>
                <h3 className="font-semibold text-lg text-slate-400">Email</h3>
                <a href="mailto:oscarkortez@gmail.com" className="text-slate-300 group-hover:underline break-all">
                  oscarkortez@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Image
                  src={GmailIcon}
                  alt="Gmail Icon"
                  width={28}
                  height={28}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
              <button
                className={clsx(
                  'pi text-slate-500 absolute bottom-2 right-2 hover:text-slate-400 active:text-slate-300 cursor-pointer transition-colors duration-200',
                  {
                    'pi-check': isCopied,
                    'pi-clipboard': !isCopied,
                  }
                )}
                title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                onClick={() => {
                  copyToClipboard('oscarkortez@gmail.com');
                  setIsCopied(true);
                  toast('Email has been copied to clipboard.');
                  setTimeout(() => setIsCopied(false), 1000);
                }}
                aria-label="Copy email to clipboard"
              ></button>
            </div>
            {/* <a
              href="https://linkedin.com/in/oscarkortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-blue-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-400">LinkedIn</h3>
                <span className="text-slate-300 group-hover:underline break-all">linkedin.com/in/oscarkortez</span>
              </div>
              <div className="flex items-center ml-6">
                <Image
                  src={LinkedinIcon}
                  alt="LinkedIn Icon"
                  width={32}
                  height={32}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@OSCARCORTEZVILLCA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-red-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-400">YouTube</h3>
                <span className="text-slate-300 group-hover:underline break-all">@OSCARCORTEZVILLCA</span>
              </div>
              <div className="flex items-center ml-6">
                <Image
                  src={YoutubeIcon}
                  alt="YouTube Icon"
                  width={32}
                  height={32}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
            </a>
            <a
              href="https://github.com/oscarcortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-slate-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-400">GitHub</h3>
                <span className="text-slate-300 group-hover:underline break-all">github.com/oscarkortez</span>
              </div>
              <div className="flex items-center ml-6">
                <Image
                  src={GithubIcon}
                  alt="Github Icon"
                  width={32}
                  height={32}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
            </a>
            <a
              href="https://wa.me/59177703364"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-green-300 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-400">Whatsapp</h3>
                <span className="text-slate-300 group-hover:underline break-all">+591 77703364</span>
              </div>
              <div className="flex items-center ml-6">
                <Image
                  src={WhatsappIcon}
                  alt="Whatsapp Icon"
                  width={32}
                  height={32}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
            </a>
            <a
              href="https://linkedin.com/in/oscarkortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-red-300 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-400">Resume</h3>
                <span className="text-slate-300 group-hover:underline break-all">resume_oscarcortez.pdf</span>
              </div>
              <div className="flex items-center ml-6">
                <Image
                  src={LetterIcon}
                  alt="Resume Icon"
                  width={32}
                  height={32}
                  className="transition-transform duration-200 group-hover:scale-120"
                />
              </div>
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
}
