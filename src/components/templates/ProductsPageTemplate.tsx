"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { Product as CDNProduct, ProductCategory as CDNProductCategory } from '@/types/cdn';
import { useProducts, useCategories } from '@/hooks/useCDNData';
import { getTrendingProductsData } from '@/lib/productMockData';
import ProductsHero from '@/components/organisms/ProductsHero';
import ProductsSearch from '@/components/organisms/ProductsSearch';
import ProductsFilters from '@/components/organisms/ProductsFilters';
import ProductsGrid from '@/components/organisms/ProductsGrid';
import ProductsPagination from '@/components/organisms/ProductsPagination';
import Reveal from '@/components/atoms/Reveal';

interface ProductsPageTemplateProps {
  dict: any;
  locale?: string;
}

// Transform CDN Product to local Product interface
const transformCDNProduct = (cdnProduct: any): Product => {
  // Known category slugs from the app
  const knownCategorySlugs: ProductCategory[] = [
    'face-serum',
    'face-wash',
    'cream-powder',
    'hair-treatment',
    'liquid-foundation',
    'lotion',
    'shower-gel',
    'face-care',
    'body-care',
    'hair-care',
  ];

  const normalizeSlug = (value?: string): string => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    const noLeadingSlash = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
    return noLeadingSlash.toLowerCase();
  };

  // Prefer endpoint/shop_endpoint if they directly reference a known category
  const endpointSlug = normalizeSlug(cdnProduct.endpoint);
  const shopEndpointSlug = normalizeSlug(cdnProduct.shop_endpoint);

  let mappedCategory: ProductCategory | undefined;
  if (knownCategorySlugs.includes(endpointSlug as ProductCategory)) {
    mappedCategory = endpointSlug as ProductCategory;
  } else if (knownCategorySlugs.includes(shopEndpointSlug as ProductCategory)) {
    mappedCategory = shopEndpointSlug as ProductCategory;
  }

  // Fallback mapping by category_id when endpoints are product-level slugs
  if (!mappedCategory) {
    const categoryIdMap: Record<number, ProductCategory> = {
      1: 'face-serum',
      2: 'face-wash',
      3: 'lotion',
      4: 'shower-gel',
      6: 'lotion',
      7: 'shower-gel',
    };
    const cid = Number(cdnProduct.category_id);
    mappedCategory = categoryIdMap[cid] || 'face-serum';
  }

  // Image mapping from CDN structure
  const firstImage = Array.isArray(cdnProduct.images) ? cdnProduct.images[0] : undefined;
  const imageUrl = firstImage?.imageSrc || firstImage?.url || '';

  return {
    id: String(cdnProduct.id),
    name: cdnProduct.title || cdnProduct.name || '',
    price: Number(cdnProduct.price) || 0,
    originalPrice: Number(cdnProduct.originalPrice) || undefined,
    image: imageUrl,
    category: mappedCategory,
    isLiked: false,
    brand: cdnProduct.brand,
    colors: Array.isArray(cdnProduct.variants)
      ? cdnProduct.variants.filter((v: any) => v.type === 'color').map((v: any) => v.value)
      : [],
    sizes: Array.isArray(cdnProduct.variants)
      ? cdnProduct.variants.filter((v: any) => v.type === 'size').map((v: any) => v.value)
      : [],
    rating: cdnProduct.rating,
    reviewCount: cdnProduct.reviewCount,
    description: cdnProduct.description || cdnProduct.short_description || '',
    tags: Array.isArray(cdnProduct.tags) ? cdnProduct.tags : [],
  };
};

// Transform CDN ProductCategory to local category format
const transformCDNCategory = (cdnCategory: any) => {
  const normalizeSlug = (value?: string): string => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    const noLeadingSlash = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
    return noLeadingSlash.toLowerCase();
  };

  // Handle different possible field names
  const id = cdnCategory.id || cdnCategory.category_id || 'unknown';
  const name = cdnCategory.title || cdnCategory.name || 'Unknown Category';
  // Prefer endpoint as canonical slug; fallback to provided slug or normalized title
  const endpointSlug = normalizeSlug(cdnCategory.endpoint);
  const providedSlug = normalizeSlug(cdnCategory.slug);
  const titleSlug = normalizeSlug(cdnCategory.title)?.replace(/\s+/g, '-');
  const slug = endpointSlug || providedSlug || titleSlug || 'unknown-category';

  return {
    id: String(id),
    name: String(name),
    slug: String(slug),
    count: 0,
  };
};

const ProductsPageTemplate: React.FC<ProductsPageTemplateProps> = ({ 
  dict, 
  locale = 'en' 
}) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // CDN data fetching
  const { data: cdnProducts, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: cdnCategories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // Fallback to mock data if CDN fails
  const mockData = getTrendingProductsData();
  const mockProducts = mockData.products || [];
  const mockCategories = [
    { id: '1', name: 'Face Serum', slug: 'face-serum', count: 0 },
    { id: '2', name: 'Face Wash', slug: 'face-wash', count: 0 },
    { id: '3', name: 'Cream Powder', slug: 'cream-powder', count: 0 },
    { id: '4', name: 'Hair Treatment', slug: 'hair-treatment', count: 0 },
    { id: '5', name: 'Liquid Foundation', slug: 'liquid-foundation', count: 0 },
    { id: '6', name: 'Lotion', slug: 'lotion', count: 0 },
    { id: '7', name: 'Shower Gel', slug: 'shower-gel', count: 0 },
  ];

  // Transform and process products - use CDN data with fallback to mock data
  const allProducts = useMemo(() => {
    // Use CDN data if available, otherwise fallback to mock data
    if (cdnProducts && Array.isArray(cdnProducts)) {
      return cdnProducts.map(transformCDNProduct);
    }
    
    // Fallback to mock data if CDN data is not available
    return Array.isArray(mockProducts) ? mockProducts : [];
  }, [cdnProducts, mockProducts]);

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    // console.log('CDN Products:', cdnProducts);
    // console.log('CDN Products type:', typeof cdnProducts, 'isArray:', Array.isArray(cdnProducts));
    // console.log('CDN Categories:', cdnCategories);
    // console.log('CDN Categories type:', typeof cdnCategories, 'isArray:', Array.isArray(cdnCategories));
    
    // Check if CDN data might be wrapped in a response object
    if (cdnCategories && typeof cdnCategories === 'object' && 'data' in cdnCategories) {
      console.log('CDN Categories appears to be wrapped in response object:', cdnCategories);
    }
  }
 

  // Process categories with counts
  const categoriesWithCounts = useMemo(() => {
    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      // console.log('Processing categories...');
      // console.log('cdnCategories type:', typeof cdnCategories);
      // console.log('cdnCategories isArray:', Array.isArray(cdnCategories));
      // console.log('cdnCategories length:', cdnCategories?.length);
    }
    
    // Extract categories from CDN data (handle both wrapped and unwrapped responses)
    let rawCategories: any = cdnCategories;
    if (cdnCategories && typeof cdnCategories === 'object' && 'data' in cdnCategories) {
      if (process.env.NODE_ENV === 'development') {
        console.log('CDN Categories is wrapped, extracting data:', cdnCategories.data);
      }
      rawCategories = (cdnCategories as any).data;
    }
    
    // Use CDN categories if available, otherwise fallback to mock categories
    let baseCategories;
    if (rawCategories && Array.isArray(rawCategories)) {
      if (process.env.NODE_ENV === 'development') {
       // console.log('Raw CDN categories:', rawCategories);
       // console.log('First category structure:', rawCategories[0]);
      }
      
      // More lenient filtering - just check if it's an object
      const validCategories = rawCategories.filter((cat: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Checking category:', cat, 'is object:', typeof cat === 'object', 'has id:', !!cat?.id, 'has name:', !!cat?.name, 'has title:', !!(cat as any)?.title);
        }
        return cat && typeof cat === 'object' && (cat.id || (cat as any).title);
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Valid categories after filter:', validCategories);
      }
      
      baseCategories = validCategories.map(transformCDNCategory);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Transformed categories:', baseCategories);
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        //console.log('Using mock categories - rawCategories:', rawCategories);
      }
      baseCategories = mockCategories;
    }

    if (!Array.isArray(allProducts)) {
      return baseCategories.map(cat => ({
        ...cat,
        count: 0
      }));
    }

    // Calculate product counts for each category
    const categoryCounts = allProducts.reduce((acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return baseCategories.map(cat => ({
      ...cat,
      count: categoryCounts[cat.slug] || 0
    }));
  }, [cdnCategories, allProducts]);
console.log("cdnCategories", cdnCategories);
  console.log('Categories With Counts:', categoriesWithCounts);

  if (process.env.NODE_ENV === 'development') {
    //console.log('Categories With Counts:', categoriesWithCounts);
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) {
      return [];
    }
    
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'oldest':
          return parseInt(a.id) - parseInt(b.id);
        case 'newest':
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);


  // Event handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setCurrentPage(1);
  }, []);

  const handleLikeToggle = useCallback((productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    // Navigate to product detail page
    // router.push(`/${locale}/products/${product.id}`);
  }, [locale]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const isLoadingData = productsLoading || categoriesLoading;
  const hasError = productsError || categoriesError;
  const hasData = cdnProducts || cdnCategories;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <ProductsHero 
        dict={dict} 
        totalProducts={allProducts.length}
      />

      {/* Search Bar */}
      {isClient && (
        <ProductsSearch
          onSearch={handleSearch}
          onSort={handleSort}
          searchQuery={searchQuery}
          sortBy={sortBy}
          totalResults={filteredProducts.length}
        />
      )}

      {/* Loading State */}
      {(!isClient || isLoadingData) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-80 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {isClient && hasError && !isLoadingData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-yellow-800">
              <h3 className="font-medium mb-2">Unable to load latest data</h3>
              <p className="text-sm">Showing cached data. Please refresh the page to try again.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isClient && !isLoadingData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <ProductsFilters
                categories={categoriesWithCounts}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
            <ProductsGrid
              products={paginatedProducts}
              likedProducts={likedProducts}
              onLikeToggle={handleLikeToggle}
              onProductClick={handleProductClick}
              locale={locale}
              isLoading={isLoadingData}
            />

              {/* Pagination */}
              {filteredProducts.length > itemsPerPage && (
                <Reveal direction="up" delayMs={200}>
                  <div className="mt-12">
                    <ProductsPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={filteredProducts.length}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPageTemplate;
