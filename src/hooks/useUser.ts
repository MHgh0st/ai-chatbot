'use client';

import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: `خطا در ارتباط با سرور: ${res.status}` }));
    // اینجا می‌تونید بر اساس status خطاهای مختلف رو مدیریت کنید
    if (res.status === 401 || res.status === 403) {
      throw new Error(errorData.message || 'دسترسی غیر مجاز');
    }
    throw new Error(
      errorData.message || 'خطایی در دریافت اطلاعات کاربر رخ داد.'
    );
  }
  return res.json();
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR('/api/auth/me', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false, // برای جلوگیری از رفرش خودکار موقع فوکوس روی تب
    // dedupingInterval: 2000, // (پیش‌فرض) SWR به طور خودکار درخواست‌های تکراری در این بازه رو یکی می‌کنه
  });

  return {
    user: data, // یا data اگه ساختار پاسخ API فرق داره
    isLoading,
    error,
    mutate, // برای آپدیت دستی کش
  };
}
