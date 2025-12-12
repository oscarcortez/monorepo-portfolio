'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      if (!authCode) {
        // Si no hay código, verificar cookie existente
        const existingToken = Cookies.get('auth_token');
        if (existingToken) {
          console.log('🔐 Existing token found, redirecting to dashboard...');
          router.push('/dashboard');
        } else {
          console.log('🔓 No token found, redirecting to login...');
          const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
          router.push(`${authUrl}/login-basic`);
        }
        return;
      }

      try {
        console.log('🔄 Exchanging authorization code for token...');

        // Intercambiar código por token en el backend
        const response = await fetch('http://localhost:4000/auth/exchange-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Importante para recibir la cookie
          body: JSON.stringify({ code: authCode }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const data = await response.json();
        console.log('✅ Token received and cookie set by backend');

        // También guardar en cookie del cliente (redundante pero útil)
        Cookies.set('auth_token', data.access_token, {
          expires: 7,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });

        // Limpiar URL y redirigir al dashboard
        console.log('✅ Authentication successful, redirecting to dashboard...');
        router.replace('/dashboard');
      } catch (error) {
        console.error('❌ Error exchanging code:', error);
        const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
        router.push(`${authUrl}/login-basic?error=auth_failed`);
      }
    };

    exchangeCodeForToken();
  }, [authCode, router]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-white">
        {authCode ? 'Authenticating...' : 'Checking authentication...'}
      </h1>
      <p className="text-slate-400 mt-2">
        Please wait while we complete your login.
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
