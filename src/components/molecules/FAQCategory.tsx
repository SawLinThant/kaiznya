"use client";

import React from 'react';
import FAQItem from '@/components/atoms/FAQItem';
import type { FAQCategoryData } from '@/lib/faqMockData';
import Reveal from '@/components/atoms/Reveal';

interface FAQCategoryProps {
  category: FAQCategoryData;
}

export default function FAQCategory({ category }: FAQCategoryProps) {
  return (
    <section className="max-w-5xl mx-auto w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{category.title}</h2>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        {category.items.map((item, idx) => (
          <Reveal key={idx} direction="up" delayMs={idx * 40}>
            <FAQItem question={item.question} answer={item.answer} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}


