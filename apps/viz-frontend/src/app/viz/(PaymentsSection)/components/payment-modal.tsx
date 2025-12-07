'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import { PaymentSourceType, UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';

type PaymentFromQuery = NonNullable<UserHeroQuery['userHero']['payments']>[number];

export interface PaymentFrontendDetails {
  account?: string;
  accountHolder?: string;
  instructions?: string[];
}

export const PAYMENT_BG_MAP: Record<PaymentSourceType, string> = {
  [PaymentSourceType.Airtm]: 'from-green-500 to-emerald-500', // Verde a esmeralda (AirTM)
  [PaymentSourceType.Bank]: 'from-blue-500 to-cyan-500', // Azul a cyan (Bank Transfer)
  [PaymentSourceType.Binance]: 'from-yellow-500 to-orange-500', // Amarillo a naranja (Binance)
  [PaymentSourceType.Crypto]: 'from-orange-500 to-red-500', // Naranja a rojo (Crypto general)
  [PaymentSourceType.Other]: 'from-gray-500 to-slate-500', // Gris a slate (Otros)
  [PaymentSourceType.Psp]: 'from-purple-500 to-indigo-500', // Morado a índigo (PSP)
  [PaymentSourceType.Qr]: 'from-purple-500 to-pink-500', // Morado a rosa (QR Code)
  [PaymentSourceType.Wallet]: 'from-teal-500 to-cyan-500', // Teal a cyan (Wallet)
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: PaymentFromQuery;
}

export function PaymentModal({ isOpen, onClose, method }: PaymentModalProps) {
  const qrPath = `https://cubxbmyavmlsyaabsupa.supabase.co/storage/v1/object/sign/monorepo-portfolio/hero/payments/${method.uuid}.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NDM3YWM1Zi1mMGViLTQzOTAtYWYyMi0xY2JiOGIzMTdhYmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb25vcmVwby1wb3J0Zm9saW8vaGVyby9wYXltZW50cy84YjRiYTRlOC0zODA5LTQ1YjItYjU5Ni1mMWIyMjkzN2EzZjUucG5nIiwiaWF0IjoxNzY1MDUyMTQ1LCJleHAiOjE3OTY1ODgxNDV9.rsERikiF159DzXkTdzopcR2Aw-LdVD9hKZFj694Qu30`;
  const [copiedAccount, setCopiedAccount] = useState(false);
  const details: PaymentFrontendDetails = method.frontendDetails;
  const handleCopyAccount = () => {
    if (details.account) {
      navigator.clipboard.writeText(details.account);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };
  const color = PAYMENT_BG_MAP[method.paymentSource.type];
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card/95 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className={`relative h-32 bg-gradient-to-br ${color} p-6 text-white flex items-end justify-between`}>
                <div>
                  <h2 className="text-2xl font-bold">{method.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* QR Code Section */}
                {method.paymentSource.type === PaymentSourceType.Qr && (
                  <div className="mb-8 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 bg-white/95 rounded-xl border-2 border-border/30 shadow-lg"
                    >
                      <Image src={qrPath} alt={`${method.title} QR Code`} width={200} height={200} />
                    </motion.div>
                  </div>
                )}

                {/* Account Information */}
                {details.account && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-4 rounded-lg bg-muted/40 border border-border/40"
                  >
                    {details.accountHolder && <p className="text-sm text-muted-foreground mb-2">Account Holder</p>}
                    {details.accountHolder && (
                      <p className="font-semibold text-foreground mb-4">{details.accountHolder}</p>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.paymentSource.type === PaymentSourceType.Binance ? 'Wallet Address' : 'Account Number'}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono bg-background/60 p-2 rounded border border-border/30 truncate text-foreground">
                        {details.account}
                      </code>
                      <button onClick={handleCopyAccount} className="p-2 hover:bg-accent/20 rounded transition-colors">
                        {copiedAccount ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Instructions */}
                {details.instructions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-foreground mb-4">How to pay:</h3>
                    <ol className="space-y-3">
                      {details.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${color} text-white text-xs font-semibold flex items-center justify-center`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-sm text-muted-foreground">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={onClose}
                  className="w-full mt-8 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Done
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
