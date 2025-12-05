import { JSX, Fragment, ElementType } from 'react';
import { Languages, QrCode, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

import { useDrawerStore } from 'src/app/viz/stores/right-drawer.store';

type MenuAction = {
  id: string;
  icon: ElementType;
  label?: string;
  title: string;
  onClick: () => void;
  showSeparator?: boolean;
};

export default function AccountMenu(): JSX.Element {
  const { openDrawer } = useDrawerStore();

  const menuActions: MenuAction[] = [
    {
      id: 'lang',
      icon: Languages,
      label: 'EN',
      title: `Switch to`,
      onClick: () => openDrawer('lang'),
    },
    {
      id: 'qr',
      icon: QrCode,
      title: 'Show QR Code',
      onClick: () => openDrawer('qr'),
    },
    {
      id: 'comments',
      icon: MessageCircle,
      title: 'View comments',
      onClick: () => openDrawer('comment'),
    },
    {
      id: 'login',
      icon: User,
      title: 'Login',
      onClick: () => openDrawer('login'),
    },
  ];

  return (
    <div className="flex items-center">
      {menuActions.map((action, index) => {
        const Icon = action.icon;
        const isLast = index === menuActions.length - 1;

        return (
          <Fragment key={action.id}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-cyan-400 transition-colors text-sm cursor-pointer"
              title={action.title}
            >
              <Icon size={16} />
              {action.label && <span className="text-xs font-medium uppercase">{action.label}</span>}
            </motion.button>
            {!isLast && <span className="text-gray-500">|</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
