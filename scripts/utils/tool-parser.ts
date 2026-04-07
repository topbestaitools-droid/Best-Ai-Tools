/**
 * Shared utility for parsing raw tool data into a normalized format
 * suitable for database insertion.
 */

export interface ParsedTool {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  website: string;
  pricing: string;
  tags: string[];
  category: string;
  logoUrl: string | null;
  source: string;
}

/**
 * Generates a URL-safe slug from a tool name.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Normalizes a category string to a standard set of categories.
 */
export function normalizeCategory(raw: string): string {
  const lower = raw.toLowerCase().trim();

  const categoryMap: Record<string, string> = {
    // AI/ML
    "machine learning": "Machine Learning",
    "ml": "Machine Learning",
    "deep learning": "Machine Learning",
    "artificial intelligence": "AI",
    "ai": "AI",

    // NLP / Text
    "nlp": "NLP",
    "natural language processing": "NLP",
    "text generation": "NLP",
    "writing": "Writing",
    "copywriting": "Writing",
    "content": "Writing",
    "content generation": "Writing",

    // Image / Vision
    "image generation": "Image Generation",
    "image": "Image Generation",
    "vision": "Computer Vision",
    "computer vision": "Computer Vision",
    "art": "Image Generation",
    "design": "Design",
    "graphic design": "Design",

    // Video
    "video": "Video",
    "video generation": "Video",
    "video editing": "Video",

    // Audio
    "audio": "Audio",
    "music": "Audio",
    "voice": "Audio",
    "speech": "Audio",
    "text to speech": "Audio",
    "tts": "Audio",

    // Code
    "code": "Code",
    "coding": "Code",
    "developer tools": "Code",
    "development": "Code",
    "programming": "Code",

    // Productivity
    "productivity": "Productivity",
    "automation": "Automation",
    "workflow": "Automation",
    "no-code": "No-Code",
    "nocode": "No-Code",

    // Search / Data
    "search": "Search",
    "data": "Data",
    "analytics": "Analytics",
    "research": "Research",

    // Business
    "marketing": "Marketing",
    "sales": "Sales",
    "crm": "Sales",
    "customer service": "Customer Service",
    "chatbot": "Customer Service",

    // Education
    "education": "Education",
    "learning": "Education",
    "tutoring": "Education",

    // Other
    "other": "Other",
    "misc": "Other",
    "tools": "Other",
  };

  // Try exact match first
  if (categoryMap[lower]) {
    return categoryMap[lower];
  }

  // Try partial match
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lower.includes(key)) {
      return value;
    }
  }

  // Title-case the original as fallback
  return raw
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Generates a Clearbit logo URL for a given website domain.
 */
export function getClearbitLogoUrl(website: string): string | null {
  try {
    const url = new URL(website.startsWith("http") ? website : `https://${website}`);
    return `https://logo.clearbit.com/${url.hostname}`;
  } catch {
    return null;
  }
}

/**
 * Normalizes a pricing string.
 */
export function normalizePricing(raw: string): string {
  const lower = raw.toLowerCase().trim();
  if (lower.includes("free") && (lower.includes("paid") || lower.includes("premium"))) {
    return "Freemium";
  }
  if (lower === "free" || lower === "open source" || lower === "opensource") {
    return "Free";
  }
  if (lower.includes("freemium")) {
    return "Freemium";
  }
  if (lower.includes("free")) {
    return "Free";
  }
  return "Paid";
}

/**
 * Cleans and normalizes a list of tags.
 */
export function normalizeTags(rawTags: string[]): string[] {
  return Array.from(
    new Set(
      rawTags
        .map((t) => t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, ""))
        .filter((t) => t.length > 0 && t.length < 50)
        .slice(0, 10)
    )
  );
}

/**
 * Truncates a string to a maximum length, appending "..." if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
