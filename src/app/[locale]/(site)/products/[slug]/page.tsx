import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getProducts, getCategories } from '@/lib/server-cdn';
import { ProductTransformer, SEOTransformer } from '@/lib/data-transformers';
import { ProductDetail } from '@/components/organisms/ProductDetail';
import { RelatedProducts } from '@/components/organisms/RelatedProducts';
import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const meta = SEOTransformer.generateProductMeta(product);
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Fetch product data
  const product = await getProduct(slug);
  
  if (!product) {
    notFound();
  }

  // Fetch related data in parallel
  const [relatedProducts, categories] = await Promise.all([
    getProducts({ category: product.category.slug }),
    getCategories(),
  ]);

  // Transform data
  const transformedProduct = ProductTransformer.transformForDisplay(product);
  const transformedRelated = ProductTransformer.transformForList(
    relatedProducts.filter(p => p.id !== product.id).slice(0, 4)
  );

  // Generate breadcrumbs
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.category.name, url: `/products?category=${product.category.slug}` },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        {/* Product Detail */}
        <ProductDetail 
          product={transformedProduct}
          categories={categories}
        />

        {/* Related Products */}
        {transformedRelated.length > 0 && (
          <div className="mt-16">
            <RelatedProducts 
              products={transformedRelated}
              title="You might also like"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for popular products
export async function generateStaticParams() {
  const products = await getProducts();
  
  // Generate static params for first 50 products
  return products.slice(0, 50).map((product) => ({
    slug: product.slug,
  }));
}
