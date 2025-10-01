import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getBlogPosts } from '@/lib/mockData';

interface BlogOverviewSectionProps {
  dict?: any;
  locale?: string;
  className?: string;
}

const BlogOverviewSection: React.FC<BlogOverviewSectionProps> = ({ dict, locale = 'en', className }) => {
  const posts = getBlogPosts();
  const featured = posts[0] || {
    title: 'How to combine your daily outfit to looks fresh and cool.',
    description:
      "Maybe you don't need to buy new clothes to have nice, cool, fresh looking outfit everyday. Maybe what you need is to combine your clothes collections. Mix and match is the key.",
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
  } as any;

  return (
    <section className={cn('py-10 sm:py-12 lg:py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-800 text-2xl font-medium">
            {dict?.home?.sections?.from_the_blog || 'From The Blog'}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Image */}
          <div className="lg:col-span-6">
            <Link href={`/${locale}/blog/${featured.slug || 'complete-guide-korean-skincare-routine'}`}>
              <div className="relative rounded-[22px] overflow-hidden bg-gray-100 cursor-pointer group h-[260px] sm:h-[320px] lg:h-[360px]">
                <Image
                  src={featured.image || '/vercel.svg'}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </Link>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6">
            <Link href={`/${locale}/blog/${featured.slug || 'complete-guide-korean-skincare-routine'}`}>
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 leading-tight mb-4 hover:text-gray-700 transition-colors cursor-pointer">
                {featured.title || 'How to combine your daily outfit to looks fresh and cool.'}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mb-6">
              {featured.description}
            </p>
            <Link
              href={`/${locale}/blog/${featured.slug || 'complete-guide-korean-skincare-routine'}`}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              {dict?.actions?.read_more || 'READ MORE'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogOverviewSection;
