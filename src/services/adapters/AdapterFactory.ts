// Path: src/services/adapters/AdapterFactory.ts

import { MarketDataAdapter } from './types';
import { FinnhubAdapter } from './FinnhubAdapter';
import { MockAdapter } from './MockAdapter';
import { config, type MarketApiProvider } from '../../config/env';

/**
 * Factory for creating market data adapters
 * Handles fallback logic when API keys are missing
 */
export class AdapterFactory {
  private static instances: Map<MarketApiProvider, MarketDataAdapter> = new Map();

  /**
   * Get an adapter instance (singleton pattern)
   */
  static getAdapter(type?: MarketApiProvider): MarketDataAdapter {
    // Determine which adapter to use
    const adapterType = type || this.getDefaultAdapter();

    // Return cached instance if available
    if (this.instances.has(adapterType)) {
      return this.instances.get(adapterType)!;
    }

    // Create new adapter
    const adapter = this.createAdapter(adapterType);
    this.instances.set(adapterType, adapter);

    return adapter;
  }

  /**
   * Determine the default adapter based on configuration
   */
  private static getDefaultAdapter(): MarketApiProvider {
    // If mock mode is enabled, use mock
    if (config.api.useMock) {
      return 'mock';
    }

    // Otherwise, try to use the configured primary API
    const primary = config.financialApis.primary;

    // Check if API key is available for the primary
    if (this.hasApiKey(primary)) {
      return primary;
    }

    // Fallback to mock with warning
    console.warn(
      `[AdapterFactory] No API key configured for ${primary}, falling back to mock data`
    );
    return 'mock';
  }

  /**
   * Check if an API key is configured for a provider
   */
  private static hasApiKey(provider: MarketApiProvider): boolean {
    switch (provider) {
      case 'finnhub':
        return !!config.financialApis.finnhub.apiKey;
      case 'alphavantage':
        return !!config.financialApis.alphaVantage.apiKey;
      case 'polygon':
        return !!config.financialApis.polygon.apiKey;
      case 'twelvedata':
        return !!config.financialApis.twelveData.apiKey;
      case 'mock':
        return true;
      default:
        return false;
    }
  }

  /**
   * Create an adapter instance
   */
  private static createAdapter(type: MarketApiProvider): MarketDataAdapter {
    switch (type) {
      case 'finnhub': {
        const apiKey = config.financialApis.finnhub.apiKey;
        if (!apiKey) {
          console.warn(
            '[AdapterFactory] Finnhub API key not configured, using mock'
          );
          return new MockAdapter();
        }
        console.log('[AdapterFactory] Using Finnhub adapter');
        return new FinnhubAdapter(apiKey);
      }

      case 'alphavantage': {
        // Alpha Vantage adapter not yet implemented
        console.warn(
          '[AdapterFactory] Alpha Vantage adapter not implemented, using mock'
        );
        return new MockAdapter();
      }

      case 'polygon': {
        // Polygon adapter not yet implemented
        console.warn(
          '[AdapterFactory] Polygon adapter not implemented, using mock'
        );
        return new MockAdapter();
      }

      case 'twelvedata': {
        // Twelve Data adapter not yet implemented
        console.warn(
          '[AdapterFactory] Twelve Data adapter not implemented, using mock'
        );
        return new MockAdapter();
      }

      case 'mock':
      default:
        console.log('[AdapterFactory] Using Mock adapter');
        return new MockAdapter();
    }
  }

  /**
   * Get the currently active adapter name
   */
  static getActiveAdapterName(): string {
    const adapter = this.getAdapter();
    return adapter.name;
  }

  /**
   * Check if real-time updates are supported
   */
  static supportsRealTime(): boolean {
    const adapter = this.getAdapter();
    return adapter.supportsWebSocket;
  }

  /**
   * Clear all cached adapter instances
   * Useful for testing or when changing API keys at runtime
   */
  static clearInstances(): void {
    this.instances.clear();
  }

  /**
   * Force use of a specific adapter (for testing)
   */
  static setAdapter(type: MarketApiProvider, adapter: MarketDataAdapter): void {
    this.instances.set(type, adapter);
  }
}
