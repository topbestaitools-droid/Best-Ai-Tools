export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  website: string;
  pricing: "Free" | "Freemium" | "Paid";
  tags: string[];
};

export const tools: Tool[] = [
  {
    slug: "noted-ai",
    name: "Noted AI",
    tagline: "Turn meetings into summaries, tasks, and follow-ups.",
    website: "https://noted.ai",
    pricing: "Freemium",
    tags: ["meeting notes", "summarization", "productivity"]
  },
  {
    slug: "pixelcraft",
    name: "PixelCraft",
    tagline: "Image generation + editing for marketing assets.",
    website: "https://pixelcraft.ai",
    pricing: "Paid",
    tags: ["image", "design", "marketing"]
  },
  {
    slug: "clipgen",
    name: "ClipGen",
    tagline: "AI video repurposing for TikTok/Shorts/Reels.",
    website: "https://clipgen.ai",
    pricing: "Paid",
    tags: ["video", "creator", "repurpose"]
  },
  {
    slug: "devpilot",
    name: "DevPilot",
    tagline: "Code assistant with repo-aware answers.",
    website: "https://devpilot.ai",
    pricing: "Freemium",
    tags: ["developer", "chat", "coding"]
  },
  {
    slug: "voicesmith",
    name: "VoiceSmith",
    tagline: "AI voice generator for podcasts and voiceovers.",
    website: "https://voicesmith.ai",
    pricing: "Freemium",
    tags: ["audio", "voice", "podcast"]
  },
  {
    slug: "contentforge",
    name: "ContentForge",
    tagline: "Blog post + social media content in seconds.",
    website: "https://contentforge.ai",
    pricing: "Paid",
    tags: ["writing", "marketing", "content"]
  }
];
