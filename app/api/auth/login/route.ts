import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Add your authentication logic here
    // For now, using simple hardcoded credentials
    if (username === 'admin' && password === 'admin') {
      const response = NextResponse.json({ success: true }, { status: 200 });

      // Set authentication cookie
      response.cookies.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 1, // 1 days
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}