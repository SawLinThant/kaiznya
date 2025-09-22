"use client";

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Icon } from '@/components';
import Reveal from '@/components/atoms/Reveal';

interface ProductsGridProps {
  products: Product[];
  likedProducts: Set<string>;
  onLikeToggle: (productId: string) => void;
  onProductClick: (product: Product) => void;
  locale?: string;
  isLoading?: boolean;
  className?: string;
}

const ProductCard: React.FC<{
  product: Product;
  isLiked: boolean;
  onLikeToggle: (productId: string) => void;
  onProductClick: (product: Product) => void;
  locale?: string;
  index: number;
}> = React.memo(({ product, isLiked, onLikeToggle, onProductClick, locale = 'en', index }) => {
  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(product.id);
  }, [product.id, onLikeToggle]);

  const handleCardClick = useCallback(() => {
    onProductClick(product);
  }, [product, onProductClick]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Reveal direction="up" delayMs={index * 100}>
      <Link href={`/${locale}/products/${product.id}`}>
        <div 
          className="group cursor-pointer h-full"
          role="button"
          tabIndex={0}
        >
        <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
          {/* Product Image Container */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon 
                name="heart" 
                className={cn(
                  'w-5 h-5 transition-colors duration-200',
                  isLiked ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'
                )} 
              />
            </button>

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            )}

            {/* Sale Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Sale
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {/* Product Description */}
            {product.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      className={cn(
                        'w-4 h-4',
                        i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle add to cart
                console.log('Add to cart:', product.id);
              }}
              className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
        </div>
      </Link>
    </Reveal>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  likedProducts,
  onLikeToggle,
  onProductClick,
  locale = 'en',
  isLoading = false,
  className
}) => {
  if (isLoading) {
    return (
      <div className={cn('py-8', className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-80 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={cn('py-16 text-center', className)}>
        <Icon name="search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={cn('py-8', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isLiked={likedProducts.has(product.id)}
            onLikeToggle={onLikeToggle}
            onProductClick={onProductClick}
            locale={locale}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
