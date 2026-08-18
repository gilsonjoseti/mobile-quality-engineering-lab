import { describe, expect, it } from 'vitest';
import { validateUserPayload } from '../validators/schema-validator.js';

describe('Schema validation contract', () => {
  it('should accept valid user payloads', () => {
    const validUser = {
      id: 7,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    };

    expect(validateUserPayload(validUser)).toBe(true);
  });

  it('should reject invalid payloads', () => {
    const invalidUser = {
      id: '7',
      name: 'Ada Lovelace',
      email: 'not-an-email',
    };

    expect(validateUserPayload(invalidUser)).toBe(false);
  });
});
