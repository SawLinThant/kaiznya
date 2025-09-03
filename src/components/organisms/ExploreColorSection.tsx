"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ColorTag } from '@/types/color';
import { getExploreColorData } from '@/lib/colorMockData';

interface ExploreColorSectionProps {
  dict?: any;
  className?: string;
}

interface ColorTagComponentProps {
  color: ColorTag;
  isSelected: boolean;
  onClick: (colorId: string) => void;
}

// Memoized ColorTag component for better performance
const ColorTagComponent: React.FC<ColorTagComponentProps> = React.memo(({ 
  color, 
  isSelected, 
  onClick 
}) => {
  const handleClick = useCallback(() => {
    onClick(color.id);
  }, [color.id, onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
        "hover:scale-105 active:scale-95 border bg-white text-gray-900",
        color.borderColor || "border-gray-300",
        isSelected && "ring-2 ring-gray-400 ring-offset-2"
      )}
      aria-pressed={isSelected}
    >
      {/* Color Circle Dot */}
      <div 
        className={cn("w-5 h-5 sm:w-6 sm:h-6 rounded-full", color.bgColor)}
        style={color.id === 'clean-white' ? { backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' } : {}}
      />
      {/* Color Name */}
      <span>{color.name}</span>
    </button>
  );
});

ColorTagComponent.displayName = 'ColorTagComponent';

const ExploreColorSection: React.FC<ExploreColorSectionProps> = ({ 
  dict, 
  className 
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('red-pastel');
  
  const exploreData = getExploreColorData(dict);

  const handleColorSelect = useCallback((colorId: string) => {
    setSelectedColor(colorId);
  }, []);

  return (
    <section className={cn("py-8 sm:py-10 lg:py-10", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        
        {/* Header Section with Title and Color Tags in Row */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
            {/* Title */}
            <div className="flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {exploreData.title}
              </h2>
            </div>

            {/* Color Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-2">
              {exploreData.colors.map((color) => (
                <ColorTagComponent
                  key={color.id}
                  color={color}
                  isSelected={selectedColor === color.id}
                  onClick={handleColorSelect}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Banner - Background Image */}
        <div 
          className="relative rounded-3xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${exploreData.testimonial.image})` }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative grid grid-cols-1 min-h-[400px] sm:min-h-[450px]">
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-2xl">
                {/* What people said label */}
                <p className="text-gray-200 text-sm sm:text-base mb-4">
                  What people said
                </p>
                
                {/* Main Quote */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {exploreData.testimonial.quote}
                </h3>
                
                {/* Description */}
                <p className="text-gray-100/90 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  {exploreData.testimonial.description}
                </p>
                
                {/* Author Info */}
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">
                    {exploreData.testimonial.author}
                  </h4>
                  <p className="text-gray-200 text-sm sm:text-base">
                    {exploreData.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreColorSection;
