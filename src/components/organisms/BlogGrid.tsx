"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/lib/blogMockData';
import Reveal from '@/components/atoms/Reveal';
import { Icon } from '@/components';

interface BlogGridProps {
  articles: BlogArticle[];
  isLoading?: boolean;
  locale?: string;
  className?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({ 
  articles, 
  isLoading = false, 
  locale = 'en',
  className 
}) => {
  if (isLoading) {
    return (
      <section className={cn('py-8 sm:py-12', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className={cn('py-8 sm:py-12', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="search" className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} direction="up" delayMs={index * 100}>
              <Link href={`/${locale}/blog/${article.slug}`}>
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 text-xs font-medium text-white rounded-full"
                      style={{ backgroundColor: article.category.color + 'CC' }}
                    >
                      {article.category.name}
                    </span>
                  </div>
                  {article.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{article.author.name}</span>
                      </div>
                      <span>{article.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Icon name="star" className="w-4 h-4 mr-1" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="heart" className="w-4 h-4 mr-1" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Published Date */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <time className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
