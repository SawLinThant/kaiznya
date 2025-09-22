"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';
import { ProductCategory } from '@/types/product';

interface ProductsFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    count: number;
  }>;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  className?: string;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = useCallback((categorySlug: string | null) => {
    onCategoryChange(categorySlug);
  }, [onCategoryChange]);

  const handlePriceRangeChange = useCallback((index: number, value: string) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    onPriceRangeChange(newRange);
  }, [priceRange, onPriceRangeChange]);

  const formatCategoryName = (slug: string | undefined, fallbackName?: string): string => {
    if (!slug || typeof slug !== 'string') {
      return fallbackName || 'Unknown Category';
    }
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={cn('bg-white border-r border-gray-200', className)}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <span>Filters</span>
          <Icon 
            name={isOpen ? "close" : "search"} 
            className="w-4 h-4" 
          />
        </button>
      </div>

      {/* Filter Content */}
      <div className={cn(
        'p-6 space-y-6',
        isOpen ? 'block' : 'hidden lg:block'
      )}>
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-pink-600 hover:text-pink-700 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Categories Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={cn(
                'flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                selectedCategory === null
                  ? 'bg-pink-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <span>All Categories</span>
              <span className="text-xs text-gray-500">
                {categories.reduce((sum, cat) => sum + (cat?.count || 0), 0)}
              </span>
            </button>
            
            {categories.filter(category => category && category.id).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug || null)}
                className={cn(
                  'flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  selectedCategory === category.slug
                    ? 'bg-pink-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span>{formatCategoryName(category.slug, category.name)}</span>
                <span className="text-xs text-gray-500">{category.count || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                placeholder="Min"
                className="w-full px-3 py-2 text-gray-600 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                placeholder="Max"
                className="w-full px-3 py-2 text-gray-600 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="text-xs text-gray-500">
              Range: ${priceRange[0]} - ${priceRange[1] || '∞'}
            </div>
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">In Stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">On Sale</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">New Arrivals</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
