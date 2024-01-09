import { z } from 'zod';

export const EmailSchemaValidation = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  message: z.string().min(8),
});

export type TEmail = z.infer<typeof EmailSchemaValidation>;
