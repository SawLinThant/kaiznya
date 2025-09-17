"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import type { AboutStat } from '@/lib/aboutMockData';

interface AboutStatsProps {
  stats: AboutStat[];
  className?: string;
}

const AboutStats: React.FC<AboutStatsProps> = ({ stats, className }) => {
  return (
    <section className={cn('pb-8 sm:pb-10 lg:pb-12', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-black/50 rounded-2xl p-6 border border-gray-100 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-white mt-1 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;


