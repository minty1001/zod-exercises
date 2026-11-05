import { describe, expect, it } from 'vitest';
import { teamSchema } from './schema';

const validUser = {
  name: '山田太郎',
  role: 'member',
};

const validInput = {
  users: [validUser],
  createdAt: new Date('2026-01-01T00:00:00Z'),
  totalPoints: 100n,
};

describe('練習3：enum・配列・標準組み込み型', () => {
  it.each([
    {
      name: '1人のユーザーを持つチーム',
      input: validInput,
    },
    {
      name: 'すべてのロールを持つチーム',
      input: {
        ...validInput,
        users: [
          { name: '管理者', role: 'admin' },
          { name: 'メンバー', role: 'member' },
          { name: '閲覧者', role: 'viewer' },
        ],
      },
    },
    {
      name: 'ユーザーが空配列のチーム',
      input: { ...validInput, users: [] },
    },
    {
      name: 'ポイントが0nのチーム',
      input: { ...validInput, totalPoints: 0n },
    },
  ])('$name は検証に成功する', ({ input }) => {
    expect(teamSchema.safeParse(input).success).toBe(true);
  });

  it.each([
    {
      name: '定義されていないロール',
      input: { ...validInput, users: [{ ...validUser, role: 'owner' }] },
    },
    {
      name: 'ユーザー名が空文字',
      input: { ...validInput, users: [{ ...validUser, name: '' }] },
    },
    {
      name: 'usersが配列ではない',
      input: { ...validInput, users: validUser },
    },
    {
      name: 'createdAtがDateではない',
      input: { ...validInput, createdAt: '2026-01-01' },
    },
    {
      name: 'totalPointsがBigIntではない',
      input: { ...validInput, totalPoints: 100 },
    },
  ])('$name は検証に失敗する', ({ input }) => {
    expect(teamSchema.safeParse(input).success).toBe(false);
  });
});
