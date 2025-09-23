import type { Metadata } from 'next';
import SpecialEventPageTemplate from '@/components/templates/SpecialEventPageTemplate';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/constants';

interface SpecialEventPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: SpecialEventPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: 'Special Events & Workshops - Kanaiya',
    description: 'Join our exclusive skincare events, masterclasses, and workshops. Learn from experts, discover new products, and connect with fellow beauty enthusiasts.',
    keywords: ['skincare events', 'beauty workshops', 'dermatology masterclass', 'Kanaiya events', 'beauty education', 'skincare training'],
    authors: [{ name: 'Kanaiya' }],
    openGraph: {
      title: 'Special Events & Workshops - Kanaiya',
      description: 'Join our exclusive skincare events, masterclasses, and workshops. Learn from experts, discover new products, and connect with fellow beauty enthusiasts.',
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? 'my' : 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Special Events & Workshops - Kanaiya',
      description: 'Join our exclusive skincare events, masterclasses, and workshops. Learn from experts, discover new products, and connect with fellow beauty enthusiasts.',
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

export default async function SpecialEventPage({ params }: SpecialEventPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <SpecialEventPageTemplate dict={dict} locale={locale} />;
}
