'use client';

import { useState, ReactNode } from 'react';
import { DollarSign, Banknote, Bitcoin, Landmark } from 'lucide-react';

import { PaymentMethodCard } from './payment-method-card';
import { QRModal } from './qr-modal';

export type PaymentMethod = 'bank' | 'qr' | 'binance' | 'airtm';

interface PaymentMethodData {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  details: {
    account?: string;
    accountHolder?: string;
    instructions?: string[];
  };
}

export function PaymentSection() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showModal, setShowModal] = useState(false);

  const paymentMethods: PaymentMethodData[] = [
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Direct bank deposit',
      icon: <Landmark className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      details: {
        account: '1234567890',
        accountHolder: 'John Doe',
        instructions: [
          'Transfer amount to provided account',
          'Use transaction ID as reference',
          'Confirmation within 24 hours',
        ],
      },
    },
    {
      id: 'qr',
      title: 'QR Code Payment',
      description: 'Scan and pay instantly',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      details: {
        instructions: ['Open your payment app', 'Scan the QR code', 'Confirm the amount', 'Transaction complete'],
      },
    },
    {
      id: 'binance',
      title: 'Binance Pay',
      description: 'Crypto payments made simple',
      icon: <Bitcoin className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      details: {
        account: '0x742d35Cc6634C0532925a3b844Bc9e7595f2D3e1',
        instructions: [
          'Open Binance Pay',
          'Select your preferred crypto',
          'Send to wallet address',
          'Receive confirmation',
        ],
      },
    },
    {
      id: 'airtm',
      title: 'AirTM',
      description: 'Digital wallet transfers',
      icon: <Banknote className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      details: {
        account: 'airtm.user@example.com',
        instructions: [
          'Login to AirTM',
          'Select transfer option',
          'Enter amount and recipient',
          'Complete transaction',
        ],
      },
    },
  ];

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const selectedData = paymentMethods.find((m) => m.id === selectedMethod);

  return (
    <>
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 dark flex flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-pretty text-foreground">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Payment
              </span>{' '}
              Method
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from multiple secure payment options tailored for your convenience
            </p>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} {...method} onSelect={() => handleSelectMethod(method.id)} />
            ))}
          </div>

          <div className="mt-20 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 p-8 hover:bg-card/40 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <p className="text-muted-foreground">Available round the clock for your transactions</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">Secure</div>
                <p className="text-muted-foreground">Bank-level encryption and security protocols</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">Fast</div>
                <p className="text-muted-foreground">Instant processing for most payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedData && (
        <QRModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedMethod(null);
          }}
          method={selectedData}
        />
      )}
    </>
  );
}
