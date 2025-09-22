"use client";

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Icon } from '@/components';
import Reveal from '@/components/atoms/Reveal';

interface ProductDetailRelatedProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  dict?: any;
  className?: string;
}

const ProductCard: React.FC<{
  product: Product;
  onProductClick: (product: Product) => void;
  index: number;
}> = React.memo(({ product, onProductClick, index }) => {
  const handleClick = useCallback(() => {
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

  const formatCategoryName = (category: string): string => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Reveal direction="up" delayMs={index * 100}>
      <div 
        className="group cursor-pointer h-full"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
          {/* Product Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                {formatCategoryName(product.category)}
              </span>
            </div>

            {/* Sale Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Sale
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {/* Product Description */}
            {product.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-3">
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
          </div>
        </div>
      </div>
    </Reveal>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductDetailRelated: React.FC<ProductDetailRelatedProps> = ({
  products,
  onProductClick,
  dict,
  className
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" delayMs={100}>
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {dict?.products?.related?.title || 'You Might Also Like'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict?.products?.related?.subtitle || 'Discover more products from our collection that complement your skincare routine'}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delayMs={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                index={index}
              />
            ))}
          </div>
        </Reveal>

        {/* View All Products Button */}
        <Reveal direction="up" delayMs={300}>
          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200">
              View All Products
              <Icon name="send" className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductDetailRelated;
