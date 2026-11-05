import { z } from 'zod';

export const roleSchema = z.enum(['admin', 'member', 'viewer']);

export const userSchema = z.object({
  name: z.string().min(1),
  role: roleSchema,
});

export const teamSchema = z.object({
  users: z.array(userSchema),
  createdAt: z.date(),
  totalPoints: z.bigint(),
});
