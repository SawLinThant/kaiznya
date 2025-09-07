import { ServiceFeature, AboutServiceData } from '@/types/service';

export const mockServiceFeatures: ServiceFeature[] = [
  {
    id: 'take-care-with-love',
    title: 'Take care with love',
    description: 'We take care of your package with full attention and ensure it\'s fresh and secure. We want to make sure you receive your skincare like a personalized gift.',
    icon: 'heart',
  },
  {
    id: 'friendly-customer-service',
    title: 'Friendly Customer Service',
    description: 'You do not need to worry when you want to check your order or ask about ingredients. We will always answer whatever your questions. Just click on the chat icon and we will talk.',
    icon: 'phone',
  },
  {
    id: 'refund-process',
    title: 'Refund Process',
    description: 'Refund is a such bad experience and we don\'t want that to happen to you. But when it\'s happened, we will make sure you through smooth and friendly process.',
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
