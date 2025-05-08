import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma-client';

export async function POST(req: NextRequest) {
  const { name, username, email, password } = await req.json();

  const findUserByEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const findUserByUsername = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (findUserByEmail) {
    return NextResponse.json(
      { error: 'این ایمیل تکراری است' },
      { status: 400 }
    );
  }
  if (findUserByUsername) {
    return NextResponse.json(
      { error: 'این یوزرنیم تکراری است' },
      { status: 400 }
    );
  }
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password,
    },
  });

  return NextResponse.json(newUser);
}
