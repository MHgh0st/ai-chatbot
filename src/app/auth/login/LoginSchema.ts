import * as z from '@zod/mini';

export const LoginSchema = z.object({
  username: z.string().check(z.minLength(1, 'نام کاربری الزامی است')),
  password: z.string().check(z.minLength(1, ' رمز عبور الزامی است')),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
