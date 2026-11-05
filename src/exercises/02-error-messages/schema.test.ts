import { describe, expect, it } from 'vitest';
import { contactSchema } from './schema';

const validInput = {
  name: '山田太郎',
  email: 'taro@example.com',
  message: 'サービスについて質問があります。',
};

describe('練習2：エラーメッセージの指定', () => {
  it.each([
    {
      name: '有効なお問い合わせ',
      input: validInput,
    },
    {
      name: '名前が1文字',
      input: { ...validInput, name: '山' },
    },
    {
      name: 'お問い合わせ内容が10文字',
      input: { ...validInput, message: 'あ'.repeat(10) },
    },
  ])('$name は検証に成功する', ({ input }) => {
    expect(contactSchema.safeParse(input).success).toBe(true);
  });

  it.each([
    {
      name: '名前が空文字',
      input: { ...validInput, name: '' },
      path: 'name',
      message: '名前を入力してください',
    },
    {
      name: 'メールアドレスの形式が不正',
      input: { ...validInput, email: 'invalid-email' },
      path: 'email',
      message: '有効なメールアドレスを入力してください',
    },
    {
      name: 'お問い合わせ内容が9文字',
      input: { ...validInput, message: 'あ'.repeat(9) },
      path: 'message',
      message: 'お問い合わせ内容は10文字以上で入力してください',
    },
  ])('$name のメッセージを返す', ({ input, path, message }) => {
    const result = contactSchema.safeParse(input);

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: [path],
          message,
        }),
      ]),
    );
  });
});
