"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password })
      });

      if (res.ok) {
        router.push("/auth/signin");
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error signing up");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-2xl border border-border bg-panel p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="mt-1 text-muted">Join BestAI-Tools community</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-muted">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

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
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account? <a href="/auth/signin" className="text-accent hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
