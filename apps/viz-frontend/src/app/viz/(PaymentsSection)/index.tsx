import { useState } from 'react';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';
import { UserHeroQuery, PaymentSourceType } from '@/src/app/graphql/generated/graphql-types';

import { PaymentModal } from './components/payment-modal';
import { PaymentMethodCard } from './components/payment-method-card';

type PaymentFromQuery = NonNullable<UserHeroQuery['userHero']['payments']>[number];

export default function PaymentsSection() {
  const userUuid = useUserUuid();
  const { user } = useUserPublicData(userUuid);

  const [selectedMethod, setSelectedMethod] = useState<PaymentSourceType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectMethod = (method: PaymentSourceType) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const payments: PaymentFromQuery[] = user?.payments || [];
  const selectedData: PaymentFromQuery | undefined = payments.find((m) => m.paymentSource.type === selectedMethod);

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
            {payments.map((payment) => (
              <PaymentMethodCard
                key={payment.uuid}
                {...payment}
                onSelect={() => handleSelectMethod(payment.paymentSource.type)}
              />
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
        <PaymentModal
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
