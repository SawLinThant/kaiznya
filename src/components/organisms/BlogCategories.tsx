"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/lib/blogMockData';

interface BlogCategoriesProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  className?: string;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className
}) => {
  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find articles that match your interests and skincare needs
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {/* All Categories Button */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-200",
              selectedCategory === null
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            )}
          >
            All Articles
          </button>
          
          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              )}
              style={{
                backgroundColor: selectedCategory === category.id ? undefined : category.color + '20',
                borderColor: selectedCategory === category.id ? undefined : category.color + '40'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;
