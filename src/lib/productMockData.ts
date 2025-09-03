import { Product, ProductCategory, TrendingProductsData } from '@/types/product';

export const mockTrendingProducts: Product[] = [
  {
    id: '1',
    name: 'Casual Shoe',
    price: 225,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
    category: 'casual-shoe',
    isLiked: true,
    brand: 'Nike',
    colors: ['black', 'white'],
    sizes: ['7', '8', '9', '10'],
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Skateboard Shoe',
    price: 125,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center',
    category: 'skateboard-shoe',
    brand: 'New Balance',
    colors: ['white', 'green'],
    sizes: ['8', '9', '10', '11'],
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Skateboard Shoe',
    price: 125,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
    category: 'skateboard-shoe',
    brand: 'Jordan',
    colors: ['red', 'black', 'white'],
    sizes: ['7', '8', '9', '10', '11'],
    rating: 4.8,
    reviewCount: 245
  },
  {
    id: '4',
    name: 'Skateboard Shoe',
    price: 125,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center',
    category: 'skateboard-shoe',
    brand: 'Adidas',
    colors: ['green', 'white'],
    sizes: ['8', '9', '10'],
    rating: 4.2,
    reviewCount: 67
  },
  {
    id: '5',
    name: 'Basket Shoe',
    price: 125,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop&crop=center',
    category: 'basket-shoe',
    brand: 'Jordan',
    colors: ['black', 'white', 'red'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.6,
    reviewCount: 156
  },
  {
    id: '6',
    name: 'Sportwear Shoe',
    price: 159,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&crop=center',
    category: 'sportwear-shoe',
    brand: 'Nike',
    colors: ['white', 'orange'],
    sizes: ['7', '8', '9', '10'],
    rating: 4.4,
    reviewCount: 203
  }
];

export const getTrendingProductsData = (dict?: any): TrendingProductsData => {
  return {
    title: dict?.home?.sections?.trending_products || 'Trending',
    subtitle: dict?.home?.sections?.trending_products_subtitle || 'Popular products this week',
    categories: [
      { id: 'shorts', label: dict?.categories?.shorts || 'SHORTS' },
      { id: 'hat', label: dict?.categories?.hat || 'HAT' },
      { id: 'jackets', label: dict?.categories?.jackets || 'JACKETS' },
      { id: 'shoes', label: dict?.categories?.shoes || 'SHOES' },
      { id: 't-shirt', label: dict?.categories?.t_shirt || 'T-SHIRT' }
    ],
    products: mockTrendingProducts
  };
};

export const getProductsByCategory = (category: ProductCategory | 'all'): Product[] => {
  if (category === 'all') {
    return mockTrendingProducts;
  }
  
  // For shoes category, return all shoe types
  if (category === 'shoes') {
    return mockTrendingProducts.filter(product => 
      ['casual-shoe', 'skateboard-shoe', 'basket-shoe', 'sportwear-shoe'].includes(product.category)
    );
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
