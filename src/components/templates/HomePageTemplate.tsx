
import React from 'react';
import { Header, HeroBanner, CasualInspirationsSection, TrendingProductsSection, ExploreColorSection, AboutServiceSection, BlogOverviewSection } from '@/components';

interface HomePageTemplateProps {
  dict: any;
}

const HomePageTemplate: React.FC<HomePageTemplateProps> = ({ dict }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header dict={dict} />
      
      {/* Hero Banner Section */}
      <HeroBanner dict={dict} />
      
      {/* Casual Inspirations Section */}
      <CasualInspirationsSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Trending Products Section */}
      <TrendingProductsSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Explore Color Section */}
      <ExploreColorSection dict={dict} />

      {/* separater */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* About Service Section */}
      <AboutServiceSection dict={dict} />
  
      {/* Blog overview */}
      <BlogOverviewSection dict={dict} />
    </div>
  );
};

export default HomePageTemplate; 