"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface BlogDetailContentProps {
  content: string;
  className?: string;
}

const BlogDetailContent: React.FC<BlogDetailContentProps> = ({ content, className }) => {
  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default BlogDetailContent;
