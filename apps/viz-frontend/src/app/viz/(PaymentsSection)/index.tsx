import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Payment } from '@/src/app/graphql/generated/graphql-types';
import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';

import VizSection from '../_components/viz-section';

import HeroPayment from './components/HeroPayment';
import { PaymentSection } from './components/payment-section';

export default function PaymentsSection() {
  const userUuid = useUserUuid();
  const { user } = useUserPublicData(userUuid);
  // console.log({ user });
  const payments = user?.payments || [];
  return (
    // <VizSection title="PAYMENTS" description="Manage your payment methods and transaction history.">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     {payments.map((payment: Payment, index: number) => (
    //       <HeroPayment
    //         key={index}
    //         title={payment.title}
    //         displayText={payment.displayText || ''}
    //         link={payment.paymentSource?.website || ''}
    //         iconPath={payment.paymentSource?.logoPath || ''}
    //         className={''}
    //         isFavorite={payment.isFavorite}
    //       />
    //     ))}
    //   </div>
    // </VizSection>
    <PaymentSection />
  );
}
