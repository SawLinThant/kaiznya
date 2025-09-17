"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AboutMissionVisionProps {
  mission: string;
  vision: string;
  values: string[];
  className?: string;
}

const AboutMissionVision: React.FC<AboutMissionVisionProps> = ({ mission, vision, values, className }) => {
  return (
    <section className={cn('pb-8 sm:pb-10 lg:pb-12', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">{mission}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">{vision}</p>
            </div>
          </div>
          <div className="space-y-4 h-full">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {values.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;


