import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { profileSchema } from './schema';

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [submittedData, setSubmittedData] = useState<ProfileFormValues | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  return (
    <form onSubmit={handleSubmit(setSubmittedData)} noValidate>
      <div>
        <label htmlFor="name">名前</label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">年齢</label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && <p role="alert">{errors.age.message}</p>}
      </div>

      <button type="submit">プロフィールを保存</button>

      {submittedData && (
        <output>
          保存成功：{submittedData.name}（{submittedData.age}歳）
        </output>
      )}
    </form>
  );
}
