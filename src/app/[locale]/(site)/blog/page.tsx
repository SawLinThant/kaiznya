import { Metadata } from 'next';
import BlogPageTemplate from '@/components/templates/BlogPageTemplate';
import { getBlogData } from '@/lib/blogMockData';
import { getDictionary } from '@/lib/dictionaries';

interface BlogPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const data = getBlogData(dict);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords.join(', '),
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url: `/${locale}/blog`,
      type: 'website',
      images: [
        {
          url: data.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: data.hero.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo.title,
      description: data.seo.description,
      images: [data.hero.backgroundImage],
    },
    alternates: {
      canonical: `/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const data = getBlogData(dict);

  return <BlogPageTemplate data={data} dict={dict} locale={locale} />;
}
