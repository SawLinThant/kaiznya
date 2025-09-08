import React from 'react';
import { Button } from '@/components';
import { cn } from '@/lib/utils';

interface CasualInspirationsProps {
  dict?: any;
  className?: string;
}

const CasualInspirationsSection: React.FC<CasualInspirationsProps> = ({ dict, className }) => {
  return (
    <section className={cn("pb-8 sm:pb-10 lg:pb-10", className)}>
      <div className="max-w-7xl mx-auto pb-4 px-4 lg:px-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div>
              {/* To Do - replac */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                NATURAL<br />
                BEAUTY
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Our premium skincare products<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>for healthy, glowing skin that<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>inspires confidence every day.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
              >
                SHOP SKINCARE
              </Button>
            </div>
          </div>
          
          {/* Right Content - Image Grid */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
              
              {/* Face Serum Card */}
              <div 
                className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden bg-cover bg-center"
                style={{
                 // backgroundImage: 'url(https://images.unsplash.com/photo-1520975930151-35ddd1a1ab64?q=80&w=1200&auto=format&fit=crop)',
                 backgroundImage: 'url("https://cdn.kanaiya.shop/pics/faceserum/Serums.jpg")', 
                 backgroundColor: '#FEEBC8'
                }}
              >
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between bg-black/0">
                  <div className="flex-1" />
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        Face
                        Serum
                      </h3>
                    </div>
                    <button className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors -rotate-45">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Hair Treatment Card */}
              <div 
                className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden bg-cover bg-center"
                style={{
                 // backgroundImage: 'url(https://images.unsplash.com/photo-1508909493957-8701da3c31c5?q=80&w=1200&auto=format&fit=crop)',
                  backgroundImage: 'url("https://cdn.kanaiya.shop/pics/ShowerGel/HairTreatment/HairTreatment.png")',  
                 backgroundColor: '#1F2937'
                }}
              >
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between bg-black/20">
                  <div className="flex-1" />
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        Hair
                        Treatment
                      </h3>
                    </div>
                    <button className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors -rotate-45">
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
