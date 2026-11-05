import { z } from 'zod';

export const registrationSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });
