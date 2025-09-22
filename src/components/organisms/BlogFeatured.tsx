"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/lib/blogMockData';
import Reveal from '@/components/atoms/Reveal';
import { Icon } from '@/components';

interface BlogFeaturedProps {
  articles: BlogArticle[];
  locale?: string;
  className?: string;
}

const BlogFeatured: React.FC<BlogFeaturedProps> = ({ articles, locale = 'en', className }) => {
  if (articles.length === 0) return null;

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular and trending articles handpicked by our beauty experts
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} direction="up" delayMs={index * 150}>
              <Link href={`/${locale}/blog/${article.slug}`}>
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="md:flex">
                  {/* Featured Image */}
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
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
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-gray-700 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {article.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {article.readTime} min read
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
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

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <button className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors">
                      Read More
                      <Icon name="send" className="w-4 h-4 ml-2" />
                    </button>
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

export default BlogFeatured;
