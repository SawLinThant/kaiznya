import { Product, ProductCategory, TrendingProductsData } from '@/types/product';
import productsData from './mockData/products.json';
import categoriesData from './mockData/categories.json';

// CDN Product type (matches your JSON format)
export interface CDNProduct {
  id: number;
  category_id: number;
  title: string;
  description: string;
  short_description: string;
  images: Array<{
    alt: string;
    imageSrc: string;
  }>;
  price: number;
  currency: string;
  endpoint: string;
  shop_endpoint: string;
}

// CDN Category type (matches your JSON format)
export interface CDNCategory {
  id: number;
  title: string;
  description: string;
  alt: string;
  imageSrc: string;
  endpoint: string;
}

// Map category_id to category names
const categoryIdToName: Record<number, ProductCategory> = {
  1: 'face-serum',
  2: 'face-wash',
  3: 'cream-powder',
  4: 'hair-treatment',
  5: 'liquid-foundation',
  6: 'lotion',
  7: 'shower-gel'
};

// Convert CDN product to our Product type
export const convertCDNProductToProduct = (cdnProduct: CDNProduct): Product => ({
  id: cdnProduct.id.toString(),
  name: cdnProduct.title,
  price: cdnProduct.price,
  image: cdnProduct.images[0]?.imageSrc || '/placeholder-image.jpg',
  category: categoryIdToName[cdnProduct.category_id] || 'face-care',
  isLiked: false,
  brand: 'Kanaiya', // Default brand
  colors: ['default'], // Default colors
  sizes: ['M', 'L'], // Default sizes
  rating: 4.5, // Default rating
  reviewCount: Math.floor(Math.random() * 200) + 50 // Random review count
});

// Convert CDN category to our ProductCategory type
export const convertCDNCategoryToProductCategory = (cdnCategory: CDNCategory): ProductCategory => 
  cdnCategory.endpoint.replace('/', '') as ProductCategory;

// Get products from CDN format
export const getCDNProducts = (): Product[] => {
  return productsData.map(convertCDNProductToProduct);
};

// Get categories from CDN format
export const getCDNCategories = (): ProductCategory[] => {
  return categoriesData.map(convertCDNCategoryToProductCategory);
};

// Legacy mock data (keeping for backward compatibility)
export const mockTrendingProducts: Product[] = getCDNProducts();

export const getTrendingProductsData = (dict?: any): TrendingProductsData => {
  const cdnCategories = categoriesData.map(cat => ({
    id: cat.endpoint.replace('/', '') as ProductCategory,
    label: cat.title.toUpperCase()
  }));

  return {
    title: dict?.home?.sections?.trending_products || 'Trending',
    subtitle: dict?.home?.sections?.trending_products_subtitle || 'Popular products this week',
    categories: cdnCategories,
    products: mockTrendingProducts
  };
};

export const getProductsByCategory = (category: ProductCategory | 'all'): Product[] => {
  if (category === 'all') {
    return mockTrendingProducts;
  }
  
  return mockTrendingProducts.filter(product => product.category === category);
};

export const toggleProductLike = (productId: string): Product[] => {
  return mockTrendingProducts.map(product => 
    product.id === productId 
      ? { ...product, isLiked: !product.isLiked }
      : product
  );
};
