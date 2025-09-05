import { Metadata } from 'next';
import { getProducts, getCategories, getSEOData } from '@/lib/server-cdn';
import { ProductTransformer, CategoryTransformer } from '@/lib/data-transformers';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { CategoryFilter } from '@/components/organisms/CategoryFilter';
import { SearchBar } from '@/components/organisms/SearchBar';
import { Pagination } from '@/components/organisms/Pagination';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    category?: string; 
    search?: string; 
    page?: string; 
    sort?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const seoData = await getSEOData('products', params);
  
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: seoData.openGraph,
      twitter: seoData.twitter,
    };
  }

  return {
    title: 'Products - Ecommerce Store',
    description: 'Browse our wide selection of products',
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const pageSize = 12;

  // Fetch data in parallel for better performance
  const [products, categories, seoData] = await Promise.all([
    getProducts({
      category: params.category,
      // Add search and other filters here
      // search: params.search,
      // minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
      // maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
    }),
    getCategories(),
    getSEOData('products', params),
  ]);

  // Transform data for display
  const transformedProducts = ProductTransformer.transformForList(products);
  const navigationCategories = CategoryTransformer.transformForNavigation(categories);
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = transformedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {params.category ? `${params.category} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {products.length} products found
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <SearchBar 
            defaultValue={params.search || ''}
            placeholder="Search products..."
          />
          
          <CategoryFilter 
            categories={navigationCategories}
            selectedCategory={params.category}
          />
        </div>

        {/* Products Grid */}
        <ProductGrid 
          products={paginatedProducts}
          isLoading={false}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/products"
              searchParams={params}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for category pages
export async function generateStaticParams() {
  const categories = await getCategories();
  
  return categories.map((category) => ({
    category: category.slug,
  }));
}
