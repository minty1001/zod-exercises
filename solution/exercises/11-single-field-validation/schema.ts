import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: '名前を入力してください' })
    .max(30, { error: '名前は30文字以下で入力してください' }),
  age: z
    .number()
    .int({ error: '年齢は整数で入力してください' })
    .min(18, { error: '年齢は18以上で入力してください' })
    .max(120, { error: '年齢は120以下で入力してください' }),
});
