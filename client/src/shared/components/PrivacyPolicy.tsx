export const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

Personal Information:
• Name, email address, phone number
• Billing and shipping addresses
• Payment information (processed securely through third-party providers)
• Profile information and preferences

Automatically Collected Information:
• Device information (IP address, browser type, operating system)
• Usage data (pages visited, time spent, clicks)
• Location information (with your permission)
• Cookies and similar tracking technologies

Information from Third Parties:
• Social media platforms (when you connect your accounts)
• Event organizers (when you purchase tickets)
• Analytics and advertising partners`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

Provide and Improve Our Service:
• Process ticket purchases and payments
• Send order confirmations and tickets
• Provide customer support
• Personalize your experience
• Improve our platform and services

Communications:
• Send important service updates
• Notify you about events you might like
• Respond to your inquiries
• Send marketing communications (with your consent)

Legal and Security:
• Prevent fraud and abuse
• Comply with legal obligations
• Protect our rights and property
• Ensure platform security`,
    },
    {
      title: "3. Information Sharing",
      content: `We do not sell your personal information. We may share your information in the following circumstances:

With Event Organizers:
• When you purchase tickets, we share necessary information with event organizers
• This may include your name, email, and attendance information

Service Providers:
• Payment processors for transaction processing
• Email service providers for communications
• Analytics providers for service improvement
• Cloud storage providers for data hosting

Legal Requirements:
• When required by law or legal process
• To protect our rights or the rights of others
• In connection with a business transaction (merger, acquisition, etc.)

With Your Consent:
• When you explicitly agree to share information
• For specific purposes you've approved`,
    },
    {
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information:

Technical Safeguards:
• Encryption of data in transit and at rest
• Secure servers and databases
• Regular security audits and updates
• Access controls and authentication

Organizational Measures:
• Employee training on data protection
• Limited access to personal information
• Regular review of security practices
• Incident response procedures

While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but will notify you of any material breaches as required by law.`,
    },
    {
      title: "5. Your Rights and Choices",
      content: `You have several rights regarding your personal information:

Access and Portability:
• Request a copy of your personal information
• Download your data in a portable format

Correction and Updates:
• Update your account information at any time
• Request correction of inaccurate information

Deletion:
• Request deletion of your account and personal information
• Note that some information may be retained for legal or business purposes

Marketing Communications:
• Opt out of marketing emails at any time
• Adjust notification preferences in your account settings

Cookies and Tracking:
• Control cookie preferences through your browser settings
• Opt out of certain analytics and advertising tracking

To exercise these rights, contact us at privacy@tickethub.com or through your account settings.`,
    },
    {
      title: "6. Cookies and Tracking",
      content: `We use cookies and similar technologies to enhance your experience:

Essential Cookies:
• Required for basic site functionality
• Remember your login status
• Maintain your shopping cart

Analytics Cookies:
• Help us understand how you use our site
• Identify popular content and features
• Improve our services

Advertising Cookies:
• Show you relevant advertisements
• Measure ad effectiveness
• Prevent showing the same ad repeatedly

You can control cookies through your browser settings, but disabling certain cookies may affect site functionality. We also use web beacons, pixels, and similar technologies for analytics and advertising purposes.`,
    },
    {
      title: "7. Children's Privacy",
      content: `TicketHub is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information from our systems.

For users between 13 and 18, we recommend parental guidance when using our service and making purchases.`,
    },
    {
      title: "8. International Data Transfers",
      content: `TicketHub operates globally, and your information may be transferred to and processed in countries other than your own.

We ensure appropriate safeguards are in place for international transfers:
• Standard contractual clauses approved by relevant authorities
• Adequacy decisions by regulatory bodies
• Other legally recognized transfer mechanisms

By using our service, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.`,
    },
    {
      title: "9. Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:

Account Information:
• Retained while your account is active
• May be retained for a reasonable period after account closure for legal or business purposes

Transaction Records:
• Retained for accounting and tax purposes
• Typically kept for 7 years or as required by law

Marketing Information:
• Retained until you opt out or we determine it's no longer needed

We regularly review our data retention practices and delete information that is no longer necessary.`,
    },
    {
      title: "10. Third-Party Links and Services",
      content: `Our service may contain links to third-party websites, applications, or services that are not operated by us.

We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you use.

This includes:
• Social media platforms
• Payment processors
• Event organizer websites
• Advertising partners

When you interact with these third parties, their privacy policies apply to the collection and use of your information.`,
    },
    {
      title: "11. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.

When we make changes:
• We will post the updated policy on our website
• We will update the "Last Updated" date
• For material changes, we will provide additional notice (email, website banner, etc.)

We encourage you to review this policy periodically to stay informed about how we protect your information.

Your continued use of our service after changes become effective constitutes acceptance of the updated policy.`,
    },
    {
      title: "12. Contact Us",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Privacy Team:
Email: privacy@tickethub.com
Phone: +1 (555) 123-4567

Mailing Address:
TicketHub Inc.
Attn: Privacy Team
123 Event Street
New York, NY 10001

Data Protection Officer:
For users in the European Union, you can contact our Data Protection Officer at dpo@tickethub.com

We will respond to your inquiry within 30 days or as required by applicable law.`,
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: January 1, 2024</p>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <i className="fa-solid fa-shield-alt mr-2"></i>
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-blue-600 hover:text-blue-800 text-sm py-1 hover:underline"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} id={`section-${index + 1}`} className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{section.title}</h2>
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Questions about our Privacy Policy?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to
              contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                <i className="fa-solid fa-envelope mr-2"></i>
                Contact Privacy Team
              </a>
              <a
                href="/terms"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-white transition-colors"
              >
                <i className="fa-solid fa-file-contract mr-2"></i>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
