import { z } from 'zod';

// 各プロパティの条件は変更せず、パスワードの一致確認を追加する。
export const registrationSchema = z.object({
  password: z
    .string()
    .min(8, { error: 'パスワードは8文字以上で入力してください' }),
  confirmPassword: z
    .string()
    .min(8, { error: '確認用パスワードは8文字以上で入力してください' }),
});
