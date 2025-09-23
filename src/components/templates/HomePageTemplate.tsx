
import React from 'react';
import { Header, HeroBanner, CasualInspirationsSection, TrendingProductsSection, ReviewSection, ExploreColorSection, AboutServiceSection, BlogOverviewSection } from '@/components';

interface HomePageTemplateProps {
  dict: any;
  locale?: string;
}

const HomePageTemplate: React.FC<HomePageTemplateProps> = ({ dict, locale = 'en' }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header dict={dict} locale={locale} />
      
      {/* To Do - add product brand video here */}

      {/* Hero Banner Section */}
      <HeroBanner dict={dict} />
      {/* TO Do - use one rpoduct form each category for featured product in Hero section */}
      {/* Casual Inspirations Section */}
      <CasualInspirationsSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Trending Products Section */}
      <TrendingProductsSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Review Section */}
      <ReviewSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Explore Color Section */}
      <ExploreColorSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* About Service Section */}
      <AboutServiceSection dict={dict} />
  
      {/* Blog overview */}
      <BlogOverviewSection dict={dict} locale={locale} />
    </div>
  );
};

export default HomePageTemplate; 