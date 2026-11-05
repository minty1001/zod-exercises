import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8)
  .refine((password) => /[A-Z]/.test(password) && /[0-9]/.test(password), {
    error: '大文字と数字をそれぞれ1文字以上含めてください',
  });
