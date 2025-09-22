import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import ProductsPageTemplate from '@/components/templates/ProductsPageTemplate';

interface ProductsPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = params;
  const dict = await getDictionary(locale);

  const title = dict?.products?.meta?.title || 'Our Products - Kanaiya Cosmetics';
  const description = dict?.products?.meta?.description || 'Discover our complete collection of premium skincare products. Face serums, face wash, lotions, and more. Shop now for the best skincare routine.';
  const keywords = dict?.products?.meta?.keywords || 'skincare products, face serum, face wash, lotion, cosmetics, beauty products, skincare routine';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
      url: `/${locale}/products`,
      siteName: 'Kanaiya Cosmetics',
      images: [
        {
          url: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
          width: 1200,
          height: 630,
          alt: 'Kanaiya Cosmetics Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cdn.kanaiya.shop/pics/banner/banner1.jpg'],
    },
    alternates: {
      canonical: `/${locale}/products`,
      languages: {
        'en': '/en/products',
        'th': '/th/products',
        'my': '/my/products',
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

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kanaiya Cosmetics Products',
    description: 'Complete collection of premium skincare products',
    url: `/${locale}/products`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Skincare Products',
      description: 'Premium skincare products for all skin types',
      numberOfItems: 50, // This would be dynamic in a real app
      itemListElement: [
        {
          '@type': 'Product',
          name: 'Face Serum',
          description: 'Anti-aging face serum with natural ingredients',
          category: 'Skincare',
          brand: {
            '@type': 'Brand',
            name: 'Kanaiya Cosmetics'
          }
        },
        {
          '@type': 'Product',
          name: 'Face Wash',
          description: 'Gentle face wash for daily cleansing',
          category: 'Skincare',
          brand: {
            '@type': 'Brand',
            name: 'Kanaiya Cosmetics'
          }
        }
      ]
    },
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
      <ProductsPageTemplate dict={dict} locale={locale} />
    </>
  );
}
