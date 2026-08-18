import { describe, expect, it } from 'vitest';
import { BaseApiClient } from '../clients/base-client.js';

describe('HTTP method contract examples', () => {
  const client = new BaseApiClient('https://jsonplaceholder.typicode.com');

  it('should execute GET successfully', async () => {
    const response = await client.get('/todos/1');
    expect(response.status).toBe(200);
  });

  it('should execute POST successfully', async () => {
    const response = await client.post('/posts', { title: 'quality', body: 'example', userId: 1 });
    expect(response.status).toBe(201);
  });

  it('should execute PUT successfully', async () => {
    const response = await client.put('/posts/1', { id: 1, title: 'updated', body: 'updated body', userId: 1 });
    expect(response.status).toBe(200);
  });

  it('should execute DELETE successfully', async () => {
    const response = await client.delete('/posts/1');
    expect(response.status).toBe(200);
  });
});
