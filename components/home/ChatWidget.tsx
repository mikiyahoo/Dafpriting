"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone, Mail, MapPin } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const telegramUsername = "DAFPRINTING";
  const telegramUrl = `https://t.me/${telegramUsername}`;

  const contactInfo = {
    email: "dafprinting@gmail.com",
    phones: [
      { label: "Mob.", number: "+251 930 077432" },
      { label: "Mob.", number: "+251 911 25 7669" },
      { label: "Mob.", number: "+251 911 25 7668" },
      { label: "Tel.", number: "+251 115 57 52 07" },
    ],
    locations: [
      "ሰንትራል ነጋዴዎች አክሲዮን ማኅበር 2ኛ ፎቅ ቢሮ ቁ. 0039",
      "ፒያሳ ሁናን ሕንፃ 3ኛ ፎቅ ቢሮ ቁ. 310",
    ],
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-secondary-dark to-secondary text-bgPure rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="relative">
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            </span>
          </>
        )}
        <span className="text-sm font-semibold hidden sm:inline">
          {isOpen ? "Close" : "Chat with us"}
        </span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-bgPure rounded-3xl shadow-elevated border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-dark to-primary p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-bgPure flex items-center justify-center font-bold text-sm text-primary shadow-lg">
                  DP
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-primary" />
              </div>
              <div>
                <h3 className="text-bgPure font-bold text-base">
                  Daf Printing Support
                </h3>
                <p className="text-bgPure/70 text-xs mt-0.5">
                  Typically replies within minutes
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[500px] overflow-y-auto">
            {/* Welcome message */}
            <div className="bg-gradient-to-br from-bgLight to-white rounded-2xl p-4 mb-5 border border-gray-100 shadow-sm">
              <p className="text-sm text-textMain leading-relaxed">
                👋 Hi there! Have a question about our printing services? 
                We are here to help. Choose how you'd like to reach us!
              </p>
            </div>

            {/* Telegram Quick Access */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-4 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 rounded-2xl transition-all duration-300 group mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#229ED9] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#229ED9]">
                  Chat on Telegram
                </p>
                <p className="text-xs text-[#229ED9]/70">
                  @{telegramUsername}
                </p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </a>

            {/* Contact Information */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">
                Contact Us Directly
              </p>

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-bgLight transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-textMain group-hover:text-primary transition-colors">
                  {contactInfo.email}
                </span>
              </a>

              {/* Phones */}
              {contactInfo.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-bgLight transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <span className="text-xs text-textMuted">{phone.label} </span>
                    <span className="text-sm text-textMain group-hover:text-secondary transition-colors font-medium">
                      {phone.number}
                    </span>
                  </div>
                </a>
              ))}

              {/* Locations */}
              {contactInfo.locations.map((location, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-bgLight transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cta/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-cta" />
                  </div>
                  <span className="text-sm text-textMain">
                    {location}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick questions */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">
                Quick Questions
              </p>
              {[
                "How much does business card printing cost?",
                "What is the turnaround time?",
                "Do you offer bulk discounts?",
                "Can I get a sample before ordering?",
              ].map((question, i) => (
                <button
                  key={i}
                  onClick={() => {
                    window.location.href = `mailto:${contactInfo.email}?subject=Question: ${encodeURIComponent(question)}`;
                  }}
                  className="w-full text-left text-sm text-textMuted hover:text-primary hover:bg-bgLight px-3 py-2 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-dark to-primary text-bgPure rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 py-3 bg-secondary/10 text-secondary rounded-xl text-sm font-semibold hover:bg-secondary/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Contact Page
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}