import { JSX, useState, createElement } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

import { useDrawerStore } from 'src/app/viz/stores/right-drawer.store';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';

import { Comments, Lang, Login, Qr } from './_components';

export default function RightDrawer(): JSX.Element {
  const { isOpen, drawerType, openDrawer, closeDrawer, toggleDrawer } = useDrawerStore();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // eslint-disable-next-line no-console
      console.log('Comment submitted:', newComment);
      setNewComment('');
    }
  };

  const drawerComponents = {
    comment: Comments,
    lang: Lang,
    login: Login,
    qr: Qr,
  };

  const drawerTitles = {
    comment: 'Comments',
    lang: 'Language',
    login: 'Login',
    qr: 'QR Code',
  };
  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer} direction="right">
      <DrawerContent className="bg-background border-l">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">
              {drawerType && drawerTitles[drawerType] ? drawerTitles[drawerType] : 'Menu'}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 bg-cyan-700 rounded-md transition-colors">
                <X size={16} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 text-black">
          {drawerType && drawerComponents[drawerType] ? createElement(drawerComponents[drawerType]) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
