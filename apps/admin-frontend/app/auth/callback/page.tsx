'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('auth_token');

  useEffect(() => {
    // Si viene token en la URL, guardarlo como cookie
    if (tokenFromUrl) {
      console.log('🔐 Token received from URL, saving as cookie...');

      // Guardar token como cookie en el dominio de admin-frontend
      Cookies.set('auth_token', tokenFromUrl, {
        expires: 7, // 7 días
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      // Limpiar URL y redirigir al dashboard
      console.log('✅ Authentication successful, redirecting to dashboard...');
      router.replace('/dashboard');
      return;
    }

    // Si no hay token en URL, verificar cookie existente
    const existingToken = Cookies.get('auth_token');
    if (existingToken) {
      console.log('🔐 Existing token found, redirecting to dashboard...');
      router.push('/dashboard');
    } else {
      console.log('🔓 No token found, redirecting to login...');
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
      router.push(`${authUrl}/login-basic`);
    }
  }, [tokenFromUrl, router]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-white">
        {tokenFromUrl ? 'Authenticating...' : 'Checking authentication...'}
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
