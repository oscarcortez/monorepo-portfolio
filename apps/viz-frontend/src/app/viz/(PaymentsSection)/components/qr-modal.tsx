'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentMethodData {
  id: string;
  title: string;
  color: string;
  details: {
    account?: string;
    accountHolder?: string;
    instructions?: string[];
  };
}

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: PaymentMethodData;
}

export function QRModal({ isOpen, onClose, method }: QRModalProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleCopyAccount = () => {
    if (method.details.account) {
      navigator.clipboard.writeText(method.details.account);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

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
              <div
                className={`relative h-32 bg-gradient-to-br ${method.color} p-6 text-white flex items-end justify-between`}
              >
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
                {method.id === 'qr' && (
                  <div className="mb-8 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 bg-white/95 rounded-xl border-2 border-border/30 shadow-lg"
                    >
                      <QRCodeSVG
                        value={method.details.account || 'https://example.com'}
                        size={200}
                        level="H"
                        includeMargin
                      />
                    </motion.div>
                  </div>
                )}

                {/* Account Information */}
                {method.details.account && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-4 rounded-lg bg-muted/40 border border-border/40"
                  >
                    {method.details.accountHolder && (
                      <p className="text-sm text-muted-foreground mb-2">Account Holder</p>
                    )}
                    {method.details.accountHolder && (
                      <p className="font-semibold text-foreground mb-4">{method.details.accountHolder}</p>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.id === 'binance' ? 'Wallet Address' : 'Account Number'}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono bg-background/60 p-2 rounded border border-border/30 truncate text-foreground">
                        {method.details.account}
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
                {method.details.instructions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-foreground mb-4">How to pay:</h3>
                    <ol className="space-y-3">
                      {method.details.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${method.color} text-white text-xs font-semibold flex items-center justify-center`}
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
