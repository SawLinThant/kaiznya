export interface BlogComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  publishedAt: string;
  likes: number;
  replies: BlogComment[];
}

export interface BlogDetailData {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: {
      id: string;
      name: string;
      slug: string;
      color: string;
    };
    author: {
      id: string;
      name: string;
      avatar: string;
      bio: string;
      social: {
        twitter?: string;
        instagram?: string;
        linkedin?: string;
      };
    };
    publishedAt: string;
    readTime: number;
    tags: string[];
    isFeatured: boolean;
    views: number;
    likes: number;
    shares: number;
  };
  relatedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    category: {
      name: string;
      color: string;
    };
    author: {
      name: string;
    };
    publishedAt: string;
    readTime: number;
    views: number;
  }>;
  comments: BlogComment[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export function getBlogDetailData(slug: string, dict: any): BlogDetailData {
  // Mock detailed article content
  const articleContent = `
    <h2>The Complete Guide to Korean Skincare Routine</h2>
    
    <p>Korean skincare has taken the beauty world by storm, and for good reason. The famous 10-step Korean skincare routine isn't just about using more products—it's about understanding your skin's needs and creating a personalized approach to achieve that coveted "glass skin" glow.</p>
    
    <h3>Understanding the Korean Skincare Philosophy</h3>
    
    <p>At the heart of Korean skincare lies a simple yet powerful philosophy: prevention is better than cure. Instead of waiting for skin problems to appear, Korean skincare focuses on maintaining healthy, hydrated skin through consistent, gentle care.</p>
    
    <p>The key principles include:</p>
    <ul>
      <li><strong>Layering:</strong> Applying products from thinnest to thickest consistency</li>
      <li><strong>Gentle approach:</strong> Avoiding harsh ingredients that can damage the skin barrier</li>
      <li><strong>Hydration focus:</strong> Keeping skin plump and moisturized at all times</li>
      <li><strong>Sun protection:</strong> Using SPF daily, rain or shine</li>
    </ul>
    
    <h3>The 10-Step Korean Skincare Routine</h3>
    
    <h4>Step 1: Oil Cleanser</h4>
    <p>Start with an oil-based cleanser to remove makeup, sunscreen, and excess sebum. This step is crucial for breaking down stubborn products that water-based cleansers can't handle.</p>
    
    <h4>Step 2: Water-Based Cleanser</h4>
    <p>Follow up with a gentle foaming or gel cleanser to remove any remaining impurities and prepare your skin for the next steps.</p>
    
    <h4>Step 3: Exfoliant (2-3 times per week)</h4>
    <p>Use a chemical exfoliant like AHA or BHA to remove dead skin cells and improve skin texture. Start with once a week and gradually increase frequency.</p>
    
    <h4>Step 4: Toner</h4>
    <p>Apply a hydrating toner to restore your skin's pH balance and provide the first layer of hydration.</p>
    
    <h4>Step 5: Essence</h4>
    <p>This lightweight, water-based product delivers active ingredients deep into your skin. Think of it as a concentrated serum with a lighter texture.</p>
    
    <h4>Step 6: Serum/Ampoule</h4>
    <p>Target specific skin concerns with concentrated serums. You can use multiple serums, applying them from thinnest to thickest consistency.</p>
    
    <h4>Step 7: Sheet Mask (2-3 times per week)</h4>
    <p>Sheet masks provide intensive hydration and treatment. Use them 2-3 times per week for best results.</p>
    
    <h4>Step 8: Eye Cream</h4>
    <p>Gently pat eye cream around the orbital bone to hydrate the delicate eye area and prevent premature aging.</p>
    
    <h4>Step 9: Moisturizer</h4>
    <p>Lock in all the previous layers with a moisturizer suitable for your skin type. This creates a protective barrier and seals in hydration.</p>
    
    <h4>Step 10: Sunscreen (Morning only)</h4>
    <p>In the morning, finish with a broad-spectrum SPF 30+ sunscreen. This is non-negotiable for preventing sun damage and premature aging.</p>
    
    <h3>Tips for Success</h3>
    
    <p>Remember, the 10-step routine is a guideline, not a strict rule. Start with the basics (cleanser, moisturizer, sunscreen) and gradually add steps as your skin adjusts. The key is consistency and listening to your skin's needs.</p>
    
    <p>With patience and the right products, you'll be on your way to achieving that beautiful, healthy glow that Korean skincare is famous for!</p>
  `;

  return {
    article: {
      id: '1',
      title: 'The Complete Guide to Korean Skincare Routine',
      slug: slug,
      excerpt: 'Discover the 10-step Korean skincare routine that will transform your skin. Learn the proper order and timing for maximum benefits.',
      content: articleContent,
      featuredImage: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      category: {
        id: 'skincare-tips',
        name: 'Skincare Tips',
        slug: 'skincare-tips',
        color: '#F3E8FF'
      },
      author: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
        bio: 'Certified dermatologist with 10+ years experience in cosmetic dermatology. Specializes in Asian skincare routines and anti-aging treatments.',
        social: {
          twitter: '@sarahchen',
          instagram: '@sarahchen_skincare'
        }
      },
      publishedAt: '2024-01-15',
      readTime: 8,
      tags: ['korean skincare', 'routine', '10-step', 'glowing skin', 'glass skin', 'skincare tips'],
      isFeatured: true,
      views: 15420,
      likes: 892,
      shares: 156
    },
    relatedArticles: [
      {
        id: '2',
        title: 'Kanaiya Face Serum: A Deep Dive Review',
        slug: 'kanaiya-face-serum-deep-dive-review',
        excerpt: 'After 30 days of testing, here\'s everything you need to know about our best-selling face serum.',
        featuredImage: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
        category: {
          name: 'Product Reviews',
          color: '#E0F2FE'
        },
        author: {
          name: 'Maya Patel'
        },
        publishedAt: '2024-01-12',
        readTime: 6,
        views: 12350
      },
      {
        id: '3',
        title: '2024 Beauty Trends: What\'s In and What\'s Out',
        slug: '2024-beauty-trends-whats-in-whats-out',
        excerpt: 'From glass skin to minimal makeup, discover the beauty trends that will dominate 2024.',
        featuredImage: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
        category: {
          name: 'Beauty Trends',
          color: '#FEF3C7'
        },
        author: {
          name: 'Maya Patel'
        },
        publishedAt: '2024-01-10',
        readTime: 5,
        views: 9870
      },
      {
        id: '4',
        title: 'Understanding Hyaluronic Acid: The Hydration Hero',
        slug: 'understanding-hyaluronic-acid-hydration-hero',
        excerpt: 'Everything you need to know about hyaluronic acid - the skincare ingredient that holds 1000x its weight in water.',
        featuredImage: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
        category: {
          name: 'Ingredients Guide',
          color: '#D1FAE5'
        },
        author: {
          name: 'Dr. James Kim'
        },
        publishedAt: '2024-01-08',
        readTime: 7,
        views: 8760
      }
    ],
    comments: [
      {
        id: '1',
        author: {
          name: 'Emma Wilson',
          avatar: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
          isVerified: true
        },
        content: 'This routine has completely transformed my skin! I\'ve been following it for 3 months and the results are incredible. Thank you for such a detailed guide!',
        publishedAt: '2024-01-16',
        likes: 24,
        replies: [
          {
            id: '1-1',
            author: {
              name: 'Sarah Chen',
              avatar: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
              isVerified: true
            },
            content: 'I\'m so glad it worked for you, Emma! Consistency is key with Korean skincare. Keep it up!',
            publishedAt: '2024-01-16',
            likes: 8,
            replies: []
          }
        ]
      },
      {
        id: '2',
        author: {
          name: 'Jessica Lee',
          avatar: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
          isVerified: false
        },
        content: 'I\'m new to Korean skincare. Should I start with all 10 steps or gradually add them?',
        publishedAt: '2024-01-15',
        likes: 12,
        replies: []
      },
      {
        id: '3',
        author: {
          name: 'Maria Garcia',
          avatar: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
          isVerified: true
        },
        content: 'The sheet mask step is my favorite! I love how it feels like a mini spa treatment at home.',
        publishedAt: '2024-01-14',
        likes: 18,
        replies: []
      }
    ],
    seo: {
      title: dict?.blogDetail?.seo?.title || 'The Complete Guide to Korean Skincare Routine | Kanaiya Cosmetics',
      description: dict?.blogDetail?.seo?.description || 'Learn the 10-step Korean skincare routine that will transform your skin. Expert tips and product recommendations for achieving glass skin.',
      keywords: ['korean skincare', '10 step routine', 'glass skin', 'skincare tips', 'beauty routine', 'kanaiya cosmetics']
    }
  };
}
