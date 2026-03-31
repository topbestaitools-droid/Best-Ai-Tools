"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-8">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="mt-1 text-muted">Welcome back to AIAdvisor.tools</p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

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
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 space-y-2">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            Sign in with GitHub
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Sign in with Google
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
