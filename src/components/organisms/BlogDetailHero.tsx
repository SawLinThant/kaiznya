"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';
import type { BlogDetailData } from '@/lib/blogDetailMockData';

interface BlogDetailHeroProps {
  article: BlogDetailData['article'];
  className?: string;
}

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ article, className }) => {
  return (
    <section className={cn('relative py-16 sm:py-20 lg:py-24', className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${article.featuredImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Badge */}
        <div className="mb-6">
          <span 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-full"
            style={{ backgroundColor: article.category.color + 'CC' }}
          >
            {article.category.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-8">
          {article.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-300">
          {/* Author */}
          <div className="flex items-center">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-white">{article.author.name}</p>
              <p className="text-sm text-gray-300">Author</p>
            </div>
          </div>

          {/* Published Date */}
          <div className="flex items-center">
            <Icon name="star" className="w-4 h-4 mr-2" />
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {/* Read Time */}
          <div className="flex items-center">
            <Icon name="heart" className="w-4 h-4 mr-2" />
            <span>{article.readTime} min read</span>
          </div>

          {/* Views */}
          <div className="flex items-center">
            <Icon name="star" className="w-4 h-4 mr-2" />
            <span>{article.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-8 flex items-center space-x-4">
          <span className="text-gray-300 text-sm">Share:</span>
          <div className="flex space-x-3">
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Icon name="facebook" className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Icon name="twitter" className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Icon name="instagram" className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Icon name="linkedin" className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHero;
