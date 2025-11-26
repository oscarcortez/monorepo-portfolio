'use client';

import { JSX, useState } from 'react';
import { QrCode, MessageCircle, User, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Skeleton } from '@/components/ui/skeleton';
import { NavLink } from '@/src/app/graphql/generated/graphql-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';

import NavigationLink from './NavigationLink';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

const comments: Comment[] = [
  { id: '1', author: 'John Doe', text: 'Great site! Love the design.', timestamp: '2 hours ago', avatar: 'JD' },
  { id: '2', author: 'Jane Smith', text: 'Amazing work, very clean UI.', timestamp: '4 hours ago', avatar: 'JS' },
  {
    id: '3',
    author: 'Alex Johnson',
    text: 'Impressed with the functionality.',
    timestamp: '1 day ago',
    avatar: 'AJ',
  },
  { id: '4', author: 'Maria Garcia', text: 'Professional and modern design.', timestamp: '2 days ago', avatar: 'MG' },
  { id: '5', author: 'Chris Wilson', text: 'Excellent portfolio showcase!', timestamp: '3 days ago', avatar: 'CW' },
];

export default function WebNavigation(): JSX.Element {
  const [showQR, setShowQR] = useState(false);
  const { user, loading, error } = useUserPublicData('fddbaaae-b84c-4aad-ba3d-8875c59d155c');
  // console.log(user.navLinks);]
  const siteUrl = `https://localhost:3000/viz/${user?.uuid}`;
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
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
    setShowComments(true);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log('Comment submitted:', newComment);
      setNewComment('');
    }
  };

  const lastComments = comments.slice(0, 5);
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
        <Drawer open={showComments} onOpenChange={setShowComments} direction="right">
          <DrawerContent className="bg-background border-l">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-lg font-semibold">Comments ({lastComments.length})</DrawerTitle>
                <DrawerClose asChild>
                  <button className="p-2 bg-cyan-700 rounded-md transition-colors">
                    <X size={16} />
                  </button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {lastComments.length > 0 ? (
                <div className="space-y-4">
                  {lastComments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm text-foreground">{comment.author}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground/70 mt-1 break-words">{comment.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                  No comments yet
                </div>
              )}
            </div>
            <div className="border-t p-4 bg-muted/10 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment here..."
                className="w-full p-3 rounded-lg bg-background border border-cyan-800 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-cyan-600 resize-none"
                rows={3}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="w-full px-4 py-2 rounded-lg bg-primary dark text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Send Comment
              </motion.button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
