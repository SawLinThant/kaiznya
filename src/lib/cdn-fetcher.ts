import { CDNResponse, CDNError, CacheConfig, CacheEntry } from '@/types/cdn';

// CDN Configuration
export const CDN_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL || 'https://cdn.kanaiya.shop',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 300, // 5 minutes default
  STALE_WHILE_REVALIDATE: 600, // 10 minutes
} as const;

// Cache storage (in-memory for SSR, can be extended to use Redis or other storage)
const cache = new Map<string, CacheEntry<any>>();

// Error class for CDN errors
export class CDNFetchError extends Error {
  public code: string;
  public status?: number;
  public details?: Record<string, any>;

  constructor(message: string, code: string, status?: number, details?: Record<string, any>) {
    super(message);
    this.name = 'CDNFetchError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

// Cache utilities
export class CacheManager {
  private static instance: CacheManager;
  private cache = new Map<string, CacheEntry<any>>();

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set<T>(key: string, data: T, config: CacheConfig): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: config.ttl * 1000,
      tags: config.tags,
    };
    this.cache.set(key, entry);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidateByTag(tag: string): void {
    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags.includes(tag)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Retry utility
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = CDN_CONFIG.RETRY_ATTEMPTS,
  delay: number = CDN_CONFIG.RETRY_DELAY
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === attempts - 1) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }

  throw lastError!;
}

// Core CDN fetcher
export class CDNFetcher {
  private cacheManager = CacheManager.getInstance();

  async fetch<T>(
    endpoint: string,
    options: {
      cache?: boolean;
      cacheConfig?: Partial<CacheConfig>;
      revalidate?: boolean;
      tags?: string[];
    } = {}
  ): Promise<T> {
    const {
      cache: useCache = true,
      cacheConfig = {},
      revalidate = false,
      tags = [],
    } = options;

    const cacheKey = `cdn:${endpoint}`;
    const config: CacheConfig = {
      ttl: CDN_CONFIG.CACHE_TTL,
      staleWhileRevalidate: CDN_CONFIG.STALE_WHILE_REVALIDATE,
      tags: [...tags, 'cdn'],
      ...cacheConfig,
    };

    // Check cache first (if not revalidating)
    if (useCache && !revalidate) {
      const cached = this.cacheManager.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const data = await this.fetchFromCDN<T>(endpoint);
      
      // Cache the result
      if (useCache) {
        this.cacheManager.set(cacheKey, data, config);
      }

      return data;
    } catch (error) {
      // Return stale data if available and error is not critical
      if (useCache && !revalidate) {
        const stale = this.cacheManager.get<T>(cacheKey);
        if (stale) {
          console.warn(`Returning stale data for ${endpoint}:`, error);
          return stale;
        }
      }
      throw error;
    }
  }

  private async fetchFromCDN<T>(endpoint: string): Promise<T> {
    const url = `${CDN_CONFIG.BASE_URL}${endpoint}`;
    
    return withRetry(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CDN_CONFIG.TIMEOUT);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Ecommerce-App/1.0',
          },
          signal: controller.signal,
          next: {
            revalidate: CDN_CONFIG.CACHE_TTL,
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new CDNFetchError(
            errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            errorData.code || 'HTTP_ERROR',
            response.status,
            errorData
          );
        }

        const data = await response.json();

        // Handle both wrapped and raw JSON responses
        if (data && typeof data === 'object' && 'success' in data) {
          // Wrapped response format: {success: true, data: ...}
          if (!data.success) {
            throw new CDNFetchError(
              data.message || 'Unknown error from CDN',
              'CDN_ERROR',
              undefined,
              data
            );
          }
          return data.data;
        } else {
          // Raw JSON response (like your products array)
          return data as T;
        }
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof CDNFetchError) {
          throw error;
        }

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new CDNFetchError('Request timeout', 'TIMEOUT');
          }
          throw new CDNFetchError(error.message, 'NETWORK_ERROR');
        }

        throw new CDNFetchError('Unknown error occurred', 'UNKNOWN_ERROR');
      }
    });
  }

  // Batch fetch multiple endpoints
  async fetchBatch<T extends Record<string, any>>(
    requests: Record<keyof T, string>,
    options: {
      cache?: boolean;
      cacheConfig?: Partial<CacheConfig>;
      tags?: string[];
    } = {}
  ): Promise<T> {
    const keys = Object.keys(requests) as Array<keyof T>;
    const promises = keys.map(async (key) => {
      const endpoint = requests[key];
      try {
        const data = await this.fetch<T[typeof key]>(endpoint, options);
        return [key, data] as const;
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return [key, null as unknown as T[typeof key]] as const;
      }
    });

    const results = await Promise.all(promises);

    return results.reduce((acc, [key, data]) => {
      acc[key] = data;
      return acc;
    }, {} as T);
  }

  // Invalidate cache by tags
  invalidateCache(tags: string[]): void {
    tags.forEach(tag => this.cacheManager.invalidateByTag(tag));
  }

  // Clear all cache
  clearCache(): void {
    this.cacheManager.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return this.cacheManager.getStats();
  }
}

// Singleton instance
export const cdnFetcher = new CDNFetcher();

// Utility functions for common operations
export const cdnUtils = {
  // Build query string from parameters
  buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)));
        } else {
          searchParams.set(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  },

  // Generate cache key with parameters
  generateCacheKey(endpoint: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return `cdn:${endpoint}`;
    }
    
    const queryString = this.buildQueryString(params);
    return `cdn:${endpoint}${queryString}`;
  },

  // Check if data is stale
  isStale(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp > ttl * 1000;
  },

  // Format error for logging
  formatError(error: unknown): string {
    if (error instanceof CDNFetchError) {
      return `${error.code}: ${error.message}`;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error';
  },
};
