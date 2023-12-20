import { z } from 'zod';

export const EmailSchemaValidation = z.object({
  name: z.string().min(4, { message: 'Preencha seu usuário' }),
  email: z.string().email({ message: 'Preencha um e-mail válido' }),
  message: z.string().min(4, { message: 'Preencha sua mensagem' }),
});

export type TEmail = z.infer<typeof EmailSchemaValidation>;
