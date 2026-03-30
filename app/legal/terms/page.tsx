export default function TermsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Terms of Service</h1>
        <p className="mt-2 text-muted">Last updated: March 2026</p>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="mt-2 text-muted">
            By using bestai-tools.com, you agree to these terms. If you do not agree, please do not use our service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p className="mt-2 text-muted">
            You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us of any unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
          <p className="mt-2 text-muted">
            You agree not to use bestai-tools.com for illegal activities, spam, harassment, or to harm others. We reserve the right to terminate accounts that violate these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p className="mt-2 text-muted">
            All content on bestai-tools.com is owned by us or our content providers. You may not reproduce or distribute without permission.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Disclaimers</h2>
          <p className="mt-2 text-muted">
            bestai-tools.com is provided "as is" without warranties. We do not guarantee accuracy of tool reviews or recommendations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
          <p className="mt-2 text-muted">
            We are not liable for indirect or consequential damages. Your sole remedy is termination of service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
          <p className="mt-2 text-muted">
            We may update these terms at any time. Continued use indicates acceptance of changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Contact</h2>
          <p className="mt-2 text-muted">
            Questions? Email us at <a href="mailto:legal@bestai-tools.com" className="text-accent hover:underline">legal@bestai-tools.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
