import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Clear the authentication cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}