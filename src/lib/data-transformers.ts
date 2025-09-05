import type { 
  Product, 
  ProductCategory, 
  Collection, 
  BannerSlide, 
  BlogPost, 
  CompanyInfo,
  ProductImage,
  ProductVariant 
} from '@/types/cdn';

// Product transformers
export class ProductTransformer {
  static transformForDisplay(product: Product) {
    return {
      ...product,
      displayPrice: this.formatPrice(product.price, product.currency),
      originalDisplayPrice: product.originalPrice ? this.formatPrice(product.originalPrice, product.currency) : null,
      discountPercentage: product.discount ? Math.round(product.discount) : 0,
      primaryImage: product.images.find(img => img.isPrimary) || product.images[0],
      availableVariants: product.variants.filter(v => v.inStock),
      isOnSale: product.originalPrice && product.originalPrice > product.price,
      stockStatus: this.getStockStatus(product.stockQuantity, product.inStock),
      ratingDisplay: this.formatRating(product.rating),
    };
  }

  static transformForList(products: Product[]) {
    return products.map(product => this.transformForDisplay(product));
  }

  static transformForSearch(products: Product[]) {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: product.currency,
      image: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url,
      category: product.category.name,
      brand: product.brand,
      rating: product.rating,
      inStock: product.inStock,
    }));
  }

  static formatPrice(price: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  }

  static getStockStatus(quantity: number, inStock: boolean): string {
    if (!inStock) return 'out-of-stock';
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= 5) return 'low-stock';
    return 'in-stock';
  }

  static formatRating(rating: number): string {
    return rating.toFixed(1);
  }

  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static extractColors(variants: ProductVariant[]): string[] {
    const colors = variants
      .filter(v => v.type === 'color')
      .map(v => v.value)
      .filter((value, index, self) => self.indexOf(value) === index);
    return colors;
  }

  static extractSizes(variants: ProductVariant[]): string[] {
    const sizes = variants
      .filter(v => v.type === 'size')
      .map(v => v.value)
      .filter((value, index, self) => self.indexOf(value) === index);
    return sizes;
  }
}

// Category transformers
export class CategoryTransformer {
  static transformForNavigation(categories: ProductCategory[]) {
    return categories.map(category => ({
      ...category,
      url: `/category/${category.slug}`,
      hasChildren: categories.some(c => c.parentId === category.id),
      children: categories.filter(c => c.parentId === category.id),
    }));
  }

  static buildCategoryTree(categories: ProductCategory[]) {
    const categoryMap = new Map(categories.map(cat => [cat.id, { ...cat, children: [] }]));
    const rootCategories: any[] = [];

    categories.forEach(category => {
      const categoryNode = categoryMap.get(category.id)!;
      
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(categoryNode);
        }
      } else {
        rootCategories.push(categoryNode);
      }
    });

    return rootCategories;
  }

  static getCategoryBreadcrumbs(categories: ProductCategory[], categoryId: string): ProductCategory[] {
    const breadcrumbs: ProductCategory[] = [];
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    let currentId = categoryId;
    while (currentId) {
      const category = categoryMap.get(currentId);
      if (!category) break;
      
      breadcrumbs.unshift(category);
      currentId = category.parentId || '';
    }
    
    return breadcrumbs;
  }
}

// Collection transformers
export class CollectionTransformer {
  static transformForDisplay(collection: Collection) {
    return {
      ...collection,
      url: `/collection/${collection.slug}`,
      productCount: collection.products.length,
      displayImage: collection.image,
    };
  }

  static transformForList(collections: Collection[]) {
    return collections.map(collection => this.transformForDisplay(collection));
  }
}

// Banner transformers
export class BannerTransformer {
  static transformForSlider(slides: BannerSlide[]) {
    return slides
      .filter(slide => slide.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(slide => ({
        ...slide,
        backgroundStyle: {
          backgroundImage: `url(${slide.backgroundImage})`,
          backgroundColor: slide.backgroundColor,
        },
        textStyle: {
          color: slide.textColor,
        },
      }));
  }

  static getActiveSlides(slides: BannerSlide[]) {
    const now = new Date();
    return slides.filter(slide => {
      if (!slide.isActive) return false;
      
      const startDate = slide.startDate ? new Date(slide.startDate) : null;
      const endDate = slide.endDate ? new Date(slide.endDate) : null;
      
      if (startDate && now < startDate) return false;
      if (endDate && now > endDate) return false;
      
      return true;
    });
  }
}

// Blog transformers
export class BlogTransformer {
  static transformForList(posts: BlogPost[]) {
    return posts
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(post => ({
        ...post,
        url: `/blog/${post.slug}`,
        publishedDate: this.formatDate(post.publishedAt),
        readingTimeText: `${post.readingTime} min read`,
        excerpt: this.truncateText(post.excerpt, 150),
      }));
  }

  static transformForDisplay(post: BlogPost) {
    return {
      ...post,
      url: `/blog/${post.slug}`,
      publishedDate: this.formatDate(post.publishedAt),
      readingTimeText: `${post.readingTime} min read`,
      formattedContent: this.formatContent(post.content),
    };
  }

  static formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  static formatContent(content: string): string {
    // Basic content formatting - can be extended with markdown parsing
    return content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  static extractTags(posts: BlogPost[]): string[] {
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
  }
}

// Company transformers
export class CompanyTransformer {
  static transformContactInfo(company: CompanyInfo) {
    return {
      ...company.contact,
      fullAddress: this.formatAddress(company.address),
      businessHoursArray: this.formatBusinessHours(company.contact.businessHours),
      socialLinksArray: this.formatSocialLinks(company.socialMedia),
    };
  }

  static formatAddress(address: CompanyInfo['address']): string {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
  }

  static formatBusinessHours(hours: CompanyInfo['contact']['businessHours']): Array<{day: string, hours: string}> {
    return Object.entries(hours).map(([day, hours]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      hours,
    }));
  }

  static formatSocialLinks(socialMedia: Record<string, string>): Array<{platform: string, url: string}> {
    return Object.entries(socialMedia).map(([platform, url]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      url,
    }));
  }
}

// SEO transformers
export class SEOTransformer {
  static generateProductMeta(product: Product) {
    return {
      title: `${product.name} - ${product.brand}`,
      description: product.shortDescription || product.description.substring(0, 160),
      keywords: [
        product.name,
        product.brand,
        product.category.name,
        ...product.tags,
      ].join(', '),
      openGraph: {
        title: product.name,
        description: product.shortDescription,
        images: product.images.map(img => ({
          url: img.url,
          width: img.dimensions.width,
          height: img.dimensions.height,
          alt: img.alt,
        })),
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.shortDescription,
        images: [product.images[0]?.url],
      },
    };
  }

  static generateCategoryMeta(category: ProductCategory) {
    return {
      title: `${category.name} - Products`,
      description: category.description,
      keywords: [category.name, 'products', 'shop'].join(', '),
    };
  }

  static generateBlogMeta(post: BlogPost) {
    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage],
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author.name],
      },
    };
  }
}

// Utility transformers
export class UtilityTransformer {
  static generatePagination(currentPage: number, totalPages: number, baseUrl: string) {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        number: i,
        url: `${baseUrl}?page=${i}`,
        isCurrent: i === currentPage,
      });
    }
    
    return {
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
      prevUrl: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : null,
      nextUrl: currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : null,
      currentPage,
      totalPages,
    };
  }

  static generateBreadcrumbs(items: Array<{name: string, url: string}>) {
    return items.map((item, index) => ({
      ...item,
      isLast: index === items.length - 1,
    }));
  }

  static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  static generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}
