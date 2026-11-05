import { describe, expect, it } from 'vitest';
import { eventSchema } from './schema';

const validInput = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Zod勉強会',
  eventDate: '2026-04-01',
  startsAt: '2026-04-01T10:30:00Z',
  website: 'https://example.com/events/zod',
  capacity: 30,
};

describe('練習6：その他の便利なバリデーション', () => {
  it('有効なイベントは検証に成功する', () => {
    expect(eventSchema.safeParse(validInput).success).toBe(true);
  });

  it('titleの前後空白を除去し、capacityを数値に変換する', () => {
    const result = eventSchema.safeParse({
      ...validInput,
      title: '  Zod勉強会  ',
      capacity: '30',
    });

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.title).toBe('Zod勉強会');
    expect(result.data.capacity).toBe(30);
  });

  it.each([
    {
      name: 'idがUUID形式ではない',
      input: { ...validInput, id: 'event-1' },
    },
    {
      name: 'titleが空白文字だけ',
      input: { ...validInput, title: '   ' },
    },
    {
      name: 'eventDateがISO日付形式ではない',
      input: { ...validInput, eventDate: '2026/04/01' },
    },
    {
      name: 'startsAtがISO日時形式ではない',
      input: { ...validInput, startsAt: '2026-04-01 10:30:00' },
    },
    {
      name: 'websiteがURL形式ではない',
      input: { ...validInput, website: 'example.com/events/zod' },
    },
    {
      name: 'capacityが正の整数に変換できない',
      input: { ...validInput, capacity: 'thirty' },
    },
    {
      name: 'capacityが負の整数',
      input: { ...validInput, capacity: '-1' },
    },
    {
      name: 'capacityが0',
      input: { ...validInput, capacity: '0' },
    },
  ])('$name 場合は検証に失敗する', ({ input }) => {
    expect(eventSchema.safeParse(input).success).toBe(false);
  });
});
