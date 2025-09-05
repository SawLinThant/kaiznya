import { cdnFetcher } from './cdn-fetcher';
import { CDN_ENDPOINTS } from './constants';
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

// Server-side data fetching utilities for SSR
export class ServerCDNFetcher {
  // Product data fetching
  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const queryString = filters ? cdnFetcher.buildQueryString(filters) : '';
      const endpoint = `${CDN_ENDPOINTS.PRODUCTS}${queryString}`;
      
      return await cdnFetcher.fetch<Product[]>(endpoint, {
        cache: true,
        tags: ['products'],
        cacheConfig: { ttl: 300 }, // 5 minutes
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  }

  static async getProduct(slug: string): Promise<Product | null> {
    try {
      const endpoint = CDN_ENDPOINTS.PRODUCT_DETAIL(slug);
      
      return await cdnFetcher.fetch<Product>(endpoint, {
        cache: true,
        tags: ['products', `product:${slug}`],
        cacheConfig: { ttl: 600 }, // 10 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch product ${slug}:`, error);
      return null;
    }
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      return await cdnFetcher.fetch<Product[]>(CDN_ENDPOINTS.FEATURED_PRODUCTS, {
        cache: true,
        tags: ['products', 'featured'],
        cacheConfig: { ttl: 900 }, // 15 minutes
      });
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      return [];
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const endpoint = CDN_ENDPOINTS.PRODUCTS_BY_CATEGORY(category);
      
      return await cdnFetcher.fetch<Product[]>(endpoint, {
        cache: true,
        tags: ['products', `category:${category}`],
        cacheConfig: { ttl: 600 }, // 10 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch products for category ${category}:`, error);
      return [];
    }
  }

  static async searchProducts(query: SearchQuery): Promise<PaginatedResponse<Product>> {
    try {
      const queryString = cdnFetcher.buildQueryString(query);
      const endpoint = `${CDN_ENDPOINTS.PRODUCTS_SEARCH}${queryString}`;
      
      return await cdnFetcher.fetch<PaginatedResponse<Product>>(endpoint, {
        cache: true,
        tags: ['products', 'search'],
        cacheConfig: { ttl: 300 }, // 5 minutes
      });
    } catch (error) {
      console.error('Failed to search products:', error);
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };
    }
  }

  // Category data fetching
  static async getCategories(): Promise<ProductCategory[]> {
    try {
      return await cdnFetcher.fetch<ProductCategory[]>(CDN_ENDPOINTS.CATEGORIES, {
        cache: true,
        tags: ['categories'],
        cacheConfig: { ttl: 1800 }, // 30 minutes
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  }

  static async getCategory(slug: string): Promise<ProductCategory | null> {
    try {
      const endpoint = CDN_ENDPOINTS.CATEGORY_DETAIL(slug);
      
      return await cdnFetcher.fetch<ProductCategory>(endpoint, {
        cache: true,
        tags: ['categories', `category:${slug}`],
        cacheConfig: { ttl: 1800 }, // 30 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch category ${slug}:`, error);
      return null;
    }
  }

  static async getCategoryTree(): Promise<ProductCategory[]> {
    try {
      return await cdnFetcher.fetch<ProductCategory[]>(CDN_ENDPOINTS.CATEGORY_TREE, {
        cache: true,
        tags: ['categories', 'tree'],
        cacheConfig: { ttl: 3600 }, // 1 hour
      });
    } catch (error) {
      console.error('Failed to fetch category tree:', error);
      return [];
    }
  }

  // Collection data fetching
  static async getCollections(): Promise<Collection[]> {
    try {
      return await cdnFetcher.fetch<Collection[]>(CDN_ENDPOINTS.COLLECTIONS, {
        cache: true,
        tags: ['collections'],
        cacheConfig: { ttl: 600 }, // 10 minutes
      });
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      return [];
    }
  }

  static async getCollection(slug: string): Promise<Collection | null> {
    try {
      const endpoint = CDN_ENDPOINTS.COLLECTION_DETAIL(slug);
      
      return await cdnFetcher.fetch<Collection>(endpoint, {
        cache: true,
        tags: ['collections', `collection:${slug}`],
        cacheConfig: { ttl: 600 }, // 10 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch collection ${slug}:`, error);
      return null;
    }
  }

  static async getFeaturedCollections(): Promise<Collection[]> {
    try {
      return await cdnFetcher.fetch<Collection[]>(CDN_ENDPOINTS.FEATURED_COLLECTIONS, {
        cache: true,
        tags: ['collections', 'featured'],
        cacheConfig: { ttl: 900 }, // 15 minutes
      });
    } catch (error) {
      console.error('Failed to fetch featured collections:', error);
      return [];
    }
  }

  // Banner data fetching
  static async getBannerSlides(): Promise<BannerSlide[]> {
    try {
      return await cdnFetcher.fetch<BannerSlide[]>(CDN_ENDPOINTS.BANNER_SLIDES, {
        cache: true,
        tags: ['banners', 'slides'],
        cacheConfig: { ttl: 300 }, // 5 minutes
      });
    } catch (error) {
      console.error('Failed to fetch banner slides:', error);
      return [];
    }
  }

  static async getHeroBanners(): Promise<BannerSlide[]> {
    try {
      return await cdnFetcher.fetch<BannerSlide[]>(CDN_ENDPOINTS.HERO_BANNERS, {
        cache: true,
        tags: ['banners', 'hero'],
        cacheConfig: { ttl: 300 }, // 5 minutes
      });
    } catch (error) {
      console.error('Failed to fetch hero banners:', error);
      return [];
    }
  }

  // Blog data fetching
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      return await cdnFetcher.fetch<BlogPost[]>(CDN_ENDPOINTS.BLOG_POSTS, {
        cache: true,
        tags: ['blog', 'posts'],
        cacheConfig: { ttl: 600 }, // 10 minutes
      });
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      return [];
    }
  }

  static async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      const endpoint = CDN_ENDPOINTS.BLOG_POST_DETAIL(slug);
      
      return await cdnFetcher.fetch<BlogPost>(endpoint, {
        cache: true,
        tags: ['blog', 'posts', `post:${slug}`],
        cacheConfig: { ttl: 1800 }, // 30 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch blog post ${slug}:`, error);
      return null;
    }
  }

  static async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      return await cdnFetcher.fetch<BlogPost[]>(CDN_ENDPOINTS.FEATURED_POSTS, {
        cache: true,
        tags: ['blog', 'posts', 'featured'],
        cacheConfig: { ttl: 900 }, // 15 minutes
      });
    } catch (error) {
      console.error('Failed to fetch featured posts:', error);
      return [];
    }
  }

  // Company data fetching
  static async getCompanyInfo(): Promise<CompanyInfo | null> {
    try {
      return await cdnFetcher.fetch<CompanyInfo>(CDN_ENDPOINTS.COMPANY_INFO, {
        cache: true,
        tags: ['company', 'info'],
        cacheConfig: { ttl: 3600 }, // 1 hour
      });
    } catch (error) {
      console.error('Failed to fetch company info:', error);
      return null;
    }
  }

  static async getContactInfo(): Promise<CompanyInfo['contact'] | null> {
    try {
      return await cdnFetcher.fetch<CompanyInfo['contact']>(CDN_ENDPOINTS.CONTACT_INFO, {
        cache: true,
        tags: ['company', 'contact'],
        cacheConfig: { ttl: 3600 }, // 1 hour
      });
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      return null;
    }
  }

  // Batch data fetching for page optimization
  static async getHomePageData() {
    try {
      const [bannerSlides, featuredProducts, featuredCollections, companyInfo] = await Promise.allSettled([
        this.getBannerSlides(),
        this.getFeaturedProducts(),
        this.getFeaturedCollections(),
        this.getCompanyInfo(),
      ]);

      return {
        bannerSlides: bannerSlides.status === 'fulfilled' ? bannerSlides.value : [],
        featuredProducts: featuredProducts.status === 'fulfilled' ? featuredProducts.value : [],
        featuredCollections: featuredCollections.status === 'fulfilled' ? featuredCollections.value : [],
        companyInfo: companyInfo.status === 'fulfilled' ? companyInfo.value : null,
      };
    } catch (error) {
      console.error('Failed to fetch home page data:', error);
      return {
        bannerSlides: [],
        featuredProducts: [],
        featuredCollections: [],
        companyInfo: null,
      };
    }
  }

  static async getProductPageData(slug: string) {
    try {
      const [product, relatedProducts, categories] = await Promise.allSettled([
        this.getProduct(slug),
        this.getFeaturedProducts(), // Using featured as related for now
        this.getCategories(),
      ]);

      return {
        product: product.status === 'fulfilled' ? product.value : null,
        relatedProducts: relatedProducts.status === 'fulfilled' ? relatedProducts.value : [],
        categories: categories.status === 'fulfilled' ? categories.value : [],
      };
    } catch (error) {
      console.error(`Failed to fetch product page data for ${slug}:`, error);
      return {
        product: null,
        relatedProducts: [],
        categories: [],
      };
    }
  }

  static async getCategoryPageData(slug: string) {
    try {
      const [category, products, categories] = await Promise.allSettled([
        this.getCategory(slug),
        this.getProductsByCategory(slug),
        this.getCategories(),
      ]);

      return {
        category: category.status === 'fulfilled' ? category.value : null,
        products: products.status === 'fulfilled' ? products.value : [],
        categories: categories.status === 'fulfilled' ? categories.value : [],
      };
    } catch (error) {
      console.error(`Failed to fetch category page data for ${slug}:`, error);
      return {
        category: null,
        products: [],
        categories: [],
      };
    }
  }

  // SEO data fetching
  static async getSEOData(page: string, params?: Record<string, any>) {
    try {
      const queryString = params ? cdnFetcher.buildQueryString(params) : '';
      const endpoint = `${CDN_ENDPOINTS.SEO_DATA}/${page}${queryString}`;
      
      return await cdnFetcher.fetch<any>(endpoint, {
        cache: true,
        tags: ['seo', `page:${page}`],
        cacheConfig: { ttl: 1800 }, // 30 minutes
      });
    } catch (error) {
      console.error(`Failed to fetch SEO data for ${page}:`, error);
      return null;
    }
  }
}

// Export individual functions for easier imports
export const {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getCategory,
  getCategoryTree,
  getCollections,
  getCollection,
  getFeaturedCollections,
  getBannerSlides,
  getHeroBanners,
  getBlogPosts,
  getBlogPost,
  getFeaturedPosts,
  getCompanyInfo,
  getContactInfo,
  getHomePageData,
  getProductPageData,
  getCategoryPageData,
  getSEOData,
} = ServerCDNFetcher;
