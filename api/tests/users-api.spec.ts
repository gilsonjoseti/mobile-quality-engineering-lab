import { describe, expect, it } from 'vitest';
import { BaseApiClient } from '../clients/base-client.js';

describe('API smoke tests', () => {
  it('should support example API contract usage', async () => {
    const client = new BaseApiClient('https://jsonplaceholder.typicode.com');

    const response = await client.get<{ id: number; title: string }[]>('/todos?_limit=1');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
