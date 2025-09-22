"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  onSearch,
  placeholder = "Search articles...",
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Debounced search - search as user types
    if (value.length === 0 || value.length >= 3) {
      onSearch(value);
    }
  };

  return (
    <section className={cn('py-6 sm:py-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon
                name="search"
                className="h-5 w-5 text-gray-400"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <Icon
                  name="close"
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                />
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogSearch;
