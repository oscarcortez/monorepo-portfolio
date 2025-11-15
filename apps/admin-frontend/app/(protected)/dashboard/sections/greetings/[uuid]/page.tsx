'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const uuid = params.uuid as string;

  return <div>UUID: {uuid}</div>;
}
