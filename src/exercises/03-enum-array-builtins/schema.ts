import { z } from 'zod';

// 定義名とプロパティは変更せず、各スキーマを変更する。
export const roleSchema = z.string();

export const userSchema = z.object({
  name: z.string().min(1),
  role: roleSchema,
});

export const teamSchema = z.object({
  users: z.array(z.unknown()),
  createdAt: z.unknown(),
  totalPoints: z.unknown(),
});
