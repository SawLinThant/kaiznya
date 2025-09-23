import { ColorTag, ExploreColorData } from '@/types/color';

export const mockColorTags: ColorTag[] = [
  {
    id: 'red-pastel',
    name: 'RED PASTEL',
    value: '#EF4444',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
  },
  {
    id: 'lime-green',
    name: 'LIME GREEN',
    value: '#84CC16',
    bgColor: 'bg-lime-500',
    textColor: 'text-white',
  },
  {
    id: 'navy-blue',
    name: 'NAVY BLUE',
    value: '#1E40AF',
    bgColor: 'bg-blue-700',
    textColor: 'text-white',
  },
  {
    id: 'clean-white',
    name: 'CLEAN WHITE',
    value: '#FFFFFF',
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-300',
  },
  {
    id: 'blue-sky',
    name: 'BLUE SKY',
    value: '#0EA5E9',
    bgColor: 'bg-sky-500',
    textColor: 'text-white',
  },
  {
    id: 'purple',
    name: 'PURPLE',
    value: '#A855F7',
    bgColor: 'bg-purple-500',
    textColor: 'text-white',
  },
  {
    id: 'pink',
    name: 'PINK',
    value: '#EC4899',
    bgColor: 'bg-pink-500',
    textColor: 'text-white',
  },
  {
    id: 'yellow',
    name: 'YELLOW',
    value: '#EAB308',
    bgColor: 'bg-yellow-500',
    textColor: 'text-white',
  },
  {
    id: 'dark-green',
    name: 'DARK GREEN',
    value: '#166534',
    bgColor: 'bg-green-700',
    textColor: 'text-white',
  },
];

export const getExploreColorData = (dict?: any): ExploreColorData => {
  return {
    title: dict?.home?.sections?.explore_colors || 'Explore by Types',
    colors: mockColorTags,
    testimonial: {
      quote: dict?.home?.testimonial?.quote || 'Love the way they handle the order.',
      author: dict?.home?.testimonial?.author || 'Samantha William',
      role: dict?.home?.testimonial?.role || 'Fashion Enthusiast',
      description: dict?.home?.testimonial?.description || 'Very professional and friendly at the same time. They packed the order on schedule and the detail of their wrapping is top notch. One of my best experience for buying online items. Surely will come back for another purchase.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=400&h=400&fit=crop&crop=face'
    }
  };
};
