// Environment
export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";

// URLs
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const API_URL = `${BASE_URL}/api`;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Rate limiting
export const RATE_LIMIT_REQUESTS = 100;
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400 // 24 hours
};

// Validation rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_COMMENT_LENGTH: 5000,
  MIN_RATING: 1,
  MAX_RATING: 5
};

// Pricing tiers
export const PRICING_TIERS = ["Free", "Freemium", "Paid"] as const;

// Tool categories
export const TOOL_CATEGORIES = [
  "Content Creation",
  "Development",
  "Business",
  "Learning",
  "Productivity",
  "Design",
  "Marketing",
  "Analytics",
  "SEO",
  "Video",
  "Audio",
  "Image",
  "Writing",
  "Code"
] as const;

// Badge rewards
export const BADGE_REWARDS = {
  FIRST_REVIEW: 10,
  TOOL_EXPERT: 50,
  COMMUNITY_HELPER: 25,
  TRENDING_FINDER: 100,
  COLLECTOR: 75,
  ALL_STAR: 500
} as const;

// Error messages
export const ERRORS = {
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "Resource not found",
  INVALID_INPUT: "Invalid input provided",
  SERVER_ERROR: "An error occurred on the server",
  RATE_LIMITED: "Too many requests. Please try again later",
  DUPLICATE_EMAIL: "Email already registered",
  INVALID_PASSWORD: "Invalid email or password"
} as const;

// Success messages
export const SUCCESS = {
  CREATED: "Successfully created",
  UPDATED: "Successfully updated",
  DELETED: "Successfully deleted",
  SIGNED_IN: "Successfully signed in",
  SIGNED_UP: "Account created successfully",
  EMAIL_SENT: "Email sent successfully"
} as const;
