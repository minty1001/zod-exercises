import { describe, expect, it } from 'vitest';
import { registrationSchema } from './schema';

const mismatchErrorMessage = 'パスワードが一致しません';

describe('練習5：項目間バリデーション', () => {
  it.each([
    {
      name: 'パスワードが一致する',
      input: { password: 'Password1', confirmPassword: 'Password1' },
    },
    {
      name: '8文字のパスワードが一致する',
      input: { password: 'Pass1234', confirmPassword: 'Pass1234' },
    },
  ])('$name 場合は検証に成功する', ({ input }) => {
    expect(registrationSchema.safeParse(input).success).toBe(true);
  });

  it.each([
    {
      name: 'パスワードが異なる',
      input: { password: 'Password1', confirmPassword: 'Password2' },
    },
    {
      name: '大文字と小文字だけが異なる',
      input: { password: 'Password1', confirmPassword: 'password1' },
    },
  ])('$name 場合は確認用項目にエラーを返す', ({ input }) => {
    const result = registrationSchema.safeParse(input);

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['confirmPassword'],
          message: mismatchErrorMessage,
        }),
      ]),
    );
  });

  it.each([
    {
      name: 'passwordが7文字',
      input: { password: 'Pass123', confirmPassword: 'Pass123' },
    },
    {
      name: 'confirmPasswordが7文字',
      input: { password: 'Pass1234', confirmPassword: 'Pass123' },
    },
  ])('$name 場合は検証に失敗する', ({ input }) => {
    expect(registrationSchema.safeParse(input).success).toBe(false);
  });
});
