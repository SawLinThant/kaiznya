export interface ColorTag {
  id: string;
  name: string;
  value: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
}

export interface ExploreColorData {
  title: string;
  colors: ColorTag[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    description: string;
    image: string;
  };
}
