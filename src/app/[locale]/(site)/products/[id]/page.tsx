import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { getTrendingProductsData } from '@/lib/productMockData';
import { getProducts } from '@/lib/server-cdn';
import ProductDetailPageTemplate from '@/components/templates/ProductDetailPageTemplate';
import { Product, ProductCategory } from '@/types/product';

interface ProductDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

// Transform CDN Product to local Product interface
const transformCDNProduct = (cdnProduct: any): Product => {
  const categoryMap: Record<number, ProductCategory> = {
    1: 'face-serum',
    2: 'face-wash',
    3: 'cream-powder',
    4: 'hair-treatment',
    5: 'liquid-foundation',
    6: 'lotion',
    7: 'shower-gel',
  };

  return {
    id: String(cdnProduct.id),
    name: cdnProduct.title || cdnProduct.name || '',
    price: Number(cdnProduct.price) || 0,
    originalPrice: undefined,
    image: cdnProduct.images?.[0]?.imageSrc || cdnProduct.images?.[0]?.url || '',
    category: categoryMap[Number(cdnProduct.category_id)] || 'face-serum',
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
    images: Array.isArray(cdnProduct.images) ? cdnProduct.images : undefined,
    keyBenefits: Array.isArray(cdnProduct.keyBenefits) ? cdnProduct.keyBenefits : undefined,
    keyFeatures: Array.isArray(cdnProduct.keyFeatures) ? cdnProduct.keyFeatures : undefined,
    ingredients: Array.isArray(cdnProduct.ingredients) ? cdnProduct.ingredients : undefined,
    howToUse: Array.isArray(cdnProduct.howToUse) ? cdnProduct.howToUse : undefined,
    shipping: cdnProduct.shipping ? {
      freeShipping: Boolean(cdnProduct.shipping.freeShipping),
      moneyBackGuarantee: Boolean(cdnProduct.shipping.moneyBackGuarantee),
      crueltyFree: Boolean(cdnProduct.shipping.crueltyFree),
    } : undefined,
  };
};

// Load CDN products then find by id (fallback to mock if needed)
const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const cdnProducts = await getProducts();
    if (Array.isArray(cdnProducts) && cdnProducts.length > 0) {
      const found = cdnProducts.find(p => String(p.id) === String(id));
      if (found) {
        return transformCDNProduct(found);
      }
    }

    // Fallback to mock data
    const mockData = getTrendingProductsData();
    const products = mockData.products || [];
    const fallback = products.find(p => p.id === id);
    if (!fallback) return null;
    return {
      id: fallback.id,
      name: fallback.name,
      price: fallback.price,
      originalPrice: fallback.originalPrice,
      image: fallback.image,
      category: fallback.category,
      isLiked: false,
      brand: fallback.brand,
      colors: fallback.colors || [],
      sizes: fallback.sizes || [],
      rating: fallback.rating,
      reviewCount: fallback.reviewCount,
      description: fallback.description,
      tags: fallback.tags || [],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { locale, id } = params;
  const dict = await getDictionary(locale);
  
  const product = await getProductById(id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Kanaiya Cosmetics',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.name} - Kanaiya Cosmetics`;
  const description = product.description || `Discover ${product.name}, a premium skincare product from Kanaiya Cosmetics. Shop now for the best skincare routine.`;
  const keywords = `${product.name}, skincare, ${product.category}, beauty products, Kanaiya Cosmetics`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
      url: `/${locale}/products/${id}`,
      siteName: 'Kanaiya Cosmetics',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `/${locale}/products/${id}`,
      languages: {
        'en': `/en/products/${id}`,
        'th': `/th/products/${id}`,
        'my': `/my/products/${id}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  // Prefer CDN products, fallback to mock
  let products: Array<{ id: string | number }>; 
  try {
    const cdnProducts = await getProducts();
    products = Array.isArray(cdnProducts) && cdnProducts.length > 0
      ? cdnProducts
      : (getTrendingProductsData().products || []);
  } catch {
    products = getTrendingProductsData().products || [];
  }

  const params: Array<{ locale: string; id: string }> = [];
  const locales = ['en', 'th', 'my'];

  for (const locale of locales) {
    for (const product of products) {
      params.push({
        locale,
        id: String(product.id),
      });
    }
  }

  return params;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, id } = params;
  const dict = await getDictionary(locale);
  
  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Kanaiya Cosmetics'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kanaiya Cosmetics'
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0
    } : undefined,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `/${locale}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `/${locale}/products`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name,
          item: `/${locale}/products/${id}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailPageTemplate 
        product={product} 
        dict={dict} 
        locale={locale} 
      />
    </>
  );
}
