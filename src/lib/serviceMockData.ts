import { ServiceFeature, AboutServiceData } from '@/types/service';

export const mockServiceFeatures: ServiceFeature[] = [
  {
    id: 'take-care-with-love',
    title: 'Take care with love',
    description: 'We take care your package with full of attention and of course full of love. We want to make sure you\'ll receive your package like you receive your birthday gift.',
    icon: 'heart',
  },
  {
    id: 'friendly-customer-service',
    title: 'Friendly Customer Service',
    description: 'You do not need to worry when you want to check your package. We will always answer whatever your questions. Just click on the chat icon and we will talk.',
    icon: 'phone',
  },
  {
    id: 'refund-process',
    title: 'Refund Process',
    description: 'Refund is a such bad experience and we don\'t want that thing happen to you. But when it\'s happen we will make sure you will through smooth and friendly process.',
    icon: 'refresh',
  },
];

export const getAboutServiceData = (dict?: any): AboutServiceData => {
  return {
    title: dict?.home?.sections?.about_service || 'Why you\'ll love to shop on our website',
    features: mockServiceFeatures.map(feature => ({
      ...feature,
      title: dict?.home?.service_features?.[feature.id]?.title || feature.title,
      description: dict?.home?.service_features?.[feature.id]?.description || feature.description,
    })),
  };
};
