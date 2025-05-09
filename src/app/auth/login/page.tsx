'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  addToast,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { LoginFormValues, LoginSchema } from './LoginSchema';
import { LoginUser } from '@/app/server/actions';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: standardSchemaResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await LoginUser(data);
      setIsLoading(false);
      addToast({
        title: 'با موفقیت وارد شدید',
        hideIcon: true,
        color: 'success',
        variant: 'flat',
        radius: 'lg',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        icon: <Icon icon="solar:user-check-bold-duotone" fontSize={22} />,
      });
      router.push('/');
    } catch (error) {
      console.error('error: ', error);
      setIsLoading(false);
      addToast({
        title: error instanceof Error ? error.message : String(error),
        hideIcon: true,
        color: 'danger',
        variant: 'flat',
        radius: 'lg',
        timeout: 4000,
        shouldShowTimeoutProgress: true,
        icon: <Icon icon="solar:user-cross-line-duotone" fontSize={22} />,
      });
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="نام کاربری"
            startContent={
              <Icon
                icon="solar:letter-bold-duotone"
                className="text-gray-400"
              />
            }
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            {...register('username')}
          />
          <Input
            label="رمز عبور"
            type="password"
            startContent={
              <Icon icon="solar:lock-bold-duotone" className="text-gray-400" />
            }
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password')}
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
