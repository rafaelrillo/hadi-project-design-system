// Path: src/services/hadi/hadiService.ts
// HTTP client for Hadi backend API

import { config } from '@/config/env';
import type {
  OptimizeRequest,
  OptimizeResponse,
  BenchmarkRequest,
  BenchmarkResponse,
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────────────────────

class HadiService {
  private get baseUrl(): string {
    return config.api.hadiUrl;
  }

  async optimize(request: OptimizeRequest): Promise<OptimizeResponse> {
    const response = await fetch(`${this.baseUrl}/quick/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Hadi API error: ${response.status} ${response.statusText}`);
    }

    const data: OptimizeResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Optimization failed');
    }

    return data;
  }

  async benchmark(request: BenchmarkRequest = {}): Promise<BenchmarkResponse> {
    const response = await fetch(`${this.baseUrl}/quick/benchmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: 'SPY', ...request }),
    });

    if (!response.ok) {
      throw new Error(`Hadi API error: ${response.status} ${response.statusText}`);
    }

    const data: BenchmarkResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Benchmark fetch failed');
    }

    return data;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const hadiService = new HadiService();
