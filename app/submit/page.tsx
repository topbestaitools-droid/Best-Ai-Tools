"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/mock-tools";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubmitToolPage() {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    website: "",
    pricing: "Freemium",
    category: "",
    tags: "",
    submitterName: "",
    submitterEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-semibold">Tool Submitted!</h1>
          <p className="text-muted">
            Thanks for your submission. Our team will review it and add it to
            the directory within 48 hours.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/tools">
              <Button>Browse Tools</Button>
            </Link>
            <Button variant="secondary" onClick={() => setSuccess(false)}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Submit an AI Tool</h1>
        <p className="mt-1 text-muted">
          Know a great AI tool that&apos;s not listed? Share it with the community.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tool Info */}
        <div className="rounded-2xl border border-border bg-panel p-6 space-y-4">
          <h2 className="font-semibold">Tool Information</h2>

          <div>
            <label className="text-sm text-muted">
              Tool Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. ChatGPT"
              maxLength={100}
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted">
              Short Tagline <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="One sentence that describes what this tool does"
              maxLength={150}
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Longer description of features, use cases, etc."
              maxLength={500}
              rows={3}
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-muted">
              Website URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://yourtool.ai"
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted">
                Pricing Model <span className="text-red-400">*</span>
              </label>
              <select
                value={form.pricing}
                onChange={(e) => set("pricing", e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
                required
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-muted">
              Tags{" "}
              <span className="text-xs">(comma-separated, e.g. writing, SEO, productivity)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="writing, SEO, content"
              className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Submitter Info */}
        <div className="rounded-2xl border border-border bg-panel p-6 space-y-4">
          <h2 className="font-semibold">Your Details (optional)</h2>
          <p className="text-sm text-muted">
            We&apos;ll contact you if we need more information about this tool.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted">Your Name</label>
              <input
                type="text"
                value={form.submitterName}
                onChange={(e) => set("submitterName", e.target.value)}
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Your Email</label>
              <input
                type="email"
                value={form.submitterEmail}
                onChange={(e) => set("submitterEmail", e.target.value)}
                placeholder="jane@example.com"
                className="mt-1 w-full rounded-xl border border-border bg-bg px-4 py-2 text-text outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit Tool"}
          </Button>
          <Link href="/tools">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted">
          By submitting, you confirm this tool is legitimate and you have
          permission to list it. We review all submissions before publishing.
        </p>
      </form>
    </div>
  );
}
