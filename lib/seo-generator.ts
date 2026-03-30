// lib/seo-generator.ts

/**
 * Automatically generates SEO structure for AI tool reviews.
 * Categorizes them based on usage, features, and ratings.
 */

interface AIReview {
    title: string;
    description: string;
    features: string[];
    rating: number;
    category: string;
}

class SEOGenerator {
    private reviews: AIReview[];

    constructor(reviews: AIReview[]) {
        this.reviews = reviews;
    }

    public generateSEO(): string {
        return this.reviews.map(review => this.createMetaTags(review)).join('\n');
    }

    private createMetaTags(review: AIReview): string {
        return `\n<title>${review.title}</title>\n<meta name=\