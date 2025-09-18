import React from 'react';
import type { ContactData } from '@/lib/contactMockData';
import Reveal from '@/components/atoms/Reveal';

interface ContactInfoProps {
  data: ContactData['info'];
}

export default function ContactInfo({ data }: ContactInfoProps) {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal direction="up">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
            <div className="space-y-2 text-gray-700">
              <a href={data.email.href} className="block hover:underline">{data.email.value}</a>
              <a href={data.phone.href} className="block hover:underline">{data.phone.value}</a>
            </div>
          </div>
        </Reveal>
        <Reveal direction="up" delayMs={80}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">HQ Address</h3>
            <p className="text-gray-700">{data.address.value}</p>
            <p className="text-gray-700 mt-2">{data.hours.label}: {data.hours.value}</p>
          </div>
        </Reveal>
        <Reveal direction="up" delayMs={120}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
            <ul className="space-y-2 text-gray-700">
              {data.socials.map((s, i) => (
                <li key={i}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {s.label}: {s.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}


