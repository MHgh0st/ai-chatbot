import * as z from '@zod/mini';

export const RegisterSchema = z
  .object({
    name: z
      .string('نام الزامی است')
      .check(z.minLength(2, 'نام حداقل باید 2 کاراکتر باشد')),
    username: z
      .string('نام کاربری الزامی است')
      .check(
        z.minLength(3, 'نام کاربری حداقل باید 3 کاراکتر باشد'),
        z.regex(
          /^[a-zA-Z0-9_]+$/,
          'نام کاربری فقط می‌تواند شامل حروف، اعداد و _ باشد'
        )
      ),
    email: z
      .string('ایمیل الزامی است')
      .check(z.email('لطفا یک ایمیل معتبر وارد کنید')),
    password: z
      .string('رمز عبور الزامی است')
      .check(
        z.minLength(8, 'رمز عبور حداقل باید 8 کاراکتر باشد'),
        z.regex(/[a-z]/, 'رمز عبور باید شامل حروف کوچک باشد'),
        z.regex(/[A-Z]/, 'رمز عبور باید شامل حروف بزرگ باشد'),
        z.regex(/[0-9]/, 'رمز عبور باید شامل اعداد باشد')
      ),
    confirmPassword: z.string('تکرار رمز عبور الزامی است').check(),
    termsAccepted: z.boolean(),
  })
  .check(
    z.refine(data => data.password === data.confirmPassword, {
      message: 'پسورد ها با هم یکی تیستند',
      path: ['confirmPassword'],
    })
  );

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
