// 'use client';

// import { useEffect } from 'react';
// import { useS } from 'use-s-react';

// import { UserPublic, useUserHeroQuery } from '@/src/app/graphql/generated/graphql';

// export function useUserPublicData(userUuid?: string) {
//   const s = useS<UserPublic | null>({ value: null, key: 'user-public-data' });
//   const { data, loading, error } = useUserHeroQuery({
//     variables: { userUuid: userUuid ?? '' },
//   });

//   useEffect(() => {
//     if (data?.userHero) {
//       s.setValue(data.userHero);
//     }
//   }, [data, s]);

//   return { ...s, loading, error };
// }

// export default function Test() {
//   const s = useS<number>({ key: 'test', value: 0 });

//   useEffect(() => {
//     console.log('Antes:', s.value);
//     s.setValue(42);
//     console.log('Después:', s.value);
//   }, [s]);

//   return <div>{s.value}</div>;
// }
