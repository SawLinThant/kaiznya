# CDN Data Fetching System

A comprehensive, high-performance data fetching system for CDN JSON sources with SSR optimization, caching, and error handling.

## 🏗️ Architecture

### Core Components

1. **`cdn-fetcher.ts`** - Core fetching service with caching and retry logic
2. **`server-cdn.ts`** - SSR-optimized server-side data fetching
3. **`useCDNData.ts`** - Client-side React hooks for data fetching
4. **`data-transformers.ts`** - Data transformation utilities
5. **`types/cdn.ts`** - TypeScript type definitions

### Design Patterns

- **Singleton Pattern**: CDNFetcher and CacheManager use singleton pattern
- **Factory Pattern**: Data transformers use factory methods
- **Observer Pattern**: React hooks provide reactive data updates
- **Strategy Pattern**: Different caching strategies for different data types

## 🚀 Features

### ✅ Performance Optimizations
- **Intelligent Caching**: Multi-level caching with TTL and stale-while-revalidate
- **Batch Fetching**: Fetch multiple endpoints in parallel
- **Request Deduplication**: Prevent duplicate requests
- **Retry Logic**: Exponential backoff for failed requests
- **SSR Optimization**: Server-side data fetching for SEO

### ✅ Error Handling
- **Graceful Degradation**: Fallback to cached data on errors
- **Custom Error Types**: Detailed error information
- **Retry Mechanisms**: Automatic retry with exponential backoff
- **Logging**: Comprehensive error logging

### ✅ SEO & Performance
- **Server-Side Rendering**: All data fetched on server for SEO
- **Static Generation**: Support for static site generation
- **Metadata Generation**: Automatic SEO metadata generation
- **Image Optimization**: Optimized image handling

## 📖 Usage Examples

### Server-Side Data Fetching (SSR)

```typescript
// In your page component
import { getProducts, getCategories } from '@/lib/server-cdn';
import { ProductTransformer } from '@/lib/data-transformers';

export default async function ProductsPage() {
  // Fetch data on server
  const [products, categories] = await Promise.all([
    getProducts({ category: 'electronics' }),
    getCategories(),
  ]);

  // Transform data
  const transformedProducts = ProductTransformer.transformForList(products);

  return (
    <div>
      {transformedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Client-Side Data Fetching

```typescript
// In your React component
import { useProducts, useCategories } from '@/hooks/useCDNData';

export function ProductsList() {
  const { data: products, isLoading, error } = useProducts({
    category: 'electronics',
    inStock: true,
  });

  const { data: categories } = useCategories();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Batch Data Fetching

```typescript
// Fetch multiple data sources at once
import { useCDNBatch } from '@/hooks/useCDNData';

export function HomePage() {
  const { data, isLoading } = useCDNBatch({
    bannerSlides: '/banners/slides',
    featuredProducts: '/products/featured',
    categories: '/categories',
    companyInfo: '/company/info',
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <BannerSlider slides={data?.bannerSlides} />
      <ProductGrid products={data?.featuredProducts} />
    </div>
  );
}
```

### Data Transformation

```typescript
import { ProductTransformer, CategoryTransformer } from '@/lib/data-transformers';

// Transform product data
const transformedProduct = ProductTransformer.transformForDisplay(product);

// Transform category tree
const categoryTree = CategoryTransformer.buildCategoryTree(categories);

// Generate SEO metadata
const seoMeta = SEOTransformer.generateProductMeta(product);
```

## 🔧 Configuration

### Environment Variables

```env
# CDN Configuration
NEXT_PUBLIC_CDN_BASE_URL=https://your-cdn.com/api
```

### Cache Configuration

```typescript
// Custom cache settings
const { data } = useProducts({
  category: 'electronics',
}, {
  cache: true,
  cacheConfig: {
    ttl: 600, // 10 minutes
    staleWhileRevalidate: 1200, // 20 minutes
  },
  tags: ['products', 'electronics'],
});
```

## 📊 Data Types

### Product
```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  images: ProductImage[];
  variants: ProductVariant[];
  inStock: boolean;
  rating: number;
  // ... more fields
}
```

### Category
```typescript
interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  level: number;
  // ... more fields
}
```

## 🎯 Best Practices

### 1. Use Server-Side Fetching for SEO
```typescript
// ✅ Good - SSR for SEO
export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  return <ProductDetail product={product} />;
}

// ❌ Avoid - Client-side only for SEO-critical pages
export function ProductPage({ params }) {
  const { data: product } = useProduct(params.slug);
  return <ProductDetail product={product} />;
}
```

### 2. Implement Proper Error Handling
```typescript
// ✅ Good - Graceful error handling
const { data, error, isLoading } = useProducts();

if (error) {
  return <ErrorMessage error={error} />;
}

if (isLoading) {
  return <LoadingSpinner />;
}
```

### 3. Use Data Transformers
```typescript
// ✅ Good - Transform data for display
const transformedProducts = ProductTransformer.transformForList(products);

// ❌ Avoid - Raw data in components
return <ProductList products={products} />
```

### 4. Optimize Cache Settings
```typescript
// ✅ Good - Appropriate cache TTL
const { data } = useCompanyInfo({
  cacheConfig: { ttl: 3600 }, // 1 hour - rarely changes
});

const { data } = useProducts({
  cacheConfig: { ttl: 300 }, // 5 minutes - changes frequently
});
```

## 🔄 Cache Management

### Invalidate Cache
```typescript
import { cdnFetcher } from '@/lib/cdn-fetcher';

// Invalidate by tags
cdnFetcher.invalidateCache(['products', 'featured']);

// Clear all cache
cdnFetcher.clearCache();
```

### Cache Statistics
```typescript
const stats = cdnFetcher.getCacheStats();
console.log('Cache size:', stats.size);
console.log('Cached keys:', stats.keys);
```

## 🚨 Error Handling

### Custom Error Types
```typescript
import { CDNFetchError } from '@/lib/cdn-fetcher';

try {
  const data = await cdnFetcher.fetch('/products');
} catch (error) {
  if (error instanceof CDNFetchError) {
    console.error('CDN Error:', error.code, error.message);
    console.error('Status:', error.status);
    console.error('Details:', error.details);
  }
}
```

## 📈 Performance Monitoring

### Cache Hit Rate
```typescript
// Monitor cache performance
const stats = cdnFetcher.getCacheStats();
const hitRate = stats.hits / (stats.hits + stats.misses);
```

### Request Timing
```typescript
// Time your requests
const start = Date.now();
const data = await getProducts();
const duration = Date.now() - start;
console.log(`Request took ${duration}ms`);
```

## 🔧 Customization

### Custom Fetcher
```typescript
class CustomCDNFetcher extends CDNFetcher {
  async fetch<T>(endpoint: string, options = {}) {
    // Add custom logic
    console.log(`Fetching ${endpoint}`);
    return super.fetch<T>(endpoint, options);
  }
}
```

### Custom Transformers
```typescript
class CustomProductTransformer extends ProductTransformer {
  static transformForMobile(product: Product) {
    return {
      ...this.transformForDisplay(product),
      mobileImage: product.images.find(img => img.dimensions.width < 600),
    };
  }
}
```

## 🧪 Testing

### Mock CDN Data
```typescript
// Mock CDN responses for testing
jest.mock('@/lib/cdn-fetcher', () => ({
  cdnFetcher: {
    fetch: jest.fn().mockResolvedValue(mockProductData),
  },
}));
```

### Test Data Transformers
```typescript
import { ProductTransformer } from '@/lib/data-transformers';

test('transforms product for display', () => {
  const product = mockProduct;
  const transformed = ProductTransformer.transformForDisplay(product);
  
  expect(transformed.displayPrice).toBe('$29.99');
  expect(transformed.isOnSale).toBe(true);
});
```

This CDN data fetching system provides a robust, scalable solution for your ecommerce application with excellent performance, SEO optimization, and developer experience.
