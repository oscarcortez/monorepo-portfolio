// apps/viz-frontend/src/app/auth/callback/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const code = searchParams.get('exchangeCode');
    console.log('Authorization code:', code);
    if (!code) {
      setStatus('error');
      return;
    }

    // Canjea el código por la cookie
    fetch('/api/auth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          router.push('/viz');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, [searchParams, router]);

  if (status === 'error') {
    return (
      <div>
        <h1>Authentication Failed1234</h1>
        <button onClick={() => router.push('http://localhost:3010/login-basic')}>Try Again</button>
      </div>
    );
  }

  return <div>Authenticating12...</div>;
}
