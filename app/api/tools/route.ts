import { tools, searchTools } from "@/lib/mock-tools";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const pricing = searchParams.get("pricing") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  let filtered = query ? searchTools(query) : tools;

  if (category) {
    filtered = filtered.filter((t) => t.category === category);
  }
  if (pricing) {
    filtered = filtered.filter((t) => t.pricing === pricing);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return Response.json({
    success: true,
    data: paginated,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  });
}
