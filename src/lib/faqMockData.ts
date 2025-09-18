export interface FAQItemData {
  question: string;
  answer: string;
}

export interface FAQCategoryData {
  id: string;
  title: string;
  items: FAQItemData[];
}

export interface FAQData {
  hero: {
    title: string;
    subtitle: string;
  };
  categories: FAQCategoryData[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export function getFAQData(): FAQData {
  return {
    hero: {
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers about shipping, returns, skincare routines, and product ingredients.',
    },
    categories: [
      {
        id: 'shipping-returns',
        title: 'Shipping & Returns',
        items: [
          {
            question: 'How long does shipping take?',
            answer:
              'Orders typically ship within 1-2 business days. Delivery takes 3-7 business days depending on your region. You will receive tracking via email.',
          },
          {
            question: 'What is your return policy?',
            answer:
              'Unused and unopened items can be returned within 14 days for a full refund. For opened skincare items, please contact support for assistance.',
          },
        ],
      },
      {
        id: 'products-ingredients',
        title: 'Products & Ingredients',
        items: [
          {
            question: 'Are your products suitable for sensitive skin?',
            answer:
              'Yes. We formulate with gentle, dermatologically-considered ingredients. Always patch-test first and review the full ingredient list provided on each product.',
          },
          {
            question: 'Do you use parabens or sulfates?',
            answer:
              'Our formulations prioritize safety and efficacy. Many products are paraben- and sulfate-free. Check each product page for a full ingredient breakdown.',
          },
        ],
      },
      {
        id: 'orders-payments',
        title: 'Orders & Payments',
        items: [
          {
            question: 'Which payment methods are accepted?',
            answer:
              'We accept major credit cards and local payment methods depending on your region. All transactions are encrypted and secure.',
          },
          {
            question: 'Can I modify or cancel my order?',
            answer:
              'If your order has not shipped, contact support immediately. We’ll do our best to accommodate changes or cancellations.',
          },
        ],
      },
    ],
    seo: {
      title: 'FAQ — Kanaiya Cosmetics',
      description:
        'Find answers to common questions about Kanaiya Cosmetics including shipping, returns, ingredients, and skincare guidance.',
      keywords: ['kanaiya', 'faq', 'shipping', 'returns', 'skincare', 'ingredients'],
    },
  };
}


