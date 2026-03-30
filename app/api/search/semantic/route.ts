import { semanticSearch } from "@/lib/embeddings";
import { tools } from "@/lib/mock-tools";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json(
        { error: "Query required" },
        { status: 400 }
      );
    }

    const results = await semanticSearch(query, tools);

    return Response.json({
      success: true,
      query,
      results: results.slice(0, 10)
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
