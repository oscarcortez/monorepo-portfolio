'use client';

import { JSX, useState } from 'react';
import { QrCode, Copy, Save, MessageCircle, Check, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';
import { NavLink } from '@/src/app/graphql/generated/graphql-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import NavigationLink from './NavigationLink';

export default function WebNavigation(): JSX.Element {
  const [showQR, setShowQR] = useState(false);
  const { user, loading, error } = useUserPublicData('fddbaaae-b84c-4aad-ba3d-8875c59d155c');
  // console.log(user.navLinks);]
  const siteUrl = `https://localhost:3000/viz/${user?.uuid}`;
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const handleCopy = (text: string, action: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(action);
    setTimeout(() => setCopiedAction(null), 2000);
  };
  const handleNavigate = (sectionId: string) => {
    // console.log('Navigating to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Scroll suave
        block: 'start', // Alinear al inicio
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 bg-cyan-500/10 backdrop-blur-md rounded-b-xl items-center justify-center gap-6 px-4 shadow-lg text-center text-balance hidden md:flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="mt-2 h-8 w-28" />
        ))}
      </div>
    );
  }

  if (error || !user || !user.navLinks) {
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 bg-cyan-500/10 backdrop-blur-md rounded-b-xl hidden md:flex" />
    );
  }

  const handleComment = () => {
    // Scroll to comments section or open modal
    console.log('Opening comments...');
  };

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-10 
    bg-cyan-500/10 backdrop-blur-md rounded-b-xl
    flex items-center justify-between gap-6 px-4 shadow-lg md:flex"
    >
      <div className="flex items-center gap-6">
        {loading && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="mt-2 h-8 w-28" />)}
        {user?.navLinks.map((link: NavLink, idx: number) => (
          <NavigationLink key={idx} onClick={() => handleNavigate(link.url)} className={link.className || ''}>
            {link.content}
          </NavigationLink>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-cyan-400 transition-colors text-sm cursor-pointer"
          title="Show QR Code"
        >
          <QrCode size={16} />
        </motion.button>
        |
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComment}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-cyan-400 transition-colors text-sm cursor-pointer"
          title="View comments"
        >
          <MessageCircle size={16} />
        </motion.button>
        |
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log('Login clicked')} // Reemplaza con tu lógica de login
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-cyan-400 transition-colors text-sm cursor-pointer"
          title="Login"
        >
          <User size={16} />
        </motion.button>
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan to Visit</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={siteUrl} size={200} level="H" />
              </div>
              <p className="text-xs text-muted-foreground text-center break-all">{siteUrl}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(siteUrl, 'url')}
                className="text-xs px-3 py-2 rounded bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground transition-colors"
              >
                {copiedAction === 'url' ? 'URL Copied!' : 'Copy URL'}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
