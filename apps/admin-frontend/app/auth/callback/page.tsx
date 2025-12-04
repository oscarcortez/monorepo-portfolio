'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

function AuthCallbackContent() {
  const router = useRouter();
  const token = Cookies.get('auth_token');

  useEffect(() => {
    if (token) {
      console.log('🔐 Token received:', token.substring(0, 20) + '...');
      router.push('/dashboard');
    } else {
      console.log('🔓 Logout detected, clearing tokens');
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
      router.push(`${authUrl}/login-basic`);
    }
  }, [token, router]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-white">{token ? 'Authenticating...' : 'Logging out...'}</h1>
      <p className="text-slate-400 mt-2">
        {token ? 'Please wait while we complete your login.' : 'Please wait while we log you out.'}
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-black">
      <Suspense
        fallback={
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Loading...</h1>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
