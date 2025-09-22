"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';
import type { BlogDetailData } from '@/lib/blogDetailMockData';

interface BlogDetailAuthorProps {
  author: BlogDetailData['article']['author'];
  className?: string;
}

const BlogDetailAuthor: React.FC<BlogDetailAuthorProps> = ({ author, className }) => {
  return (
    <section className={cn('py-8 sm:py-12 bg-gray-50', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                About {author.name}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {author.bio}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {author.social.twitter && (
                  <a
                    href={`https://twitter.com/${author.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Icon name="twitter" className="w-5 h-5 text-gray-600" />
                  </a>
                )}
                {author.social.instagram && (
                  <a
                    href={`https://instagram.com/${author.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Icon name="instagram" className="w-5 h-5 text-gray-600" />
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${author.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Icon name="linkedin" className="w-5 h-5 text-gray-600" />
                  </a>
                )}
              </div>
            </div>

            {/* Follow Button */}
            <div className="flex-shrink-0">
              <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailAuthor;
