"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';

interface ProductsHeroProps {
  dict?: any;
  totalProducts?: number;
  className?: string;
}

const ProductsHero: React.FC<ProductsHeroProps> = ({ 
  dict, 
  totalProducts = 0, 
  className 
}) => {
  return (
    <section className={cn('relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-50 to-purple-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {dict?.products?.hero?.title || 'Discover Our Products'}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {dict?.products?.hero?.subtitle || 'Explore our complete collection of premium skincare products designed to enhance your natural beauty'}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Icon name="star" className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">
                {totalProducts}+ Products
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="heart" className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-medium">
                Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="send" className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-medium">
                Free Shipping
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};

export default ProductsHero;
