/**
 * Validation helpers for tool data before database insertion.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a URL string.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Validates a slug string (URL-safe, lowercase, no spaces).
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 2 && slug.length <= 100;
}

/**
 * Validates a tool object before insertion.
 */
export function validateTool(tool: {
  name?: string;
  slug?: string;
  website?: string;
  tagline?: string;
  tags?: string[];
  category?: string;
  source?: string;
}): ValidationResult {
  const errors: string[] = [];

  if (!tool.name || tool.name.trim().length < 2) {
    errors.push("name must be at least 2 characters");
  }
  if (tool.name && tool.name.length > 200) {
    errors.push("name must be 200 characters or fewer");
  }

  if (!tool.slug || !isValidSlug(tool.slug)) {
    errors.push(`slug '${tool.slug}' is invalid (must be lowercase alphanumeric with hyphens)`);
  }

  if (!tool.website || !isValidUrl(tool.website)) {
    errors.push(`website '${tool.website}' is not a valid URL`);
  }

  if (tool.tagline && tool.tagline.length > 500) {
    errors.push("tagline must be 500 characters or fewer");
  }

  if (tool.tags && tool.tags.length > 10) {
    errors.push("tags array must have 10 or fewer items");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a batch of tools and returns valid/invalid splits with stats.
 */
export function validateBatch(
  tools: Parameters<typeof validateTool>[0][]
): {
  valid: Parameters<typeof validateTool>[0][];
  invalid: { tool: Parameters<typeof validateTool>[0]; errors: string[] }[];
  stats: { total: number; valid: number; invalid: number };
} {
  const valid: Parameters<typeof validateTool>[0][] = [];
  const invalid: { tool: Parameters<typeof validateTool>[0]; errors: string[] }[] = [];

  for (const tool of tools) {
    const result = validateTool(tool);
    if (result.valid) {
      valid.push(tool);
    } else {
      invalid.push({ tool, errors: result.errors });
    }
  }

  return {
    valid,
    invalid,
    stats: {
      total: tools.length,
      valid: valid.length,
      invalid: invalid.length,
    },
  };
}
