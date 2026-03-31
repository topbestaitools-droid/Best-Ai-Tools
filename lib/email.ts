// Email sending stubs — replace with a real provider (e.g. Resend, SendGrid)
// in production by installing the package and updating these functions.
function logEmailStub(to: string, subject: string) {
  console.log(`[Email stub] To: ${to} | Subject: ${subject}`);
}

export async function sendWelcomeEmail(email: string, name: string) {
  logEmailStub(email, "Welcome to AIAdvisor.tools! 🚀");
}

export async function sendReviewNotification(
  email: string,
  toolName: string,
  reviewerName: string
) {
  logEmailStub(email, `New review on ${toolName} by ${reviewerName}`);
}

export async function sendBadgeUnlockedEmail(
  email: string,
  name: string,
  badgeName: string,
  badgeIcon: string
) {
  logEmailStub(email, `You unlocked the "${badgeName}" badge! ${badgeIcon}`);
}

export async function sendWeeklyDigest(
  email: string,
  name: string,
  data: {
    newTools: number;
    trendingTools: string[];
    yourPoints: number;
    level: number;
  }
) {
  logEmailStub(email, "Your Weekly AIAdvisor Digest");
}
