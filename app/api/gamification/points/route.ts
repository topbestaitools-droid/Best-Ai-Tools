import { getCurrentUser } from "@/lib/auth";
import { addPoints } from "@/lib/gamification";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, points } = await req.json();

    if (!action || typeof points !== "number") {
      return Response.json(
        { error: "Missing action or points" },
        { status: 400 }
      );
    }

    const updatedUser = await addPoints(user.id, points);

    return Response.json({
      success: true,
      user: {
        id: updatedUser.id,
        points: updatedUser.points,
        level: updatedUser.level
      }
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to add points" },
      { status: 500 }
    );
  }
}
