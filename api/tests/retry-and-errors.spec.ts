import { describe, expect, it } from 'vitest';
import { BaseApiClient, shouldRetryRequest } from '../clients/base-client.js';

describe('API retry and failure policy', () => {
  it('should classify retryable HTTP failures', () => {
    const retryable = shouldRetryRequest({ response: { status: 429, data: {}, statusText: 'Too Many Requests', headers: {}, config: {} } as never });
    const nonRetryable = shouldRetryRequest({ response: { status: 400, data: {}, statusText: 'Bad Request', headers: {}, config: {} } as never });

    expect(retryable).toBe(true);
    expect(nonRetryable).toBe(false);
  });

  it('should expose retry configuration for resilient calls', () => {
    const client = new BaseApiClient('https://example.test', {}, { maxRetries: 3, retryDelayMs: 200 });

    expect(client.getRetryConfig()).toMatchObject({ maxRetries: 3, retryDelayMs: 200 });
  });
});
