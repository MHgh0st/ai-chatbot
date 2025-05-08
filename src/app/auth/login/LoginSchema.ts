import * as z from '@zod/mini';

export const LoginSchema = z.object({
  username: z.string('نام کاربری الزامی است'),
  password: z.string('رمز عبور الزامی است'),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
