// Placeholder for embeddings API integration
// TODO: Connect to OpenAI Embeddings or similar

export async function getEmbedding(text: string): Promise<number[]> {
  // Placeholder: returns dummy embedding
  // In production: call OpenAI API or similar
  return Array(1536).fill(0).map(() => Math.random());
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

export async function semanticSearch(query: string, tools: any[]) {
  const queryEmbedding = await getEmbedding(query);
  
  const scored = await Promise.all(
    tools.map(async (tool) => {
      const toolEmbedding = await getEmbedding(tool.tagline + " " + tool.tags.join(" "));
      const score = cosineSimilarity(queryEmbedding, toolEmbedding);
      return { ...tool, score };
    })
  );

  return scored.sort((a, b) => b.score - a.score);
}
