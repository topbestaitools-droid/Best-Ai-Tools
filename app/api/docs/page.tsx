import Link from "next/link";

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/health",
      description: "Health check",
      response: { ok: true, service: "aiadvisor.tools", version: "0.1.0" }
    },
    {
      method: "POST",
      path: "/api/auth/signin",
      description: "Sign in with email/password or OAuth",
      body: { email: "user@example.com", password: "password" }
    },
    {
      method: "POST",
      path: "/api/auth/signup",
      description: "Create new account",
      body: { email: "user@example.com", name: "User", password: "password" }
    },
    {
      method: "GET",
      path: "/api/tools",
      description: "List all tools",
      query: { limit: 10, offset: 0 }
    },
    {
      method: "GET",
      path: "/api/search/semantic",
      description: "Semantic search for tools",
      query: { q: "video editing" }
    },
    {
      method: "POST",
      path: "/api/gamification/points",
      description: "Add points to user",
      body: { action: "review_write", points: 10 }
    },
    {
      method: "GET",
      path: "/api/notifications",
      description: "Get user notifications",
      auth: true
    },
    {
      method: "POST",
      path: "/api/analytics",
      description: "Track analytics event",
      body: { event: "tool_view", category: "Tool", action: "view" }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <Link href="/" className="text-accent hover:underline">← Home</Link>
        <h1 className="mt-4 text-3xl font-semibold">API Documentation</h1>
        <p className="mt-1 text-muted">AIAdvisor.tools REST API reference</p>
      </header>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Base URL</h2>
        <code className="bg-bg px-3 py-1 rounded text-accent">https://aiadvisor.tools/api</code>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <p className="text-muted mb-3">Use NextAuth sessions for authenticated endpoints.</p>
        <code className="block bg-bg px-3 py-2 rounded text-sm text-accent overflow-x-auto">
          Authorization: Bearer &lt;token&gt;
        </code>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Endpoints</h2>
        {endpoints.map((ep, i) => (
          <div key={i} className="rounded-2xl border border-border bg-panel p-6">
            <div className="flex items-start gap-4 mb-3">
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                ep.method === "GET" ? "bg-blue-500/20 text-blue-300" :
                ep.method === "POST" ? "bg-green-500/20 text-green-300" :
                ep.method === "PUT" ? "bg-yellow-500/20 text-yellow-300" :
                "bg-red-500/20 text-red-300"
              }`}>
                {ep.method}
              </span>
              <code className="flex-1 text-accent">{ep.path}</code>
            </div>
            <p className="text-muted mb-3">{ep.description}</p>
            
            {ep.body && (
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Request Body:</div>
                <pre className="bg-bg px-3 py-2 rounded text-sm text-muted overflow-x-auto">
                  {JSON.stringify(ep.body, null, 2)}
                </pre>
              </div>
            )}

            {ep.query && (
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Query Parameters:</div>
                <pre className="bg-bg px-3 py-2 rounded text-sm text-muted overflow-x-auto">
                  {JSON.stringify(ep.query, null, 2)}
                </pre>
              </div>
            )}

            {ep.response && (
              <div>
                <div className="text-sm font-medium mb-1">Response:</div>
                <pre className="bg-bg px-3 py-2 rounded text-sm text-green-300 overflow-x-auto">
                  {JSON.stringify(ep.response, null, 2)}
                </pre>
              </div>
            )}

            {ep.auth && (
              <div className="text-sm text-yellow-300">🔒 Requires authentication</div>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Rate Limiting</h2>
        <p className="text-muted">
          API requests are rate limited to 100 requests per minute per IP address.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Error Handling</h2>
        <p className="text-muted mb-3">Standard HTTP status codes are used:</p>
        <ul className="space-y-2 text-sm text-muted">
          <li><strong>200</strong> - Success</li>
          <li><strong>400</strong> - Bad Request</li>
          <li><strong>401</strong> - Unauthorized</li>
          <li><strong>403</strong> - Forbidden</li>
          <li><strong>404</strong> - Not Found</li>
          <li><strong>500</strong> - Server Error</li>
        </ul>
      </section>
    </div>
  );
}
