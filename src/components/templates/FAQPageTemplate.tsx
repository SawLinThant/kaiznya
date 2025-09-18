import React from 'react';
import { Header } from '@/components';
import FAQSearch from '@/components/organisms/FAQSearch';
import type { FAQData } from '@/lib/faqMockData';
import Reveal from '@/components/atoms/Reveal';

interface FAQPageTemplateProps {
  dict: any;
  data: FAQData;
}

const FAQPageTemplate: React.FC<FAQPageTemplateProps> = ({ dict, data }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-6 pb-12">
      {/* <Header dict={dict} /> */}

      <div className="pt-6" />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="rounded-2xl bg-white border border-gray-100 p-8 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{data.hero.title}</h1>
            <p className="text-gray-700 text-base sm:text-lg">{data.hero.subtitle}</p>
          </div>
        </Reveal>
      </div>

      <FAQSearch categories={data.categories} />
    </div>
  );
};

export default FAQPageTemplate;


