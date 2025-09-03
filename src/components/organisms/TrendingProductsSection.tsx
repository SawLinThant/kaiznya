"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Icon } from '@/components';
import { cn } from '@/lib/utils';
import { Product, ProductCategory } from '@/types/product';
import { getTrendingProductsData, getProductsByCategory } from '@/lib/productMockData';

interface TrendingProductsSectionProps {
  dict?: any;
  className?: string;
}

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
    console.log('Navigate to product:', product.id);
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
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('shoes');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // Memoized data to prevent unnecessary recalculations
  const trendingData = useMemo(() => getTrendingProductsData(dict), [dict]);
  
  // Memoized filtered products
  const displayedProducts = useMemo(() => {
    const products = getProductsByCategory(activeCategory);
    return products.map(product => ({
      ...product,
      isLiked: likedProducts.has(product.id)
    }));
  }, [activeCategory, likedProducts]);

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

  return (
    <section className={cn("pt-4 sm:pt-8 lg:pt-8", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        
        {/* Section Header with Title Left and Categories Right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 sm:mb-8">
          {/* Title on Left */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {trendingData.title}
            </h2>
          </div>

          {/* Category Filter Tabs on Right */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {trendingData.categories.map((category) => (
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
            ))}
          </div>
        </div>
         <div className='flex flex-col gap-2'></div>
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
      </div>
    </section>
  );
};

export default TrendingProductsSection;
