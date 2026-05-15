"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary-brown text-secondary-white rounded-full shadow-lg hover:bg-primary-brown/90 transition-all duration-300 hover:shadow-xl group"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        <span className="text-sm font-semibold hidden sm:inline">
          {isOpen ? "Close" : "Chat with us"}
        </span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-secondary-white rounded-2xl shadow-2xl border border-primary-navy/10 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary-navy p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-brown flex items-center justify-center text-secondary-white font-bold text-sm">
                DP
              </div>
              <div>
                <h3 className="text-secondary-white font-semibold text-sm">
                  Daf Printing Support
                </h3>
                <p className="text-secondary-white/60 text-xs mt-0.5">
                  Typically replies within minutes
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="bg-overlay-light rounded-xl p-4 mb-4">
              <p className="text-sm text-primary-navy/80 leading-relaxed">
                👋 Hi there! Have a question about our printing services? We are here to help. Drop us a message below!
              </p>
            </div>

            {/* Quick actions */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-primary-navy/60 uppercase tracking-wider">
                Quick questions
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
                    const mailto = `mailto:info@dafprinting.com?subject=Question: ${encodeURIComponent(question)}`;
                    window.location.href = mailto;
                  }}
                  className="w-full text-left text-sm text-primary-navy/70 hover:text-primary-brown hover:bg-overlay-light px-3 py-2 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Contact button */}
            <a
              href="mailto:info@dafprinting.com"
              className="block w-full text-center py-3 bg-primary-brown text-secondary-white rounded-xl text-sm font-semibold hover:bg-primary-brown/90 transition-colors"
            >
              Send us an email
            </a>

            <p className="text-xs text-primary-navy/40 text-center mt-3">
              Or call us at <span className="font-medium text-primary-navy/60">+1 (555) 123-4567</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}