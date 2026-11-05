import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, { error: '名前を入力してください' }),
  email: z.email({ error: '有効なメールアドレスを入力してください' }),
  message: z
    .string()
    .min(10, { error: 'お問い合わせ内容は10文字以上で入力してください' }),
});
