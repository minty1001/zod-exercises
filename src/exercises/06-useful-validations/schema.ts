import { z } from 'zod';

// プロパティは変更せず、`z.`以降を変更する。
export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  eventDate: z.string(),
  startsAt: z.string(),
  website: z.string(),
  capacity: z.number().int().positive(),
});
