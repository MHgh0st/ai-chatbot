import { prisma } from '@/utils/prisma-client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export async function POST(req: Request) {
  const { username, password } = await req.json();

  const checkUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!checkUser) {
    return NextResponse.json(
      { error: 'کاربری با این نام کاربری یافت نشد' },
      { status: 400 }
    );
  }

  if (await bcrypt.compare(password, checkUser.password)) {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: 'Internal server configuration error. Missing secret key.' },
        { status: 500 }
      );
    }
    const token = jwt.sign(
      {
        id: checkUser.id,
        username,
        name: checkUser.name,
        email: checkUser.email,
      },
      secret,
      {
        expiresIn: '24h',
      }
    );
    const user = {
      id: checkUser.id,
      username,
      name: checkUser.name,
      token,
    };
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: false,
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'none',
    });

    return NextResponse.json(user);
  }

  return NextResponse.json(
    { error: 'رمز عبور وارد شده اشتباه است' },
    { status: 403 }
  );
}
