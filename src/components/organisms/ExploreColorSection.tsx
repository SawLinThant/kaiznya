"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getExploreColorData } from '@/lib/colorMockData';

interface ExploreColorSectionProps {
  dict?: any;
  className?: string;
}

interface SlideItem {
  id: string;
  title: string;
  description: string;
  image: string;
  label: string; // tag label for this slide (skincare naming)
}

interface SlideTagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

// Memoized Tag (acts as pagination) for better performance
const SlideTag: React.FC<SlideTagProps> = React.memo(({ label, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
        "hover:scale-105 active:scale-95 border bg-white text-gray-900",
        "border-gray-300",
        isSelected && "ring-2 ring-gray-400 ring-offset-2"
      )}
      aria-pressed={isSelected}
    >
      <span>{label}</span>
    </button>
  );
});
SlideTag.displayName = 'SlideTag';

const ExploreColorSection: React.FC<ExploreColorSectionProps> = ({ 
  dict, 
  className 
}) => {
  // Section header title from existing mock provider
  const exploreData = getExploreColorData(dict);

  // Mock slides (each slide has a tag label) - replace with CDN later
  const slides: SlideItem[] = useMemo(() => ([
    {
      id: 'sl-1',
      title: 'Gentle Daily Cleanser',
      description: 'Sulfate-free face wash that purifies without stripping moisture.',
      image: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      label: 'Cleanser',
    },
    {
      id: 'sl-2',
      title: 'Vitamin C + B5 Brightening',
      description: 'Boost radiance and even tone with stabilized Vitamin C.',
      image: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
      label: 'Serum',
    },
    {
      id: 'sl-3',
      title: 'Hydra Balance Gel-Cream',
      description: 'Lightweight daily hydrator that locks in moisture all day.',
      image: 'https://cdn.kanaiya.shop/pics/C_P/1.png',
      label: 'Moisturizer',
    },
    {
      id: 'sl-4',
      title: 'SPF 50+ Daily Shield',
      description: 'Broad-spectrum UV protection with a weightless finish.',
      image: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
      label: 'Sunscreen',
    },
    {
      id: 'sl-5',
      title: 'Retinol + Hyaluron Age-Refining',
      description: 'Reduce fine lines while hydrating for a youthful glow.',
      image: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      label: 'Treatment',
    },
  ]), []);

  // Slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const goToNext = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlideIndex(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlideIndex(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const id = setInterval(goToNext, 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying, goToNext, slides.length]);

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

            {/* Tag buttons as pagination controls (1-to-1 with slides) */}
            <div className="flex flex-wrap gap-2 sm:gap-2">
              {slides.map((s, idx) => (
                <SlideTag
                  key={s.id}
                  label={s.label}
                  isSelected={currentSlideIndex === idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slider Banner */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <Image
            src={activeSlide?.image || '/vercel.svg'}
            alt={activeSlide?.title || 'banner'}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative grid grid-cols-1 min-h-[400px] sm:min-h-[450px]">
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-2xl">
                <p className="text-gray-200 text-sm sm:text-base mb-4">{activeSlide?.label}</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {activeSlide?.title}
                </h3>
                <p className="text-gray-100/90 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  {activeSlide?.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={goToPrev}
                    className="px-4 py-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors"
                    aria-label="Previous slide"
                  >
                    Prev
                  </button>
                  <button
                    onClick={goToNext}
                    className="px-4 py-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors"
                    aria-label="Next slide"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    idx === currentSlideIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreColorSection;
