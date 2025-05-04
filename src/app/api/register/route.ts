import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma-client';

export async function POST(req: NextRequest) {
  const { name, username, email, password } = await req.json();

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
