"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  dict?: any;
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ dict, className }) => {
  // Slider data
  const slides = [
    {
      id: 1,
      title: "Color of\nSummer\nOutfit",
      description: "100+ Collections for your outfit\ninspiration in this summer",
      buttonText: "VIEW COLLECTIONS",
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundColor: "#9CA986"
    },
    {
      id: 2,
      title: "Urban\nStyle\nCollection",
      description: "Discover modern streetwear\nfor the contemporary fashion lover",
      buttonText: "EXPLORE URBAN",
      backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundColor: "#6B73FF"
    },
    {
      id: 3,
      title: "Winter\nWarmth\nEssentials",
      description: "Cozy and stylish pieces\nto keep you warm this season",
      buttonText: "SHOP WINTER",
      backgroundImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundColor: "#FF6B6B"
    }
  ];

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto pt-4 pb-[0.5rem] px-4 lg:px-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-2 min-h-[550px] sm:min-h-[500px]">
          
          {/* Left Content - Banner Slider */}
          <div 
            className="lg:col-span-9 relative order-1 lg:order-1 min-h-[600px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slider Container */}
            <div className="relative h-full min-h-[350px] sm:min-h-[400px] overflow-hidden" style={{ borderRadius: '2rem' }}>
              
              {/* Slides */}
              <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div 
                      className="relative h-full w-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url("${slide.backgroundImage}")`,
                        backgroundColor: slide.backgroundColor // Fallback color
                      }}
                    >
                      {/* Overlay for better text readability */}
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex items-center">
                        <div className="px-6 sm:px-8 lg:px-12 max-w-full sm:max-w-md absolute top-8">
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                            {slide.title.split('\n').map((line, lineIndex) => (
                              <React.Fragment key={lineIndex}>
                                {line}
                                {lineIndex < slide.title.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </h1>
                          <p className="text-white/90 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                            {slide.description.split('\n').map((line, lineIndex) => (
                              <React.Fragment key={lineIndex}>
                                {line}
                                {lineIndex < slide.description.split('\n').length - 1 && <br className="hidden sm:block" />}
                                {lineIndex < slide.description.split('\n').length - 1 && <span className="sm:hidden"> </span>}
                              </React.Fragment>
                            ))}
                          </p>
                          <Button 
                            variant="primary" 
                            size="lg"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-2 sm:px-8 py-3 sm:py-3 font-medium text-sm sm:text-base"
                            style={{ borderRadius: '0.75rem' }}
                          >
                            {slide.buttonText}
                          </Button>
                        </div>
                        
                        {/* Decorative white line */}
                        <div className="absolute right-0 top-0 h-full w-2/5 sm:w-1/2 lg:w-3/5">
                          <div className="relative h-full">
                            <div 
                              className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -rotate-12 w-12 sm:w-16 lg:w-24 h-0.5 sm:h-1 bg-white/60"
                              style={{ transformOrigin: 'center' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Content - Category Cards */}
          {/* replace with face serum image as feature image */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-2 order-2 lg:order-2">
            
            {/* Outdoor Active Card */}
            <div 
              className="relative h-[320px] sm:h-[350px] overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{
                borderRadius: '2rem',
                backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
                backgroundColor: '#E5F3FF' // Fallback color
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Outdoor<br />Active
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Casual Comfort Card */}
            <div 
              className="relative h-[320px] sm:h-[350px] overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{
                borderRadius: '2rem',
                backgroundImage: 'url("https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
                backgroundColor: '#FFF5F5' // Fallback color
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Casual<br />Comfort
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
