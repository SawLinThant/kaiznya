"use client";

import React, { useCallback, useMemo } from 'react';
import { Product } from '@/types/product';
import { getTrendingProductsData } from '@/lib/productMockData';
import ProductDetailHero from '@/components/organisms/ProductDetailHero';
import ProductDetailTabs from '@/components/organisms/ProductDetailTabs';
import ProductDetailRelated from '@/components/organisms/ProductDetailRelated';
import Reveal from '@/components/atoms/Reveal';

interface ProductDetailPageTemplateProps {
  product: Product;
  dict: any;
  locale?: string;
}

const ProductDetailPageTemplate: React.FC<ProductDetailPageTemplateProps> = ({ 
  product, 
  dict, 
  locale = 'en' 
}) => {
  // Get related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    const mockData = getTrendingProductsData();
    const allProducts = mockData.products || [];
    
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4); // Show 4 related products
  }, [product.id, product.category]);

  const handleProductClick = useCallback((clickedProduct: Product) => {
    // Navigate to product detail page
    console.log('Navigate to product:', clickedProduct.id);
    // router.push(`/${locale}/products/${clickedProduct.id}`);
  }, [locale]);

  const handleRelatedProductClick = useCallback((clickedProduct: Product) => {
    // Navigate to related product detail page
    console.log('Navigate to related product:', clickedProduct.id);
    // router.push(`/${locale}/products/${clickedProduct.id}`);
  }, [locale]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <Reveal direction="down" delayMs={50}>
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <a href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <a href={`/${locale}/products`} className="text-gray-500 hover:text-gray-700">
                Products
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </Reveal>

      {/* Product Hero Section */}
      <ProductDetailHero 
        product={product} 
        dict={dict} 
      />

      {/* Separator */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Product Details Tabs */}
      <ProductDetailTabs 
        product={product} 
        dict={dict} 
      />

      {/* Separator */}
      <div className="h-[2px] bg-gray-100"></div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductDetailRelated
          products={relatedProducts}
          onProductClick={handleRelatedProductClick}
          dict={dict}
        />
      )}

      {/* Trust Signals Section */}
      <Reveal direction="up" delayMs={200}>
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dermatologist Tested</h3>
                <p className="text-gray-600">All our products are tested by dermatologists to ensure safety and effectiveness.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cruelty-Free</h3>
                <p className="text-gray-600">We never test on animals and are committed to ethical beauty practices.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
                <p className="text-gray-600">Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Newsletter Signup */}
      <Reveal direction="up" delayMs={300}>
        <section className="py-16 bg-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Latest Products
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get exclusive offers, skincare tips, and early access to new products delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <button className="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default ProductDetailPageTemplate;
