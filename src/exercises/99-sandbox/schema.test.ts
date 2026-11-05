import { describe, expect, it } from 'vitest';
import { userSchema } from './schema';

describe('サンドボックス', () => {
  it('sandbox test', () => {
    const result = userSchema.safeParse({});

    console.log(result);

    expect(result.success).toBe(true);
  });
});
