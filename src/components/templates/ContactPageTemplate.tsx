import React from 'react';
import { Header } from '@/components';
import type { ContactData } from '@/lib/contactMockData';
import ContactInfo from '@/components/organisms/ContactInfo';
import ContactForm from '@/components/organisms/ContactForm';
import Reveal from '@/components/atoms/Reveal';
import ShopGrid from '@/components/organisms/ShopGrid';

interface ContactPageTemplateProps {
  dict: any;
  data: ContactData;
}

const ContactPageTemplate: React.FC<ContactPageTemplateProps> = ({ dict, data }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-8 pb-12">
      {/* <Header dict={dict} /> */}

      <div className="pt-6" />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="p-0 sm:p-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{data.hero.title}</h1>
            <p className="text-gray-700 text-base sm:text-lg">{data.hero.subtitle}</p>
          </div>
        </Reveal>
      </div>

      <ContactInfo data={data.info} />

      {/* <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div> */}

      <div className="h-[2px] bg-gray-100"></div>
      <div className='h-10'></div>

      <ShopGrid />
    </div>
  );
};

export default ContactPageTemplate;


