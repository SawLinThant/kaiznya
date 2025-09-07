export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  isLiked?: boolean;
  brand?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviewCount?: number;
  description?: string;
  tags?: string[];
}

export type ProductCategory = 
  | 'shorts' 
  | 'hat' 
  | 'jackets' 
  | 'shoes' 
  | 't-shirt'
  | 'casual-shoe'
  | 'skateboard-shoe'
  | 'basket-shoe'
  | 'sportwear-shoe'
  | 'face-care'
  | 'body-care'
  | 'hair-care'
  | 'reviews'
  | 'face-serum'
  | 'face-wash'
  | 'cream-powder'
  | 'hair-treatment'
  | 'liquid-foundation'
  | 'lotion'
  | 'shower-gel';

export interface ProductFilter {
  category: ProductCategory | 'all';
  priceRange?: {
    min: number;
    max: number;
  };
  colors?: string[];
  sizes?: string[];
  brands?: string[];
}

export interface TrendingProductsData {
  title: string;
  subtitle?: string;
  categories: Array<{
    id: ProductCategory | 'all';
    label: string;
    count?: number;
  }>;
  products: Product[];
}
