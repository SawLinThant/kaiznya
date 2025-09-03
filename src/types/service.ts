export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: 'heart' | 'phone' | 'refresh';
}

export interface AboutServiceData {
  title: string;
  features: ServiceFeature[];
}
