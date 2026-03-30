import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.user.deleteMany();

  // Create badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: "First Review",
        description: "Write your first review",
        icon: "⭐"
      }
    }),
    prisma.badge.create({
      data: {
        name: "Tool Expert",
        description: "Write 10 reviews",
        icon: "🧠"
      }
    }),
    prisma.badge.create({
      data: {
        name: "Community Helper",
        description: "Reply to 5 discussions",
        icon: "🤝"
      }
    }),
    prisma.badge.create({
      data: {
        name: "Trending Finder",
        description: "Find a tool before it trends",
        icon: "🔥"
      }
    }),
    prisma.badge.create({
      data: {
        name: "Collector",
        description: "Create 3 collections",
        icon: "📚"
      }
    }),
    prisma.badge.create({
      data: {
        name: "All-Star",
        description: "Reach level 10",
        icon: "⭐"
      }
    })
  ]);

  console.log(`✅ Created ${badges.length} badges`);

  // Create tools
  const tools = await Promise.all([
    prisma.tool.create({
      data: {
        slug: "noted-ai",
        name: "Noted AI",
        tagline: "Turn meetings into summaries, tasks, and follow-ups.",
        website: "https://noted.ai",
        pricing: "Freemium",
        tags: ["meeting notes", "summarization", "productivity"]
      }
    }),
    prisma.tool.create({
      data: {
        slug: "pixelcraft",
        name: "PixelCraft",
        tagline: "Image generation + editing for marketing assets.",
        website: "https://pixelcraft.ai",
        pricing: "Paid",
        tags: ["image", "design", "marketing"]
      }
    }),
    prisma.tool.create({
      data: {
        slug: "clipgen",
        name: "ClipGen",
        tagline: "AI video repurposing for TikTok/Shorts/Reels.",
        website: "https://clipgen.ai",
        pricing: "Paid",
        tags: ["video", "creator", "repurpose"]
      }
    }),
    prisma.tool.create({
      data: {
        slug: "devpilot",
        name: "DevPilot",
        tagline: "Code assistant with repo-aware answers.",
        website: "https://devpilot.ai",
        pricing: "Freemium",
        tags: ["developer", "chat", "coding"]
      }
    }),
    prisma.tool.create({
      data: {
        slug: "voicesmith",
        name: "VoiceSmith",
        tagline: "AI voice generator for podcasts and voiceovers.",
        website: "https://voicesmith.ai",
        pricing: "Freemium",
        tags: ["audio", "voice", "podcast"]
      }
    }),
    prisma.tool.create({
      data: {
        slug: "contentforge",
        name: "ContentForge",
        tagline: "Blog post + social media content in seconds.",
        website: "https://contentforge.ai",
        pricing: "Paid",
        tags: ["writing", "marketing", "content"]
      }
    })
  ]);

  console.log(`✅ Created ${tools.length} tools`);

  // Create demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "sarah@example.com",
        name: "Sarah Chen",
        points: 1250,
        level: 8
      }
    }),
    prisma.user.create({
      data: {
        email: "alex@example.com",
        name: "Alex Rodriguez",
        points: 980,
        level: 7
      }
    }),
    prisma.user.create({
      data: {
        email: "jordan@example.com",
        name: "Jordan Smith",
        points: 856,
        level: 6
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Saves me hours every week. The AI summaries are incredibly accurate.",
        userId: users[0].id,
        toolId: tools[0].id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Great for quick designs but sometimes outputs need tweaking.",
        userId: users[1].id,
        toolId: tools[1].id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Best code assistant I've used. Understands my project structure.",
        userId: users[0].id,
        toolId: tools[3].id
      }
    })
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);

  // Award badges to users
  await prisma.userBadge.createMany({
    data: [
      { userId: users[0].id, badgeId: badges[0].id },
      { userId: users[0].id, badgeId: badges[1].id }
    ],
    skipDuplicates: true
  });

  console.log("✅ Awarded badges to users");

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
