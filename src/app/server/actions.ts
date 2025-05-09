'use server';

import { PasswordHasher } from '@/utils/PasswordHasher';
import { RegisterFormValues } from '@/app/auth/register/RegisterSchema';
import { LoginFormValues } from '@/app/auth/login/LoginSchema';
import { cookies } from 'next/headers';

export const registerUser = async (data: RegisterFormValues) => {
  const res = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      username: data.username,
      password: await PasswordHasher(data.password),
    }),
  });
  if (!res.ok) {
    let errorData = { error: ' خطایی رخ داد' };
    try {
      errorData = await res.json();
    } catch (parseError) {
      console.error("API error response wasn't valid JSON:", parseError);
      errorData.error = res.statusText;
    }
    throw new Error(errorData.error || 'خطای نامشخص');
  }
};

export const LoginUser = async (data: LoginFormValues) => {
  const res = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });

  if (!res.ok) {
    let errorData = { error: ' خطایی رخ داد' };
    try {
      errorData = await res.json();
    } catch (parseError) {
      console.error("API error response wasn't valid JSON:", parseError);
      errorData.error = res.statusText;
    }
    throw new Error(errorData.error || 'خطای نامشخص');
  }

  const response = await res.json();

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.set('token', response.token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  console.log('token cookie: ', tokenCookie);

  return response;
};
