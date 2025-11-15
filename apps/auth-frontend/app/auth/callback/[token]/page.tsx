'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  useEffect(() => {
    if (token) {
      console.log('🔐 Token received:', token.substring(0, 20) + '...');

      // Guarda en localStorage
      localStorage.setItem('auth_token', token);

      // Extrae email de la URL si está disponible (opcional)
      // const email = searchParams.get('email');
      // if (email) localStorage.setItem('user_email', email);

      console.log('✅ Token stored in localStorage');

      // Redirige al dashboard
      router.push('/dashboard');
    } else {
      console.error('❌ No token provided');
      router.push('/login-basic');
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authenticating...</h1>
        <p className="text-gray-600 mt-2">Please wait while we complete your login.</p>
      </div>
    </div>
  );
}
