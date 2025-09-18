"use client";

import React from 'react';
import type { FAQCategoryData } from '@/lib/faqMockData';
import FAQCategory from '@/components/molecules/FAQCategory';
import Reveal from '@/components/atoms/Reveal';

interface FAQSearchProps {
  categories: FAQCategoryData[];
}

export default function FAQSearch({ categories }: FAQSearchProps) {
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, query]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal direction="up">
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions (e.g., shipping, sensitive skin, returns)"
              className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 p-2"
              aria-label="Search FAQs"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-8 space-y-10 sm:space-y-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-600">No results. Try a different search term.</p>
        ) : (
          filtered.map((cat, idx) => (
            <Reveal key={cat.id} direction="up" delayMs={idx * 60}>
              <FAQCategory category={cat} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}


