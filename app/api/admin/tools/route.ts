import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Check if user is admin
async function checkAdmin(user: any) {
  if (!user || user.email !== "admin@aiadvisor.tools") {
    throw new Error("Unauthorized");
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    await checkAdmin(user);

    const { name, tagline, website, pricing, tags, slug } = await req.json();

    if (!name || !tagline || !website || !pricing) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tool = await prisma.tool.create({
      data: {
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        name,
        tagline,
        website,
        pricing,
        tags: tags || []
      }
    });

    return Response.json({ success: true, tool }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    await checkAdmin(user);

    const { id, name, tagline, website, pricing, tags } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Tool ID required" },
        { status: 400 }
      );
    }

    const tool = await prisma.tool.update({
      where: { id },
      data: {
        name,
        tagline,
        website,
        pricing,
        tags
      }
    });

    return Response.json({ success: true, tool });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    await checkAdmin(user);

    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Tool ID required" },
        { status: 400 }
      );
    }

    await prisma.tool.delete({
      where: { id }
    });

    return Response.json({ success: true, message: "Tool deleted" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}
