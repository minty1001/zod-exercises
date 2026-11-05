import { z } from 'zod';

// 8文字以上の条件は変更せず、カスタムバリデーションを追加する。
export const passwordSchema = z.string().min(8);
