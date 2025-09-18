export interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface ContactData {
  hero: {
    title: string;
    subtitle: string;
  };
  info: {
    email: ContactInfoItem;
    phone: ContactInfoItem;
    address: ContactInfoItem;
    hours: ContactInfoItem;
    socials: ContactInfoItem[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export function getContactData(): ContactData {
  return {
    hero: {
      title: 'Contact Us',
      subtitle: 'We are here to help. Reach out for support, orders, or skincare advice.',
    },
    info: {
      email: { label: 'Email', value: 'support@kanaiya.shop', href: 'mailto:support@kanaiya.shop' },
      phone: { label: 'Phone', value: '+66 2 123 4567', href: 'tel:+6621234567' },
      address: {
        label: 'HQ Address',
        value: '85 Moo. 13, Petchkasem 74130, Bangkok, Thailand',
      },
      hours: { label: 'Hours', value: 'Mon–Fri: 9:00–18:00 (GMT+7)' },
      socials: [
        { label: 'Facebook', value: 'facebook.com/kanaiya', href: 'https://facebook.com' },
        { label: 'Instagram', value: '@kanaiya', href: 'https://instagram.com' },
        { label: 'TikTok', value: '@kanaiya', href: 'https://tiktok.com' },
      ],
    },
    seo: {
      title: 'Contact Us — Kanaiya Cosmetics',
      description:
        'Get in touch with Kanaiya Cosmetics for support, order inquiries, wholesale, and skincare guidance.',
      keywords: ['kanaiya', 'contact', 'support', 'customer service', 'skincare'],
    },
  };
}


