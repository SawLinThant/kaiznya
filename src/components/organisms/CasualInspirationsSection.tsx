import React from 'react';
import { Button } from '@/components';
import { cn } from '@/lib/utils';

interface CasualInspirationsProps {
  dict?: any;
  className?: string;
}

const CasualInspirationsSection: React.FC<CasualInspirationsProps> = ({ dict, className }) => {
  return (
    <section className={cn("py-8 sm:py-12 lg:py-16", className)}>
      <div className="max-w-7xl mx-auto py-4 px-4 lg:px-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Casual<br />
                Inspirations
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Our favorite combinations for casual<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>outfit that can inspire you to apply on<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>your daily activity.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
              >
                BROWSE INSPIRATIONS
              </Button>
            </div>
          </div>
          
          {/* Right Content - Image Grid */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Say it with Shirt Card */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200">
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    {/* Placeholder for two models */}
                    <div className="flex space-x-2 sm:space-x-4">
                      <div className="w-12 h-16 sm:w-16 sm:h-20 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                      <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        Say it<br />
                        with Shirt
                      </h3>
                    </div>
                    <button className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Funky never get old Card */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    {/* Placeholder for model */}
                    <div className="w-16 h-20 sm:w-20 sm:h-24 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        Funky never<br />
                        get old
                      </h3>
                    </div>
                    <button className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasualInspirationsSection;
