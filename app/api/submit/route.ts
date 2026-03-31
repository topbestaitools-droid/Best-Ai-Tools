import { z } from "zod";

const submissionSchema = z.object({
  name: z.string().min(1).max(100),
  tagline: z.string().min(1).max(150),
  description: z.string().max(500).optional(),
  website: z.string().url(),
  pricing: z.enum(["Free", "Freemium", "Paid"]),
  category: z.string().min(1),
  tags: z.array(z.string()).max(10).optional().default([]),
  submitterName: z.string().max(100).optional(),
  submitterEmail: z.string().email().optional().or(z.literal("")),
});

// In-memory store for submissions (use a database in production)
const submissions: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(", ");
      return Response.json(
        { error: `Validation failed: ${errors}` },
        { status: 400 }
      );
    }

    const submission = {
      id: crypto.randomUUID(),
      ...parsed.data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Store submission (replace with DB call in production)
    submissions.push(submission);

    console.log("[Tool Submission]", {
      name: submission.name,
      website: submission.website,
      category: submission.category,
      submittedAt: submission.createdAt,
    });

    return Response.json(
      {
        success: true,
        message: "Tool submitted successfully. We'll review it within 48 hours.",
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return Response.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to view submissions (add auth protection in production)
  return Response.json({
    success: true,
    total: submissions.length,
    submissions: submissions.map((s) => ({
      id: s.id,
      name: s.name,
      website: s.website,
      category: s.category,
      status: s.status,
      createdAt: s.createdAt,
    })),
  });
}
