"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';

interface ProductsSearchProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  searchQuery: string;
  sortBy: string;
  totalResults: number;
  className?: string;
}

const ProductsSearch: React.FC<ProductsSearchProps> = ({
  onSearch,
  onSort,
  searchQuery,
  sortBy,
  totalResults,
  className
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  }, [localQuery, onSearch]);

  const handleClearSearch = useCallback(() => {
    setLocalQuery('');
    onSearch('');
  }, [onSearch]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className={cn('bg-white border-b border-gray-200 py-6', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-10 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon name="close" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </form>

          {/* Results Count and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              {totalResults} {totalResults === 1 ? 'product' : 'products'} found
            </div>
            
            <div className="flex items-center gap-2 text-gray-700">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 min-w-16">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => onSort(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-lg"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSearch;
