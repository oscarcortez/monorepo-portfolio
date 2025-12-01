import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
  // console.log('Received request for token sync');
  try {
    const { token } = await request.json();

    const jwtSecret = process.env.JWT_SECRET;
    // Verificar que el token sea válido
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // console.log('Verifying token:', token);
    const secret = new TextEncoder().encode(jwtSecret);

    await jwtVerify(token, secret);

    const response = NextResponse.json({ success: true });

    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3010';

    response.headers.set('Access-Control-Allow-Origin', authUrl);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    // Crear cookie en viz-frontend
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error: unknown) {
    // use the caught error to avoid "defined but never used"
    const message = error instanceof Error ? error.message : String(error);
    console.error('JWT verification failed:', message);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
