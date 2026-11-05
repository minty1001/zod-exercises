import { z } from 'zod';

// 各項目の条件は変更せず、項目間バリデーションを追加する。
export const registrationSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
