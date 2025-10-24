import { useSearchParams } from 'next/navigation';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
import { Payment } from '@/src/app/graphql/generated/graphql';

import HeroPayment from './components/HeroPayment';

export default function PaymentsSection() {
  const searchParams = useSearchParams();
  const userUuid = searchParams.get('userUuid') || '088145ab-9f14-47ac-a3d4-0893afa92b4d';
  const { user } = useUserPublicData(userUuid);
  // console.log({ user });
  const payments = user?.payments || [];
  return (
    <>
      <h2 className="text-3xl text-center font-bold text-yellow-500 bg-slate-600 py-4">PAYMENTS</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container bg-slate-900">
        <div className="w-full max-w-4xl mx-auto mt-5 mb-10">
          <p className="mb-8 text-gray-500 hidden sm:block">
            Reach out for collaboration, questions, or just to say hello!
          </p>
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
        </div>
      </div>
    </>
  );
}
