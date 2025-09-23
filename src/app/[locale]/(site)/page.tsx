import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/constants';
import { Metadata } from 'next';
import { HomePageTemplate } from '@/components';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: 'Kanaiya - Find Your Perfect Skincare Products',
    description: 'Discover premium skincare products with Kanaiya. Professional skincare solutions for healthy, radiant skin.',
    keywords: 'skincare, beauty, cosmetics, face care, skin health, premium skincare, Kanaiya',
    authors: [{ name: 'Kanaiya' }],
    openGraph: {
      title: 'Kanaiya - Find Your Perfect Skincare Products',
      description: 'Discover premium skincare products with Kanaiya. Professional skincare solutions for healthy, radiant skin.',
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? 'my' : 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kanaiya - Find Your Perfect Skincare Products',
      description: 'Discover premium skincare products with Kanaiya. Professional skincare solutions for healthy, radiant skin.',
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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return HomePageTemplate({ dict, locale });
}



