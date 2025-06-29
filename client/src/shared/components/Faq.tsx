import { useState } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  popular: boolean
}

export const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqData: FAQItem[] = [
    // Tickets & Purchases
    {
      id: "1",
      question: "How do I purchase tickets?",
      answer:
        "To purchase tickets, simply browse our events, select the event you want to attend, choose your ticket type and quantity, and proceed to checkout. You'll need to create an account or log in to complete your purchase. Payment can be made using major credit cards, PayPal, or other supported payment methods.",
      category: "tickets",
      popular: true,
    },
    {
      id: "2",
      question: "Can I get a refund for my tickets?",
      answer:
        "Refund policies vary by event and are set by the event organizer. Generally, tickets are non-refundable unless the event is cancelled or significantly changed. You can check the specific refund policy for your event in your ticket confirmation email or on the event page. If you're eligible for a refund, you can request it through your account or by contacting our support team.",
      category: "tickets",
      popular: true,
    },
    {
      id: "3",
      question: "How will I receive my tickets?",
      answer:
        "Most tickets are delivered electronically via email immediately after purchase. You'll receive a confirmation email with your tickets attached as PDF files or with links to access your mobile tickets. Some events may offer physical ticket delivery for an additional fee. Check your event details for specific delivery options.",
      category: "tickets",
      popular: true,
    },
    {
      id: "4",
      question: "Can I transfer my tickets to someone else?",
      answer:
        "Yes, most tickets can be transferred to another person through your TicketHub account. Go to 'My Tickets', select the tickets you want to transfer, and follow the transfer process. The recipient will receive an email with their new tickets. Note that some events may have restrictions on ticket transfers.",
      category: "tickets",
      popular: false,
    },
    {
      id: "5",
      question: "What if I don't receive my tickets?",
      answer:
        "If you don't receive your tickets within 15 minutes of purchase, first check your spam/junk folder. If you still can't find them, log into your TicketHub account to download them from 'My Tickets'. If you continue to have issues, contact our support team immediately with your order confirmation number.",
      category: "tickets",
      popular: false,
    },

    // Account & Profile
    {
      id: "6",
      question: "How do I create an account?",
      answer:
        "Creating an account is easy! Click 'Sign Up' in the top right corner of our website, enter your email address, create a password, and fill in your basic information. You can also sign up using your Google, Facebook, or Apple account for faster registration.",
      category: "account",
      popular: true,
    },
    {
      id: "7",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Check your email (including spam folder) and follow the instructions to create a new password. If you don't receive the email within 10 minutes, contact our support team.",
      category: "account",
      popular: true,
    },
    {
      id: "8",
      question: "How do I update my profile information?",
      answer:
        "Log into your account and go to 'Profile Settings' or 'Account Settings'. Here you can update your personal information, contact details, password, and notification preferences. Don't forget to save your changes after making updates.",
      category: "account",
      popular: false,
    },
    {
      id: "9",
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account by going to Account Settings and selecting 'Delete Account'. Please note that this action is permanent and cannot be undone. You'll lose access to your purchase history, saved events, and any unused credits. Consider downloading your data before deletion.",
      category: "account",
      popular: false,
    },

    // Events & Organizers
    {
      id: "10",
      question: "How do I list my event on TicketHub?",
      answer:
        "To list your event, create an organizer account and click 'Create Event'. Fill in your event details, set up ticket types and pricing, add images and descriptions, and submit for review. Our team will review your event within 24-48 hours. Once approved, your event will be live on our platform.",
      category: "events",
      popular: true,
    },
    {
      id: "11",
      question: "What fees does TicketHub charge?",
      answer:
        "TicketHub charges a small service fee on each ticket sold, which varies by event type and ticket price. Event organizers pay a processing fee (typically 2-5% + $0.30 per transaction), while attendees may see a service fee added to their ticket price. All fees are clearly displayed before purchase.",
      category: "events",
      popular: true,
    },
    {
      id: "12",
      question: "How do I promote my event?",
      answer:
        "TicketHub offers several promotional tools including social media integration, email marketing, discount codes, and featured event placement. You can also use our analytics dashboard to track your event's performance and optimize your marketing strategy.",
      category: "events",
      popular: false,
    },
    {
      id: "13",
      question: "Can I edit my event after it's published?",
      answer:
        "Yes, you can edit most event details after publication, including descriptions, images, and ticket availability. However, major changes like date, time, or venue may require approval and could affect existing ticket holders. We recommend contacting support for significant changes.",
      category: "events",
      popular: false,
    },

    // Payment & Billing
    {
      id: "14",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers in some regions. Payment methods may vary by country and event. All payments are processed securely through our encrypted payment system.",
      category: "payment",
      popular: true,
    },
    {
      id: "15",
      question: "Is it safe to enter my payment information?",
      answer:
        "Yes, absolutely. TicketHub uses industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your full credit card details on our servers. All transactions are processed through secure, certified payment processors.",
      category: "payment",
      popular: true,
    },
    {
      id: "16",
      question: "Why was my payment declined?",
      answer:
        "Payment declines can happen for various reasons: insufficient funds, incorrect card details, expired card, or bank security measures. Try using a different payment method or contact your bank. If the problem persists, contact our support team for assistance.",
      category: "payment",
      popular: false,
    },
    {
      id: "17",
      question: "Can I get an invoice for my purchase?",
      answer:
        "Yes, you can download invoices for all your purchases from your account dashboard. Go to 'My Tickets' or 'Purchase History' and click 'Download Invoice' next to any order. Invoices include all necessary details for expense reporting or tax purposes.",
      category: "payment",
      popular: false,
    },

    // Technical Support
    {
      id: "18",
      question: "The website is not working properly. What should I do?",
      answer:
        "First, try refreshing the page or clearing your browser cache. Make sure you're using a supported browser (Chrome, Firefox, Safari, Edge). If problems persist, try using an incognito/private browsing window. Contact our technical support team if you continue experiencing issues.",
      category: "technical",
      popular: false,
    },
    {
      id: "19",
      question: "Do you have a mobile app?",
      answer:
        "Yes! The TicketHub mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store. The app offers all the same features as our website, plus mobile-specific features like push notifications and offline ticket access.",
      category: "technical",
      popular: true,
    },
    {
      id: "20",
      question: "How do I contact customer support?",
      answer:
        "You can contact our support team through multiple channels: live chat on our website (available 24/7), email at support@tickethub.com, phone at +1 (555) 123-4567, or through the contact form on our website. We typically respond to emails within 2-4 hours during business hours.",
      category: "technical",
      popular: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", icon: "fa-list" },
    { id: "tickets", name: "Tickets & Purchases", icon: "fa-ticket" },
    { id: "account", name: "Account & Profile", icon: "fa-user" },
    { id: "events", name: "Events & Organizers", icon: "fa-calendar" },
    { id: "payment", name: "Payment & Billing", icon: "fa-credit-card" },
    { id: "technical", name: "Technical Support", icon: "fa-cog" },
  ]

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularFAQs = faqData.filter((faq) => faq.popular)

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about TicketHub. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-question-circle"></i>
            </div>
            <div className="text-2xl font-bold mb-1">{faqData.length}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="text-2xl font-bold mb-1">{popularFAQs.length}</div>
            <div className="text-sm text-gray-600">Popular Questions</div>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className="text-2xl font-bold mb-1">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search questions and answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm min-w-[200px]"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className={`fa-solid ${category.icon}`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Questions */}
            {selectedCategory === "all" && searchTerm === "" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  Popular Questions
                </h2>
                <div className="space-y-4">
                  {popularFAQs.slice(0, 5).map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            Popular
                          </span>
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        </div>
                        <i
                          className={`fa-solid ${
                            openItems.includes(faq.id) ? "fa-chevron-up" : "fa-chevron-down"
                          } text-gray-400`}
                        ></i>
                      </button>
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="text-gray-700 leading-relaxed">{faq.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Questions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === "all" ? "All Questions" : categories.find((c) => c.id === selectedCategory)?.name}
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"})
                </span>
              </h2>

              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
                    <i className="fa-solid fa-search"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any questions matching your search. Try different keywords or browse all
                    categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          {faq.popular && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                              Popular
                            </span>
                          )}
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        </div>
                        <i
                          className={`fa-solid ${
                            openItems.includes(faq.id) ? "fa-chevron-up" : "fa-chevron-down"
                          } text-gray-400`}
                        ></i>
                      </button>
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="text-gray-700 leading-relaxed">{faq.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Links */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a
                    href="/contact"
                    className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <i className="fa-solid fa-envelope w-4"></i>
                    <span>Contact Support</span>
                  </a>
                  <a href="/terms" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                    <i className="fa-solid fa-file-contract w-4"></i>
                    <span>Terms of Service</span>
                  </a>
                  <a
                    href="/privacy"
                    className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <i className="fa-solid fa-shield-alt w-4"></i>
                    <span>Privacy Policy</span>
                  </a>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-900">Still need help?</h3>
                <p className="text-blue-800 text-sm mb-4">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:support@tickethub.com"
                    className="block w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm text-center"
                  >
                    <i className="fa-solid fa-envelope mr-2"></i>
                    Email Support
                  </a>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => {
                    const categoryCount = faqData.filter((faq) => faq.category === category.id).length
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <i className={`fa-solid ${category.icon} text-gray-500`}></i>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{categoryCount}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
