// Google Analytics wrapper
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value
    });
  }

  // Custom analytics
  console.debug(`[Analytics] ${category} > ${action}`, { label, value });
}

export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined") return;

  if ((window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path,
      page_title: title
    });
  }
}

export function trackUserProperty(property: string, value: any) {
  if (typeof window === "undefined") return;

  if ((window as any).gtag) {
    (window as any).gtag("set", { [property]: value });
  }
}

export const ANALYTICS_EVENTS = {
  // Tool events
  TOOL_VIEW: { category: "Tool", action: "view" },
  TOOL_CLICK: { category: "Tool", action: "click" },
  TOOL_FAVORITE: { category: "Tool", action: "favorite" },
  TOOL_SHARE: { category: "Tool", action: "share" },

  // Review events
  REVIEW_CREATE: { category: "Review", action: "create" },
  REVIEW_READ: { category: "Review", action: "read" },
  REVIEW_LIKE: { category: "Review", action: "like" },

  // Search events
  SEARCH_QUERY: { category: "Search", action: "query" },
  SEARCH_FILTER: { category: "Search", action: "filter" },
  SEARCH_RESULT_CLICK: { category: "Search", action: "result_click" },

  // User events
  USER_SIGNIN: { category: "User", action: "signin" },
  USER_SIGNUP: { category: "User", action: "signup" },
  USER_SIGNOUT: { category: "User", action: "signout" },
  USER_PROFILE_VIEW: { category: "User", action: "profile_view" },

  // Engagement
  BADGE_UNLOCKED: { category: "Engagement", action: "badge_unlocked" },
  LEVEL_UP: { category: "Engagement", action: "level_up" },
  DISCUSSION_CREATE: { category: "Engagement", action: "discussion_create" },
  COLLECTION_CREATE: { category: "Engagement", action: "collection_create" },

  // Community
  LEADERBOARD_VIEW: { category: "Community", action: "leaderboard_view" },
  MATCHER_COMPLETE: { category: "Community", action: "matcher_complete" },

  // PWA
  APP_INSTALL: { category: "PWA", action: "install" },
  APP_LAUNCH: { category: "PWA", action: "launch" }
};
