import type React from "react"
import { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { sendContactForm } from "../../app/store/api/contact/contactThunks";
import { resetContactState } from "../../app/store/api/contact/contactSlice"
import { useAlert } from "../../app/hooks/useAlert";
import { AlertWrapper } from "./AlertWrapper";

import { Loader } from "./Loader"

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector(state => state.contact);
  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(sendContactForm(formData));
    if (sendContactForm.fulfilled.match(result)) {
      setFormData({ name: "", email: "", subject: "", category: "", message: "" });
      showTemporaryAlert("Message sent successfully!", "success");
    } else {
      showTemporaryAlert("Failed to send message. Please try again.", "error");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetContactState());
    };
  }, [dispatch]);

  const contactMethods = [
    {
      icon: "fa-envelope",
      title: "Email Support",
      description: "Get help from our support team",
      contact: "tickethub.project@gmail.com",
      availability: "24/7 Response",
    },
    {
      icon: "fa-phone",
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: "fa-map-marker-alt",
      title: "Office Address",
      description: "Visit us in person",
      contact: "123 Event Street, New York, NY 10001",
      availability: "By appointment only",
    },
  ]

  const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "partnerships", label: "Partnerships" },
    { value: "press", label: "Press & Media" },
    { value: "careers", label: "Careers" },
  ]

  const faqs = [
    {
      question: "How do I get a refund for my tickets?",
      answer:
        "Refund policies vary by event. Check your ticket confirmation email or contact the event organizer directly. For TicketHub fees, contact our support team.",
    },
    {
      question: "Can I transfer my tickets to someone else?",
      answer:
        "Yes, most tickets can be transferred through your TicketHub account. Go to 'My Tickets' and select the transfer option for eligible events.",
    },
    {
      question: "What if I don't receive my tickets?",
      answer:
        "Digital tickets are sent immediately after purchase. Check your email and spam folder. If you still don't see them, contact our support team.",
    },
    {
      question: "How do I list my venue on TicketHub?",
      answer:
        "Visit our Venues page and click 'List Your Venue'. Our team will guide you through the onboarding process and help you get started.",
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">

        <AlertWrapper 
          showAlert={showAlert}
          alertMessage={alertMessage}
          alertType={alertType}
        />

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of the channels below and we'll get back to
            you as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center text-xl">
                <i className={`fa-solid ${method.icon}`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <div className="font-medium text-black mb-1">{method.contact}</div>
              <div className="text-xs text-gray-500">{method.availability}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => dispatch(resetContactState())}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                    >
                      <option value="">Select a category</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size="sm" variant="spinner" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium">{faq.question}</summary>
                  <div className="p-4 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: "New York",
                address: "123 Event Street\nNew York, NY 10001",
                phone: "+1 (555) 123-4567",
                email: "ny@tickethub.com",
              },
              {
                city: "Los Angeles",
                address: "456 Entertainment Blvd\nLos Angeles, CA 90210",
                phone: "+1 (555) 234-5678",
                email: "la@tickethub.com",
              },
              {
                city: "London",
                address: "789 Theatre Lane\nLondon, UK SW1A 1AA",
                phone: "+44 20 1234 5678",
                email: "london@tickethub.com",
              },
            ].map((office, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-map-marker-alt w-4"></i>
                    <span className="whitespace-pre-line">{office.address}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-phone w-4"></i>
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-envelope w-4"></i>
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
