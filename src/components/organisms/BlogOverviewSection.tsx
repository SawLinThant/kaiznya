import React from 'react';
import { cn } from '@/lib/utils';
import { getBlogPosts } from '@/lib/mockData';
import { Button } from '@/components';

interface BlogOverviewSectionProps {
  dict?: any;
  className?: string;
}

const BlogOverviewSection: React.FC<BlogOverviewSectionProps> = ({ dict, className }) => {
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
            <div className="relative rounded-[22px] overflow-hidden bg-gray-100">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 leading-tight mb-4">
              {featured.title || 'How to combine your daily outfit to looks fresh and cool.'}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mb-6">
              {featured.description}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-6"
            >
              {dict?.actions?.read_more || 'READ MORE'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogOverviewSection;
