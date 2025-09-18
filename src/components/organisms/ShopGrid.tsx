import React from 'react';
import { getShopsMock } from '@/lib/shopMockData';
import Reveal from '@/components/atoms/Reveal';

export default function ShopGrid() {
  const shops = React.useMemo(() => getShopsMock().slice(0, 6), []);
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Our Shops</h2>
        <p className="text-gray-600">Find us at select locations across the region.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((s, idx) => (
          <Reveal key={s.id} direction="up" delayMs={idx * 60}>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* 1:2 ratio square-ish card: use padding trick to reserve height */}
              <div className="relative w-full" style={{ paddingTop: '50%' }}>
                <img
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-gray-700 text-sm mb-1">{s.location}</p>
                <p className="text-gray-700 text-sm mb-1">{s.phone}</p>
                <p className="text-gray-600 text-sm">{s.hours}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}


