import { z } from 'zod';

// バリデーション条件は変更せず、エラーメッセージを指定する。
export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(10),
});
