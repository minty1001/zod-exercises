import { z } from 'zod';

export const profileSchema = z.object({
  displayName: z.string().min(1),
  email: z.email(),
  nickname: z.string().min(1).optional(),
  bio: z.string().max(160).optional(),
});
