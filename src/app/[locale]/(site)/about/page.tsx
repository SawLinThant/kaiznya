import type { Metadata } from 'next';
import AboutPageTemplate from '@/components/templates/AboutPageTemplate';
import { getAboutData } from '@/lib/aboutMockData';
import { getDictionary } from '@/lib/dictionaries';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = getAboutData(dict);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.image],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = getAboutData(dict);
  return <AboutPageTemplate data={data} dict={dict} />;
}


