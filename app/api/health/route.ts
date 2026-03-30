export async function GET() {
  return Response.json({
    ok: true,
    service: "aiadvisor.tools",
    version: "0.1.0",
    timestamp: new Date().toISOString()
  });
}
