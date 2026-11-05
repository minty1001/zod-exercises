import { z } from 'zod';

export const registrationSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'パスワードは8文字以上で入力してください' }),
    confirmPassword: z
      .string()
      .min(8, { error: '確認用パスワードは8文字以上で入力してください' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });
