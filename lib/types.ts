// User types
export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  points: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tool types
export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  website: string;
  pricing: "Free" | "Freemium" | "Paid";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
  reviewCount?: number;
  avgRating?: number;
}

// Review types
export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  userId: string;
  toolId: string;
  user?: User;
  tool?: Tool;
}

// Badge types
export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon: string;
  createdAt: Date;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description?: string;
  points: number;
  icon: string;
  createdAt: Date;
  unlockedAt: Date;
  userId: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: Date;
}

// Search types
export interface SearchResult {
  tool: Tool;
  score: number;
  matchReason?: string;
}

// Matcher types
export interface MatcherAnswers {
  useCase: string;
  budget: string;
  experience: string;
  features: string;
}

export interface MatcherResult {
  tool: Tool;
  matchPercentage: number;
  reasons: string[];
}

// Notification types
export type NotificationType =
  | "review_new"
  | "badge_unlocked"
  | "tool_trending"
  | "follower_new"
  | "comment_reply";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}
