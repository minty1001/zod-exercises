import { z } from 'zod';

// プロパティは変更せず、任意項目のスキーマを変更する。
export const profileSchema = z.object({
  displayName: z.string().min(1),
  email: z.email(),
  nickname: z.string().min(1),
  bio: z.string().max(160),
});
