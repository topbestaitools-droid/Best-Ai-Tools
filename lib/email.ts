import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || "noreply@aiadvisor.tools";

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Welcome to AIAdvisor.tools! 🚀",
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>You're now part of the AIAdvisor community.</p>
        <p>Start exploring AI tools, share reviews, and climb the leaderboard.</p>
        <a href="https://aiadvisor.tools/tools" style="background: #7C5CFF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">Browse Tools</a>
        <p>Happy exploring! 🎉</p>
      `
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendReviewNotification(
  email: string,
  toolName: string,
  reviewerName: string
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `New review on ${toolName}`,
      html: `
        <p>Hi,</p>
        <p><strong>${reviewerName}</strong> just reviewed <strong>${toolName}</strong> on AIAdvisor.</p>
        <a href="https://aiadvisor.tools/tools/${toolName.toLowerCase().replace(/\s+/g, "-")}" style="background: #7C5CFF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">View Review</a>
      `
    });
  } catch (error) {
    console.error("Failed to send review notification:", error);
  }
}

export async function sendBadgeUnlockedEmail(
  email: string,
  name: string,
  badgeName: string,
  badgeIcon: string
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `🎉 You unlocked the "${badgeName}" badge!`,
      html: `
        <p>Hi ${name},</p>
        <p>Congratulations! You just unlocked the <strong>${badgeName}</strong> badge ${badgeIcon}</p>
        <p>Keep contributing to earn more badges!</p>
        <a href="https://aiadvisor.tools/gamification" style="background: #7C5CFF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">View Achievements</a>
      `
    });
  } catch (error) {
    console.error("Failed to send badge email:", error);
  }
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
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Your Weekly AIAdvisor Digest 📊",
      html: `
        <h2>Weekly Digest for ${name}</h2>
        <p>Here's what's happening on AIAdvisor this week:</p>
        
        <h3>📈 Stats</h3>
        <ul>
          <li><strong>${data.newTools}</strong> new tools added</li>
          <li>You earned <strong>${data.yourPoints}</strong> points</li>
          <li>Current level: <strong>${data.level}</strong></li>
        </ul>
        
        <h3>🔥 Trending Tools</h3>
        <ul>
          ${data.trendingTools.map((tool) => `<li>${tool}</li>`).join("")}
        </ul>
        
        <a href="https://aiadvisor.tools/search" style="background: #7C5CFF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">Explore More</a>
      `
    });
  } catch (error) {
    console.error("Failed to send weekly digest:", error);
  }
}
