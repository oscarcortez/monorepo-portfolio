'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Landmark,
  Bitcoin,
  CreditCard,
  Wallet,
  DollarSign,
  QrCode,
  Coins,
  ArrowLeftRight,
  LucideIcon,
} from 'lucide-react';

import { PaymentSourceType, UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';

type PaymentFromQuery = NonNullable<UserHeroQuery['userHero']['payments']>[number];

interface PaymentMethodCardProps extends PaymentFromQuery {
  onSelect: () => void;
}

export interface PaymentFrontendDetails {
  account?: string;
  accountHolder?: string;
  instructions?: string[];
}

const PAYMENT_ICON_MAP: Record<PaymentSourceType, LucideIcon> = {
  [PaymentSourceType.Airtm]: ArrowLeftRight, // 🔄 Airtm (transferencias)
  [PaymentSourceType.Bank]: Landmark, // 🏛️ Banco
  [PaymentSourceType.Binance]: Coins, // 🪙 Binance (exchange)
  [PaymentSourceType.Crypto]: Bitcoin, // ₿ Criptomonedas
  [PaymentSourceType.Other]: DollarSign, // 💵 Otros
  [PaymentSourceType.Psp]: CreditCard, // 💳 Payment Service Provider
  [PaymentSourceType.Qr]: QrCode, // 📱 Código QR
  [PaymentSourceType.Wallet]: Wallet, // 👛 Billetera digital
};

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

export function PaymentMethodCard(props: PaymentMethodCardProps) {
  const IconComponent = PAYMENT_ICON_MAP[props.paymentSource.type];
  const color = PAYMENT_BG_MAP[props.paymentSource.type];

  return (
    <motion.button
      whileHover={{ scale: 1.01, translateY: -1 }}
      // whileTap={{ scale: 0.98 }}
      onClick={props.onSelect}
      className="group relative h-full overflow-hidden rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm p-6 text-left transition-all hover:border-primary/50 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-15`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div
          className={`mb-4 inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Text */}
        <h3 className="mb-2 text-lg font-bold text-foreground">{props.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{props.displayText}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${props.className} opacity-0 blur-3xl group-hover:opacity-25 dark:group-hover:opacity-20 transition-opacity`}
      />
    </motion.button>
  );
}
