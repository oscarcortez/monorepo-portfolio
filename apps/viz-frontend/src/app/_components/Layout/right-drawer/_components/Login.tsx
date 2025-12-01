import { JSX } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Login(): JSX.Element {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 px-4">
      <div className="text-center space-y-2">
        <Sparkles className="w-12 h-12 mx-auto text-cyan-600 animate-pulse" />
        <h3 className="text-2xl font-bold">Join us!</h3>
        <p className="text-sm text-gray-600">Log in to unlock all features</p>
      </div>

      <Card className="w-full max-w-md border-2 border-cyan-600/20 shadow-lg">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-lg">Access your account</CardTitle>
          <CardDescription>Save your preferences and access exclusive content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href={`${authUrl}/login-basic`} className="block">
            <Button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white cursor-pointer" size="lg">
              <LogIn className="mr-2" size={18} />
              Login
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">o</span>
            </div>
          </div>

          <Link href={`${authUrl}/signup`} className="block">
            <Button
              variant="outline"
              className="w-full border-cyan-700 text-cyan-700 hover:bg-cyan-50 cursor-pointer"
              size="lg"
            >
              <UserPlus className="mr-2" size={18} />
              Create new account
            </Button>
          </Link>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500 text-center max-w-xs">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-gray-700">
          terms of service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-gray-700">
          privacy policy
        </Link>
      </p>
    </div>
  );
}
