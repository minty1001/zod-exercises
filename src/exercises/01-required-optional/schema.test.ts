import { describe, expect, it } from 'vitest';
import { profileSchema } from './schema';

describe('練習1：必須・任意バリデーション', () => {
  it.each([
    {
      name: 'すべての項目があるプロフィール',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
        nickname: 'たろう',
        bio: 'Zodを勉強しています。',
      },
    },
    {
      name: '必須項目だけのプロフィール',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
      },
    },
    {
      name: '表示名が1文字',
      input: {
        displayName: '山',
        email: 'taro@example.com',
        nickname: 'たろう',
        bio: '自己紹介です。',
      },
    },
    {
      name: 'ニックネームが1文字',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
        nickname: '太',
        bio: '自己紹介です。',
      },
    },
    {
      name: '自己紹介が160文字',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
        nickname: 'たろう',
        bio: 'あ'.repeat(160),
      },
    },
  ])('$name は検証に成功する', ({ input }) => {
    expect(profileSchema.safeParse(input).success).toBe(true);
  });

  it.each([
    {
      name: '表示名がない',
      input: {
        email: 'taro@example.com',
      },
    },
    {
      name: '表示名が空文字',
      input: {
        displayName: '',
        email: 'taro@example.com',
      },
    },
    {
      name: 'メールアドレスがない',
      input: {
        displayName: '山田太郎',
      },
    },
    {
      name: 'メールアドレスの形式が不正',
      input: {
        displayName: '山田太郎',
        email: 'invalid-email',
        nickname: 'たろう',
        bio: '自己紹介です。',
      },
    },
    {
      name: '指定したニックネームが空文字',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
        nickname: '',
      },
    },
    {
      name: '自己紹介が160文字を超える',
      input: {
        displayName: '山田太郎',
        email: 'taro@example.com',
        bio: 'あ'.repeat(161),
      },
    },
  ])('$name は検証に失敗する', ({ input }) => {
    expect(profileSchema.safeParse(input).success).toBe(false);
  });
});
