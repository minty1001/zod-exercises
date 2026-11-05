import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { formSandboxSchema } from './schema';

type FormSandboxValues = z.infer<typeof formSandboxSchema>;

export function FormSandbox() {
  const [submittedData, setSubmittedData] = useState<FormSandboxValues | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSandboxValues>({
    resolver: zodResolver(formSandboxSchema),
  });

  return (
    <form onSubmit={handleSubmit(setSubmittedData)} noValidate>
      <div>
        <label htmlFor="sandbox-email">メールアドレス</label>
        <input id="sandbox-email" type="email" {...register('email')} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <button type="submit">送信</button>

      {submittedData && <output>送信成功：{submittedData.email}</output>}
    </form>
  );
}
