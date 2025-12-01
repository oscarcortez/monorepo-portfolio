'use client';

import { redirect } from 'next/navigation';

export default function Page() {
  redirect(`/viz/${process.env.NEXT_PUBLIC_DEFAULT_USER_UUID}`);
}
