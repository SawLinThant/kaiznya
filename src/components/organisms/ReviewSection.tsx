"use client";

import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface ReviewSectionProps {
  dict?: any;
  className?: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  verified?: boolean;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

// Memoized ReviewCard component for optimal performance
const ReviewCard: React.FC<ReviewCardProps> = React.memo(({ review, index }) => {
  // Generate star rating display
  const renderStars = useCallback(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={cn(
          "text-lg transition-colors duration-200",
          i < review.rating ? "text-yellow-400" : "text-gray-300"
        )}
      >
        ★
      </span>
    ));
  }, [review.rating]);

  return (
    <div 
      className="group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        <div className="flex items-center gap-1">
          {renderStars()}
        </div>
        <span className="text-sm text-gray-500 ml-2">
          {review.rating}/5
        </span>
      </div>

      {/* Review Content */}
      <blockquote className="flex-grow mb-6">
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg italic">
          "{review.content}"
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {/* Author Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {review.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {review.author}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {review.date}
            </p>
          </div>
        </div>
        
        {/* Verified Badge */}
        {review.verified && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <span>✓</span>
            <span>Verified</span>
          </div>
        )}
      </div>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  dict, 
  className 
}) => {
  const [showAll, setShowAll] = useState(false);

  // Memoized reviews data - in production, this would come from API/dict
  const reviews: Review[] = useMemo(() => [
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'The Vitamin C serum has completely transformed my skin! My complexion is brighter and more even-toned after just 3 weeks of use. The texture is lightweight and absorbs quickly.',
      rating: 5,
      date: '2 days ago',
      verified: true
    },
    {
      id: '2',
      author: 'Maria Rodriguez',
      content: 'I\'ve tried many skincare brands, but Kanaiya\'s gentle cleanser is truly exceptional. It removes all makeup without stripping my sensitive skin. Highly recommend!',
      rating: 5,
      date: '1 week ago',
      verified: true
    },
    {
      id: '3',
      author: 'Emma Thompson',
      content: 'The hydrating gel-cream is perfect for my combination skin. It provides just the right amount of moisture without feeling heavy. My skin feels soft and supple all day.',
      rating: 4,
      date: '2 weeks ago',
      verified: true
    },
    {
      id: '4',
      author: 'Lisa Wang',
      content: 'Finally found a sunscreen that doesn\'t break me out! The SPF 50+ Daily Shield is lightweight and leaves no white cast. Perfect for daily wear.',
      rating: 5,
      date: '3 weeks ago',
      verified: true
    },
    {
      id: '5',
      author: 'Jennifer Lee',
      content: 'The retinol treatment is gentle yet effective. I noticed a reduction in fine lines after 4 weeks. The packaging keeps the product fresh and potent.',
      rating: 4,
      date: '1 month ago',
      verified: true
    },
    {
      id: '6',
      author: 'Amanda Foster',
      content: 'Love the natural ingredients and how my skin feels after using these products. The entire routine has become my favorite part of the day.',
      rating: 5,
      date: '1 month ago',
      verified: true
    }
  ], []);

  // Memoized displayed reviews
  const displayedReviews = useMemo(() => {
    return showAll ? reviews : reviews.slice(0, 3);
  }, [reviews, showAll]);

  // Toggle show all reviews
  const handleToggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  // Calculate average rating
  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <section className={cn("py-8 sm:py-12 lg:py-16 bg-gray-50", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Average Rating Display */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xl",
                      i < Math.floor(Number(averageRating)) ? "text-yellow-400" : "text-gray-300"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {averageRating}
              </span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">
              Based on {reviews.length} reviews
            </span>
          </div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover why thousands of customers trust Kanaiya for their skincare journey
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {displayedReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={index}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 3 && (
          <div className="text-center">
            <button
              onClick={handleToggleShowAll}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95"
            >
              <span>
                {showAll ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
              </span>
              <span className={cn(
                "transition-transform duration-300",
                showAll ? "rotate-180" : "rotate-0"
              )}>
                ↓
              </span>
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                10K+
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Happy Customers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                98%
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Would Recommend
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                4.8★
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Average Rating
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                24/7
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
