// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const tokenDecoder = (token: string) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    console.error('SECRET_KEY is not defined on the server.');
    return null; // یا throw error
  }
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export async function GET() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  if (!tokenCookie) {
    return NextResponse.json(
      { user: null, error: 'No token found' },
      { status: 401 }
    );
  }

  const token = tokenCookie.value;
  const decodedUser = tokenDecoder(token);

  if (!decodedUser || typeof decodedUser === 'string') {
    return NextResponse.json(
      { user: null, error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const { id, username, name, email } = decodedUser as {
    id: string;
    username: string;
    name?: string;
    email?: string;
  };

  return NextResponse.json({ id, username, name, email });
}
