import { z } from 'zod';

export const eventSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1),
  eventDate: z.iso.date(),
  startsAt: z.iso.datetime(),
  website: z.url(),
  capacity: z.coerce.number().int().positive(),
});
