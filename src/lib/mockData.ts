import { Property, BlogPost } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Well Furnished Apartment',
    address: '100 Smart Street, LA, USA',
    price: '$1000 - $5000 USD',
    rating: 4.5,
    images: ['/api/placeholder/400/300'],
    features: { beds: 3, baths: 1, parking: 2 },
    category: 'flats',
    isFeatured: true,
    isTopRated: true
  },
  {
    id: '2',
    title: 'Comfortable Family Flat',
    address: '200 Main Avenue, NY, USA',
    price: '$800 - $3000 USD',
    rating: 4.8,
    images: ['/api/placeholder/400/300'],
    features: { beds: 2, baths: 2, parking: 1 },
    category: 'flats',
    isFeatured: true,
    isTopRated: true
  },
  {
    id: '3',
    title: 'Beach House Summer',
    address: '300 Ocean Drive, CA, USA',
    price: '$1500 - $6000 USD',
    rating: 4.9,
    images: ['/api/placeholder/400/300'],
    features: { beds: 4, baths: 3, parking: 2 },
    category: 'villas',
    isFeatured: true,
    isTopRated: true
  },
  {
    id: '4',
    title: 'Deluxe Size Room',
    address: '400 Luxury Lane, FL, USA',
    price: '$200 - $800 USD',
    rating: 4.6,
    images: ['/api/placeholder/400/300'],
    features: { beds: 1, baths: 1, parking: 0 },
    category: 'rooms',
    isFeatured: true,
    isTopRated: true
  },
  {
    id: '5',
    title: 'Blue Door Villa Modern',
    address: '500 Modern Street, TX, USA',
    price: '$2000 - $8000 USD',
    rating: 4.7,
    images: ['/api/placeholder/400/300'],
    features: { beds: 5, baths: 4, parking: 3 },
    category: 'villas',
    isFeatured: true
  },
  {
    id: '6',
    title: 'Beach House Apartment',
    address: '600 Coastal Road, HI, USA',
    price: '$1200 - $4500 USD',
    rating: 4.4,
    images: ['/api/placeholder/400/300'],
    features: { beds: 3, baths: 2, parking: 1 },
    category: 'flats',
    isFeatured: true
  },
  {
    id: '7',
    title: 'Country Ways Hostel',
    address: '700 Rural Path, OR, USA',
    price: '$50 - $200 USD',
    rating: 4.2,
    images: ['/api/placeholder/400/300'],
    features: { beds: 1, baths: 1, parking: 0 },
    category: 'hostels',
    isFeatured: true
  },
  {
    id: '8',
    title: 'Large Family Flat on Rent',
    address: '800 Family Circle, WA, USA',
    price: '$1800 - $5500 USD',
    rating: 4.6,
    images: ['/api/placeholder/400/300'],
    features: { beds: 4, baths: 3, parking: 2 },
    category: 'flats',
    isFeatured: true
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Complete Guide to Korean Skincare Routine',
    description: 'Discover the 10-step Korean skincare routine that will transform your skin. Learn the proper order and timing for maximum benefits.',
    image: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
    wordCount: 200,
    slug: 'complete-guide-korean-skincare-routine'
  },
  {
    id: '2',
    title: 'Kanaiya Face Serum: A Deep Dive Review',
    description: 'After 30 days of testing, here\'s everything you need to know about our best-selling face serum.',
    image: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
    wordCount: 150,
    slug: 'kanaiya-face-serum-deep-dive-review'
  },
  {
    id: '3',
    title: '2024 Beauty Trends: What\'s In and What\'s Out',
    description: 'From glass skin to minimal makeup, discover the beauty trends that will dominate 2024.',
    image: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
    wordCount: 100,
    slug: '2024-beauty-trends-whats-in-whats-out'
  }
];

export const getLatestProperties = (): Property[] => {
  return mockProperties.slice(0, 4);
};

export const getNearbyProperties = (): Property[] => {
  return mockProperties.slice(0, 4);
};

export const getTopRatedProperties = (): Property[] => {
  return mockProperties.filter(p => p.isTopRated).slice(0, 4);
};

export const getFeaturedProperties = (): Property[] => {
  return mockProperties.filter(p => p.isFeatured);
};

export const getBlogPosts = (): BlogPost[] => {
  return mockBlogPosts;
}; 