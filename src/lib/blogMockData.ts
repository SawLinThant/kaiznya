export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  readTime: number; // in minutes
  tags: string[];
  isFeatured: boolean;
  views: number;
  likes: number;
}

export interface BlogData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  categories: BlogCategory[];
  featuredArticles: BlogArticle[];
  recentArticles: BlogArticle[];
  popularArticles: BlogArticle[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export function getBlogData(dict: any): BlogData {
  const categories: BlogCategory[] = [
    {
      id: 'skincare-tips',
      name: 'Skincare Tips',
      slug: 'skincare-tips',
      description: 'Expert advice for healthy, glowing skin',
      color: '#F3E8FF'
    },
    {
      id: 'product-reviews',
      name: 'Product Reviews',
      slug: 'product-reviews',
      description: 'Honest reviews of our latest products',
      color: '#E0F2FE'
    },
    {
      id: 'beauty-trends',
      name: 'Beauty Trends',
      slug: 'beauty-trends',
      description: 'Latest trends in beauty and skincare',
      color: '#FEF3C7'
    },
    {
      id: 'ingredients',
      name: 'Ingredients Guide',
      slug: 'ingredients',
      description: 'Understanding skincare ingredients',
      color: '#D1FAE5'
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Beauty and wellness lifestyle tips',
      color: '#FEE2E2'
    }
  ];

  const authors: BlogAuthor[] = [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      avatar: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      bio: 'Certified dermatologist with 10+ years experience',
      social: {
        twitter: '@sarahchen',
        instagram: '@sarahchen_skincare'
      }
    },
    {
      id: 'maya-patel',
      name: 'Maya Patel',
      avatar: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
      bio: 'Beauty editor and skincare enthusiast',
      social: {
        instagram: '@mayabeauty'
      }
    },
    {
      id: 'dr-james-kim',
      name: 'Dr. James Kim',
      avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      bio: 'Cosmetic chemist and formulation expert',
      social: {
        linkedin: 'james-kim-cosmetics'
      }
    }
  ];

  const articles: BlogArticle[] = [
    {
      id: '1',
      title: 'The Complete Guide to Korean Skincare Routine',
      slug: 'complete-guide-korean-skincare-routine',
      excerpt: 'Discover the 10-step Korean skincare routine that will transform your skin. Learn the proper order and timing for maximum benefits.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      category: categories[0],
      author: authors[0],
      publishedAt: '2024-01-15',
      readTime: 8,
      tags: ['korean skincare', 'routine', '10-step', 'glowing skin'],
      isFeatured: true,
      views: 15420,
      likes: 892
    },
    {
      id: '2',
      title: 'Kanaiya Face Serum: A Deep Dive Review',
      slug: 'kanaiya-face-serum-deep-dive-review',
      excerpt: 'After 30 days of testing, here\'s everything you need to know about our best-selling face serum.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
      category: categories[1],
      author: authors[1],
      publishedAt: '2024-01-12',
      readTime: 6,
      tags: ['face serum', 'review', 'kanaiya', 'vitamin c'],
      isFeatured: true,
      views: 12350,
      likes: 756
    },
    {
      id: '3',
      title: '2024 Beauty Trends: What\'s In and What\'s Out',
      slug: '2024-beauty-trends-whats-in-whats-out',
      excerpt: 'From glass skin to minimal makeup, discover the beauty trends that will dominate 2024.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
      category: categories[2],
      author: authors[1],
      publishedAt: '2024-01-10',
      readTime: 5,
      tags: ['beauty trends', '2024', 'glass skin', 'minimal makeup'],
      isFeatured: false,
      views: 9870,
      likes: 543
    },
    {
      id: '4',
      title: 'Understanding Hyaluronic Acid: The Hydration Hero',
      slug: 'understanding-hyaluronic-acid-hydration-hero',
      excerpt: 'Everything you need to know about hyaluronic acid - the skincare ingredient that holds 1000x its weight in water.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      category: categories[3],
      author: authors[2],
      publishedAt: '2024-01-08',
      readTime: 7,
      tags: ['hyaluronic acid', 'hydration', 'ingredients', 'skincare science'],
      isFeatured: false,
      views: 8760,
      likes: 432
    },
    {
      id: '5',
      title: 'Morning vs Evening Skincare: What\'s the Difference?',
      slug: 'morning-vs-evening-skincare-difference',
      excerpt: 'Learn how to optimize your skincare routine for different times of day and maximize product effectiveness.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/C_P/1.png',
      category: categories[0],
      author: authors[0],
      publishedAt: '2024-01-05',
      readTime: 6,
      tags: ['morning routine', 'evening routine', 'skincare timing', 'product layering'],
      isFeatured: false,
      views: 11200,
      likes: 678
    },
    {
      id: '6',
      title: 'The Science Behind Vitamin C in Skincare',
      slug: 'science-behind-vitamin-c-skincare',
      excerpt: 'Discover why vitamin C is considered the gold standard in anti-aging and brightening skincare.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
      category: categories[3],
      author: authors[2],
      publishedAt: '2024-01-03',
      readTime: 9,
      tags: ['vitamin c', 'anti-aging', 'brightening', 'skincare science'],
      isFeatured: false,
      views: 9450,
      likes: 521
    },
    {
      id: '7',
      title: 'Sustainable Beauty: How to Build an Eco-Friendly Routine',
      slug: 'sustainable-beauty-eco-friendly-routine',
      excerpt: 'Make your beauty routine more sustainable with these simple swaps and mindful choices.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      category: categories[4],
      author: authors[1],
      publishedAt: '2024-01-01',
      readTime: 5,
      tags: ['sustainable beauty', 'eco-friendly', 'green beauty', 'environment'],
      isFeatured: false,
      views: 7890,
      likes: 398
    },
    {
      id: '8',
      title: 'Kanaiya Cream Powder: First Impressions',
      slug: 'kanaiya-cream-powder-first-impressions',
      excerpt: 'Our beauty editor shares her first week experience with the new Kanaiya Cream Powder.',
      content: 'Full article content here...',
      featuredImage: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      category: categories[1],
      author: authors[1],
      publishedAt: '2023-12-28',
      readTime: 4,
      tags: ['cream powder', 'first impressions', 'kanaiya', 'makeup'],
      isFeatured: false,
      views: 6540,
      likes: 287
    }
  ];

  return {
    hero: {
      title: dict?.blog?.hero?.title || 'Beauty & Skincare Blog',
      subtitle: dict?.blog?.hero?.subtitle || 'Discover expert tips, product reviews, and the latest trends in beauty and skincare',
      backgroundImage: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg'
    },
    categories,
    featuredArticles: articles.filter(article => article.isFeatured),
    recentArticles: articles.slice(0, 6),
    popularArticles: articles.sort((a, b) => b.views - a.views).slice(0, 4),
    seo: {
      title: dict?.blog?.seo?.title || 'Beauty & Skincare Blog | Kanaiya Cosmetics',
      description: dict?.blog?.seo?.description || 'Expert beauty and skincare advice, product reviews, and latest trends. Discover your perfect routine with Kanaiya Cosmetics.',
      keywords: ['beauty blog', 'skincare tips', 'product reviews', 'beauty trends', 'kanaiya cosmetics']
    }
  };
}
