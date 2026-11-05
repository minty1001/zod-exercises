import { describe, expect, it } from 'vitest';
import { passwordSchema } from './schema';

const customErrorMessage = '大文字と数字をそれぞれ1文字以上含めてください';

describe('練習4：カスタムバリデーション', () => {
  it.each([
    { name: '大文字と数字を含むパスワード', input: 'Password1' },
    { name: '先頭が数字のパスワード', input: '1Password' },
    { name: '記号も含むパスワード', input: 'Pass-word1' },
  ])('$name は検証に成功する', ({ input }) => {
    expect(passwordSchema.safeParse(input).success).toBe(true);
  });

  it.each([
    {
      name: '大文字を含まない',
      input: 'password1',
      message: customErrorMessage,
    },
    {
      name: '数字を含まない',
      input: 'Password',
      message: customErrorMessage,
    },
    {
      name: '大文字も数字も含まない',
      input: 'password',
      message: customErrorMessage,
    },
  ])('$name 場合はカスタムエラーを返す', ({ input, message }) => {
    const result = passwordSchema.safeParse(input);

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ message })]),
    );
  });

  it.each([
    { name: '7文字', input: 'Passw1A' },
    { name: '文字列ではない', input: 12345678 },
  ])('$name は検証に失敗する', ({ input }) => {
    expect(passwordSchema.safeParse(input).success).toBe(false);
  });
});
