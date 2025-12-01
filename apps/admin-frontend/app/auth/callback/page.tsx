'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = Cookies.get('auth_token');

  useEffect(() => {
    if (token) {
      console.log('🔐 Token received:', token.substring(0, 20) + '...');

      // Guarda en localStorage
      // localStorage.setItem('auth_token', token);

      // Extrae email de la URL si está disponible (opcional)
      // const email = searchParams.get('email');
      // if (email) localStorage.setItem('user_email', email);

      console.log('✅ Token stored in localStorage');

      router.push('/dashboard');
    } else {
      console.log('🔓 Logout detected, clearing tokens');

      // localStorage.removeItem('auth_token');

      console.log('✅ Tokens cleared from localStorage');
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
      router.push(`${authUrl}/login-basic`);
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-black">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">{token ? 'Authenticating...' : 'Logging out...'}</h1>
        <p className="text-slate-400 mt-2">
          {token ? 'Please wait while we complete your login.' : 'Please wait while we log you out.'}
        </p>
      </div>
    </div>
  );
}
