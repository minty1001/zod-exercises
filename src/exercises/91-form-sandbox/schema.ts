import { z } from 'zod';

export const formSandboxSchema = z.object({
  email: z.email({ error: 'メールアドレスの形式で入力してください' }),
});
