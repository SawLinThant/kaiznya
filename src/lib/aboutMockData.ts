export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  mission: string;
  vision: string;
  stats: AboutStat[];
  values: string[];
  team: AboutTeamMember[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
}

export const getAboutData = (_dict?: any): AboutData => ({
  hero: {
    title: 'Timeless Beauty, Thoughtfully Crafted',
    subtitle: 'Kanaiya is a skincare house dedicated to effective, gentle formulations inspired by nature and backed by science.',
    backgroundImage: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
  },
  mission: 'Our mission is to create trusted beauty solutions crafted with effective, nature-inspired ingredients that deliver real results. We are committed to providing a complete range of cosmetics that enhance skin, hair, and body care — ensuring that every customer, regardless of gender or social background, finds everything they need in one place. At Kanaiya, we stand for beauty that is affordable, inclusive, and uncompromising in quality.',
  vision: 'At Kanaiya Cosmetics, our vision is to make beauty accessible to everyone. We believe that radiant, youthful, and healthy skin should not be a luxury but a right for all. By offering premium-quality products at fair prices, we aim to empower people of every background to feel confident, beautiful, and cared for.',
  stats: [
    { label: 'Happy Customers', value: '120K+' },
    { label: 'Countries Served', value: '8' },
    { label: 'Formulas Tested', value: '150+' },
    { label: 'Recyclable Packaging', value: '90%' },
  ],
  values: [
    'Dermatologist-tested formulas',
    'Cruelty-free and mindful sourcing',
    'Transparent ingredients',
    'Sustainable packaging',
  ],
  team: [
    { id: 't1', name: 'Arisa Tan', role: 'Head of R&D', avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg' },
    { id: 't2', name: 'Min Ko', role: 'Production Lead', avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg' },
    { id: 't3', name: 'Nanda', role: 'Brand & Community', avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg' },
    { id: 't4', name: 'Somchai', role: 'QC Specialist', avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg' },
  ],
  seo: {
    title: 'About Us - Kanaiya Skincare',
    description: 'Learn about Kanaiya — our mission, vision, values, team, and commitment to sustainable skincare.',
    keywords: ['Kanaiya', 'About', 'Skincare brand', 'Mission', 'Vision'],
    image: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
  },
});


