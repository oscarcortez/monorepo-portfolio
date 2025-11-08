import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Payment } from '@/src/app/graphql/generated/graphql';

import VizSection from '../_components/viz-section';

import HeroPayment from './components/HeroPayment';

export default function PaymentsSection() {
  const searchParams = useSearchParams();
  const userUuid = searchParams.get('userUuid') || '088145ab-9f14-47ac-a3d4-0893afa92b4d';
  const { user } = useUserPublicData(userUuid);
  // console.log({ user });
  const payments = user?.payments || [];
  return (
    <VizSection title="PAYMENTS" description="Manage your payment methods and transaction history.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payments.map((payment: Payment, index: number) => (
          <HeroPayment
            key={index}
            title={payment.title}
            displayText={payment.displayText || ''}
            link={payment.paymentSource?.website || ''}
            iconPath={payment.paymentSource?.logoPath || ''}
            className={''}
            isFavorite={payment.isFavorite}
          />
        ))}
      </div>
    </VizSection>
  );
}
