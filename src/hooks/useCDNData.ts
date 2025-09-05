"use client";

import { useState, useEffect, useCallback } from 'react';
import { cdnFetcher, CDNFetchError, cdnUtils } from '@/lib/cdn-fetcher';
import { CDN_ENDPOINTS } from '@/lib/constants';
import type { 
  Product, 
  ProductCategory, 
  Collection, 
  BannerSlide, 
  BlogPost, 
  CompanyInfo,
  ProductFilters,
  SearchQuery,
  PaginatedResponse 
} from '@/types/cdn';

// Generic hook for CDN data fetching
export function useCDNData<T>(
  endpoint: string,
  options: {
    enabled?: boolean;
    cache?: boolean;
    revalidate?: boolean;
    tags?: string[];
    cacheConfig?: {
      ttl?: number;
      staleWhileRevalidate?: number;
    };
  } = {}
) {
  const {
    enabled = true,
    cache = true,
    revalidate: shouldRevalidate = false,
    tags = [],
    cacheConfig = {},
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<CDNFetchError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await cdnFetcher.fetch<T>(endpoint, {
        cache,
        revalidate: shouldRevalidate,
        tags,
        cacheConfig,
      });

      setData(result);
    } catch (err) {
      const error = err instanceof CDNFetchError ? err : new CDNFetchError(
        'Unknown error occurred',
        'UNKNOWN_ERROR'
      );
      setError(error);
      console.error(`CDN fetch error for ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, enabled, cache, shouldRevalidate, tags, cacheConfig]);

  const revalidate = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsValidating(true);
      setError(null);

      const result = await cdnFetcher.fetch<T>(endpoint, {
        cache,
        revalidate: true,
        tags,
        cacheConfig,
      });

      setData(result);
    } catch (err) {
      const error = err instanceof CDNFetchError ? err : new CDNFetchError(
        'Unknown error occurred',
        'UNKNOWN_ERROR'
      );
      setError(error);
      console.error(`CDN revalidate error for ${endpoint}:`, error);
    } finally {
      setIsValidating(false);
    }
  }, [endpoint, enabled, cache, tags, cacheConfig]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate: fetchData,
    revalidate,
    hasData: !!data,
  };
}

// Product hooks
export function useProducts(filters?: ProductFilters) {
  const queryString = filters ? cdnUtils.buildQueryString(filters) : '';
  const endpoint = `${CDN_ENDPOINTS.PRODUCTS}${queryString}`;
  
  return useCDNData<Product[]>(endpoint, {
    tags: ['products'],
    cacheConfig: { ttl: 300 }, // 5 minutes
  });
}

export function useProduct(slug: string) {
  const endpoint = CDN_ENDPOINTS.PRODUCT_DETAIL(slug);
  
  return useCDNData<Product>(endpoint, {
    enabled: !!slug,
    tags: ['products', `product:${slug}`],
    cacheConfig: { ttl: 600 }, // 10 minutes
  });
}

export function useFeaturedProducts() {
  return useCDNData<Product[]>(CDN_ENDPOINTS.FEATURED_PRODUCTS, {
    tags: ['products', 'featured'],
    cacheConfig: { ttl: 900 }, // 15 minutes
  });
}

export function useProductsByCategory(category: string) {
  const endpoint = CDN_ENDPOINTS.PRODUCTS_BY_CATEGORY(category);
  
  return useCDNData<Product[]>(endpoint, {
    enabled: !!category,
    tags: ['products', `category:${category}`],
    cacheConfig: { ttl: 600 }, // 10 minutes
  });
}

export function useProductSearch(query: SearchQuery) {
  const queryString = cdnUtils.buildQueryString(query);
  const endpoint = `${CDN_ENDPOINTS.PRODUCTS_SEARCH}${queryString}`;
  
  return useCDNData<PaginatedResponse<Product>>(endpoint, {
    enabled: !!query.q,
    tags: ['products', 'search'],
    cacheConfig: { ttl: 300 }, // 5 minutes
  });
}

// Category hooks
export function useCategories() {
  return useCDNData<ProductCategory[]>(CDN_ENDPOINTS.CATEGORIES, {
    tags: ['categories'],
    cacheConfig: { ttl: 1800 }, // 30 minutes
  });
}

export function useCategory(slug: string) {
  const endpoint = CDN_ENDPOINTS.CATEGORY_DETAIL(slug);
  
  return useCDNData<ProductCategory>(endpoint, {
    enabled: !!slug,
    tags: ['categories', `category:${slug}`],
    cacheConfig: { ttl: 1800 }, // 30 minutes
  });
}

export function useCategoryTree() {
  return useCDNData<ProductCategory[]>(CDN_ENDPOINTS.CATEGORY_TREE, {
    tags: ['categories', 'tree'],
    cacheConfig: { ttl: 3600 }, // 1 hour
  });
}

// Collection hooks
export function useCollections() {
  return useCDNData<Collection[]>(CDN_ENDPOINTS.COLLECTIONS, {
    tags: ['collections'],
    cacheConfig: { ttl: 600 }, // 10 minutes
  });
}

export function useCollection(slug: string) {
  const endpoint = CDN_ENDPOINTS.COLLECTION_DETAIL(slug);
  
  return useCDNData<Collection>(endpoint, {
    enabled: !!slug,
    tags: ['collections', `collection:${slug}`],
    cacheConfig: { ttl: 600 }, // 10 minutes
  });
}

export function useFeaturedCollections() {
  return useCDNData<Collection[]>(CDN_ENDPOINTS.FEATURED_COLLECTIONS, {
    tags: ['collections', 'featured'],
    cacheConfig: { ttl: 900 }, // 15 minutes
  });
}

// Banner hooks
export function useBannerSlides() {
  return useCDNData<BannerSlide[]>(CDN_ENDPOINTS.BANNER_SLIDES, {
    tags: ['banners', 'slides'],
    cacheConfig: { ttl: 300 }, // 5 minutes
  });
}

export function useHeroBanners() {
  return useCDNData<BannerSlide[]>(CDN_ENDPOINTS.HERO_BANNERS, {
    tags: ['banners', 'hero'],
    cacheConfig: { ttl: 300 }, // 5 minutes
  });
}

// Blog hooks
export function useBlogPosts() {
  return useCDNData<BlogPost[]>(CDN_ENDPOINTS.BLOG_POSTS, {
    tags: ['blog', 'posts'],
    cacheConfig: { ttl: 600 }, // 10 minutes
  });
}

export function useBlogPost(slug: string) {
  const endpoint = CDN_ENDPOINTS.BLOG_POST_DETAIL(slug);
  
  return useCDNData<BlogPost>(endpoint, {
    enabled: !!slug,
    tags: ['blog', 'posts', `post:${slug}`],
    cacheConfig: { ttl: 1800 }, // 30 minutes
  });
}

export function useFeaturedPosts() {
  return useCDNData<BlogPost[]>(CDN_ENDPOINTS.FEATURED_POSTS, {
    tags: ['blog', 'posts', 'featured'],
    cacheConfig: { ttl: 900 }, // 15 minutes
  });
}

// Company hooks
export function useCompanyInfo() {
  return useCDNData<CompanyInfo>(CDN_ENDPOINTS.COMPANY_INFO, {
    tags: ['company', 'info'],
    cacheConfig: { ttl: 3600 }, // 1 hour
  });
}

export function useContactInfo() {
  return useCDNData<CompanyInfo['contact']>(CDN_ENDPOINTS.CONTACT_INFO, {
    tags: ['company', 'contact'],
    cacheConfig: { ttl: 3600 }, // 1 hour
  });
}

// Utility hooks
export function useCDNHealth() {
  return useCDNData<{ status: string; timestamp: string }>(CDN_ENDPOINTS.HEALTH_CHECK, {
    tags: ['health'],
    cacheConfig: { ttl: 60 }, // 1 minute
  });
}

// Batch fetching hook
export function useCDNBatch<T extends Record<string, any>>(
  requests: Record<keyof T, string>,
  options: {
    enabled?: boolean;
    cache?: boolean;
    tags?: string[];
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<CDNFetchError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBatch = useCallback(async () => {
    if (!options.enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await cdnFetcher.fetchBatch<T>(requests, options);
      setData(result);
    } catch (err) {
      const error = err instanceof CDNFetchError ? err : new CDNFetchError(
        'Unknown error occurred',
        'UNKNOWN_ERROR'
      );
      setError(error);
      console.error('CDN batch fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [requests, options]);

  useEffect(() => {
    fetchBatch();
  }, [fetchBatch]);

  return {
    data,
    error,
    isLoading,
    mutate: fetchBatch,
    hasData: !!data,
  };
}
