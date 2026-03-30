export type HeroTheme = "violet" | "cyan" | "green" | "orange" | "pink" | "blue";

export type MockTool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  pricing: "Free" | "Freemium" | "Paid";
  tags: string[];
  category: string;
  logoUrl: string;
  heroTheme: HeroTheme;
};

export const tools: MockTool[] = [
  {
    slug: "noted-ai",
    name: "Noted AI",
    tagline: "Turn meetings into summaries, tasks, and follow-ups.",
    description:
      "Noted AI joins your meetings automatically and generates concise summaries, action items, and follow-up emails. Integrates with Google Calendar, Zoom, and Slack so your team stays aligned without manual note-taking.",
    website: "https://noted.ai",
    pricing: "Freemium",
    tags: ["meeting notes", "summarization", "productivity"],
    category: "Productivity",
    logoUrl: "https://logo.clearbit.com/noted.ai",
    heroTheme: "violet"
  },
  {
    slug: "pixelcraft",
    name: "PixelCraft",
    tagline: "Image generation + editing for marketing assets.",
    description:
      "PixelCraft combines state-of-the-art diffusion models with a professional editing suite so marketers can create stunning visuals in seconds. Batch-generate, brand-kit support, and one-click exports to every major format.",
    website: "https://pixelcraft.ai",
    pricing: "Paid",
    tags: ["image", "design", "marketing"],
    category: "Design",
    logoUrl: "https://logo.clearbit.com/pixelcraft.ai",
    heroTheme: "pink"
  },
  {
    slug: "clipgen",
    name: "ClipGen",
    tagline: "AI video repurposing for TikTok/Shorts/Reels.",
    description:
      "ClipGen analyses long-form video content and automatically clips the most engaging moments, adds captions, resizes for every platform, and schedules posts—turning one video into a week of social content.",
    website: "https://clipgen.ai",
    pricing: "Paid",
    tags: ["video", "creator", "repurpose"],
    category: "Video",
    logoUrl: "https://logo.clearbit.com/clipgen.ai",
    heroTheme: "orange"
  },
  {
    slug: "devpilot",
    name: "DevPilot",
    tagline: "Code assistant with repo-aware answers.",
    description:
      "DevPilot indexes your entire codebase and provides context-aware code completions, refactoring suggestions, and instant documentation. Works inside VS Code, JetBrains, and Neovim with sub-100 ms latency.",
    website: "https://devpilot.ai",
    pricing: "Freemium",
    tags: ["developer", "chat", "coding"],
    category: "Developer",
    logoUrl: "https://logo.clearbit.com/devpilot.ai",
    heroTheme: "cyan"
  },
  {
    slug: "voicesmith",
    name: "VoiceSmith",
    tagline: "AI voice generator for podcasts and voiceovers.",
    description:
      "VoiceSmith delivers studio-quality AI voices in 50+ languages with emotion control, custom voice cloning, and real-time audio editing. Perfect for podcasters, educators, and content creators.",
    website: "https://voicesmith.ai",
    pricing: "Freemium",
    tags: ["audio", "voice", "podcast"],
    category: "Audio",
    logoUrl: "https://logo.clearbit.com/voicesmith.ai",
    heroTheme: "blue"
  },
  {
    slug: "contentforge",
    name: "ContentForge",
    tagline: "Blog post + social media content in seconds.",
    description:
      "ContentForge uses brand-voice AI to draft SEO-optimised blog posts, LinkedIn articles, and social threads in seconds. Built-in plagiarism checker, tone adjuster, and CMS integrations make publishing effortless.",
    website: "https://contentforge.ai",
    pricing: "Paid",
    tags: ["writing", "marketing", "content"],
    category: "Writing",
    logoUrl: "https://logo.clearbit.com/contentforge.ai",
    heroTheme: "green"
  }
];
