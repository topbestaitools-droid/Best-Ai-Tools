export const dynamic = "force-dynamic";

import { tools } from "@/lib/mock-tools";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category")?.toLowerCase() || "";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let filtered = tools;

    if (query) {
      filtered = filtered.filter((t) =>
        (t.name + " " + t.tagline + " " + t.tags.join(" ")).toLowerCase().includes(query)
      );
    }

    if (category) {
      filtered = filtered.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(category))
      );
    }

    const paginated = filtered.slice(offset, offset + limit);

    return Response.json({
      success: true,
      data: paginated,
      total: filtered.length,
      page: Math.floor(offset / limit) + 1,
      limit,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}