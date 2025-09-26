"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Icon } from '@/components';
import { cn } from '@/lib/utils';
import { Product, ProductCategory } from '@/types/product';
import { getTrendingProductsData } from '@/lib/productMockData';
import { useProducts, useCategories } from '@/hooks/useCDNData';

interface TrendingProductsSectionProps {
  dict?: any;
  className?: string;
}

// API Product interface based on actual response format
interface APIProduct {
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

// Transform API Product to local Product interface
const transformAPIProduct = (apiProduct: APIProduct): Product => {
  // Map category_id to ProductCategory
  const getCategoryFromId = (categoryId: number): ProductCategory => {
    const categoryMap: Record<number, ProductCategory> = {
      1: 'face-serum',
      2: 'face-wash',
      3: 'cream-powder',
      4: 'hair-treatment',
      5: 'liquid-foundation',
      6: 'lotion',
      7: 'shower-gel'
    };
    return categoryMap[categoryId] || ('face-serum' as ProductCategory);
  };

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    price: apiProduct.price,
    originalPrice: undefined, // Not provided in API
    image: apiProduct.images?.[0]?.imageSrc || '', // Use first image as primary
    category: getCategoryFromId(apiProduct.category_id),
    isLiked: false, // Will be managed by local state
    brand: undefined, // Not provided in API
    colors: [], // Not provided in API
    sizes: [], // Not provided in API
    rating: undefined, // Not provided in API
    reviewCount: undefined, // Not provided in API
    description: apiProduct.description,
    tags: [], // Not provided in API
  };
};

interface ProductCardProps {
  product: Product;
  onLikeToggle: (productId: string) => void;
  size?: 'small' | 'large';
}

// Memoized ProductCard component for better performance
const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onLikeToggle, size = 'small' }) => {
  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(product.id);
  }, [product.id, onLikeToggle]);

  const handleCardClick = useCallback(() => {
    // Navigate to product detail page
  }, [product.id]);

  return (
    <div 
      className="group cursor-pointer h-full"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col max-h-full">
        {/* Product Image Container - Fixed height for all cards */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl bg-white"
            loading="lazy"
          />
          
          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
              "hover:scale-110 active:scale-95 z-10",
              product.isLiked 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-gray-600 hover:bg-white"
            )}
            aria-label={product.isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Icon 
              name="heart" 
              className={cn(
                "w-4 h-4 transition-colors",
                product.isLiked ? "fill-current" : ""
              )} 
            />
          </button>
        </div>
        
        {/* Product Info - Fixed at bottom */}
        <div className="flex-shrink-0 bg-white p-3 space-y-1">
          <h3 className="font-medium text-gray-900 truncate text-base">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900 text-base">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({ 
  dict, 
  className 
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('face-serum');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // CDN Data hooks
  const { data: allProducts, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // Transform CDN categories to the format expected by the component
  const cdnCategories = useMemo(() => {
    if (!categories) return [];
    
    // Handle both CDN format and mock data format
    return categories.map((category: any) => ({
      id: (category.endpoint?.replace('/', '') || category.slug) as ProductCategory,
      label: (category.title || category.name)?.toUpperCase()
    }));
  }, [categories]);

  // Fallback to mock data if CDN categories are not available
  const displayCategories = useMemo(() => {
    if (cdnCategories.length > 0) {
      return cdnCategories;
    }
    
    // Fallback to mock data structure
    const mockCategories = [
      { id: 'face-serum' as ProductCategory, label: 'FACE SERUM' },
      { id: 'face-wash' as ProductCategory, label: 'FACE WASH' },
      { id: 'cream-powder' as ProductCategory, label: 'CREAM POWDER' },
      { id: 'hair-treatment' as ProductCategory, label: 'HAIR TREATMENT' },
      { id: 'liquid-foundation' as ProductCategory, label: 'LIQUID FOUNDATION' },
      { id: 'lotion' as ProductCategory, label: 'LOTION' },
      { id: 'shower-gel' as ProductCategory, label: 'SHOWER GEL' }
    ];
    
    return mockCategories;
  }, [cdnCategories]);



  // CDN data monitoring
  React.useEffect(() => {
    // CDN data monitoring removed
  }, [allProducts, categories, cdnCategories, productsLoading, categoriesLoading, productsError, categoriesError]);

  // Memoized data to prevent unnecessary recalculations
  const trendingData = useMemo(() => getTrendingProductsData(dict), [dict]);
  

  
  // Memoized filtered products
  const displayedProducts = useMemo(() => {
    // Get all products and filter by category
    const sourceProducts = (allProducts as unknown as APIProduct[]) || [];

    // Transform API products to local format
    const transformedProducts = sourceProducts.map(transformAPIProduct);
    
    // Filter by category
    const filteredProducts = activeCategory === 'all'
      ? transformedProducts
      : transformedProducts.filter(product => product.category === activeCategory);
    
    return filteredProducts.map(product => ({
      ...product,
      isLiked: likedProducts.has(product.id)
    }));
  }, [activeCategory, likedProducts, allProducts]);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: ProductCategory | 'all') => {
    setActiveCategory(category);
  }, []);

  // Memoized like toggle handler
  const handleLikeToggle = useCallback((productId: string) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  }, []);

  // Loading state
  if (productsLoading || categoriesLoading) {
    return (
      <section className={cn("pt-4 sm:pt-8 lg:pt-8", className)}>
        <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products and categories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (productsError || categoriesError) {
    return (
      <section className={cn("pt-4 sm:pt-8 lg:pt-8", className)}>
        <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-gray-600 mb-2">Failed to load data</p>
              <p className="text-sm text-gray-500">
                {productsError?.message || categoriesError?.message || 'Please try again later'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("pt-4 sm:pt-8 lg:pt-8", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        
        {/* Section Header with Title Left and Categories Right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 lg:justify-between mb-2 sm:mb-8">
          {/* Title on Left */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {trendingData.title}
            </h2>
          </div>

          {/* Category Filter Tabs on Right */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {displayCategories.length > 0 ? (
              displayCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    activeCategory === category.id
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                  )}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.label}
                </button>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No categories available</div>
            )}
          </div>
        </div>
         <div className='flex flex-col gap-2'></div>
        
        {/* Content Area - Products or No Products State */}
        {!displayedProducts.length ? (
          // No products state
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <p className="text-gray-600">No products found</p>
              <p className="text-sm text-gray-500">Try selecting a different category</p>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid - Mobile: 2 cols, Desktop: Asymmetric Layout */}
            <div className="block sm:hidden">
              {/* Mobile Layout: Simple 2-column grid */}
              <div className="grid grid-cols-2 gap-4">
                {displayedProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="h-96 overflow-hidden">
                    <ProductCard
                      product={product}
                      onLikeToggle={handleLikeToggle}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </div>

        <div className="hidden sm:block">
          {/* Desktop Asymmetric Layout - 2 Rows with 3 Products Each */}
          <div className="space-y-0">
            {/* First Row: 2 small + 1 large */}
                          <div className="grid grid-cols-4 gap-4 min-h-[24rem] overflow-hidden">
              {/* First Small Product */}
              {displayedProducts[0] && (
                <div className="col-span-1 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[0]}
                    onLikeToggle={handleLikeToggle}
                    size="small"
                  />
                </div>
              )}
              
              {/* Second Small Product */}
              {displayedProducts[1] && (
                <div className="col-span-1 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[1]}
                    onLikeToggle={handleLikeToggle}
                    size="small"
                  />
                </div>
              )}
              
              {/* Large Product */}
              {displayedProducts[2] && (
                <div className="col-span-2 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[2]}
                    onLikeToggle={handleLikeToggle}
                    size="large"
                  />
                </div>
              )}
            </div>

            {/* Second Row: 1 large + 2 small */}
                          <div className="grid grid-cols-4 gap-4 h-[28rem] overflow-hidden">
              {/* Large Product */}
              {displayedProducts[3] && (
                <div className="col-span-2 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[3]}
                    onLikeToggle={handleLikeToggle}
                    size="large"
                  />
                </div>
              )}
              
              {/* Third Small Product */}
              {displayedProducts[4] && (
                <div className="col-span-1 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[4]}
                    onLikeToggle={handleLikeToggle}
                    size="small"
                  />
                </div>
              )}
              
              {/* Fourth Small Product */}
              {displayedProducts[5] && (
                <div className="col-span-1 h-full overflow-hidden">
                  <ProductCard
                    product={displayedProducts[5]}
                    onLikeToggle={handleLikeToggle}
                    size="small"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
