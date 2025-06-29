import { Link } from "react-router-dom"

export const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using TicketHub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our website located at tickethub.com (the "Service") operated by TicketHub Inc. ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on TicketHub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display (commercial or non-commercial)
• Attempt to decompile or reverse engineer any software contained on TicketHub's website
• Remove any copyright or other proprietary notations from the materials

This license shall automatically terminate if you violate any of these restrictions and may be terminated by TicketHub at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.`,
    },
    {
      title: "3. User Accounts",
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.

You are responsible for safeguarding the password that you use to access the Service and for all activities that occur under your account. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.`,
    },
    {
      title: "4. Ticket Purchases and Sales",
      content: `All ticket sales are final unless otherwise specified by the event organizer. TicketHub acts as an intermediary between event organizers and ticket purchasers. We are not responsible for the quality, safety, or legality of events listed on our platform.

Ticket prices are set by event organizers and may include service fees charged by TicketHub. All fees will be clearly displayed before you complete your purchase.

Event organizers are responsible for delivering the events as advertised. In case of event cancellation or significant changes, refund policies will be determined by the event organizer, though TicketHub may facilitate the refund process.

You agree not to resell tickets purchased through TicketHub at prices higher than face value plus reasonable service charges, where prohibited by law.`,
    },
    {
      title: "5. Event Organizer Responsibilities",
      content: `Event organizers using our platform agree to:

• Provide accurate and complete information about their events
• Deliver events as advertised or provide appropriate refunds
• Comply with all applicable laws and regulations
• Maintain appropriate insurance coverage for their events
• Handle customer service inquiries related to their events
• Pay all fees owed to TicketHub in a timely manner

Event organizers are solely responsible for the content, quality, and safety of their events. TicketHub does not endorse or guarantee any events listed on our platform.`,
    },
    {
      title: "6. Prohibited Uses",
      content: `You may not use our Service:

• For any unlawful purpose or to solicit others to perform unlawful acts
• To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances
• To infringe upon or violate our intellectual property rights or the intellectual property rights of others
• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
• To submit false or misleading information
• To upload or transmit viruses or any other type of malicious code
• To collect or track the personal information of others
• To spam, phish, pharm, pretext, spider, crawl, or scrape
• For any obscene or immoral purpose
• To interfere with or circumvent the security features of the Service or any related website`,
    },
    {
      title: "7. Privacy Policy",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.

We collect information you provide directly to us, information we collect automatically when you use our Service, and information from third parties. We use this information to provide, maintain, and improve our Service, process transactions, and communicate with you.

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in our Privacy Policy.`,
    },
    {
      title: "8. Disclaimers",
      content: `The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:

• Excludes all representations and warranties relating to this website and its contents
• Excludes all liability for damages arising out of or in connection with your use of this website

TicketHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, TicketHub does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
    },
    {
      title: "9. Limitations of Liability",
      content: `In no event shall TicketHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TicketHub's website, even if TicketHub or a TicketHub authorized representative has been notified orally or in writing of the possibility of such damage.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

Our total liability to you for all claims arising from or relating to the Service shall not exceed the amount you paid to TicketHub in the twelve months preceding the claim.`,
    },
    {
      title: "10. Indemnification",
      content: `You agree to defend, indemnify, and hold harmless TicketHub and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).

This indemnification obligation will survive the termination of these Terms and your use of the Service.`,
    },
    {
      title: "11. Termination",
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.`,
    },
    {
      title: "12. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.

If you do not agree to the new terms, please stop using the Service.`,
    },
    {
      title: "13. Governing Law",
      content: `These Terms shall be interpreted and governed by the laws of the State of New York, without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.

Any disputes arising from these Terms or your use of the Service will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.`,
    },
    {
      title: "14. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at:

Email: legal@tickethub.com
Phone: +1 (555) 123-4567
Address: 123 Event Street, New York, NY 10001

For general inquiries, please use our contact form or reach out to support@tickethub.com.`,
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: January 1, 2024</p>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <i className="fa-solid fa-info-circle mr-2"></i>
              Please read these Terms of Service carefully before using TicketHub. By using our service, you agree to be
              bound by these terms.
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

        {/* Terms Content */}
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
            <h3 className="text-lg font-semibold mb-3">Questions about our Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                <i className="fa-solid fa-envelope mr-2"></i>
                Contact Us
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-white transition-colors"
              >
                <i className="fa-solid fa-shield-alt mr-2"></i>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
