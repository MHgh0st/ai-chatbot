import * as z from '@zod/mini';

export const LoginSchema = z.object({
  email: z.email('لطفا یک ایمیل معتبر وارد کنید'),
  password: z.string(),
});
