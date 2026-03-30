export default function PrivacyPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-muted">Last updated: March 2026</p>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="mt-2 text-muted">
            We collect information you voluntarily provide (email, name, profile data) and automatically collect usage data (pages visited, tools searched, time spent).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
          <p className="mt-2 text-muted">
            To provide and improve aiadvisor.tools, personalize recommendations, send updates, and comply with legal obligations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Data Protection</h2>
          <p className="mt-2 text-muted">
            We use industry-standard encryption and security measures. Your data is stored on secure servers and is never sold to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. GDPR & CCPA Compliance</h2>
          <p className="mt-2 text-muted">
            You have the right to access, correct, or delete your personal data. Contact us at support@aiadvisor.tools.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Cookies</h2>
          <p className="mt-2 text-muted">
            We use cookies for authentication and analytics. You can disable cookies in your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Contact Us</h2>
          <p className="mt-2 text-muted">
            For privacy questions: <a href="mailto:privacy@aiadvisor.tools" className="text-accent hover:underline">privacy@aiadvisor.tools</a>
          </p>
        </div>
      </section>
    </div>
  );
}
