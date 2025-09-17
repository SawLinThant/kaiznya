"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AboutLogoExplanationProps {
  className?: string;
}

const AboutLogoExplanation: React.FC<AboutLogoExplanationProps> = ({ className }) => {
  const sections = [
    {
      title: "🎶 The Flute: Harmony and Balance in Beauty",
      content: "The flute has always been a symbol of harmony, rhythm, and peace. Across cultures, it is an instrument that brings calm, joy, and balance. For us, the flute represents the idea that beauty should feel natural and effortless. Just like the soothing notes of a flute, skincare should blend seamlessly into daily life — simple, pure, and in harmony with your body. At Kanaiya, every product is carefully formulated to restore balance: balancing hydration, balancing nourishment, balancing confidence. When your skin feels balanced, you feel beautiful — naturally."
    },
    {
      title: "🪶 The Feathers: Lightness, Care, and Freedom",
      content: "Feathers symbolize gentleness, protection, and freedom. They remind us of softness, the light touch of care, and the liberation that comes when you feel confident in your own skin. Kanaiya's feathers embody our promise to provide skincare that is: Gentle on your skin → Nature-inspired, effective ingredients with no unnecessary harshness. Light in experience → Easy-to-use products that fit into your routine without stress. Freeing in spirit → Allowing you to embrace your authentic beauty without fear or self-doubt. When you use Kanaiya products, we want you to feel that same sense of lightness and freedom — beauty without burden."
    },
    {
      title: "🌍 The Flute & Feathers Together: A Unique Philosophy",
      content: "Individually, the flute and feathers are powerful. Together, they form the heart of Kanaiya's vision. The flute is harmony. The feathers are care. When joined, they represent beauty that is balanced, accessible, and gentle for everyone. This is why our tagline — \"The Signature of Beauty\" — connects so deeply with our logo. Kanaiya is not about chasing trends or exaggerating beauty standards. We stand for real beauty, inclusivity, and accessible luxury."
    },
    {
      title: "💎 Why Symbols Matter in Cosmetics",
      content: "In the cosmetics industry, logos often focus on glamour, shine, or status. But at Kanaiya, we wanted something different: a symbol that reflects our values and our customers' needs. Our logo is not just an image. It's a daily reminder of our mission: To create luxury-quality products that are still affordable. To bring confidence and joy to everyone, regardless of background. To deliver results that are real, not just promised. Every time you see the flute and feathers, we want you to remember that Kanaiya is built on trust, balance, and care."
    },
    {
      title: "✨ A Signature You Can Trust",
      content: "\"The Signature of Beauty\" is not just a tagline — it is a commitment. A signature is personal, unique, and unchanging. It represents authenticity. For us, it means: Every Kanaiya product carries our personal commitment to quality. Every formula is designed to be safe, effective, and honest. Every customer is part of our story — and we are proud to sign our name on it. Kanaiya is not simply selling cosmetics. We are building relationships based on confidence, accessibility, and trust."
    },
    {
      title: "💖 The Story Continues with You",
      content: "A brand symbol lives not just in design, but in the hearts of those who believe in it. Our flute and feathers come alive every time someone chooses Kanaiya, every time a customer feels more confident, and every time beauty becomes an experience of joy instead of stress. When you hold a Kanaiya product, you are not just holding skincare. You are holding a story — a story of balance, care, and beauty for everyone. Together, let's keep writing this story."
    }
  ];

  return (
    <section className={cn('py-0 sm:py-0 lg:py-0', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Main Title */}
        {/* <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            🌸 The Signature of Beauty: What Our Flute and Feathers Symbol Truly Mean
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Every brand carries a story, but only a few symbols truly capture the soul of a company. At Kanaiya Cosmetics, our logo — the delicate flute adorned with soft feathers — is more than a design. It is a philosophy, a promise, and a guiding light that reflects who we are and what we stand for.
          </p>
        </div> */}

        {/* Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        {/* <div className="text-center mt-12 sm:mt-16">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            🌸 Kanaiya — The Signature of Beauty.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default AboutLogoExplanation;
