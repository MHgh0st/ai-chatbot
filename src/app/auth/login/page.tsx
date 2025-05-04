'use client';

import { Button, Card, CardBody, CardHeader, Input, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex gap-3 pb-0">
        <div className="flex flex-col w-full items-center">
          <h1 className="text-2xl font-bold mb-1">ورود به حساب کاربری</h1>
          <p className="text-gray-500 text-sm">وارد حساب کاربری خود شوید</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="ایمیل"
            placeholder="example@mail.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            startContent={
              <Icon
                icon="solar:letter-bold-duotone"
                className="text-gray-400"
              />
            }
            required
          />
          <Input
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            startContent={
              <Icon icon="solar:lock-bold-duotone" className="text-gray-400" />
            }
            required
          />
          <div className="flex justify-end">
            <Link href="#" size="sm" className="text-primary">
              رمز عبور را فراموش کرده اید؟
            </Link>
          </div>
          <Button
            type="submit"
            color="primary"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            ورود
          </Button>
          <div className="text-center mt-4">
            <span className="text-gray-500">حساب کاربری ندارید؟ </span>
            <Link href="/auth/register" className="text-primary">
              ثبت نام
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
