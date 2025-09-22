import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailPageTemplate from '@/components/templates/BlogDetailPageTemplate';
import { getBlogDetailData } from '@/lib/blogDetailMockData';
import { getDictionary } from '@/lib/dictionaries';

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const data = getBlogDetailData(slug, dict);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords.join(', '),
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url: `/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: data.article.publishedAt,
      authors: [data.article.author.name],
      images: [
        {
          url: data.article.featuredImage,
          width: 1200,
          height: 630,
          alt: data.article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo.title,
      description: data.seo.description,
      images: [data.article.featuredImage],
      creator: `@${data.article.author.social.twitter?.replace('@', '') || 'kanaiya'}`,
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
    other: {
      'article:author': data.article.author.name,
      'article:published_time': data.article.publishedAt,
      'article:section': data.article.category.name,
      'article:tag': data.article.tags.join(','),
    },
  };
}

export async function generateStaticParams() {
  // In a real app, you would fetch this from your CMS or API
  const slugs = [
    'complete-guide-korean-skincare-routine',
    'kanaiya-face-serum-deep-dive-review',
    '2024-beauty-trends-whats-in-whats-out',
    'understanding-hyaluronic-acid-hydration-hero',
    'morning-vs-evening-skincare-difference',
    'science-behind-vitamin-c-skincare',
    'sustainable-beauty-eco-friendly-routine',
    'kanaiya-cream-powder-first-impressions'
  ];

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  
  try {
    const data = getBlogDetailData(slug, dict);
    return <BlogDetailPageTemplate data={data} dict={dict} />;
  } catch (error) {
    notFound();
  }
}
