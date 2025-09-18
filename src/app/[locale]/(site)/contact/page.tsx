import { Metadata } from 'next';
import ContactPageTemplate from '@/components/templates/ContactPageTemplate';
import { getContactData } from '@/lib/contactMockData';
import { getDictionary } from '@/lib/dictionaries';

interface ContactPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const data = getContactData();
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      type: 'website',
      url: `/${params.locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const dict = await getDictionary(params.locale);
  const data = getContactData();
  return <ContactPageTemplate dict={dict} data={data} />;
}


