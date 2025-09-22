"use client";

import React, { useState, useMemo } from 'react';
import { Header, Icon } from '@/components';
import type { BlogData } from '@/lib/blogMockData';
import BlogHero from '@/components/organisms/BlogHero';
import BlogSearch from '@/components/organisms/BlogSearch';
import BlogCategories from '@/components/organisms/BlogCategories';
import BlogFeatured from '@/components/organisms/BlogFeatured';
import BlogGrid from '@/components/organisms/BlogGrid';
import Reveal from '@/components/atoms/Reveal';

interface BlogPageTemplateProps {
  dict: any;
  data: BlogData;
  locale?: string;
}

const BlogPageTemplate: React.FC<BlogPageTemplateProps> = ({ dict, data, locale = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let articles = data.recentArticles;

    // Filter by category
    if (selectedCategory) {
      articles = articles.filter(article => article.category.id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query)
      );
    }

    return articles;
  }, [data.recentArticles, selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      {/* <Header dict={dict} /> */}
      
      {/* Hero Section */}
      <Reveal direction="up">
        <BlogHero
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          backgroundImage={data.hero.backgroundImage}
        />
      </Reveal>

      {/* Search Section */}
      <Reveal direction="up" delayMs={100}>
        <BlogSearch onSearch={handleSearch} />
      </Reveal>

      {/* Categories Section */}
      <Reveal direction="up" delayMs={150}>
        <BlogCategories
          categories={data.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </Reveal>

      {/* Separator */}
      {/* <div className="h-[2px] bg-gray-100"></div> */}

      {/* Featured Articles Section */}
      <Reveal direction="up" delayMs={200}>
        <BlogFeatured articles={data.featuredArticles} locale={locale} />
      </Reveal>

      {/* Separator */}
      {/* <div className="h-[2px] bg-gray-100"></div> */}

      {/* All Articles Section */}
      <Reveal direction="up" delayMs={250}>
        <div className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {selectedCategory ? 
                  `Articles in ${data.categories.find(c => c.id === selectedCategory)?.name}` :
                  'All Articles'
                }
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {searchQuery ? 
                  `Search results for "${searchQuery}"` :
                  'Discover our latest beauty and skincare insights'
                }
              </p>
            </div>
          </div>
          
          <BlogGrid articles={filteredArticles} locale={locale} />
        </div>
      </Reveal>

      {/* Popular Articles Section */}
      {data.popularArticles.length > 0 && (
        <Reveal direction="up" delayMs={300}>
          <div className="py-8 sm:py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Popular Articles
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Most read and loved articles from our community
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.popularArticles.map((article, index) => (
                  <Reveal key={article.id} direction="up" delayMs={index * 100}>
                    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-40">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 text-xs font-medium text-white bg-black/50 rounded-full">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{article.readTime} min read</span>
                        <div className="flex items-center">
                          <Icon name="star" className="w-3 h-3 mr-1" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default BlogPageTemplate;
