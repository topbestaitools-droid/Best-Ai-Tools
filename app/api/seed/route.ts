import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // Security: only allow in development
  if (process.env.NODE_ENV !== "development") {
    return Response.json(
      { error: "Seeding only allowed in development" },
      { status: 403 }
    );
  }

  try {
    // Clear existing data
    await prisma.review.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.tool.deleteMany();
    await prisma.user.deleteMany();

    // Create sample data
    const badges = await Promise.all([
      prisma.badge.create({ data: { name: "First Review", icon: "⭐" } }),
      prisma.badge.create({ data: { name: "Tool Expert", icon: "🧠" } })
    ]);

    const tools = await Promise.all([
      prisma.tool.create({
        data: {
          slug: "noted-ai",
          name: "Noted AI",
          tagline: "Meeting notes AI",
          website: "https://noted.ai",
          pricing: "Freemium",
          tags: ["meetings", "notes"]
        }
      })
    ]);

    return Response.json({
      success: true,
      message: "Database seeded successfully",
      stats: {
        badges: badges.length,
        tools: tools.length
      }
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Seeding failed" },
      { status: 500 }
    );
  }
}
