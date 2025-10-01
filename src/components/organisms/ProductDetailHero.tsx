"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Icon } from '@/components';
import Reveal from '@/components/atoms/Reveal';

interface ProductDetailHeroProps {
  product: Product;
  dict?: any;
  className?: string;
}

const ProductDetailHero: React.FC<ProductDetailHeroProps> = ({ 
  product, 
  dict, 
  className 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatCategoryName = (category: string): string => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Prefer CDN images array if provided, fallback to single image
  const productImages = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images.map(img => img.imageSrc || img.url || product.image)
    : [product.image];

  return (
    <section className={cn('py-8 sm:py-12 lg:py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <Reveal direction="left" delayMs={100}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
                  aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Icon 
                    name="heart" 
                    className={cn(
                      'w-5 h-5 transition-colors duration-200',
                      isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                    )} 
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                    {formatCategoryName(product.category)}
                  </span>
                </div>

                {/* Sale Badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Sale
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200',
                      selectedImage === index
                        ? 'border-pink-500 ring-2 ring-pink-200'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Product Info */}
          <Reveal direction="right" delayMs={200}>
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        className={cn(
                          'w-5 h-5',
                          i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm font-medium text-red-600">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Key Benefits (fallback to sensible defaults if missing) */}
              {(Array.isArray(product.keyBenefits) ? product.keyBenefits.length > 0 : false) ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Key Benefits</h3>
                  <ul className="space-y-2">
                    {(product.keyBenefits || []).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Icon name="star" className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Key Benefits</h3>
                  <ul className="space-y-2">
                    {["Gentle on all skin types", "Dermatologist tested", "Cruelty-free formula", "Made with natural ingredients"].map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Icon name="star" className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-pink-500 hover:text-pink-600 transition-colors duration-200"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-pink-500 transition-colors duration-200"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                {/* <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-3 py-2 hover:bg-gray-50">-</button>
                    <span className="px-4 py-2 border-x border-gray-300">1</span>
                    <button className="px-3 py-2 hover:bg-gray-50">+</button>
                  </div>
                  <span className="text-sm text-gray-600">In Stock</span>
                </div> */}

                <div className="flex gap-4">
                  <button className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200">
                    Buy Now
                  </button>
                  {/* <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Icon name="heart" className="w-5 h-5" />
                  </button> */}
                </div>

                {/* Delivery Information */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <Icon name="send" className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <Icon name="star" className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700">30-day Money-back</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <Icon name="heart" className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700">Cruelty-free & Vegan</span>
                  </div>
                </div> */}
              </div>

              {/* Shipping Info */}
              {(product.shipping?.freeShipping || product.shipping?.moneyBackGuarantee || product.shipping?.crueltyFree) && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {product.shipping?.freeShipping && (
                    <div className="flex items-center gap-2">
                      <Icon name="send" className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                    </div>
                  )}
                  {product.shipping?.moneyBackGuarantee && (
                    <div className="flex items-center gap-2">
                      <Icon name="star" className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">30-day money-back guarantee</span>
                    </div>
                  )}
                  {product.shipping?.crueltyFree && (
                    <div className="flex items-center gap-2">
                      <Icon name="heart" className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Cruelty-free & vegan</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailHero;
