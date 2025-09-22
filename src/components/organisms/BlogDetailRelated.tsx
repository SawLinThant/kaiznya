"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';
import type { BlogDetailData } from '@/lib/blogDetailMockData';
import Reveal from '@/components/atoms/Reveal';

interface BlogDetailRelatedProps {
  articles: BlogDetailData['relatedArticles'];
  className?: string;
}

const BlogDetailRelated: React.FC<BlogDetailRelatedProps> = ({ articles, className }) => {
  if (articles.length === 0) return null;

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continue your beauty journey with these recommended reads
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} direction="up" delayMs={index * 100}>
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <img
                        src="https://cdn.kanaiya.shop/pics/banner/banner2.jpg"
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Icon name="star" className="w-4 h-4 mr-1" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <span>{article.readTime} min read</span>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailRelated;
