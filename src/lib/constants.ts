// Localization constants
export const locales = ['en', 'my', 'th'] as const;
export const defaultLocale = 'en';
export type Locale = typeof locales[number];

// API Base URL - Update this to your backend URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// CDN Base URL - Update this to your CDN URL
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || 'https://cdn.example.com/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Room endpoints
  ROOMS: '/rooms',
  ROOM_DETAIL: (id: string) => `/rooms/${id}`,
  ROOM_AVAILABILITY: '/rooms/availability',
  
  // Booking endpoints
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
  CREATE_BOOKING: '/bookings',
  CANCEL_BOOKING: (id: string) => `/bookings/${id}/cancel`,
  
  // User endpoints
  USER_PROFILE: '/me',
  USERS: '/users',
  
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Admin endpoints
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ROOMS: '/admin/rooms',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_USERS: '/admin/users',
} as const;

// CDN Endpoints
export const CDN_ENDPOINTS = {
  // Product endpoints
  PRODUCTS: '/kanaiya_json/products/products.json',
  PRODUCT_DETAIL: (slug: string) => `/kanaiya_json/products/${slug}.json`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/kanaiya_json/products/category/${category}.json`,
  PRODUCTS_SEARCH: '/kanaiya_json/products/search.json',
  FEATURED_PRODUCTS: '/kanaiya_json/products/featured.json',
  RELATED_PRODUCTS: (productId: string) => `/kanaiya_json/products/${productId}/related.json`,
  
  // Category endpoints
  CATEGORIES: '/kanaiya_json/category/category.json',
  CATEGORY_DETAIL: (slug: string) => `/kanaiya_json/category/${slug}.json`,
  CATEGORY_TREE: '/kanaiya_json/category/tree.json',
  
  // Collection endpoints
  COLLECTIONS: '/kanaiya_json/collection/collection.json',
  COLLECTION_DETAIL: (slug: string) => `/kanaiya_json/collection/${slug}.json`,
  FEATURED_COLLECTIONS: '/kanaiya_json/collections/featured.json',
  
  // Banner/Slider endpoints
  BANNERS: '/kanaiya_json/banner/banner.json',
  BANNER_SLIDES: '/kanaiya_json/banner/slides.json',
  HERO_BANNERS: '/kanaiya_json/banner/hero.json',
  BANNER_JSON: '/kanaiya_json/banner/banner.json',
  
  // Blog/Content endpoints
  BLOG_POSTS: '/kanaiya_json/blog/posts.json',
  BLOG_POST_DETAIL: (slug: string) => `/kanaiya_json/blog/posts/${slug}.json`,
  BLOG_CATEGORIES: '/kanaiya_json/blog/categories.json',
  BLOG_TAGS: '/kanaiya_json/blog/tags.json',
  FEATURED_POSTS: '/kanaiya_json/blog/posts/featured.json',
  
  // Company/About endpoints
  COMPANY_INFO: '/kanaiya_json/company/info.json',
  CONTACT_INFO: '/kanaiya_json/company/contact.json',
  TEAM_MEMBERS: '/kanaiya_json/company/team.json',
  
  // SEO endpoints
  SEO_DATA: '/kanaiya_json/seo/seo.json',
  SITEMAP: '/kanaiya_json/seo/sitemap.json',
  ROBOTS: '/kanaiya_json/seo/robots.txt',
  
  // Utility endpoints
  HEALTH_CHECK: '/kanaiya_json/health.json',
  VERSION: '/kanaiya_json/version.json',
  CONFIG: '/kanaiya_json/config.json',
} as const;

// Room status constants
export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  CLEANING: 'cleaning',
} as const;

export type RoomStatus = typeof ROOM_STATUS[keyof typeof ROOM_STATUS];

// Room types
export const ROOM_TYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  SUITE: 'suite',
  DELUXE: 'deluxe',
} as const;

export type RoomType = typeof ROOM_TYPES[keyof typeof ROOM_TYPES];

// Booking status constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  CANCELLED: 'cancelled',
} as const;

export type BookingStatus = typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];

// SWR Configuration
export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5000,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const; 