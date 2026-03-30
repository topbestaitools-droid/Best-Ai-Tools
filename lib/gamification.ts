import { prisma } from "@/lib/prisma";

export const BADGE_TYPES = {
  FIRST_REVIEW: "first-review",
  TOOL_EXPERT: "tool-expert",
  COMMUNITY_HELPER: "community-helper",
  TRENDING_FINDER: "trending-finder",
  COLLECTOR: "collector",
  ALL_STAR: "all-star"
};

export const POINTS = {
  WRITE_REVIEW: 10,
  REPLY_DISCUSSION: 5,
  CREATE_COLLECTION: 20,
  FIND_TRENDING: 50,
  FOLLOW_USER: 3
};

export const LEVELS = [
  { level: 1, required: 0 },
  { level: 2, required: 100 },
  { level: 3, required: 250 },
  { level: 4, required: 500 },
  { level: 5, required: 1000 },
  { level: 6, required: 2000 },
  { level: 7, required: 3500 },
  { level: 8, required: 5000 },
  { level: 9, required: 7500 },
  { level: 10, required: 10000 }
];

export async function addPoints(userId: string, points: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: points } }
  });
  
  // Check for level up
  const newLevel = LEVELS.filter(l => l.required <= user.points).pop()?.level || 1;
  if (newLevel > user.level) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: newLevel }
    });
  }

  return user;
}

export async function awardBadge(userId: string, badgeType: string) {
  const badge = await prisma.badge.findFirst({
    where: { name: badgeType }
  });

  if (badge) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId, badgeId: badge.id } },
      create: { userId, badgeId: badge.id },
      update: {}
    });
  }
}

export function getNextLevelRequired(currentPoints: number): number {
  const nextLevel = LEVELS.find(l => l.required > currentPoints);
  return nextLevel ? nextLevel.required - currentPoints : 0;
}
