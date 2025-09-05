"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { ServiceFeature } from '@/types/service';
import { getAboutServiceData } from '@/lib/serviceMockData';

interface AboutServiceSectionProps {
  dict?: any;
  className?: string;
}

interface ServiceFeatureCardProps {
  feature: ServiceFeature;
}

// Service Feature Card Component
const ServiceFeatureCard: React.FC<ServiceFeatureCardProps> = React.memo(({ feature }) => {
  // Icon mapping
  const renderIcon = (iconType: string) => {
    const iconClasses = "w-8 h-8 text-white";
    
    switch (iconType) {
      case 'heart':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'phone':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'refresh':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-start text-left">
      {/* Icon Circle */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        {renderIcon(feature.icon)}
      </div>
      
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
});

ServiceFeatureCard.displayName = 'ServiceFeatureCard';

const AboutServiceSection: React.FC<AboutServiceSectionProps> = ({ 
  dict, 
  className 
}) => {
  const serviceData = getAboutServiceData(dict);

  return (
    <section className={cn("pt-10 pb-2 sm:pt-10 lg:pt-10", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        
        {/* Section Title */}
        <div className="text-left mb-12 sm:mb-16 lg:mb-20 lg:w-[30%] md:w-[50%] w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 max-w-3xl leading-tight">
            {serviceData.title}
          </h2>
        </div>

        {/* Service Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {serviceData.features.map((feature) => (
            <ServiceFeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutServiceSection;
