"use client";

import React from 'react';
import { Header } from '@/components';
import type { BlogDetailData } from '@/lib/blogDetailMockData';
import BlogDetailHero from '@/components/organisms/BlogDetailHero';
import BlogDetailContent from '@/components/organisms/BlogDetailContent';
import BlogDetailAuthor from '@/components/organisms/BlogDetailAuthor';
import BlogDetailRelated from '@/components/organisms/BlogDetailRelated';
import BlogDetailComments from '@/components/organisms/BlogDetailComments';
import Reveal from '@/components/atoms/Reveal';

interface BlogDetailPageTemplateProps {
  dict: any;
  data: BlogDetailData;
}

const BlogDetailPageTemplate: React.FC<BlogDetailPageTemplateProps> = ({ dict, data }) => {
  return (
    <div className="min-h-screen bg-white py-12">
      {/* <Header dict={dict} /> */}
      
      {/* Hero Section */}
      <Reveal direction="up">
        <BlogDetailHero article={data.article} />
      </Reveal>

      {/* Separator */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Article Content */}
      <Reveal direction="up" delayMs={100}>
        <BlogDetailContent content={data.article.content} />
      </Reveal>

      {/* Separator */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Author Section */}
      <Reveal direction="up" delayMs={150}>
        <BlogDetailAuthor author={data.article.author} />
      </Reveal>

      {/* Separator */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Related Articles */}
      <Reveal direction="up" delayMs={200}>
        <BlogDetailRelated articles={data.relatedArticles} />
      </Reveal>

      {/* Separator */}
      {/* <div className="h-[2px] bg-gray-100"></div> */}

      {/* Comments Section */}
      {/* <Reveal direction="up" delayMs={250}>
        <BlogDetailComments comments={data.comments} />
      </Reveal> */}
    </div>
  );
};

export default BlogDetailPageTemplate;
