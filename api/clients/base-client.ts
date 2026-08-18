import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type RetryConfig = {
  maxRetries: number;
  retryDelayMs: number;
};

export function shouldRetryRequest(error: Partial<AxiosError> | undefined): boolean {
  const status = error?.response?.status;
  return status === 408 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

export class BaseApiClient {
  protected client: AxiosInstance;
  protected retryConfig: RetryConfig;

  constructor(baseURL: string, headers: Record<string, string> = {}, retryConfig: Partial<RetryConfig> = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: 15000,
    });

    this.retryConfig = {
      maxRetries: retryConfig.maxRetries ?? 2,
      retryDelayMs: retryConfig.retryDelayMs ?? 250,
    };
  }

  getRetryConfig(): RetryConfig {
    return { ...this.retryConfig };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.executeWithRetry<T>(() => this.client.get<T>(url, config));
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.executeWithRetry<T>(() => this.client.post<T>(url, data, config));
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.executeWithRetry<T>(() => this.client.put<T>(url, data, config));
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.executeWithRetry<T>(() => this.client.delete<T>(url, config));
  }

  private async executeWithRetry<T>(request: () => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
    let attempt = 0;

    while (true) {
      try {
        return await request();
      } catch (error) {
        if (!shouldRetryRequest(error as Partial<AxiosError>) || attempt >= this.retryConfig.maxRetries) {
          throw error;
        }

        attempt += 1;
        await new Promise((resolve) => setTimeout(resolve, this.retryConfig.retryDelayMs * attempt));
      }
    }
  }
}
