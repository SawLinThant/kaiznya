"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Icon } from '@/components';
import Reveal from '@/components/atoms/Reveal';

interface ProductDetailTabsProps {
  product: Product;
  dict?: any;
  className?: string;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({ 
  product, 
  dict, 
  className 
}) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'star' },
    { id: 'ingredients', label: 'Ingredients', icon: 'heart' },
    { id: 'how-to-use', label: 'How to Use', icon: 'send' },
    { id: 'reviews', label: 'Reviews', icon: 'star' },
  ];

  const ingredients = Array.isArray(product.ingredients) && product.ingredients.length > 0
    ? product.ingredients
    : [];

  const mockReviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'This product is amazing! My skin feels so much smoother and more hydrated. I\'ve been using it for 2 weeks and already see a difference.',
      verified: true
    },
    {
      id: 2,
      name: 'Emily Chen',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product overall. The texture is nice and it absorbs quickly. Only minor issue is the packaging could be better.',
      verified: true
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      rating: 5,
      date: '2024-01-08',
      comment: 'Love this serum! It has helped reduce my fine lines and my skin looks more radiant. Highly recommend!',
      verified: false
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="star" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Advanced anti-aging formula</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="star" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Dermatologist tested and approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="star" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Suitable for all skin types</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="star" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Cruelty-free and vegan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="star" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Made with natural and organic ingredients</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'ingredients':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
              <p className="text-gray-700 mb-6">
                Our formula contains carefully selected ingredients that work together to provide optimal skincare benefits.
              </p>
            </div>
            
            {ingredients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon name="star" className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Ingredients information will be available soon.</p>
            )}
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Important Note</h4>
              <p className="text-sm text-blue-800">
                Always patch test new products before full application. If you experience any irritation, discontinue use and consult a dermatologist.
              </p>
            </div>
          </div>
        );

      case 'how-to-use':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h3>
              <p className="text-gray-700 mb-6">
                Follow these simple steps to get the best results from your skincare routine.
              </p>
            </div>
            
            {Array.isArray(product.howToUse) && product.howToUse.length > 0 ? (
              <div className="space-y-6">
                {product.howToUse.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Usage instructions will be available soon.</p>
            )}
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-900 mb-2">Pro Tip</h4>
              <p className="text-sm text-yellow-800">
                Use this product twice daily for best results - once in the morning and once at night. Always follow with SPF during the day.
              </p>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      className="w-4 h-4 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 out of 5</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="star"
                              className={cn(
                                'w-4 h-4',
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Load More Reviews
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" delayMs={100}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200',
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600 bg-pink-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    <Icon name={tab.icon as any} className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {renderTabContent()}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductDetailTabs;
