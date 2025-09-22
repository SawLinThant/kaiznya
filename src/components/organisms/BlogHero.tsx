"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface BlogHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  className?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  className 
}) => {
  return (
    <section className={cn('relative py-16 sm:py-20 lg:py-24', className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
