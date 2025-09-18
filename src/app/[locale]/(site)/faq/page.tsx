import { Metadata } from 'next';
import FAQPageTemplate from '@/components/templates/FAQPageTemplate';
import { getFAQData } from '@/lib/faqMockData';
import { getDictionary } from '@/lib/dictionaries';

interface FAQPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  const data = getFAQData();
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { languages: { en: `/${params.locale}/faq` } },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      type: 'website',
      url: `/${params.locale}/faq`,
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const dict = await getDictionary(params.locale);
  const data = getFAQData();
  return <FAQPageTemplate dict={dict} data={data} />;
}


