import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return Response.json(
        { error: "Email and name required" },
        { status: 400 }
      );
    }

    await sendWelcomeEmail(email, name);

    return Response.json({
      success: true,
      message: "Welcome email sent"
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
