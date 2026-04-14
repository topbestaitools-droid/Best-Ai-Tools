const fromEmail = process.env.EMAIL_FROM || "noreply@bestai-tools.com";

export async function sendWelcomeEmail(email: string, name: string) {
  // Email sending requires RESEND_API_KEY to be configured
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] Would send welcome email to ${email} (${name}) from ${fromEmail}`);
    return;
  }

  console.log(`[Email] Sending welcome email to ${email}`);
}
