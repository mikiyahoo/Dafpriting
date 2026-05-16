import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Daf Printing",
  description: "Get in touch with Daf Printing. We are here to help with your printing needs.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Let's Talk About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Your Project
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Have a project in mind? Reach out to us and we'll help you 
                find the perfect printing solution. Free quotes and consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">Email</h3>
                      <p className="text-textMuted">+251 930 077432</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">Phone</h3>
                      <p className="text-textMuted">+251 930 077432</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">Location</h3>
                      <p className="text-textMuted">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">Hours</h3>
                      <p className="text-textMuted">Mon-Fri: 8AM-6PM<br />Sat: 9AM-2PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bgPure rounded-2xl border border-gray-100 shadow-card p-8">
                <h2 className="text-xl font-black text-textMain mb-6">Send Us a Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-textMain mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-textMain mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-textMain mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-textMain mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-bgPure text-sm font-bold tracking-wide uppercase rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
