"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  const handleGitHub = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-2xl border border-border bg-panel p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="mt-1 text-muted">Welcome to AIAdvisor.tools</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-4">
          <Button className="w-full" variant="secondary" onClick={handleGitHub}>
            Sign in with GitHub
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Don't have an account? <a href="/auth/signup" className="text-accent hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
