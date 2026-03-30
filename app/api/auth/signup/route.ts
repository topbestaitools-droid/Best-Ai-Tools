export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Note: In production, store hashed password and persist to database
    // For now, return success with user data
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split("@")[0],
      createdAt: new Date().toISOString(),
    };

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
