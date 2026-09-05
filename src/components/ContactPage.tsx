import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I download and read my eBooks after purchasing?',
      a: 'Immediately upon checkout completion, download links for both EPUB and PDF editions are displayed on your Order Confirmation screen and dispatched to your email address. You can also re-download any title at any time from your permanent "My Digital Library" account area.',
    },
    {
      q: 'Are your eBooks compatible with Amazon Kindle devices?',
      a: 'Yes! All Truescape eBooks are delivered DRM-free in standard EPUB and PDF formats. You can send the EPUB file to your Kindle using Amazon\'s free "Send to Kindle" web service or by emailing it to your Kindle email address.',
    },
    {
      q: 'What is your refund policy on digital eBook purchases?',
      a: 'Because digital items are delivered instantly, we offer replacements or refunds within 14 days if a file is defective, corrupted, or if you experience technical issues our team cannot resolve.',
    },
    {
      q: 'Can I read my eBooks offline or on multiple devices?',
      a: 'Yes! Because our files are DRM-free, you are completely free to load your eBooks onto your smartphone, e-reader, tablet, and computer for personal reading anywhere without internet connectivity.',
    },
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email address';
    if (!subject.trim()) errs.subject = 'Please provide a subject';
    if (!message.trim() || message.length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate server-side dispatch
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    addToast('Message Sent', 'Thank you for contacting Truescape. We will respond shortly.', 'success');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block">
            Customer Support & Inquiries
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#221F1C]">
            Contact Truescape
          </h1>
          <p className="text-sm sm:text-base text-[#6C645C]">
            Have a question about a title, e-reader formatting, or your digital library? We're based in Hamtramck, Michigan and always glad to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Official Business Details & Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 artisan-card space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-[#221F1C] border-b border-[#F2ECE0] pb-3">
                Business Information
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C58B39]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#786E64] block">
                      Store Location
                    </span>
                    <strong className="text-base text-[#221F1C] block mt-0.5">Truescape</strong>
                    <p className="text-[#5A524A]">Hamtramck, MI</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C58B39]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#786E64] block">
                      Direct Telephone
                    </span>
                    <a
                      href="tel:3135649075"
                      className="text-base font-bold text-[#221F1C] hover:text-[#C58B39] transition-colors block mt-0.5"
                    >
                      313-564-9075
                    </a>
                    <p className="text-xs text-[#786E64]">Mon - Fri, 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C58B39]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#786E64] block">
                      Electronic Mail
                    </span>
                    <a
                      href="mailto:2018hamza750@gmail.com"
                      className="text-sm sm:text-base font-bold text-[#221F1C] hover:text-[#C58B39] transition-colors block mt-0.5 break-all"
                    >
                      2018hamza750@gmail.com
                    </a>
                    <p className="text-xs text-[#786E64]">Typical response time within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Digital Store Promise */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E8E1D5] text-xs text-[#5A524A] space-y-1.5">
                <span className="font-bold text-[#221F1C] block">Online Orders 24/7</span>
                <p>
                  Digital delivery operates continuously around the clock. Your download links are generated instantaneously regardless of the hour.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 artisan-card space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#786E64] mt-1">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-xl bg-[#F4EFE6] border border-[#E8E1D5] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#236B5E] mx-auto" />
                <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
                  Message Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#5A524A] max-w-sm mx-auto">
                  Thank you for contacting Truescape. A confirmation has been sent to your email and our reader support will reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors cursor-pointer border border-[#38322B]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Question regarding eBook formatting or order TS-84920"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                      errors.subject ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with your reading journey?"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    id="contact-send-message-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer border border-[#38322B]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Truescape</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Frequently Asked Questions Accordion */}
        <section className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-10 artisan-card space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38]">
              Instant Answers
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#221F1C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#F2ECE0] max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left flex items-center justify-between text-sm sm:text-base font-bold text-[#221F1C] hover:text-[#C58B39] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0 text-[#C58B39]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0 text-[#9E9488]" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#5A524A] leading-relaxed animate-in fade-in duration-150 font-sans">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
