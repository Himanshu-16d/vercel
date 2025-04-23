export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="prose dark:prose-invert">
        <h2>Introduction</h2>
        <p>
          HireSense AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your information when you use our service.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Profile information from LinkedIn (when you connect your account), including:
            <ul>
              <li>Your professional profile data</li>
              <li>Name and profile picture</li>
              <li>Professional headline and summary</li>
              <li>Work experience and education</li>
              <li>Skills and endorsements</li>
              <li>Connection count</li>
            </ul>
          </li>
          <li>Resume data you provide</li>
          <li>Job search preferences</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2>LinkedIn Data Usage</h2>
        <p>
          When you connect your LinkedIn account, we:
        </p>
        <ul>
          <li>Only request access to the minimum necessary profile data</li>
          <li>Do not post to LinkedIn on your behalf without explicit permission</li>
          <li>Do not store your LinkedIn credentials</li>
          <li>Use your data solely for providing our job matching and resume building services</li>
          <li>Allow you to revoke LinkedIn access at any time through your settings</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide personalized job recommendations</li>
          <li>To improve our AI matching algorithms</li>
          <li>To communicate with you about job opportunities</li>
          <li>To analyze and improve our services</li>
          <li>To pre-fill resume information from your LinkedIn profile (with your permission)</li>
        </ul>

        <h2>Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul>
          <li>Third-party job boards when you apply for positions</li>
          <li>Service providers who assist in operating our platform</li>
          <li>When required by law or to protect our rights</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information, including encryption of sensitive data and secure API communications with LinkedIn.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of certain data processing activities</li>
          <li>Disconnect your LinkedIn account at any time</li>
          <li>Request a copy of your data</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle your LinkedIn data, please contact us at:
          support@hiresense.ai
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>
    </main>
  )
}