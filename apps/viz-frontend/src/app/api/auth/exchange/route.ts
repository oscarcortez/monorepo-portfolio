import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    // Canjea el código en el backend
    const response = await fetch('http://localhost:4000/auth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Invalid code' }, { status: 401 });
    }

    // Copia la cookie del backend al frontend
    const setCookieHeader = response.headers.get('set-cookie');
    const res = NextResponse.json({ success: true });

    if (setCookieHeader) {
      res.headers.set('set-cookie', setCookieHeader);
    }

    return res;
  } catch {
    return NextResponse.json({ success: false, error: 'Exchange failed' }, { status: 500 });
  }
}
