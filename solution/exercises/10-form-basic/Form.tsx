import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { loginSchema } from './schema';

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [submittedData, setSubmittedData] = useState<LoginFormValues | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(setSubmittedData)} noValidate>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <button type="submit">ログイン</button>

      {submittedData && <output>送信成功：{submittedData.email}</output>}
    </form>
  );
}
