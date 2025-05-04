'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Checkbox,
  addToast,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { RegisterSchema, RegisterFormValues } from './RegisterSchema';
import { BASE_API_URL } from '@/configs';
import { useRouter } from 'next/navigation';
import { PasswordHasher } from '@/utils/PasswordHasher';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({
    resolver: standardSchemaResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    mode: 'onSubmit',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const termsAccepted = watch('termsAccepted');

  // Password requirements for UI display
  const hasMinLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);

  // Custom validation for password match
  const passwordMatchError =
    password !== confirmPassword && confirmPassword
      ? 'رمز عبور و تکرار آن مطابقت ندارند'
      : '';

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    // Simulate registration process
    try {
      console.log('Form data:', data);
      const res = await fetch(`${BASE_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.username,
          password: await PasswordHasher(data.password),
        }),
      });
      addToast({
        title: 'حساب کاربری با موفقیت ساخته شد',
        hideIcon: true,
        color: 'success',
        variant: 'flat',
        radius: 'lg',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        icon: <Icon icon="solar:user-check-bold-duotone" fontSize={22} />,
      });
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex gap-3 pb-0">
        <div className="flex flex-col w-full items-center">
          <h1 className="text-2xl font-bold mb-1">ثبت نام</h1>
          <p className="text-gray-500 text-sm">حساب کاربری جدید ایجاد کنید</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="نام"
            placeholder="نام خود را وارد کنید"
            startContent={
              <Icon icon="solar:user-bold-duotone" className="text-gray-400" />
            }
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="نام کاربری"
            placeholder="نام کاربری خود را وارد کنید"
            startContent={
              <Icon icon="solar:user-bold-duotone" className="text-gray-400" />
            }
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            {...register('username')}
          />
          <Input
            label="ایمیل"
            placeholder="example@mail.com"
            type="email"
            startContent={
              <Icon
                icon="solar:letter-bold-duotone"
                className="text-gray-400"
              />
            }
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="رمز عبور"
            placeholder="رمز عبور را وارد کنید"
            type="password"
            startContent={
              <Icon icon="solar:lock-bold-duotone" className="text-gray-400" />
            }
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          {/* Password Requirements Progress */}
          {password.length > 0 && (
            <div className="text-xs space-y-1 mt-1">
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 mr-1 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-success' : 'bg-danger'}`}
                >
                  <Icon
                    icon={
                      hasMinLength
                        ? 'solar:check-circle-bold'
                        : 'solar:close-circle-bold'
                    }
                    className="w-3 h-3 text-white"
                  />
                </span>
                <span className={hasMinLength ? 'text-success' : 'text-danger'}>
                  حداقل 8 کاراکتر
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 mr-1 rounded-full flex items-center justify-center ${hasLowerCase ? 'bg-success' : 'bg-danger'}`}
                >
                  <Icon
                    icon={
                      hasLowerCase
                        ? 'solar:check-circle-bold'
                        : 'solar:close-circle-bold'
                    }
                    className="w-3 h-3 text-white"
                  />
                </span>
                <span className={hasLowerCase ? 'text-success' : 'text-danger'}>
                  شامل حروف کوچک
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 mr-1 rounded-full flex items-center justify-center ${hasUpperCase ? 'bg-success' : 'bg-danger'}`}
                >
                  <Icon
                    icon={
                      hasUpperCase
                        ? 'solar:check-circle-bold'
                        : 'solar:close-circle-bold'
                    }
                    className="w-3 h-3 text-white"
                  />
                </span>
                <span className={hasUpperCase ? 'text-success' : 'text-danger'}>
                  شامل حروف بزرگ
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-4 h-4 mr-1 rounded-full flex items-center justify-center ${hasNumbers ? 'bg-success' : 'bg-danger'}`}
                >
                  <Icon
                    icon={
                      hasNumbers
                        ? 'solar:check-circle-bold'
                        : 'solar:close-circle-bold'
                    }
                    className="w-3 h-3 text-white"
                  />
                </span>
                <span className={hasNumbers ? 'text-success' : 'text-danger'}>
                  شامل اعداد
                </span>
              </div>
            </div>
          )}

          <Input
            label="تکرار رمز عبور"
            placeholder="رمز عبور را مجدداً وارد کنید"
            type="password"
            startContent={
              <Icon icon="solar:lock-bold-duotone" className="text-gray-400" />
            }
            isInvalid={!!errors.confirmPassword || !!passwordMatchError}
            errorMessage={errors.confirmPassword?.message || passwordMatchError}
            {...register('confirmPassword')}
          />
          <Checkbox
            isSelected={termsAccepted}
            isInvalid={!!errors.termsAccepted}
            {...register('termsAccepted')}
          >
            <span className="text-sm">
              با{' '}
              <Link href="#" size="sm" className="text-primary">
                قوانین و مقررات
              </Link>{' '}
              موافقم
            </span>
          </Checkbox>
          {/* {errors.termsAccepted && (
            <p className="text-xs text-danger mt-1">
              {errors.termsAccepted.message}
            </p>
          )} */}
          <Button
            type="submit"
            color="primary"
            className="w-full mt-2"
            isLoading={isLoading}
            isDisabled={!termsAccepted}
          >
            ثبت نام
          </Button>
          <div className="text-center mt-4">
            <span className="text-gray-500">حساب کاربری دارید؟ </span>
            <Link href="/auth/login" className="text-primary">
              ورود
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
