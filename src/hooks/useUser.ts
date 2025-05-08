'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom, authLoadingAtom, type User } from '@/lib/state/AuthAtoms';

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(authLoadingAtom);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      if (user || !isLoading) {
        if (isLoading) setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!isMounted) return;

        if (response.ok) {
          const userData: User = await response.json();
          setUser(userData);
        } else {
          setUser(null);
          // اگر وضعیت 401 بود، شاید بخواهید کوکی را پاک کنید
          // با فراخوانی یک API route برای logout
          // if (response.status === 401) { /* مثلا: await fetch('/api/auth/logout', { method: 'POST' }); */ }
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Failed to fetch user data:', error);
        setUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
    // این effect باید زمانی اجرا شود که اطلاعات کاربر (user) یا وضعیت بارگذاری (isLoading) تغییر کند،
    // یا توابع setter اتم‌ها (که معمولا ثابت هستند) تغییر کنند.
    // هدف اصلی این است که در اولین بارگذاری برنامه (وقتی user null و isLoading true است) اجرا شود.
  }, [user, isLoading, setUser, setIsLoading]);

  return { user, isLoading };
};
