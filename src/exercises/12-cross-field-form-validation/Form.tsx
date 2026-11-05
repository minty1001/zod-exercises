import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { registrationSchema } from './schema';

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form onSubmit={handleSubmit(() => setIsSubmitted(true))} noValidate>
      <div>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">確認用パスワード</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit">登録</button>

      {isSubmitted && <output>登録成功</output>}
    </form>
  );
}
