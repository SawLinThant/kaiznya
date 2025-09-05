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
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCTS_SEARCH: '/products/search',
  FEATURED_PRODUCTS: '/products/featured',
  RELATED_PRODUCTS: (productId: string) => `/products/${productId}/related`,
  
  // Category endpoints
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: (slug: string) => `/categories/${slug}`,
  CATEGORY_TREE: '/categories/tree',
  
  // Collection endpoints
  COLLECTIONS: '/collections',
  COLLECTION_DETAIL: (slug: string) => `/collections/${slug}`,
  FEATURED_COLLECTIONS: '/collections/featured',
  
  // Banner/Slider endpoints
  BANNERS: '/banners',
  BANNER_SLIDES: '/banners/slides',
  HERO_BANNERS: '/banners/hero',
  
  // Blog/Content endpoints
  BLOG_POSTS: '/blog/posts',
  BLOG_POST_DETAIL: (slug: string) => `/blog/posts/${slug}`,
  BLOG_CATEGORIES: '/blog/categories',
  BLOG_TAGS: '/blog/tags',
  FEATURED_POSTS: '/blog/posts/featured',
  
  // Company/About endpoints
  COMPANY_INFO: '/company/info',
  CONTACT_INFO: '/company/contact',
  TEAM_MEMBERS: '/company/team',
  
  // SEO endpoints
  SEO_DATA: '/seo',
  SITEMAP: '/sitemap',
  ROBOTS: '/robots.txt',
  
  // Utility endpoints
  HEALTH_CHECK: '/health',
  VERSION: '/version',
  CONFIG: '/config',
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