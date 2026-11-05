import { z } from 'zod';

// プロパティは変更せず、`z.` 以降を変更する。
export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  age: z.number(),
});
