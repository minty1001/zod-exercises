import { describe, expect, it } from 'vitest';
import { userSchema } from './schema';

describe('練習0：バリデーションの基本', () => {
  it.each([
    {
      name: '通常のユーザー',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: 20,
      },
    },
    {
      name: '別の有効なユーザー',
      input: {
        name: '佐藤花子',
        email: 'hanako@example.jp',
        age: 18,
      },
    },
    {
      name: '名前が1文字',
      input: {
        name: '山',
        email: 'taro@example.com',
        age: 20,
      },
    },
    {
      name: '年齢が149歳',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: 149,
      },
    },
  ])('$name は検証に成功する', ({ input }) => {
    const result = userSchema.safeParse(input);

    expect(result.success).toBe(true);
  });

  it.each([
    {
      name: '名前が空文字',
      input: {
        name: '',
        email: 'taro@example.com',
        age: 20,
      },
    },
    {
      name: 'メールアドレスの形式が不正',
      input: {
        name: '山田太郎',
        email: 'invalid-email',
        age: 20,
      },
    },
    {
      name: '年齢が17歳',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: 17,
      },
    },
    {
      name: '年齢が小数',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: 20.5,
      },
    },
    {
      name: '年齢が負の数',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: -5,
      },
    },
    {
      name: '年齢が150歳',
      input: {
        name: '山田太郎',
        email: 'taro@example.com',
        age: 150,
      },
    },
  ])('$name は検証に失敗する', ({ input }) => {
    const result = userSchema.safeParse(input);

    expect(result.success).toBe(false);
  });
});
