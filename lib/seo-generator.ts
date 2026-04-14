// lib/seo-generator.ts

interface AIReview {
  title: string;
  description: string;
  features: string[];
  rating: number;
  category: string;
}

export class SEOGenerator {
  private reviews: AIReview[];

  constructor(reviews: AIReview[]) {
    this.reviews = reviews;
  }

  public generateSEO(): string {
    return this.reviews.map((review) => this.createMetaTags(review)).join("\n");
  }

  private createMetaTags(review: AIReview): string {
    return [
      `<title>${review.title}</title>`,
      `<meta name="description" content="${review.description}" />`,
      `<meta property="og:title" content="${review.title}" />`,
      `<meta property="og:description" content="${review.description}" />`,
    ].join("\n");
  }
}
