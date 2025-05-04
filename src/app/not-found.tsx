'use client';

import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo width={150} height={50} />
        </div>
        <Card className="w-full shadow-lg">
          <CardBody className="flex flex-col items-center py-10 px-6">
            <Icon
              icon="solar:round-error-bold-duotone"
              className="text-red-500 mb-4"
              fontSize={80}
            />
            <h1 className="text-3xl font-bold mb-2">404</h1>
            <p className="text-xl font-medium mb-2">صفحه مورد نظر یافت نشد</p>
            <p className="text-gray-500 text-center mb-6">
              صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است
            </p>
            <Button
              color="primary"
              className="w-full"
              startContent={<Icon icon="solar:home-bold-duotone" />}
              onPress={() => router.push('/')}
            >
              بازگشت به صفحه اصلی
            </Button>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
