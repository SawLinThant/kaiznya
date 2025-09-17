"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AboutHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  className?: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ title, subtitle, backgroundImage, className }) => {
  return (
    <section className={cn('relative overflow-hidden lg:p-0 md:p-2 p-4 pb-8 sm:pb-10 lg:pb-12', className)}>
      <div
        className="relative h-[420px] sm:h-[520px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, borderRadius: '2rem' }}
      >
        <div className="absolute inset-0" />
        <div className="relative z-10 h-full flex items-center p-8">
          <div className="max-w-7xl mx-auto w-full p-4 md:px-0">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Our Story */}
      <div className="max-w-7xl mx-auto w-full mt-6 sm:mt-8 px-4 md:px-0">
        <div className="p-0 lg:p-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              At Kanaiya Cosmetics, beauty is more than skin deep — it is confidence, care, and the freedom to feel your best every day. Our brand was founded on a simple belief: luxury-quality skincare should be accessible to everyone, not just a privilege for a few.
            </p>
            <p>
              Inspired by nature’s purity and the elegance of timeless beauty, Kanaiya creates cosmetics that combine effective, natural ingredients with thoughtful craftsmanship. From revitalizing face serums to refreshing washes and nourishing body care, each product is designed to deliver visible results without compromise.
            </p>
            <p>
              Our logo — the flute and feathers — carries our philosophy: the flute symbolizes harmony and balance, while the feathers represent lightness, care, and the gentle touch we bring to your skin. Together, they reflect our promise to let your skin breathe and your natural beauty shine.
            </p>
            <p>
              Kanaiya is more than a cosmetics brand; it is a community built on trust, inclusivity, and quality. With us, beauty is not about status or price — it’s about embracing who you are, feeling radiant, and making luxury an everyday experience.
            </p>
            <p className="font-semibold text-gray-900">Kanaiya — The Signature of Beauty.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;


