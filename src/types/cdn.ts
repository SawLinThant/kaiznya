// CDN Data Types
export interface CDNResponse<T> {
  data: T;
  meta: {
    version: string;
    lastUpdated: string;
    source: string;
  };
  success: boolean;
  message?: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  category: ProductCategory;
  subcategory?: string;
  brand: string;
  images: ProductImage[];
  variants: ProductVariant[];
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material' | 'style';
  value: string;
  priceModifier: number;
  inStock: boolean;
  stockQuantity: number;
  image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  level: number;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  bannerImage?: string;
  products: string[]; // Product IDs
  isActive: boolean;
  sortOrder: number;
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
}

// Banner/Slider Types
export interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
}

// Blog/Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: SEOData;
  isPublished: boolean;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  socialLinks: Record<string, string>;
}

// Company/About Types
export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  contact: ContactInfo;
  socialMedia: Record<string, string>;
  address: Address;
  seo: SEOData;
  updatedAt: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  supportEmail: string;
  businessHours: BusinessHours;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  twitterCard?: string;
  structuredData?: Record<string, any>;
}

// Filter and Search Types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  tags?: string[];
}

export interface SearchQuery {
  q: string;
  filters?: ProductFilters;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error Types
export interface CDNError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Cache Types
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate: number; // Stale while revalidate in seconds
  tags: string[]; // Cache tags for invalidation
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  tags: string[];
}
